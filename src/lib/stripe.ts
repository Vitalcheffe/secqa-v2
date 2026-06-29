import Stripe from "stripe";

// Stripe SDK wrapper for SecQA MVP
// Handles checkout sessions, webhooks, and customer portal

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to .env.local to enable Stripe billing."
    );
  }
  if (!stripeClient) {
    stripeClient = new Stripe(secretKey, {
      apiVersion: "2024-04-10",
      typescript: true,
    });
  }
  return stripeClient;
}

export type Tier = "starter" | "pro" | "scale";
export type BillingPeriod = "monthly" | "annual";

// Map tier + period to Stripe price ID from environment
export function getPriceId(tier: Tier, period: BillingPeriod): string {
  const envKey = `STRIPE_PRICE_${tier.toUpperCase()}_${period.toUpperCase()}`;
  const priceId = process.env[envKey];
  if (!priceId) {
    throw new Error(
      `${envKey} is not set. Configure Stripe prices in .env.local (see scripts/seed-tiers.ts).`
    );
  }
  return priceId;
}

// Reverse map: price ID → tier + period (used in webhook handler)
export function getTierAndPeriodFromPriceId(priceId: string): {
  tier: Tier;
  period: BillingPeriod;
} | null {
  const tiers: Tier[] = ["starter", "pro", "scale"];
  const periods: BillingPeriod[] = ["monthly", "annual"];
  for (const tier of tiers) {
    for (const period of periods) {
      const envKey = `STRIPE_PRICE_${tier.toUpperCase()}_${period.toUpperCase()}`;
      if (process.env[envKey] === priceId) {
        return { tier, period };
      }
    }
  }
  return null;
}

export interface CheckoutSessionInput {
  priceId: string;
  customerId?: string;
  customerEmail?: string;
  successUrl?: string;
  cancelUrl?: string;
}

export async function createCheckoutSession(
  input: CheckoutSessionInput
): Promise<{ url: string; sessionId: string }> {
  const stripe = getStripe();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const params: Stripe.Checkout.SessionCreateParams = {
    mode: "subscription",
    line_items: [{ price: input.priceId, quantity: 1 }],
    success_url: input.successUrl || `${baseUrl}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: input.cancelUrl || `${baseUrl}/billing/cancel`,
    metadata: {
      source: "secqa-mvp",
      createdAt: new Date().toISOString(),
    },
  };

  if (input.customerId) {
    params.customer = input.customerId;
  } else if (input.customerEmail) {
    params.customer_email = input.customerEmail;
  }

  const session = await stripe.checkout.sessions.create(params);
  return { url: session.url || "", sessionId: session.id };
}

export async function createCustomerPortalSession(
  stripeCustomerId: string
): Promise<{ url: string }> {
  const stripe = getStripe();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${baseUrl}/dashboard`,
  });
  return { url: session.url };
}

// Verify webhook signature using Stripe's constructEvent method
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): Stripe.Event {
  const stripe = getStripe();
  try {
    return stripe.webhooks.constructEvent(payload, signature, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Webhook signature verification failed: ${message}`);
  }
}

export { Stripe };
