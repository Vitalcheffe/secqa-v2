import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { createCustomerPortalSession } from "@/lib/stripe";

export const runtime = "nodejs";

// POST /api/stripe/portal
// Body: { customerId } — our internal customer ID (not Stripe customer ID)
// Returns: { url } — redirect the browser to Stripe Customer Portal
export async function POST(req: NextRequest) {
  try {
    const { customerId } = await req.json();

    if (!customerId || typeof customerId !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'customerId' in request body." },
        { status: 400 }
      );
    }

    // Look up our customer record to get the Stripe customer ID
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      return NextResponse.json(
        { error: `Customer ${customerId} not found.` },
        { status: 404 }
      );
    }

    // Create a Stripe Billing Portal session
    let result;
    try {
      result = await createCustomerPortalSession(customer.stripeCustomerId);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes("STRIPE_SECRET_KEY")) {
        return NextResponse.json(
          { error: "Stripe not configured. Set STRIPE_SECRET_KEY in .env.local." },
          { status: 500 }
        );
      }
      if (message.includes("No such customer")) {
        return NextResponse.json(
          { error: "Stripe customer not found. The customer may have been deleted in Stripe." },
          { status: 404 }
        );
      }
      throw err;
    }

    if (!result.url) {
      return NextResponse.json(
        { error: "Stripe returned no portal URL." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: result.url,
      customerId,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Portal session creation failed: ${message}` },
      { status: 500 }
    );
  }
}
