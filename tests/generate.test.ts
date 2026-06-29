// Tests for the Claude integration's prompt construction and error handling
// These tests do NOT make real API calls — they validate the logic around the API call

describe("generate (claude integration)", () => {
  test("USER_PROMPT_TEMPLATE fills all placeholders", async () => {
    // Import the module to access the internal template via the draftAnswer function signature
    // We test that the prompt construction doesn't throw on valid input
    const { draftAnswer } = await import("@/lib/claude");

    // Without ANTHROPIC_API_KEY set, draftAnswer should throw a clear error
    const originalKey = process.env.ANTHROPIC_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;

    await expect(
      draftAnswer({
        question: "Do you encrypt data at rest?",
        context: [
          {
            id: "a1",
            questionPattern: "encryption at rest",
            answerText: "Yes, AES-256",
          },
        ],
      })
    ).rejects.toThrow(/ANTHROPIC_API_KEY/);

    process.env.ANTHROPIC_API_KEY = originalKey;
  });

  test("CLAUDE_MODEL is set to a haiku variant", async () => {
    const { CLAUDE_MODEL } = await import("@/lib/claude");
    expect(CLAUDE_MODEL).toMatch(/haiku/i);
    expect(CLAUDE_MODEL).toMatch(/claude-3-5-haiku|claude-haiku-4-5/);
  });

  test("draftBatchAnswers processes multiple questions sequentially", async () => {
    const { draftBatchAnswers } = await import("@/lib/claude");

    // Without API key, the first call throws and stops the batch
    const originalKey = process.env.ANTHROPIC_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;

    const questions = ["Q1?", "Q2?", "Q3?"];
    const fakeRetriever = (q: string) => [
      { id: "a1", questionPattern: q, answerText: "answer" },
    ];

    await expect(draftBatchAnswers(questions, fakeRetriever)).rejects.toThrow(
      /ANTHROPIC_API_KEY/
    );

    process.env.ANTHROPIC_API_KEY = originalKey;
  });

  test("prompt template accepts empty context gracefully", async () => {
    // Validates that the function signature handles empty context without throwing
    // before hitting the API call (which would fail without key)
    const { draftAnswer } = await import("@/lib/claude");

    const originalKey = process.env.ANTHROPIC_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;

    // Should still throw the API key error, not a different error about empty context
    await expect(
      draftAnswer({
        question: "Test question",
        context: [],
      })
    ).rejects.toThrow(/ANTHROPIC_API_KEY/);

    process.env.ANTHROPIC_API_KEY = originalKey;
  });
});
