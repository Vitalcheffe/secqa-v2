// RAG (Retrieval-Augmented Generation) module for SecQA MVP
// Implements: text embedding (hash-based fallback), cosine similarity, top-K retrieval

import { createHash } from "crypto";

// Hash-based embedding fallback for MVP (no external API required)
// Produces a 256-dimensional sparse vector from text tokens
// Production should swap this for OpenAI text-embedding-3-small or similar
const EMBED_DIM = 256;

export function embedText(text: string): number[] {
  const tokens = tokenize(text);
  const vec = new Array(EMBED_DIM).fill(0);

  for (const token of tokens) {
    if (!token) continue;
    const hash = createHash("sha256").update(token.toLowerCase()).digest();
    // Use first 4 bytes of hash as index, next 4 bytes as weight
    for (let i = 0; i < 8; i++) {
      const idx = (hash[i * 2] << 8) | hash[i * 2 + 1];
      const bucket = idx % EMBED_DIM;
      const weight = (hash[i] % 100) / 100 - 0.5;
      vec[bucket] += weight;
    }
  }

  // L2 normalize
  const norm = Math.sqrt(vec.reduce((sum, v) => sum + v * v, 0));
  if (norm > 0) {
    for (let i = 0; i < EMBED_DIM; i++) {
      vec[i] /= norm;
    }
  }

  return vec;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error(`Vector dimension mismatch: ${a.length} vs ${b.length}`);
  }
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

export interface AnswerRecord {
  id: string;
  questionPattern: string;
  answerText: string;
  embedding?: number[];
}

export interface ScoredAnswer {
  answer: AnswerRecord;
  score: number;
}

export function retrieveTopK(
  query: string,
  library: AnswerRecord[],
  k: number = 5,
  threshold: number = 0.15
): ScoredAnswer[] {
  if (library.length === 0) return [];

  const queryVec = embedText(query);
  const scored: ScoredAnswer[] = library.map((ans) => {
    const ansVec = ans.embedding || embedText(ans.questionPattern + " " + ans.answerText);
    const score = cosineSimilarity(queryVec, ansVec);
    return { answer: ans, score };
  });

  return scored
    .filter((s) => s.score >= threshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}

export function embedAnswerLibrary(answers: AnswerRecord[]): AnswerRecord[] {
  return answers.map((a) => ({
    ...a,
    embedding: embedText(a.questionPattern + " " + a.answerText),
  }));
}

export function serializeEmbedding(vec: number[]): string {
  return JSON.stringify(vec);
}

export function deserializeEmbedding(s: string): number[] {
  try {
    return JSON.parse(s);
  } catch {
    return [];
  }
}
