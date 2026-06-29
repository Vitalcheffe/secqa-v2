import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { writeFileSync, mkdirSync } from "fs";
import path from "path";

export const runtime = "nodejs";

const EXPORTS_DIR = path.join(process.cwd(), "exports");

// POST /api/export
// Body: { questionnaireId: string, format: "pdf" | "docx" | "csv" }
// Generates a downloadable file with questions and drafted answers
export async function POST(req: NextRequest) {
  try {
    const { questionnaireId, format } = await req.json();
    if (!questionnaireId) {
      return NextResponse.json(
        { error: "Missing 'questionnaireId' in body." },
        { status: 400 }
      );
    }
    if (!format || !["pdf", "docx", "csv"].includes(format)) {
      return NextResponse.json(
        { error: "Invalid 'format'. Must be one of: pdf, docx, csv." },
        { status: 400 }
      );
    }

    const questionnaire = await prisma.questionnaire.findUnique({
      where: { id: questionnaireId },
      include: { questions: { orderBy: { questionText: "asc" } } },
    });

    if (!questionnaire) {
      return NextResponse.json(
        { error: `Questionnaire ${questionnaireId} not found.` },
        { status: 404 }
      );
    }

    // Ensure exports directory exists
    try {
      mkdirSync(EXPORTS_DIR, { recursive: true });
    } catch {
      // Directory may already exist
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `questionnaire-${questionnaireId.slice(-8)}-${timestamp}.${format}`;
    const filePath = path.join(EXPORTS_DIR, fileName);

    let fileContent: string;
    let mimeType: string;

    if (format === "csv") {
      fileContent = generateCSV(questionnaire.questions);
      mimeType = "text/csv";
    } else if (format === "docx") {
      // Simplified DOCX as HTML wrapper (real DOCX requires docx library; MVP uses HTML)
      fileContent = generateHTML(questionnaire, "docx");
      mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    } else {
      // PDF as HTML wrapper (real PDF requires pdfkit; MVP uses HTML for preview)
      fileContent = generateHTML(questionnaire, "pdf");
      mimeType = "text/html";
    }

    writeFileSync(filePath, fileContent, "utf-8");

    const exportRecord = await prisma.export.create({
      data: {
        questionnaireId,
        format,
        fileUrl: `/api/export/download?file=${encodeURIComponent(fileName)}`,
      },
    });

    return NextResponse.json({
      exportId: exportRecord.id,
      format,
      fileUrl: exportRecord.fileUrl,
      fileName,
      questionCount: questionnaire.questions.length,
      mimeType,
      generatedAt: exportRecord.createdAt,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Export failed: ${message}` },
      { status: 500 }
    );
  }
}

function generateCSV(questions: Array<{ questionText: string; answerText: string | null; confidenceScore: number; status: string }>): string {
  const header = "Index,Question,Answer,Confidence,Status\n";
  const rows = questions
    .map((q, i) => {
      const question = escapeCSV(q.questionText);
      const answer = escapeCSV(q.answerText || "");
      return `${i + 1},${question},${answer},${q.confidenceScore.toFixed(3)},${q.status}`;
    })
    .join("\n");
  return header + rows + "\n";
}

function escapeCSV(s: string): string {
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function generateHTML(
  questionnaire: { id: string; fileName: string | null; uploadedAt: Date; questions: Array<{ questionText: string; answerText: string | null; confidenceScore: number }> },
  format: string
): string {
  const questions = questionnaire.questions
    .map(
      (q, i) => `
    <div style="margin-bottom: 24px; page-break-inside: avoid;">
      <div style="font-weight: bold; color: #1e40af; margin-bottom: 4px;">Q${i + 1}.</div>
      <div style="margin-bottom: 8px;">${escapeHTML(q.questionText)}</div>
      <div style="background: #f0f9ff; padding: 12px; border-left: 3px solid #2563eb; border-radius: 4px;">
        <div style="font-size: 11px; color: #64748b; margin-bottom: 4px;">ANSWER (confidence: ${(q.confidenceScore * 100).toFixed(0)}%)</div>
        <div>${escapeHTML(q.answerText || "[No answer drafted yet]")}</div>
      </div>
    </div>`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Security Questionnaire Response — ${escapeHTML(questionnaire.fileName || questionnaire.id)}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #0f172a; }
    h1 { color: #1e40af; border-bottom: 2px solid #2563eb; padding-bottom: 8px; }
    .meta { color: #64748b; font-size: 13px; margin-bottom: 24px; }
  </style>
</head>
<body>
  <h1>Security Questionnaire Response</h1>
  <div class="meta">
    Source: ${escapeHTML(questionnaire.fileName || "uploaded document")}<br>
    Generated: ${new Date().toLocaleString()}<br>
    Format: ${format.toUpperCase()}
  </div>
  ${questions}
</body>
</html>`;
}

function escapeHTML(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// GET /api/export?questionnaireId=<id>
// Lists all exports for a questionnaire
export async function GET(req: NextRequest) {
  const questionnaireId = req.nextUrl.searchParams.get("questionnaireId");
  if (!questionnaireId) {
    return NextResponse.json(
      { error: "Missing 'questionnaireId' query parameter." },
      { status: 400 }
    );
  }

  const exports = await prisma.export.findMany({
    where: { questionnaireId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    questionnaireId,
    exports: exports.map((e) => ({
      id: e.id,
      format: e.format,
      fileUrl: e.fileUrl,
      createdAt: e.createdAt,
    })),
  });
}
