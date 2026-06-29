import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const runtime = 'nodejs';

// GET /api/questionnaires/[id]
// Returns a single questionnaire with all its questions
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const questionnaire = await prisma.questionnaire.findUnique({
      where: { id },
      include: { questions: { orderBy: { questionText: 'asc' } } },
    });

    if (!questionnaire) {
      return NextResponse.json(
        { error: `Questionnaire ${id} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: questionnaire.id,
      customerId: questionnaire.customerId,
      status: questionnaire.status,
      uploadedAt: questionnaire.uploadedAt,
      fileName: questionnaire.fileName,
      questions: questionnaire.questions.map((q) => ({
        id: q.id,
        questionText: q.questionText,
        answerText: q.answerText,
        status: q.status,
        confidenceScore: q.confidenceScore,
        sourceAnswerId: q.sourceAnswerId,
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

// PATCH /api/questionnaires/[id]
// Updates questionnaire status (e.g., draft → review → approved)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const { status } = await req.json();

    if (!status || !['uploaded', 'parsed', 'generating', 'completed'].includes(status)) {
      return NextResponse.json(
        { error: "Invalid 'status'. Must be one of: uploaded, parsed, generating, completed." },
        { status: 400 }
      );
    }

    const updated = await prisma.questionnaire.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({
      id: updated.id,
      status: updated.status,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Update failed: ${message}` },
      { status: 500 }
    );
  }
}
