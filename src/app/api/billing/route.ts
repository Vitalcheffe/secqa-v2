import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const runtime = 'nodejs';

// GET /api/billing?customerId=<id>
// Returns billing history and current subscription
export async function GET(req: NextRequest) {
  const customerId = req.nextUrl.searchParams.get('customerId');

  if (!customerId) {
    return NextResponse.json(
      { error: "Missing 'customerId' query parameter." },
      { status: 400 }
    );
  }

  try {
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        subscriptions: {
          orderBy: { createdAt: 'desc' },
        },
        invoices: {
          orderBy: { createdAt: 'desc' },
          take: 24, // Last 2 years of monthly invoices
        },
      },
    });

    if (!customer) {
      return NextResponse.json(
        { error: `Customer ${customerId} not found.` },
        { status: 404 }
      );
    }

    const activeSub = customer.subscriptions.find((s) => s.status === 'active');

    return NextResponse.json({
      customerId: customer.id,
      email: customer.email,
      currentSubscription: activeSub
        ? {
            tier: activeSub.tier,
            status: activeSub.status,
            currentPeriodEnd: activeSub.currentPeriodEnd,
            stripeSubscriptionId: activeSub.stripeSubscriptionId,
          }
        : null,
      invoices: customer.invoices.map((inv) => ({
        id: inv.id,
        stripeInvoiceId: inv.stripeInvoiceId,
        amount: inv.amount,
        amountFormatted: `$${(inv.amount / 100).toFixed(2)}`,
        status: inv.status,
        createdAt: inv.createdAt,
      })),
      totalPaid: customer.invoices
        .filter((i) => i.status === 'paid')
        .reduce((sum, inv) => sum + inv.amount, 0),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Billing fetch failed: ${message}` },
      { status: 500 }
    );
  }
}
