// Questionnaire parser for SecQA MVP
// Supports PDF (pdf-parse, lazy-loaded to avoid its test-file side effect),
// DOCX (mammoth), and CSV (csv-parse) inputs
// Extracts structured Question[] from raw documents

import mammoth from "mammoth";
import { parse as parseCSV } from "csv-parse/sync";

// pdf-parse v1.1.1 auto-loads ./test/data/05-versions-space.pdf at import time,
// which breaks serverless builds. Lazy-load it inside the function instead.
type PdfParseFn = (buffer: Buffer) => Promise<{ text: string; numpages: number }>;
let pdfParseCached: PdfParseFn | null = null;
async function getPdfParse(): Promise<PdfParseFn> {
  if (!pdfParseCached) {
    // Use dynamic require with a guard so the test file path doesn't break builds
    const mod = require("pdf-parse");
    pdfParseCached = mod.default || mod;
  }
  // Non-null assertion: pdfParseCached is guaranteed set after the if block
  return pdfParseCached!;
}

export interface ParsedQuestion {
  index: number;
  questionText: string;
  section?: string;
  context?: string;
  answerHint?: string;
}

export interface ParseResult {
  questions: ParsedQuestion[];
  rawText: string;
  format: "pdf" | "docx" | "csv" | "txt";
  metadata: {
    pageCount?: number;
    wordCount: number;
    parseTimeMs: number;
  };
}

const QUESTION_PATTERNS = [
  /^\s*(\d+)[\.\)]\s+(.+)/,
  /^\s*Q(\d+)[\:\.\)]\s+(.+)/,
  /^\s*([A-Z][\d]+)[\.\)]\s+(.+)/,
  /^\s*Question\s+(\d+)[\:\.]?\s+(.+)/i,
  /^\s*([\d\.]+)\s+(.+)/,
];

const SECTION_PATTERNS = [
  /^\s*Section\s+\d+/i,
  /^\s*Part\s+[A-Z]/i,
  /^\s*[A-Z][A-Z\s]{4,}$/,
];

export async function parseDocument(
  buffer: Buffer,
  fileName: string
): Promise<ParseResult> {
  const start = Date.now();
  const ext = fileName.toLowerCase().split(".").pop() || "txt";

  let rawText: string;
  let format: ParseResult["format"];
  let pageCount: number | undefined;

  switch (ext) {
    case "pdf":
      const pdfParse = await getPdfParse();
      const pdfResult = await pdfParse(buffer);
      rawText = pdfResult.text;
      format = "pdf";
      pageCount = pdfResult.numpages;
      break;
    case "docx":
      const docxResult = await mammoth.extractRawText({ buffer });
      rawText = docxResult.value;
      format = "docx";
      break;
    case "csv":
      rawText = buffer.toString("utf-8");
      format = "csv";
      break;
    case "txt":
      rawText = buffer.toString("utf-8");
      format = "txt";
      break;
    default:
      // Try CSV first, then fall back to text
      try {
        const csvTest = parseCSV(buffer.toString("utf-8"), { skip_empty_lines: true });
        if (csvTest.length > 0 && Array.isArray(csvTest[0])) {
          rawText = buffer.toString("utf-8");
          format = "csv";
        } else {
          throw new Error("not csv");
        }
      } catch {
        rawText = buffer.toString("utf-8");
        format = "txt";
      }
  }

  const questions = extractQuestions(rawText, format);

  return {
    questions,
    rawText,
    format,
    metadata: {
      pageCount,
      wordCount: rawText.split(/\s+/).filter(Boolean).length,
      parseTimeMs: Date.now() - start,
    },
  };
}

function extractQuestions(text: string, format: ParseResult["format"]): ParsedQuestion[] {
  if (format === "csv") {
    return extractFromCSV(text);
  }
  return extractFromText(text);
}

function extractFromCSV(text: string): ParsedQuestion[] {
  let rows: string[][] = [];
  try {
    rows = parseCSV(text, { skip_empty_lines: true, relax_column_count: true });
  } catch (err) {
    return [];
  }

  if (rows.length < 2) return [];

  const header = rows[0].map((h) => h.toLowerCase().trim());
  const qCol = header.findIndex((h) =>
    ["question", "prompt", "item", "control"].some((k) => h.includes(k))
  );
  const answerCol = header.findIndex((h) =>
    ["answer", "response", "reply"].some((k) => h.includes(k))
  );
  const sectionCol = header.findIndex((h) =>
    ["section", "category", "domain"].some((k) => h.includes(k))
  );

  const questions: ParsedQuestion[] = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length === 0) continue;
    const qText = qCol >= 0 ? (row[qCol] || "").trim() : row[0]?.trim() || "";
    if (!qText) continue;
    questions.push({
      index: i,
      questionText: qText,
      section: sectionCol >= 0 ? (row[sectionCol] || "").trim() : undefined,
      answerHint: answerCol >= 0 ? (row[answerCol] || "").trim() : undefined,
    });
  }

  return questions;
}

function extractFromText(text: string): ParsedQuestion[] {
  const lines = text.split(/\r?\n/);
  const questions: ParsedQuestion[] = [];
  let currentSection: string | undefined;
  let pendingContext: string | undefined;
  let qIndex = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const sectionMatch = SECTION_PATTERNS.find((p) => p.test(trimmed));
    if (sectionMatch) {
      currentSection = trimmed;
      continue;
    }

    let matched = false;
    for (const pattern of QUESTION_PATTERNS) {
      const match = trimmed.match(pattern);
      if (match) {
        qIndex++;
        questions.push({
          index: qIndex,
          questionText: match[2].trim(),
          section: currentSection,
          context: pendingContext,
        });
        pendingContext = undefined;
        matched = true;
        break;
      }
    }

    if (!matched && trimmed.length > 20 && trimmed.length < 300 && !trimmed.endsWith(":")) {
      pendingContext = trimmed;
    }
  }

  return questions;
}

export function validateParseResult(result: ParseResult): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (result.questions.length === 0) {
    errors.push("No questions detected. Check document format.");
  }
  if (result.metadata.wordCount < 10) {
    errors.push("Document too short. Might be empty or corrupted.");
  }
  if (result.format === "pdf" && (result.metadata.pageCount || 0) === 0) {
    errors.push("PDF has 0 pages. Might be scanned image without OCR.");
  }
  return { valid: errors.length === 0, errors };
}
