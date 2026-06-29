// Tests for the new SecQA API routes structure
// Validates that all 11 new routes exist and export HTTP methods

import fs from 'fs';
import path from 'path';

const API_DIR = path.join(__dirname, '..', 'src', 'app', 'api');

describe('SecQA v2 API routes', () => {
  test('questionnaires CRUD routes exist', () => {
    expect(fs.existsSync(path.join(API_DIR, 'questionnaires', 'route.ts'))).toBe(true);
    expect(fs.existsSync(path.join(API_DIR, 'questionnaires', '[id]', 'route.ts'))).toBe(true);
  });

  test('answers CRUD routes exist', () => {
    expect(fs.existsSync(path.join(API_DIR, 'answers', 'route.ts'))).toBe(true);
    expect(fs.existsSync(path.join(API_DIR, 'answers', '[id]', 'route.ts'))).toBe(true);
  });

  test('integrations route exists', () => {
    expect(fs.existsSync(path.join(API_DIR, 'integrations', 'route.ts'))).toBe(true);
  });

  test('customers route exists', () => {
    expect(fs.existsSync(path.join(API_DIR, 'customers', 'route.ts'))).toBe(true);
  });

  test('billing route exists', () => {
    expect(fs.existsSync(path.join(API_DIR, 'billing', 'route.ts'))).toBe(true);
  });

  test('webhooks route exists', () => {
    expect(fs.existsSync(path.join(API_DIR, 'webhooks', 'route.ts'))).toBe(true);
  });

  test('audit-log route exists', () => {
    expect(fs.existsSync(path.join(API_DIR, 'audit-log', 'route.ts'))).toBe(true);
  });

  test('analytics route exists', () => {
    expect(fs.existsSync(path.join(API_DIR, 'analytics', 'route.ts'))).toBe(true);
  });

  test('settings route exists', () => {
    expect(fs.existsSync(path.join(API_DIR, 'settings', 'route.ts'))).toBe(true);
  });

  test('total API route count is 25+', () => {
    function countRoutes(dir: string): number {
      let count = 0;
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          count += countRoutes(fullPath);
        } else if (entry.name === 'route.ts') {
          count += 1;
        }
      }
      return count;
    }
    const total = countRoutes(API_DIR);
    expect(total).toBeGreaterThanOrEqual(25);
  });

  test('all new routes export at least one HTTP method', () => {
    const newRoutes = [
      'questionnaires/route.ts',
      'questionnaires/[id]/route.ts',
      'answers/route.ts',
      'answers/[id]/route.ts',
      'integrations/route.ts',
      'customers/route.ts',
      'billing/route.ts',
      'webhooks/route.ts',
      'audit-log/route.ts',
      'analytics/route.ts',
      'settings/route.ts',
    ];

    for (const route of newRoutes) {
      const content = fs.readFileSync(path.join(API_DIR, route), 'utf-8');
      expect(content).toMatch(/\bexport (async )?function (GET|POST|PUT|PATCH|DELETE)\b/);
    }
  });

  test('all new routes use nodejs runtime', () => {
    const newRoutes = [
      'questionnaires/route.ts',
      'questionnaires/[id]/route.ts',
      'answers/route.ts',
      'answers/[id]/route.ts',
      'integrations/route.ts',
      'customers/route.ts',
      'billing/route.ts',
      'webhooks/route.ts',
      'audit-log/route.ts',
      'analytics/route.ts',
      'settings/route.ts',
    ];

    for (const route of newRoutes) {
      const content = fs.readFileSync(path.join(API_DIR, route), 'utf-8');
      expect(content).toMatch(/runtime\s*=\s*['"]nodejs['"]/);
    }
  });
});
