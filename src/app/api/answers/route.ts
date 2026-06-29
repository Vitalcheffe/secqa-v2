import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const runtime = 'nodejs';

// GET /api/answers?customerId=<id>&framework=<framework>
// Returns all answers in the answer library
export async function GET(req: NextRequest) {
  const customerId = req.nextUrl.searchParams.get('customerId');
  const framework = req.nextUrl.searchParams.get('framework');

  if (!customerId) {
    return NextResponse.json(
      { error: "Missing 'customerId' query parameter." },
      { status: 400 }
    );
  }

  try {
    const where: { customerId: string; tags?: { contains: string } } = { customerId };
    if (framework) {
      where.tags = { contains: framework.toLowerCase() };
    }

    const answers = await prisma.answer.findMany({
      where,
      orderBy: { usageCount: 'desc' },
    });

    return NextResponse.json({
      customerId,
      count: answers.length,
      answers: answers.map((a) => ({
        id: a.id,
        questionPattern: a.questionPattern,
        answerText: a.answerText,
        tags: a.tags ? a.tags.split(',') : [],
        usageCount: a.usageCount,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
      })),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Failed to fetch answers: ${message}` },
      { status: 500 }
    );
  }
}

// POST /api/answers
// Creates a new answer in the library
export async function POST(req: NextRequest) {
  try {
    const { customerId, questionPattern, answerText, tags } = await req.json();

    if (!customerId || !questionPattern || !answerText) {
      return NextResponse.json(
        { error: "Missing required fields: customerId, questionPattern, answerText." },
        { status: 400 }
      );
    }

    const answer = await prisma.answer.create({
      data: {
        customerId,
        questionPattern,
        answerText,
        tags: Array.isArray(tags) ? tags.join(',') : tags,
      },
    });

    return NextResponse.json({
      id: answer.id,
      questionPattern: answer.questionPattern,
      createdAt: answer.createdAt,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Create failed: ${message}` },
      { status: 500 }
    );
  }
}
