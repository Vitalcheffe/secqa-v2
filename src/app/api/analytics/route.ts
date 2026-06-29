import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const runtime = 'nodejs';

// GET /api/analytics?customerId=<id>&months=<n>
// Returns aggregate analytics for the dashboard
export async function GET(req: NextRequest) {
  const customerId = req.nextUrl.searchParams.get('customerId');
  const months = parseInt(req.nextUrl.searchParams.get('months') || '6', 10);

  if (!customerId) {
    return NextResponse.json(
      { error: "Missing 'customerId' query parameter." },
      { status: 400 }
    );
  }

  try {
    // Get total questionnaires
    const totalQuestionnaires = await prisma.questionnaire.count({
      where: { customerId },
    });

    // Get questionnaires in the last N months
    const since = new Date();
    since.setMonth(since.getMonth() - months);

    const recentQuestionnaires = await prisma.questionnaire.findMany({
      where: {
        customerId,
        uploadedAt: { gte: since },
      },
      include: {
        questions: {
          select: { confidenceScore: true, status: true },
        },
      },
    });

    // Calculate metrics
    const totalQuestions = recentQuestionnaires.reduce(
      (sum, q) => sum + q.questions.length,
      0
    );
    const avgConfidence =
      totalQuestions > 0
        ? recentQuestionnaires.reduce(
            (sum, q) => sum + q.questions.reduce((s, qq) => s + qq.confidenceScore, 0),
            0
          ) / totalQuestions
        : 0;

    // Assume 14h baseline per questionnaire, 90min actual = 12.5h saved per questionnaire
    const hoursSavedPerQuestionnaire = 12.5;
    const totalHoursSaved = recentQuestionnaires.length * hoursSavedPerQuestionnaire;
    const costPerHour = 120;
    const dollarSaved = totalHoursSaved * costPerHour;

    return NextResponse.json({
      customerId,
      period: { months, since: since.toISOString() },
      metrics: {
        totalQuestionnaires,
        recentQuestionnaires: recentQuestionnaires.length,
        totalQuestions,
        avgConfidence: Number(avgConfidence.toFixed(4)),
        hoursSaved: totalHoursSaved,
        dollarSaved,
        costPerHour,
      },
      questionnaires: recentQuestionnaires.map((q) => ({
        id: q.id,
        uploadedAt: q.uploadedAt,
        questionCount: q.questions.length,
        avgConfidence:
          q.questions.length > 0
            ? q.questions.reduce((s, qq) => s + qq.confidenceScore, 0) / q.questions.length
            : 0,
      })),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Analytics fetch failed: ${message}` },
      { status: 500 }
    );
  }
}
