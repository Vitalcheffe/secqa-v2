import Anthropic from "@anthropic-ai/sdk";

// Claude API wrapper for security questionnaire answer generation
// Uses Claude 3.5 Haiku for cost-efficient RAG-augmented drafting

const MODEL = "claude-3-5-haiku-20241022";

const SYSTEM_PROMPT = `You are a security questionnaire response expert for B2B SaaS companies.
Your job is to draft accurate, specific, and defensible answers to security questions
based on the company's previously approved answers and SOC2 evidence.

Rules:
1. Only use information provided in the context. Do not fabricate compliance facts.
2. If the context does not contain enough information, mark confidence as 0.3 or lower.
3. Match the tone and detail level of the closest matching past answer.
4. Keep answers under 200 words unless the question explicitly asks for more.
5. Cite the source answer ID in your response as [Source: <id>].
6. If the question is about a control you cannot verify, say so explicitly.`;

const USER_PROMPT_TEMPLATE = `Draft an answer to the following security questionnaire question.

QUESTION:
{question}

CONTEXT FROM PAST APPROVED ANSWERS (most relevant first):
{context}

ADDITIONAL COMPANY INFO (SOC2 evidence summary):
{companyInfo}

Respond in this exact JSON format:
{{
  "answer": "<your drafted answer, under 200 words>",
  "confidence": <0.0 to 1.0>,
  "sourceAnswerId": "<id of the most relevant past answer, or null>",
  "notes": "<any caveats or follow-ups needed>"
}}`;

let client: Anthropic | null = null;

function getClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Add it to .env.local to enable Claude API calls."
    );
  }
  if (!client) {
    client = new Anthropic({ apiKey });
  }
  return client;
}

export interface DraftAnswerInput {
  question: string;
  context: Array<{ id: string; questionPattern: string; answerText: string }>;
  companyInfo?: string;
}

export interface DraftAnswerOutput {
  answer: string;
  confidence: number;
  sourceAnswerId: string | null;
  notes: string;
}

export async function draftAnswer(input: DraftAnswerInput): Promise<DraftAnswerOutput> {
  const anthropic = getClient();

  const contextBlock = input.context
    .map(
      (c, i) =>
        `[${i + 1}] ID: ${c.id}\nQ: ${c.questionPattern}\nA: ${c.answerText}`
    )
    .join("\n\n");

  const userPrompt = USER_PROMPT_TEMPLATE
    .replace("{question}", input.question)
    .replace("{context}", contextBlock || "No matching past answers found.")
    .replace("{companyInfo}", input.companyInfo || "No additional company info provided.");

  try {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const text = response.content
      .filter((c) => c.type === "text")
      .map((c) => (c as { type: "text"; text: string }).text)
      .join("");

    const parsed = JSON.parse(text) as DraftAnswerOutput;
    return {
      answer: parsed.answer || "",
      confidence: typeof parsed.confidence === "number" ? parsed.confidence : 0.5,
      sourceAnswerId: parsed.sourceAnswerId || null,
      notes: parsed.notes || "",
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("API key")) {
      throw new Error(`Claude API authentication failed: ${message}`);
    }
    if (message.includes("rate_limit")) {
      throw new Error(`Claude rate limit hit. Retry after 60 seconds. Original: ${message}`);
    }
    if (message.includes("JSON")) {
      throw new Error(`Claude returned malformed JSON. Retry with simpler context. Original: ${message}`);
    }
    throw new Error(`Claude API call failed: ${message}`);
  }
}

export async function draftBatchAnswers(
  questions: string[],
  contextRetriever: (q: string) => DraftAnswerInput["context"]
): Promise<DraftAnswerOutput[]> {
  const results: DraftAnswerOutput[] = [];
  for (const q of questions) {
    const context = contextRetriever(q);
    const draft = await draftAnswer({ question: q, context });
    results.push(draft);
  }
  return results;
}

export { MODEL as CLAUDE_MODEL };
