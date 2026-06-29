import {
  embedText,
  cosineSimilarity,
  retrieveTopK,
  embedAnswerLibrary,
  type AnswerRecord,
} from "@/lib/rag";

describe("rag", () => {
  test("embedText returns 256-dimensional normalized vector", () => {
    const vec = embedText("Do you encrypt data at rest?");
    expect(vec.length).toBe(256);
    const norm = Math.sqrt(vec.reduce((s, v) => s + v * v, 0));
    expect(norm).toBeCloseTo(1, 5);
  });

  test("cosineSimilarity of identical vectors is 1", () => {
    const v = embedText("some test text");
    const sim = cosineSimilarity(v, v);
    expect(sim).toBeCloseTo(1, 5);
  });

  test("retrieveTopK returns most similar answers first", () => {
    const library: AnswerRecord[] = embedAnswerLibrary([
      {
        id: "a1",
        questionPattern: "Do you encrypt data at rest?",
        answerText: "Yes, we use AES-256 encryption for all data at rest.",
      },
      {
        id: "a2",
        questionPattern: "What is your data retention policy?",
        answerText: "We retain customer data for 90 days after account closure.",
      },
      {
        id: "a3",
        questionPattern: "Do you use multi-factor authentication?",
        answerText: "Yes, MFA is enforced for all admin accounts.",
      },
    ]);

    const results = retrieveTopK("Do you encrypt data at rest?", library, 3, 0);
    expect(results.length).toBeGreaterThan(0);
    // The exact-match query should retrieve the encryption answer in top 3
    const topIds = results.map((r) => r.answer.id);
    expect(topIds).toContain("a1");
  });

  test("retrieveTopK respects threshold", () => {
    const library: AnswerRecord[] = embedAnswerLibrary([
      {
        id: "a1",
        questionPattern: "encryption at rest",
        answerText: "AES-256",
      },
    ]);

    // Unrelated query with high threshold should return empty
    const results = retrieveTopK("company holiday party budget", library, 1, 0.99);
    expect(results.length).toBe(0);
  });

  test("embedAnswerLibrary populates embedding field", () => {
    const input: AnswerRecord[] = [
      { id: "1", questionPattern: "test question", answerText: "test answer" },
    ];
    const result = embedAnswerLibrary(input);
    expect(result[0].embedding).toBeDefined();
    expect(result[0].embedding!.length).toBe(256);
  });

  test("cosineSimilarity handles dimension mismatch", () => {
    expect(() => cosineSimilarity([1, 2, 3], [1, 2])).toThrow(/dimension/);
  });
});
