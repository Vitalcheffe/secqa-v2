// Tests for page components existence and structure
// Validates that all key pages export a valid React component

import fs from 'fs';
import path from 'path';

const PAGES_DIR = path.join(__dirname, '..', 'src', 'app');

function getAllPages(dir: string, base = ''): string[] {
  const pages: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(base, entry.name);

    if (entry.isDirectory()) {
      pages.push(...getAllPages(fullPath, relativePath));
    } else if (entry.name === 'page.tsx') {
      pages.push(relativePath);
    }
  }

  return pages;
}

describe('pages structure', () => {
  test('all page files exist and are non-empty', () => {
    const pages = getAllPages(PAGES_DIR);
    expect(pages.length).toBeGreaterThan(30);

    for (const page of pages) {
      const fullPath = path.join(PAGES_DIR, page);
      const stat = fs.statSync(fullPath);
      expect(stat.size).toBeGreaterThan(50); // At least 50 bytes
    }
  });

  test('homepage page.tsx exports a default component', () => {
    const homepage = fs.readFileSync(path.join(PAGES_DIR, 'page.tsx'), 'utf-8');
    expect(homepage).toContain('export default');
  });

  test('pricing page exports a default component', () => {
    const pricing = fs.readFileSync(path.join(PAGES_DIR, 'pricing', 'page.tsx'), 'utf-8');
    expect(pricing).toContain('export default');
  });

  test('all legal pages exist', () => {
    const legalPages = ['terms', 'privacy', 'security', 'dpa', 'acceptable-use', 'responsible-disclosure', 'trademark'];
    for (const legal of legalPages) {
      const legalPath = path.join(PAGES_DIR, 'legal', legal, 'page.tsx');
      expect(fs.existsSync(legalPath)).toBe(true);
    }
  });

  test('all comparison pages exist', () => {
    const comparePages = ['secqa-vs-vanta', 'secqa-vs-conveyor', 'secqa-vs-drata', 'secqa-vs-secureframe', 'secqa-vs-loopio'];
    for (const compare of comparePages) {
      const comparePath = path.join(PAGES_DIR, 'compare', compare, 'page.tsx');
      expect(fs.existsSync(comparePath)).toBe(true);
    }
  });

  test('at least 20 integration pages exist', () => {
    const integrationsDir = path.join(PAGES_DIR, 'integrations');
    const entries = fs.readdirSync(integrationsDir, { withFileTypes: true });
    const integrationFolders = entries.filter(e => e.isDirectory() && e.name !== 'page.tsx');
    expect(integrationFolders.length).toBeGreaterThanOrEqual(20);
  });

  test('dashboard has at least 10 sub-pages', () => {
    const dashboardDir = path.join(PAGES_DIR, 'dashboard');
    const pages = getAllPages(dashboardDir);
    expect(pages.length).toBeGreaterThanOrEqual(10);
  });

  test('not-found page exists', () => {
    const notFoundPath = path.join(PAGES_DIR, 'not-found.tsx');
    expect(fs.existsSync(notFoundPath)).toBe(true);
  });

  test('sitemap.ts and robots.ts exist for SEO', () => {
    expect(fs.existsSync(path.join(PAGES_DIR, 'sitemap.ts'))).toBe(true);
    expect(fs.existsSync(path.join(PAGES_DIR, 'robots.ts'))).toBe(true);
  });
});
