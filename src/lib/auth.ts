import prisma from "./db";
import type { NextRequest } from "next/server";

// Subscription check helper for middleware and dashboard gating

export interface CustomerContext {
  customerId: string;
  stripeCustomerId: string;
  email: string;
  tier: string | null;
  status: string | null;
  currentPeriodEnd: Date | null;
}

// Read customer ID from session cookie (set by /billing/success after checkout)
export function getCustomerIdFromRequest(req: NextRequest): string | null {
  const cookie = req.cookies.get("secqa_customer_id");
  return cookie?.value || null;
}

// Look up the customer and their active subscription
export async function getCustomerContext(
  customerId: string
): Promise<CustomerContext | null> {
  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
    include: {
      subscriptions: {
        where: { status: "active" },
        orderBy: { currentPeriodEnd: "desc" },
        take: 1,
      },
    },
  });

  if (!customer) return null;

  const activeSub = customer.subscriptions[0];
  return {
    customerId: customer.id,
    stripeCustomerId: customer.stripeCustomerId,
    email: customer.email,
    tier: activeSub?.tier || null,
    status: activeSub?.status || null,
    currentPeriodEnd: activeSub?.currentPeriodEnd || null,
  };
}

export function hasActiveSubscription(ctx: CustomerContext | null): boolean {
  if (!ctx || !ctx.tier || !ctx.currentPeriodEnd) return false;
  if (ctx.status !== "active") return false;
  // Allow access until 1 day grace period after period end
  const gracePeriod = 24 * 60 * 60 * 1000;
  return ctx.currentPeriodEnd.getTime() + gracePeriod > Date.now();
}

export function setCustomerCookie(customerId: string): string {
  return `secqa_customer_id=${customerId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`;
}
