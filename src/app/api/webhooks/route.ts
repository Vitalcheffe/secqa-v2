import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

// GET /api/webhooks
// Lists all configured webhooks (Slack, Notion, custom)
export async function GET(req: NextRequest) {
  // In production, fetch from a Webhooks table
  // For MVP, return configured webhooks from environment
  const webhooks = [];

  if (process.env.SLACK_WEBHOOK_URL) {
    webhooks.push({
      id: 'wh_slack',
      type: 'slack',
      url: process.env.SLACK_WEBHOOK_URL.replace(/\/[^/]+$/, '/***'),
      events: ['questionnaire.draft_ready', 'questionnaire.approved', 'questionnaire.rejected'],
      active: true,
    });
  }

  if (process.env.NOTION_API_KEY) {
    webhooks.push({
      id: 'wh_notion',
      type: 'notion',
      apiKey: 'secret_***',
      events: ['questionnaire.completed'],
      active: true,
    });
  }

  return NextResponse.json({
    total: webhooks.length,
    webhooks,
  });
}

// POST /api/webhooks
// Tests a webhook by sending a test payload
export async function POST(req: NextRequest) {
  try {
    const { type, url } = await req.json();

    if (!type || !url) {
      return NextResponse.json(
        { error: "Missing 'type' or 'url' in request body." },
        { status: 400 }
      );
    }

    // Test the webhook
    const testPayload = {
      text: 'SecQA webhook test — connection successful.',
      timestamp: new Date().toISOString(),
      source: 'secqa-mvp',
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPayload),
    });

    return NextResponse.json({
      type,
      success: response.ok,
      statusCode: response.status,
      testedAt: new Date().toISOString(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Webhook test failed: ${message}` },
      { status: 500 }
    );
  }
}
