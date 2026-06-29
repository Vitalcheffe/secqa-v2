// Tests for API routes structure and exports
// Validates that all API routes export HTTP methods

import fs from 'fs';
import path from 'path';

const API_DIR = path.join(__dirname, '..', 'src', 'app', 'api');

function getAllApiRoutes(dir: string, base = ''): string[] {
  const routes: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(base, entry.name);

    if (entry.isDirectory()) {
      routes.push(...getAllApiRoutes(fullPath, relativePath));
    } else if (entry.name === 'route.ts') {
      routes.push(relativePath);
    }
  }

  return routes;
}

describe('API routes structure', () => {
  test('at least 10 API routes exist', () => {
    const routes = getAllApiRoutes(API_DIR);
    expect(routes.length).toBeGreaterThanOrEqual(10);
  });

  test('all 5 core SecQA API routes exist', () => {
    const requiredRoutes = ['parse', 'generate', 'cite', 'export', 'integrate'];
    for (const route of requiredRoutes) {
      const routePath = path.join(API_DIR, route, 'route.ts');
      expect(fs.existsSync(routePath)).toBe(true);
    }
  });

  test('all 3 Stripe API routes exist', () => {
    const stripeRoutes = ['checkout', 'webhook', 'portal'];
    for (const route of stripeRoutes) {
      const routePath = path.join(API_DIR, 'stripe', route, 'route.ts');
      expect(fs.existsSync(routePath)).toBe(true);
    }
  });

  test('health endpoint exists', () => {
    const healthPath = path.join(API_DIR, 'health', 'route.ts');
    expect(fs.existsSync(healthPath)).toBe(true);
  });

  test('test-error endpoint exists (for Sentry verification)', () => {
    const testErrorPath = path.join(API_DIR, 'test-error', 'route.ts');
    expect(fs.existsSync(testErrorPath)).toBe(true);
  });

  test('each route exports at least one HTTP method', () => {
    const routes = getAllApiRoutes(API_DIR);
    for (const route of routes) {
      const fullPath = path.join(API_DIR, route);
      const content = fs.readFileSync(fullPath, 'utf-8');
      const hasHttpMethod = /\bexport (async )?function (GET|POST|PUT|DELETE|PATCH)\b/.test(content);
      expect(hasHttpMethod).toBe(true);
    }
  });

  test('webhook route uses raw body for signature verification', () => {
    const webhookPath = path.join(API_DIR, 'stripe', 'webhook', 'route.ts');
    const content = fs.readFileSync(webhookPath, 'utf-8');
    expect(content).toContain('req.text()');
    expect(content).toContain('stripe-signature');
    expect(content).toMatch(/constructEvent|verifyWebhookSignature/);
  });

  test('SecQA API routes (parse, generate, etc.) use nodejs runtime', () => {
    const secqaRoutes = ['parse', 'generate', 'cite', 'export', 'integrate'];
    for (const route of secqaRoutes) {
      const routePath = path.join(API_DIR, route, 'route.ts');
      const content = fs.readFileSync(routePath, 'utf-8');
      expect(content).toMatch(/runtime\s*=\s*['"]nodejs['"]/);
    }
  });
});
