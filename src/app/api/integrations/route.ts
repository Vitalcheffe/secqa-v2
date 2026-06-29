import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

// GET /api/integrations
// Returns all available integrations and their connection status
export async function GET(req: NextRequest) {
  const customerId = req.nextUrl.searchParams.get('customerId');

  const INTEGRATIONS = [
    { slug: 'slack', name: 'Slack', category: 'Communication', connected: true, status: 'active' },
    { slug: 'notion', name: 'Notion', category: 'Documentation', connected: false, status: 'available' },
    { slug: 'hubspot', name: 'HubSpot', category: 'CRM', connected: true, status: 'active' },
    { slug: 'salesforce', name: 'Salesforce', category: 'CRM', connected: false, status: 'requires-scale-tier' },
    { slug: 'linear', name: 'Linear', category: 'Project Management', connected: false, status: 'available' },
    { slug: 'jira', name: 'Jira', category: 'Project Management', connected: false, status: 'available' },
    { slug: 'github', name: 'GitHub', category: 'Code', connected: false, status: 'available' },
    { slug: 'vercel', name: 'Vercel', category: 'Code', connected: false, status: 'available' },
    { slug: 'aws', name: 'AWS', category: 'Cloud', connected: false, status: 'available' },
    { slug: 'okta', name: 'Okta', category: 'Auth', connected: false, status: 'available' },
    { slug: 'auth0', name: 'Auth0', category: 'Auth', connected: false, status: 'available' },
    { slug: 'google-workspace', name: 'Google Workspace', category: 'Auth', connected: false, status: 'available' },
    { slug: 'datadog', name: 'Datadog', category: 'Monitoring', connected: false, status: 'available' },
    { slug: 'sentry', name: 'Sentry', category: 'Monitoring', connected: true, status: 'active' },
    { slug: 'stripe', name: 'Stripe', category: 'Billing', connected: true, status: 'active' },
    { slug: 'resend', name: 'Resend', category: 'Email', connected: false, status: 'available' },
    { slug: 'postgres', name: 'Postgres', category: 'Data', connected: true, status: 'active' },
    { slug: 'snowflake', name: 'Snowflake', category: 'Data', connected: false, status: 'available' },
    { slug: 'clerk', name: 'Clerk', category: 'Auth', connected: true, status: 'active' },
    { slug: 'mailchimp', name: 'Mailchimp', category: 'Email', connected: false, status: 'available' },
  ];

  return NextResponse.json({
    customerId: customerId || 'demo-customer',
    total: INTEGRATIONS.length,
    connected: INTEGRATIONS.filter((i) => i.connected).length,
    integrations: INTEGRATIONS,
  });
}

// POST /api/integrations
// Connects a new integration
export async function POST(req: NextRequest) {
  try {
    const { slug, credentials } = await req.json();

    if (!slug) {
      return NextResponse.json(
        { error: "Missing 'slug' in request body." },
        { status: 400 }
      );
    }

    // In production, validate credentials and store them encrypted
    // For MVP, just acknowledge the connection
    return NextResponse.json({
      slug,
      connected: true,
      connectedAt: new Date().toISOString(),
      message: `Integration ${slug} connected successfully.`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Connection failed: ${message}` },
      { status: 500 }
    );
  }
}
