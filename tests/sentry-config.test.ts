// Tests for Sentry configuration files
import fs from 'fs';
import path from 'path';

const ROOT = path.join(__dirname, '..');

describe('Sentry configuration', () => {
  test('sentry.client.config.ts exists', () => {
    expect(fs.existsSync(path.join(ROOT, 'sentry.client.config.ts'))).toBe(true);
  });

  test('sentry.server.config.ts exists', () => {
    expect(fs.existsSync(path.join(ROOT, 'sentry.server.config.ts'))).toBe(true);
  });

  test('sentry.edge.config.ts exists', () => {
    expect(fs.existsSync(path.join(ROOT, 'sentry.edge.config.ts'))).toBe(true);
  });

  test('instrumentation.ts exists', () => {
    expect(fs.existsSync(path.join(ROOT, 'instrumentation.ts'))).toBe(true);
  });

  test('all Sentry configs reference SENTRY_DSN', () => {
    const configs = ['sentry.client.config.ts', 'sentry.server.config.ts', 'sentry.edge.config.ts'];
    for (const cfg of configs) {
      const content = fs.readFileSync(path.join(ROOT, cfg), 'utf-8');
      expect(content).toMatch(/SENTRY_DSN|NEXT_PUBLIC_SENTRY_DSN/);
    }
  });

  test('all Sentry configs set tracesSampleRate', () => {
    const configs = ['sentry.client.config.ts', 'sentry.server.config.ts', 'sentry.edge.config.ts'];
    for (const cfg of configs) {
      const content = fs.readFileSync(path.join(ROOT, cfg), 'utf-8');
      expect(content).toContain('tracesSampleRate');
      expect(content).toMatch(/0\.\d+/); // A decimal number like 0.1
    }
  });

  test('client config has tracePropagationTargets', () => {
    const content = fs.readFileSync(path.join(ROOT, 'sentry.client.config.ts'), 'utf-8');
    expect(content).toContain('tracePropagationTargets');
  });

  test('server config captures unhandled rejections', () => {
    const content = fs.readFileSync(path.join(ROOT, 'sentry.server.config.ts'), 'utf-8');
    expect(content).toContain('unhandledRejection');
  });

  test('instrumentation.ts registers server and edge configs', () => {
    const content = fs.readFileSync(path.join(ROOT, 'instrumentation.ts'), 'utf-8');
    expect(content).toContain('sentry.server.config');
    expect(content).toContain('sentry.edge.config');
  });

  test('test-error route exists for Sentry verification', () => {
    const testErrorPath = path.join(ROOT, 'src', 'app', 'api', 'test-error', 'route.ts');
    expect(fs.existsSync(testErrorPath)).toBe(true);
    const content = fs.readFileSync(testErrorPath, 'utf-8');
    expect(content).toContain('throw');
    expect(content).toMatch(/Error|error/);
  });
});
