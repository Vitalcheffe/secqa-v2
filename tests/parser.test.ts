import { parseDocument, validateParseResult } from "@/lib/parser";

describe("parser", () => {
  test("parses CSV with question column", async () => {
    const csv = `Index,Question,Answer
1,"Do you have SOC2 Type 2?","Yes, completed 2024"
2,"What is your data retention policy?","90 days"
3,"Do you encrypt data at rest?","Yes, AES-256"`;
    const buffer = Buffer.from(csv, "utf-8");
    const result = await parseDocument(buffer, "test.csv");

    expect(result.format).toBe("csv");
    expect(result.questions.length).toBe(3);
    expect(result.questions[0].questionText).toContain("SOC2");
    expect(result.questions[2].answerHint).toContain("AES-256");
  });

  test("parses numbered text questions", async () => {
    const text = `Section 1: Access Control

1. Do you enforce multi-factor authentication for all admin accounts?
2. How often are access logs reviewed?

Section 2: Encryption

3. What encryption algorithm is used for data at rest?
4. Are TLS 1.2 or higher enforced for data in transit?`;
    const buffer = Buffer.from(text, "utf-8");
    const result = await parseDocument(buffer, "test.txt");

    expect(result.format).toBe("txt");
    expect(result.questions.length).toBe(4);
    expect(result.questions[0].questionText).toContain("multi-factor");
    expect(result.questions[2].section).toContain("Encryption");
  });

  test("validates empty document", async () => {
    const buffer = Buffer.from("", "utf-8");
    const result = await parseDocument(buffer, "empty.txt");
    const validation = validateParseResult(result);

    expect(validation.valid).toBe(false);
    expect(validation.errors.length).toBeGreaterThan(0);
  });

  test("extracts section headers correctly", async () => {
    const text = `SECURITY CONTROLS

1. Do you have a firewall?
2. Do you use IDS/IPS?

COMPLIANCE

3. Are you SOC2 compliant?
4. Are you ISO 27001 certified?`;
    const buffer = Buffer.from(text, "utf-8");
    const result = await parseDocument(buffer, "test.txt");

    expect(result.questions.length).toBe(4);
    expect(result.questions[0].section).toContain("SECURITY");
    expect(result.questions[2].section).toContain("COMPLIANCE");
  });

  test("handles malformed CSV gracefully", async () => {
    const malformed = `Question,Answer
"Unclosed quote, this is broken
row2, "another answer"`;
    const buffer = Buffer.from(malformed, "utf-8");
    const result = await parseDocument(buffer, "broken.csv");

    // Should not throw — returns what it can
    expect(result.format).toBe("csv");
    expect(result.metadata.wordCount).toBeGreaterThanOrEqual(0);
  });
});
