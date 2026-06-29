import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyWebhookSignature, getTierAndPeriodFromPriceId } from "@/lib/stripe";
import type Stripe from "stripe";

export const runtime = "nodejs";

// POST /api/stripe/webhook
// Receives Stripe webhook events, verifies signature, updates Prisma models
// CRITICAL: must use req.text() to get raw body for signature verification
export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET not configured");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  // Get raw body as text — required for signature verification
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  // Verify the webhook signature
  let event: Stripe.Event;
  try {
    event = verifyWebhookSignature(payload, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 }
    );
  }

  // Handle the event based on type
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      }
      case "customer.subscription.updated": {
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
      }
      case "customer.subscription.deleted": {
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      }
      default:
        // Acknowledge unhandled event types — Stripe requires 200 response
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true, type: event.type });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`Webhook handler error for ${event.type}:`, message);
    return NextResponse.json(
      { error: `Webhook handler failed: ${message}` },
      { status: 500 }
    );
  }
}

// Handle checkout.session.completed — create Customer + Subscription records
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (!session.customer || typeof session.customer !== "string") {
    throw new Error("Checkout session missing customer ID");
  }

  const stripeCustomerId = session.customer;
  const email = session.customer_email || session.customer_details?.email;
  if (!email) {
    throw new Error("Checkout session missing customer email");
  }

  // Upsert customer in our database
  const customer = await prisma.customer.upsert({
    where: { stripeCustomerId },
    update: { email },
    create: {
      stripeCustomerId,
      email,
      name: session.customer_details?.name || null,
    },
  });

  // If a subscription was created, record it
  if (session.subscription && typeof session.subscription === "string") {
    const stripe = (await import("@/lib/stripe")).getStripe();
    const subscription = await stripe.subscriptions.retrieve(session.subscription);

    const tierInfo = getTierAndPeriodFromPriceId(
      subscription.items.data[0]?.price?.id || ""
    );

    await prisma.subscription.create({
      data: {
        customerId: customer.id,
        stripeSubscriptionId: subscription.id,
        tier: tierInfo?.tier || "pro", // default to pro if mapping fails
        status: subscription.status,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      },
    });
  }
}

// Handle customer.subscription.updated — update tier, status, period end
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const stripeSubId = subscription.id;
  const tierInfo = getTierAndPeriodFromPriceId(
    subscription.items.data[0]?.price?.id || ""
  );

  // Find the existing subscription in our DB
  const existing = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: stripeSubId },
  });

  if (!existing) {
    // Subscription not in our DB — might be from a different source. Log and skip.
    console.warn(`Subscription ${stripeSubId} not found in database, skipping update`);
    return;
  }

  await prisma.subscription.update({
    where: { stripeSubscriptionId: stripeSubId },
    data: {
      tier: tierInfo?.tier || existing.tier,
      status: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  });
}

// Handle customer.subscription.deleted — mark subscription as canceled
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  await prisma.subscription.updateMany({
    where: { stripeSubscriptionId: subscription.id },
    data: { status: "canceled" },
  });
}
