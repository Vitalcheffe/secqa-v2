import { NextRequest, NextResponse } from "next/server";
import { parseDocument, validateParseResult } from "@/lib/parser";
import prisma from "@/lib/db";

export const runtime = "nodejs";

// POST /api/parse
// Accepts multipart file upload, parses PDF/DOCX/CSV, stores questionnaire + questions
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const customerId = (formData.get("customerId") as string) || "demo-customer";

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded. Include a 'file' field in the multipart form." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name || "questionnaire.pdf";

    if (buffer.length === 0) {
      return NextResponse.json(
        { error: "Uploaded file is empty." },
        { status: 400 }
      );
    }

    if (buffer.length > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Max 10MB." },
        { status: 413 }
      );
    }

    const parseResult = await parseDocument(buffer, fileName);
    const validation = validateParseResult(parseResult);

    if (!validation.valid && parseResult.questions.length === 0) {
      return NextResponse.json(
        {
          error: "Could not extract any questions from the document.",
          details: validation.errors,
          format: parseResult.format,
          wordCount: parseResult.metadata.wordCount,
        },
        { status: 422 }
      );
    }

    const questionnaire = await prisma.questionnaire.create({
      data: {
        customerId,
        rawText: parseResult.rawText.slice(0, 500000),
        parsedJson: JSON.stringify({
          format: parseResult.format,
          metadata: parseResult.metadata,
          questionCount: parseResult.questions.length,
        }),
        fileName,
        status: "parsed",
        questions: {
          create: parseResult.questions.map((q) => ({
            questionText: q.questionText,
            status: "pending",
          })),
        },
      },
      include: { questions: true },
    });

    return NextResponse.json({
      questionnaireId: questionnaire.id,
      questionCount: parseResult.questions.length,
      format: parseResult.format,
      wordCount: parseResult.metadata.wordCount,
      parseTimeMs: parseResult.metadata.parseTimeMs,
      pageCount: parseResult.metadata.pageCount,
      warnings: validation.errors,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("Invalid PDF") || message.includes("pdf-parse")) {
      return NextResponse.json(
        { error: "PDF parsing failed. File may be corrupted or scanned without OCR." },
        { status: 422 }
      );
    }
    if (message.includes("mammoth") || message.includes("docx")) {
      return NextResponse.json(
        { error: "DOCX parsing failed. File may be corrupted." },
        { status: 422 }
      );
    }
    return NextResponse.json(
      { error: `Parse failed: ${message}` },
      { status: 500 }
    );
  }
}

// GET /api/parse?id=<questionnaireId>
// Returns metadata and parsed question list for a stored questionnaire
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { error: "Missing 'id' query parameter." },
      { status: 400 }
    );
  }

  const questionnaire = await prisma.questionnaire.findUnique({
    where: { id },
    include: { questions: { orderBy: { questionText: "asc" } } },
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
      status: q.status,
      confidenceScore: q.confidenceScore,
    })),
  });
}
