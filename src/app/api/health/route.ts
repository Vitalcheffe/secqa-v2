import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const runtime = 'nodejs';

// GET /api/health
// Health check endpoint for uptime monitoring (UptimeRobot, BetterStack, etc.)
export async function GET() {
  const startTime = Date.now();

  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: 'connected',
      responseTimeMs: Date.now() - startTime,
      version: '2.0.0',
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        error: message,
        responseTimeMs: Date.now() - startTime,
        version: '2.0.0',
      },
      { status: 503 }
    );
  }
}
