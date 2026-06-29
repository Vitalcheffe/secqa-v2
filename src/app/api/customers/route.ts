import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const runtime = 'nodejs';

// GET /api/customers?stripeCustomerId=<id>
// Returns customer record by Stripe customer ID
export async function GET(req: NextRequest) {
  const stripeCustomerId = req.nextUrl.searchParams.get('stripeCustomerId');

  if (!stripeCustomerId) {
    return NextResponse.json(
      { error: "Missing 'stripeCustomerId' query parameter." },
      { status: 400 }
    );
  }

  try {
    const customer = await prisma.customer.findUnique({
      where: { stripeCustomerId },
      include: {
        subscriptions: {
          where: { status: 'active' },
          orderBy: { currentPeriodEnd: 'desc' },
          take: 1,
        },
        invoices: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!customer) {
      return NextResponse.json(
        { error: `Customer with Stripe ID ${stripeCustomerId} not found.` },
        { status: 404 }
      );
    }

    const activeSub = customer.subscriptions[0];

    return NextResponse.json({
      id: customer.id,
      stripeCustomerId: customer.stripeCustomerId,
      email: customer.email,
      name: customer.name,
      createdAt: customer.createdAt,
      subscription: activeSub
        ? {
            tier: activeSub.tier,
            status: activeSub.status,
            currentPeriodEnd: activeSub.currentPeriodEnd,
          }
        : null,
      recentInvoices: customer.invoices.map((inv) => ({
        id: inv.id,
        stripeInvoiceId: inv.stripeInvoiceId,
        amount: inv.amount,
        status: inv.status,
        createdAt: inv.createdAt,
      })),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Fetch failed: ${message}` },
      { status: 500 }
    );
  }
}
