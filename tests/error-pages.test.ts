// Tests for the not-found page and error handling
import fs from 'fs';
import path from 'path';

const APP_DIR = path.join(__dirname, '..', 'src', 'app');

describe('error handling pages', () => {
  test('not-found.tsx exists', () => {
    expect(fs.existsSync(path.join(APP_DIR, 'not-found.tsx'))).toBe(true);
  });

  test('not-found page exports default component', () => {
    const content = fs.readFileSync(path.join(APP_DIR, 'not-found.tsx'), 'utf-8');
    expect(content).toContain('export default');
  });

  test('not-found page shows 404', () => {
    const content = fs.readFileSync(path.join(APP_DIR, 'not-found.tsx'), 'utf-8');
    expect(content).toContain('404');
  });

  test('not-found page has link back home', () => {
    const content = fs.readFileSync(path.join(APP_DIR, 'not-found.tsx'), 'utf-8');
    expect(content).toMatch(/href.*['"]\/['"]/);
  });

  test('not-found page mentions SecQA or has SecQA branding', () => {
    const content = fs.readFileSync(path.join(APP_DIR, 'not-found.tsx'), 'utf-8');
    // Should use primary color (emerald) or mention SecQA
    expect(content.toLowerCase()).toMatch(/secqa|primary/);
  });

  test('dashboard has error boundary (overview)', () => {
    expect(fs.existsSync(path.join(APP_DIR, 'dashboard', 'overview', 'error.tsx'))).toBe(true);
  });

  test('health endpoint exists for uptime monitoring', () => {
    expect(fs.existsSync(path.join(APP_DIR, 'api', 'health', 'route.ts'))).toBe(true);
  });

  test('test-error endpoint exists for Sentry verification', () => {
    expect(fs.existsSync(path.join(APP_DIR, 'api', 'test-error', 'route.ts'))).toBe(true);
  });

  test('test-error endpoint throws an error', () => {
    const content = fs.readFileSync(path.join(APP_DIR, 'api', 'test-error', 'route.ts'), 'utf-8');
    expect(content).toContain('throw');
    expect(content).toMatch(/Error|error/);
  });
});
