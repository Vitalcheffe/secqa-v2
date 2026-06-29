import { NextResponse } from "next/server";

export const runtime = "nodejs";

// GET /api/test-error
// Throws an explicit error to verify Sentry capture is working
// Used for Day 8 verification — should appear in Sentry dashboard when DSN is set
export async function GET() {
  throw new Error("Sentry test error - Day 8 verification");
}

// POST /api/test-error
// Same trigger via POST for flexibility
export async function POST() {
  throw new Error("Sentry test error - Day 8 verification (POST)");
}
