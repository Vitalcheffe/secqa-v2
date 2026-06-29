import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { retrieveTopK, embedAnswerLibrary, embedText, type AnswerRecord } from "@/lib/rag";

export const runtime = "nodejs";

// GET /api/cite?questionnaireId=<id>
// Returns source citations for all drafted answers in the questionnaire
export async function GET(req: NextRequest) {
  try {
    const questionnaireId = req.nextUrl.searchParams.get("questionnaireId");
    if (!questionnaireId) {
      return NextResponse.json(
        { error: "Missing 'questionnaireId' query parameter." },
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

    // Load answer library
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

    const citations = [];
    for (const question of questionnaire.questions) {
      let sourceAnswerId = question.sourceAnswerId;
      let sourceQuestionPattern = "";
      let similarityScore = question.confidenceScore;

      // If no stored source, recompute similarity for citation transparency
      if (!sourceAnswerId && library.length > 0) {
        const topK = retrieveTopK(question.questionText, library, 1, 0.05);
        if (topK.length > 0) {
          sourceAnswerId = topK[0].answer.id;
          sourceQuestionPattern = topK[0].answer.questionPattern;
          similarityScore = topK[0].score;
        }
      } else if (sourceAnswerId) {
        const source = answers.find((a) => a.id === sourceAnswerId);
        if (source) {
          sourceQuestionPattern = source.questionPattern;
          // Recompute similarity for display
          const qVec = embedText(question.questionText);
          const aVec = embedText(source.questionPattern + " " + source.answerText);
          const { cosineSimilarity } = await import("@/lib/rag");
          similarityScore = cosineSimilarity(qVec, aVec);
        }
      }

      citations.push({
        questionId: question.id,
        questionText: question.questionText,
        answerText: question.answerText || "",
        sourceAnswerId,
        sourceQuestionPattern,
        similarityScore: Number(similarityScore.toFixed(4)),
        confidence: question.confidenceScore,
      });
    }

    const summary = {
      totalQuestions: citations.length,
      withSource: citations.filter((c) => c.sourceAnswerId).length,
      avgSimilarity:
        citations.length > 0
          ? Number(
              (citations.reduce((s, c) => s + c.similarityScore, 0) / citations.length).toFixed(4)
            )
          : 0,
      highConfidence: citations.filter((c) => c.similarityScore >= 0.5).length,
    };

    return NextResponse.json({ questionnaireId, citations, summary });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Citation lookup failed: ${message}` },
      { status: 500 }
    );
  }
}

// POST /api/cite
// Body: { questionId: string, sourceAnswerId: string }
// Manually links a question to a different source answer (champion override)
export async function POST(req: NextRequest) {
  try {
    const { questionId, sourceAnswerId } = await req.json();
    if (!questionId || !sourceAnswerId) {
      return NextResponse.json(
        { error: "Missing 'questionId' or 'sourceAnswerId' in body." },
        { status: 400 }
      );
    }

    const question = await prisma.question.findUnique({ where: { id: questionId } });
    if (!question) {
      return NextResponse.json(
        { error: `Question ${questionId} not found.` },
        { status: 404 }
      );
    }

    const sourceAnswer = await prisma.answer.findUnique({ where: { id: sourceAnswerId } });
    if (!sourceAnswer) {
      return NextResponse.json(
        { error: `Source answer ${sourceAnswerId} not found.` },
        { status: 404 }
      );
    }

    // Recompute similarity score for the new pairing
    const qVec = embedText(question.questionText);
    const aVec = embedText(sourceAnswer.questionPattern + " " + sourceAnswer.answerText);
    const { cosineSimilarity } = await import("@/lib/rag");
    const score = cosineSimilarity(qVec, aVec);

    const updated = await prisma.question.update({
      where: { id: questionId },
      data: {
        sourceAnswerId,
        confidenceScore: score,
      },
    });

    return NextResponse.json({
      questionId: updated.id,
      sourceAnswerId: updated.sourceAnswerId,
      newConfidenceScore: Number(score.toFixed(4)),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Citation update failed: ${message}` },
      { status: 500 }
    );
  }
}
