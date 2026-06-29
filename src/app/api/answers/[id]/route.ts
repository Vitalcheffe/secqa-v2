import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const runtime = 'nodejs';

// GET /api/answers/[id]
// Returns a single answer
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const answer = await prisma.answer.findUnique({ where: { id } });

    if (!answer) {
      return NextResponse.json(
        { error: `Answer ${id} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: answer.id,
      customerId: answer.customerId,
      questionPattern: answer.questionPattern,
      answerText: answer.answerText,
      tags: answer.tags ? answer.tags.split(',') : [],
      usageCount: answer.usageCount,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Fetch failed: ${message}` },
      { status: 500 }
    );
  }
}

// PUT /api/answers/[id]
// Updates an existing answer
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const { questionPattern, answerText, tags } = await req.json();

    const updated = await prisma.answer.update({
      where: { id },
      data: {
        ...(questionPattern && { questionPattern }),
        ...(answerText && { answerText }),
        ...(tags && { tags: Array.isArray(tags) ? tags.join(',') : tags }),
      },
    });

    return NextResponse.json({
      id: updated.id,
      updatedAt: updated.updatedAt,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Update failed: ${message}` },
      { status: 500 }
    );
  }
}

// DELETE /api/answers/[id]
// Deletes an answer from the library
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await prisma.answer.delete({ where: { id } });
    return NextResponse.json({ id, deleted: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        { error: `Answer ${id} not found.` },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: `Delete failed: ${message}` },
      { status: 500 }
    );
  }
}
