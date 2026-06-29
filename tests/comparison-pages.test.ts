// Tests for the comparison pages structure
// Validates that all 5 comparison pages exist with proper structure

import fs from 'fs';
import path from 'path';

const COMPARE_DIR = path.join(__dirname, '..', 'src', 'app', 'compare');

const COMPARISONS = [
  { slug: 'secqa-vs-vanta', competitor: 'Vanta' },
  { slug: 'secqa-vs-conveyor', competitor: 'Conveyor' },
  { slug: 'secqa-vs-drata', competitor: 'Drata' },
  { slug: 'secqa-vs-secureframe', competitor: 'Secureframe' },
  { slug: 'secqa-vs-loopio', competitor: 'Loopio' },
];

describe('comparison pages', () => {
  test('all 5 comparison pages exist', () => {
    for (const cmp of COMPARISONS) {
      const pagePath = path.join(COMPARE_DIR, cmp.slug, 'page.tsx');
      expect(fs.existsSync(pagePath)).toBe(true);
    }
  });

  test('each comparison page exports a default component', () => {
    for (const cmp of COMPARISONS) {
      const content = fs.readFileSync(path.join(COMPARE_DIR, cmp.slug, 'page.tsx'), 'utf-8');
      expect(content).toContain('export default');
    }
  });

  test('each comparison page mentions the competitor by name', () => {
    for (const cmp of COMPARISONS) {
      const content = fs.readFileSync(path.join(COMPARE_DIR, cmp.slug, 'page.tsx'), 'utf-8');
      expect(content).toContain(cmp.competitor);
    }
  });

  test('each comparison page has a "where SecQA wins" section', () => {
    for (const cmp of COMPARISONS) {
      const content = fs.readFileSync(path.join(COMPARE_DIR, cmp.slug, 'page.tsx'), 'utf-8');
      expect(content).toContain('SecQA wins');
    }
  });

  test('each comparison page has pricing comparison', () => {
    for (const cmp of COMPARISONS) {
      const content = fs.readFileSync(path.join(COMPARE_DIR, cmp.slug, 'page.tsx'), 'utf-8');
      expect(content).toMatch(/\$99|\$49|\$299/);
    }
  });

  test('each comparison page has a "best for" recommendation', () => {
    for (const cmp of COMPARISONS) {
      const content = fs.readFileSync(path.join(COMPARE_DIR, cmp.slug, 'page.tsx'), 'utf-8');
      expect(content).toContain('best for you');
    }
  });
});
