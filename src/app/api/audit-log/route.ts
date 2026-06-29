import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const runtime = 'nodejs';

// GET /api/audit-log?customerId=<id>&limit=<n>
// Returns audit log events (placeholder — in production this would query an AuditEvent table)
export async function GET(req: NextRequest) {
  const customerId = req.nextUrl.searchParams.get('customerId');
  const limit = parseInt(req.nextUrl.searchParams.get('limit') || '50', 10);

  if (!customerId) {
    return NextResponse.json(
      { error: "Missing 'customerId' query parameter." },
      { status: 400 }
    );
  }

  // In production, this would query an AuditEvent table
  // For MVP, return sample events
  const sampleEvents = [
    { id: 'evt_001', timestamp: new Date().toISOString(), actor: 'founder@secqa.example', action: 'questionnaire.uploaded', resource: 'q_001', severity: 'info' },
    { id: 'evt_002', timestamp: new Date(Date.now() - 3600000).toISOString(), actor: 'founder@secqa.example', action: 'answer.generated', resource: 'q_001 q47', severity: 'info' },
    { id: 'evt_003', timestamp: new Date(Date.now() - 7200000).toISOString(), actor: 'system', action: 'subscription.renewed', resource: 'sub_001', severity: 'success' },
  ];

  return NextResponse.json({
    customerId,
    count: sampleEvents.length,
    events: sampleEvents.slice(0, limit),
  });
}
