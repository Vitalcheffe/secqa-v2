import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { draftAnswer } from "@/lib/claude";
import { retrieveTopK, embedAnswerLibrary, type AnswerRecord } from "@/lib/rag";

export const runtime = "nodejs";

// POST /api/generate
// Body: { questionnaireId: string }
// Generates draft answers for all pending questions in the questionnaire
export async function POST(req: NextRequest) {
  try {
    const { questionnaireId } = await req.json();
    if (!questionnaireId) {
      return NextResponse.json(
        { error: "Missing 'questionnaireId' in request body." },
        { status: 400 }
      );
    }

    const questionnaire = await prisma.questionnaire.findUnique({
      where: { id: questionnaireId },
      include: { questions: true },
    });

    if (!questionnaire) {
      return NextResponse.json(
        { error: `Questionnaire ${questionnaireId} not found.` },
        { status: 404 }
      );
    }

    await prisma.questionnaire.update({
      where: { id: questionnaireId },
      data: { status: "generating" },
    });

    // Load answer library for RAG retrieval
    const answers = await prisma.answer.findMany({
      where: { customerId: questionnaire.customerId },
    });
    const library: AnswerRecord[] = embedAnswerLibrary(
      answers.map((a) => ({
        id: a.id,
        questionPattern: a.questionPattern,
        answerText: a.answerText,
      }))
    );

    const pendingQuestions = questionnaire.questions.filter(
      (q) => q.status === "pending" || q.status === "draft"
    );

    const drafts = [];
    for (const question of pendingQuestions) {
      const context = retrieveTopK(question.questionText, library, 5, 0.1);

      let draft;
      if (process.env.ANTHROPIC_API_KEY) {
        try {
          draft = await draftAnswer({
            question: question.questionText,
            context: context.map((c) => ({
              id: c.answer.id,
              questionPattern: c.answer.questionPattern,
              answerText: c.answer.answerText,
            })),
          });
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          draft = {
            answer: `Failed to generate via Claude: ${msg}`,
            confidence: 0,
            sourceAnswerId: context[0]?.answer.id || null,
            notes: "Claude API call failed. Manual review required.",
          };
        }
      } else {
        // Fallback when no API key: use top matching past answer directly
        const topMatch = context[0];
        draft = {
          answer: topMatch
            ? `[DEMO MODE — no API key] Reused past answer: ${topMatch.answer.answerText.slice(0, 500)}`
            : "[DEMO MODE — no API key] No matching past answer found. Add ANTHROPIC_API_KEY for full generation.",
          confidence: topMatch ? topMatch.score : 0,
          sourceAnswerId: topMatch?.answer.id || null,
          notes: "Demo mode without Claude API. Set ANTHROPIC_API_KEY for real generation.",
        };
      }

      await prisma.question.update({
        where: { id: question.id },
        data: {
          answerText: draft.answer,
          confidenceScore: draft.confidence,
          sourceAnswerId: draft.sourceAnswerId,
          status: "draft",
        },
      });

      // Increment usage count on source answer
      if (draft.sourceAnswerId) {
        await prisma.answer.update({
          where: { id: draft.sourceAnswerId },
          data: { usageCount: { increment: 1 } },
        });
      }

      drafts.push({
        questionId: question.id,
        questionText: question.questionText,
        answerText: draft.answer,
        confidence: draft.confidence,
        sourceAnswerId: draft.sourceAnswerId,
        status: "draft",
      });
    }

    await prisma.questionnaire.update({
      where: { id: questionnaireId },
      data: { status: "completed" },
    });

    return NextResponse.json({
      questionnaireId,
      draftsGenerated: drafts.length,
      drafts,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Generation failed: ${message}` },
      { status: 500 }
    );
  }
}
