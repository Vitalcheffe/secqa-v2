import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const runtime = 'nodejs';

// GET /api/questionnaires?customerId=<id>
// Returns all questionnaires for a customer
export async function GET(req: NextRequest) {
  const customerId = req.nextUrl.searchParams.get('customerId');

  if (!customerId) {
    return NextResponse.json(
      { error: "Missing 'customerId' query parameter." },
      { status: 400 }
    );
  }

  try {
    const questionnaires = await prisma.questionnaire.findMany({
      where: { customerId },
      include: {
        questions: {
          select: {
            id: true,
            questionText: true,
            status: true,
            confidenceScore: true,
          },
        },
      },
      orderBy: { uploadedAt: 'desc' },
    });

    return NextResponse.json({
      customerId,
      count: questionnaires.length,
      questionnaires: questionnaires.map((q) => ({
        id: q.id,
        fileName: q.fileName,
        status: q.status,
        uploadedAt: q.uploadedAt,
        questionCount: q.questions.length,
        approvedCount: q.questions.filter((qq) => qq.status === 'approved').length,
        avgConfidence:
          q.questions.length > 0
            ? q.questions.reduce((s, qq) => s + qq.confidenceScore, 0) / q.questions.length
            : 0,
      })),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Failed to fetch questionnaires: ${message}` },
      { status: 500 }
    );
  }
}

// DELETE /api/questionnaires?id=<id>
// Deletes a questionnaire and all its questions
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: "Missing 'id' query parameter." },
      { status: 400 }
    );
  }

  try {
    await prisma.questionnaire.delete({
      where: { id },
    });

    return NextResponse.json({ id, deleted: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        { error: `Questionnaire ${id} not found.` },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: `Delete failed: ${message}` },
      { status: 500 }
    );
  }
}
