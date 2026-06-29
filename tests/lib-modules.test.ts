// Tests for the lib modules structure
import fs from 'fs';
import path from 'path';

const LIB_DIR = path.join(__dirname, '..', 'src', 'lib');

describe('lib modules', () => {
  test('all 6 required lib modules exist', () => {
    const required = ['db.ts', 'claude.ts', 'rag.ts', 'parser.ts', 'stripe.ts', 'auth.ts'];
    for (const file of required) {
      expect(fs.existsSync(path.join(LIB_DIR, file))).toBe(true);
    }
  });

  test('db.ts exports prisma client', () => {
    const content = fs.readFileSync(path.join(LIB_DIR, 'db.ts'), 'utf-8');
    expect(content).toContain('PrismaClient');
    expect(content).toContain('export');
  });

  test('claude.ts uses Claude 3.5 Haiku model', () => {
    const content = fs.readFileSync(path.join(LIB_DIR, 'claude.ts'), 'utf-8');
    expect(content).toMatch(/claude-3-5-haiku|claude-haiku/i);
  });

  test('claude.ts has error handling', () => {
    const content = fs.readFileSync(path.join(LIB_DIR, 'claude.ts'), 'utf-8');
    expect(content).toContain('try');
    expect(content).toContain('catch');
  });

  test('rag.ts has embedding function', () => {
    const content = fs.readFileSync(path.join(LIB_DIR, 'rag.ts'), 'utf-8');
    expect(content).toMatch(/embedText|embed/i);
  });

  test('rag.ts has cosine similarity function', () => {
    const content = fs.readFileSync(path.join(LIB_DIR, 'rag.ts'), 'utf-8');
    expect(content).toContain('cosineSimilarity');
  });

  test('rag.ts has retrieveTopK function', () => {
    const content = fs.readFileSync(path.join(LIB_DIR, 'rag.ts'), 'utf-8');
    expect(content).toContain('retrieveTopK');
  });

  test('parser.ts supports PDF parsing', () => {
    const content = fs.readFileSync(path.join(LIB_DIR, 'parser.ts'), 'utf-8');
    expect(content).toMatch(/pdf-parse|pdfParse/i);
  });

  test('parser.ts supports DOCX parsing', () => {
    const content = fs.readFileSync(path.join(LIB_DIR, 'parser.ts'), 'utf-8');
    expect(content).toContain('mammoth');
  });

  test('parser.ts supports CSV parsing', () => {
    const content = fs.readFileSync(path.join(LIB_DIR, 'parser.ts'), 'utf-8');
    expect(content).toContain('csv-parse');
  });

  test('stripe.ts has checkout session creation', () => {
    const content = fs.readFileSync(path.join(LIB_DIR, 'stripe.ts'), 'utf-8');
    expect(content).toContain('createCheckoutSession');
  });

  test('stripe.ts has webhook signature verification', () => {
    const content = fs.readFileSync(path.join(LIB_DIR, 'stripe.ts'), 'utf-8');
    expect(content).toContain('verifyWebhookSignature');
  });

  test('stripe.ts has customer portal session', () => {
    const content = fs.readFileSync(path.join(LIB_DIR, 'stripe.ts'), 'utf-8');
    expect(content).toContain('createCustomerPortalSession');
  });

  test('auth.ts has subscription check function', () => {
    const content = fs.readFileSync(path.join(LIB_DIR, 'auth.ts'), 'utf-8');
    expect(content).toContain('hasActiveSubscription');
  });

  test('auth.ts has customer context function', () => {
    const content = fs.readFileSync(path.join(LIB_DIR, 'auth.ts'), 'utf-8');
    expect(content).toContain('getCustomerContext');
  });

  test('pdf-parse type declaration exists', () => {
    expect(fs.existsSync(path.join(__dirname, '..', 'src', 'types', 'pdf-parse.d.ts'))).toBe(true);
  });
});
