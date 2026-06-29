import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession, getPriceId, type Tier, type BillingPeriod } from "@/lib/stripe";

export const runtime = "nodejs";

// POST /api/stripe/checkout
// Body: { tier: "starter" | "pro" | "scale", period: "monthly" | "annual", customerId?, customerEmail? }
// Returns: { url } — redirect the browser to this Stripe Checkout URL
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tier, period, customerId, customerEmail } = body;

    // Validate tier
    const validTiers: Tier[] = ["starter", "pro", "scale"];
    if (!tier || !validTiers.includes(tier)) {
      return NextResponse.json(
        { error: `Invalid 'tier'. Must be one of: starter, pro, scale.` },
        { status: 400 }
      );
    }

    // Validate period
    const validPeriods: BillingPeriod[] = ["monthly", "annual"];
    if (!period || !validPeriods.includes(period)) {
      return NextResponse.json(
        { error: `Invalid 'period'. Must be one of: monthly, annual.` },
        { status: 400 }
      );
    }

    // Look up the Stripe price ID for this tier + period
    let priceId: string;
    try {
      priceId = getPriceId(tier, period);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return NextResponse.json(
        {
          error: "Stripe price not configured.",
          details: message,
          hint: "Run scripts/seed-tiers.ts to create products and set price IDs in .env.local",
        },
        { status: 500 }
      );
    }

    // Create the checkout session
    let result;
    try {
      result = await createCheckoutSession({
        priceId,
        customerId,
        customerEmail,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes("STRIPE_SECRET_KEY")) {
        return NextResponse.json(
          { error: "Stripe not configured. Set STRIPE_SECRET_KEY in .env.local." },
          { status: 500 }
        );
      }
      throw err;
    }

    if (!result.url) {
      return NextResponse.json(
        { error: "Stripe returned no checkout URL." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: result.url,
      sessionId: result.sessionId,
      tier,
      period,
      priceId,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Checkout creation failed: ${message}` },
      { status: 500 }
    );
  }
}
