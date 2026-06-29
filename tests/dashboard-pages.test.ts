// Tests for dashboard pages structure
import fs from 'fs';
import path from 'path';

const DASHBOARD_DIR = path.join(__dirname, '..', 'src', 'app', 'dashboard');

describe('dashboard pages', () => {
  test('dashboard overview page exists', () => {
    expect(fs.existsSync(path.join(DASHBOARD_DIR, 'overview', 'layout.tsx'))).toBe(true);
  });

  test('dashboard questionnaires page exists', () => {
    expect(fs.existsSync(path.join(DASHBOARD_DIR, 'questionnaires', 'page.tsx'))).toBe(true);
  });

  test('dashboard answers page exists', () => {
    expect(fs.existsSync(path.join(DASHBOARD_DIR, 'answers', 'page.tsx'))).toBe(true);
  });

  test('dashboard analytics page exists', () => {
    expect(fs.existsSync(path.join(DASHBOARD_DIR, 'analytics', 'page.tsx'))).toBe(true);
  });

  test('dashboard settings page exists', () => {
    expect(fs.existsSync(path.join(DASHBOARD_DIR, 'settings', 'page.tsx'))).toBe(true);
  });

  test('dashboard audit-log page exists', () => {
    expect(fs.existsSync(path.join(DASHBOARD_DIR, 'audit-log', 'page.tsx'))).toBe(true);
  });

  test('dashboard billing page exists', () => {
    expect(fs.existsSync(path.join(DASHBOARD_DIR, 'billing', 'page.tsx'))).toBe(true);
  });

  test('dashboard kanban page exists', () => {
    expect(fs.existsSync(path.join(DASHBOARD_DIR, 'kanban', 'page.tsx'))).toBe(true);
  });

  test('dashboard has at least 12 sub-pages', () => {
    function countPages(dir: string): number {
      let count = 0;
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          count += countPages(fullPath);
        } else if (entry.name === 'page.tsx') {
          count += 1;
        }
      }
      return count;
    }
    expect(countPages(DASHBOARD_DIR)).toBeGreaterThanOrEqual(12);
  });

  test('questionnaires page has status filter logic', () => {
    const content = fs.readFileSync(path.join(DASHBOARD_DIR, 'questionnaires', 'page.tsx'), 'utf-8');
    expect(content).toContain('draft');
    expect(content).toContain('approved');
    expect(content).toContain('rejected');
  });

  test('analytics page has ROI calculation', () => {
    const content = fs.readFileSync(path.join(DASHBOARD_DIR, 'analytics', 'page.tsx'), 'utf-8');
    expect(content).toMatch(/ROI|roi/i);
    expect(content).toMatch(/\$20,160|53,760|990/);
  });

  test('audit-log page has severity levels', () => {
    const content = fs.readFileSync(path.join(DASHBOARD_DIR, 'audit-log', 'page.tsx'), 'utf-8');
    expect(content).toContain('info');
    expect(content).toContain('warning');
    expect(content).toContain('error');
  });
});
