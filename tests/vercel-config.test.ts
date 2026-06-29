// Tests for the vercel.json configuration
import fs from 'fs';
import path from 'path';

const VERCEL_JSON = path.join(__dirname, '..', 'vercel.json');

describe('vercel.json', () => {
  test('vercel.json exists', () => {
    expect(fs.existsSync(VERCEL_JSON)).toBe(true);
  });

  test('vercel.json is valid JSON', () => {
    const content = fs.readFileSync(VERCEL_JSON, 'utf-8');
    expect(() => JSON.parse(content)).not.toThrow();
  });

  test('vercel.json specifies Next.js framework', () => {
    const content = fs.readFileSync(VERCEL_JSON, 'utf-8');
    const config = JSON.parse(content);
    expect(config.framework).toBe('nextjs');
  });

  test('vercel.json has build command', () => {
    const content = fs.readFileSync(VERCEL_JSON, 'utf-8');
    const config = JSON.parse(content);
    expect(config.buildCommand).toBeDefined();
    expect(config.buildCommand).toContain('npm run build');
  });

  test('vercel.json has function timeouts for long-running routes', () => {
    const content = fs.readFileSync(VERCEL_JSON, 'utf-8');
    const config = JSON.parse(content);
    expect(config.functions).toBeDefined();
    // /api/generate should have maxDuration (Claude API calls can take 30-60s)
    expect(config.functions['src/app/api/generate/route.ts']).toBeDefined();
    expect(config.functions['src/app/api/generate/route.ts'].maxDuration).toBeGreaterThanOrEqual(30);
  });

  test('vercel.json has webhook route timeout', () => {
    const content = fs.readFileSync(VERCEL_JSON, 'utf-8');
    const config = JSON.parse(content);
    expect(config.functions['src/app/api/stripe/webhook/route.ts']).toBeDefined();
  });

  test('vercel.json specifies install command with legacy-peer-deps', () => {
    const content = fs.readFileSync(VERCEL_JSON, 'utf-8');
    const config = JSON.parse(content);
    expect(config.installCommand).toContain('legacy-peer-deps');
  });
});
