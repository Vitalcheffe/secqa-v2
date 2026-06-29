import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

// GET /api/settings
// Returns user settings (placeholder — in production this would query a Settings table)
export async function GET(req: NextRequest) {
  // In production, fetch from a Settings table keyed by user ID
  // For MVP, return default settings
  return NextResponse.json({
    profile: {
      name: 'Amine Harchel Korane',
      email: 'founder@secqa.example',
      role: 'Owner',
    },
    notifications: {
      draftReady: 'email+slack',
      weeklySummary: 'email',
      securityAlerts: 'email+slack',
    },
    security: {
      twoFactorEnabled: true,
      activeSessions: 2,
      lastLogin: new Date().toISOString(),
    },
    billing: {
      plan: 'pro',
      price: 99,
      period: 'monthly',
      founding: true,
      paymentMethod: 'visa-4242',
      nextInvoice: new Date(Date.now() + 30 * 86400 * 1000).toISOString(),
    },
    integrations: {
      slack: { connected: true, channel: '#security-reviews' },
      hubspot: { connected: true, dealPipeline: 'default' },
      notion: { connected: false },
      github: { connected: false },
    },
  });
}

// PUT /api/settings
// Updates user settings
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    // In production, validate and save to a Settings table
    // For MVP, just echo back the received settings
    return NextResponse.json({
      updated: true,
      received: body,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Settings update failed: ${message}` },
      { status: 500 }
    );
  }
}
