// Tests for the .env.example file
import fs from 'fs';
import path from 'path';

const ENV_EXAMPLE = path.join(__dirname, '..', '.env.example');

describe('environment variables template', () => {
  test('.env.example exists', () => {
    expect(fs.existsSync(ENV_EXAMPLE)).toBe(true);
  });

  test('contains all required core variables', () => {
    const content = fs.readFileSync(ENV_EXAMPLE, 'utf-8');
    const required = [
      'ANTHROPIC_API_KEY',
      'DATABASE_URL',
      'NEXT_PUBLIC_APP_URL',
    ];
    for (const v of required) {
      expect(content).toContain(v);
    }
  });

  test('contains Clerk auth variables', () => {
    const content = fs.readFileSync(ENV_EXAMPLE, 'utf-8');
    expect(content).toContain('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY');
    expect(content).toContain('CLERK_SECRET_KEY');
  });

  test('contains all 6 Stripe price variables', () => {
    const content = fs.readFileSync(ENV_EXAMPLE, 'utf-8');
    const stripePrices = [
      'STRIPE_PRICE_STARTER_MONTHLY',
      'STRIPE_PRICE_STARTER_ANNUAL',
      'STRIPE_PRICE_PRO_MONTHLY',
      'STRIPE_PRICE_PRO_ANNUAL',
      'STRIPE_PRICE_SCALE_MONTHLY',
      'STRIPE_PRICE_SCALE_ANNUAL',
    ];
    for (const p of stripePrices) {
      expect(content).toContain(p);
    }
  });

  test('contains Stripe webhook secret', () => {
    const content = fs.readFileSync(ENV_EXAMPLE, 'utf-8');
    expect(content).toContain('STRIPE_WEBHOOK_SECRET');
  });

  test('contains Sentry DSN variables', () => {
    const content = fs.readFileSync(ENV_EXAMPLE, 'utf-8');
    expect(content).toContain('SENTRY_DSN');
    expect(content).toContain('NEXT_PUBLIC_SENTRY_DSN');
  });

  test('contains integration variables (Slack, Notion)', () => {
    const content = fs.readFileSync(ENV_EXAMPLE, 'utf-8');
    expect(content).toContain('SLACK_WEBHOOK_URL');
    expect(content).toContain('NOTION_API_KEY');
  });

  test('DATABASE_URL uses postgresql:// scheme', () => {
    const content = fs.readFileSync(ENV_EXAMPLE, 'utf-8');
    expect(content).toContain('postgresql://');
  });

  test('does not contain actual secrets (only empty values)', () => {
    const content = fs.readFileSync(ENV_EXAMPLE, 'utf-8');
    // Check that no line has a real-looking API key (sk-, ghp_, pk_live, etc.)
    const lines = content.split('\n');
    for (const line of lines) {
      if (line.includes('=') && !line.startsWith('#')) {
        const value = line.split('=')[1];
        // Value should be empty or a placeholder, not a real key
        expect(value).not.toMatch(/^(sk-|ghp_|pk_live_|sk_live_|whsec_)/);
      }
    }
  });
});
