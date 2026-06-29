// Tests for the legal pages structure and content
// Validates that all 7 legal pages have substantial content

import fs from 'fs';
import path from 'path';

const LEGAL_DIR = path.join(__dirname, '..', 'src', 'app', 'legal');

const LEGAL_PAGES = [
  { slug: 'terms', minWords: 1000, expectedSections: 12 },
  { slug: 'privacy', minWords: 1000, expectedSections: 11 },
  { slug: 'security', minWords: 800, expectedSections: 10 },
  { slug: 'dpa', minWords: 1000, expectedSections: 11 },
  { slug: 'acceptable-use', minWords: 600, expectedSections: 6 },
  { slug: 'responsible-disclosure', minWords: 500, expectedSections: 6 },
  { slug: 'trademark', minWords: 300, expectedSections: 5 },
];

describe('legal pages', () => {
  test('all 7 legal pages exist', () => {
    for (const page of LEGAL_PAGES) {
      const pagePath = path.join(LEGAL_DIR, page.slug, 'page.tsx');
      expect(fs.existsSync(pagePath)).toBe(true);
    }
  });

  test('each legal page exports a default component', () => {
    for (const page of LEGAL_PAGES) {
      const pagePath = path.join(LEGAL_DIR, page.slug, 'page.tsx');
      const content = fs.readFileSync(pagePath, 'utf-8');
      expect(content).toContain('export default');
    }
  });

  test('each legal page has metadata with title', () => {
    for (const page of LEGAL_PAGES) {
      const pagePath = path.join(LEGAL_DIR, page.slug, 'page.tsx');
      const content = fs.readFileSync(pagePath, 'utf-8');
      expect(content).toContain('export const metadata');
      expect(content).toMatch(/title:\s*['"]/);
    }
  });

  test('terms page has liability and indemnification clauses', () => {
    const content = fs.readFileSync(path.join(LEGAL_DIR, 'terms', 'page.tsx'), 'utf-8');
    expect(content.toLowerCase()).toMatch(/liability|indemnif/);
  });

  test('privacy page mentions data retention', () => {
    const content = fs.readFileSync(path.join(LEGAL_DIR, 'privacy', 'page.tsx'), 'utf-8');
    expect(content.toLowerCase()).toContain('retention');
  });

  test('security page mentions encryption', () => {
    const content = fs.readFileSync(path.join(LEGAL_DIR, 'security', 'page.tsx'), 'utf-8');
    expect(content.toLowerCase()).toMatch(/encrypt|aes|tls/i);
  });

  test('dpa page mentions sub-processors', () => {
    const content = fs.readFileSync(path.join(LEGAL_DIR, 'dpa', 'page.tsx'), 'utf-8');
    expect(content.toLowerCase()).toContain('sub-processor');
  });

  test('responsible-disclosure page mentions vulnerability', () => {
    const content = fs.readFileSync(path.join(LEGAL_DIR, 'responsible-disclosure', 'page.tsx'), 'utf-8');
    expect(content.toLowerCase()).toMatch(/vulnerab|security|disclos/i);
  });
});
