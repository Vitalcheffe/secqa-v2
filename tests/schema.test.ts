// Tests for the Prisma schema
import fs from 'fs';
import path from 'path';

const SCHEMA_PATH = path.join(__dirname, '..', 'prisma', 'schema.prisma');

describe('Prisma schema', () => {
  test('schema.prisma exists', () => {
    expect(fs.existsSync(SCHEMA_PATH)).toBe(true);
  });

  test('schema uses postgresql provider', () => {
    const content = fs.readFileSync(SCHEMA_PATH, 'utf-8');
    expect(content).toMatch(/provider\s*=\s*['"]postgresql['"]/);
  });

  test('schema has all 7 required models', () => {
    const content = fs.readFileSync(SCHEMA_PATH, 'utf-8');
    const requiredModels = [
      'Questionnaire', 'Question', 'Answer', 'Export',
      'Customer', 'Subscription', 'Invoice'
    ];
    for (const model of requiredModels) {
      expect(content).toMatch(new RegExp(`^model ${model} `, 'm'));
    }
  });

  test('Questionnaire model has required fields', () => {
    const content = fs.readFileSync(SCHEMA_PATH, 'utf-8');
    expect(content).toContain('customerId');
    expect(content).toContain('uploadedAt');
    expect(content).toContain('status');
    expect(content).toContain('rawText');
  });

  test('Question model has required fields', () => {
    const content = fs.readFileSync(SCHEMA_PATH, 'utf-8');
    expect(content).toContain('questionText');
    expect(content).toContain('answerText');
    expect(content).toContain('confidenceScore');
  });

  test('Customer model has Stripe customer ID', () => {
    const content = fs.readFileSync(SCHEMA_PATH, 'utf-8');
    expect(content).toContain('stripeCustomerId');
    expect(content).toContain('@unique');
  });

  test('Subscription model has tier and status', () => {
    const content = fs.readFileSync(SCHEMA_PATH, 'utf-8');
    expect(content).toContain('tier');
    expect(content).toContain('currentPeriodEnd');
  });

  test('Customer has relations to Subscription and Invoice', () => {
    const content = fs.readFileSync(SCHEMA_PATH, 'utf-8');
    // Check that Customer model has Subscription[] and Invoice[] relations
    const customerMatch = content.match(/model Customer \{[\s\S]*?\}/);
    expect(customerMatch).toBeTruthy();
    expect(customerMatch![0]).toContain('Subscription[]');
    expect(customerMatch![0]).toContain('Invoice[]');
  });

  test('schema has appropriate indexes', () => {
    const content = fs.readFileSync(SCHEMA_PATH, 'utf-8');
    expect(content).toContain('@@index');
  });
});
