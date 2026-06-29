// Tests for the auth (login/signup) pages
import fs from 'fs';
import path from 'path';

const APP_DIR = path.join(__dirname, '..', 'src', 'app');

describe('authentication pages', () => {
  test('sign-in page exists', () => {
    expect(fs.existsSync(path.join(APP_DIR, 'auth', 'sign-in', '[[...sign-in]]', 'page.tsx'))).toBe(true);
  });

  test('sign-up page exists', () => {
    expect(fs.existsSync(path.join(APP_DIR, 'auth', 'sign-up', '[[...sign-up]]', 'page.tsx'))).toBe(true);
  });

  test('auth layout exists', () => {
    expect(fs.existsSync(path.join(APP_DIR, 'auth', 'layout.tsx'))).toBe(true);
  });

  test('proxy.ts exists for Clerk middleware', () => {
    expect(fs.existsSync(path.join(__dirname, '..', 'src', 'proxy.ts'))).toBe(true);
  });

  test('proxy.ts protects /dashboard routes', () => {
    const content = fs.readFileSync(path.join(__dirname, '..', 'src', 'proxy.ts'), 'utf-8');
    expect(content).toContain('/dashboard');
    expect(content).toContain('auth.protect');
  });

  test('proxy.ts allows public API routes (webhook, health, test-error)', () => {
    const content = fs.readFileSync(path.join(__dirname, '..', 'src', 'proxy.ts'), 'utf-8');
    expect(content).toContain('/api/stripe/webhook');
    expect(content).toContain('/api/test-error');
    expect(content).toContain('/api/health');
  });

  test('no duplicate /login or /signup pages (use /auth/* instead)', () => {
    expect(fs.existsSync(path.join(APP_DIR, 'login', 'page.tsx'))).toBe(false);
    expect(fs.existsSync(path.join(APP_DIR, 'signup', 'page.tsx'))).toBe(false);
  });
});
