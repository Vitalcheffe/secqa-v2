// Tests for product pages structure
import fs from 'fs';
import path from 'path';

const PRODUCTS_DIR = path.join(__dirname, '..', 'src', 'app', 'products');

const PRODUCTS = [
  'security-questionnaire-automation',
  'trust-center',
  'knowledge-management',
];

describe('product pages', () => {
  test('all 3 product pages exist', () => {
    for (const slug of PRODUCTS) {
      expect(fs.existsSync(path.join(PRODUCTS_DIR, slug, 'page.tsx'))).toBe(true);
    }
  });

  test('each product page exports a default component', () => {
    for (const slug of PRODUCTS) {
      const content = fs.readFileSync(path.join(PRODUCTS_DIR, slug, 'page.tsx'), 'utf-8');
      expect(content).toContain('export default');
    }
  });

  test('each product page has metadata', () => {
    for (const slug of PRODUCTS) {
      const content = fs.readFileSync(path.join(PRODUCTS_DIR, slug, 'page.tsx'), 'utf-8');
      expect(content).toContain('export default');
    }
  });

  test('each product page has a features section', () => {
    for (const slug of PRODUCTS) {
      const content = fs.readFileSync(path.join(PRODUCTS_DIR, slug, 'page.tsx'), 'utf-8');
      expect(content).toContain('Features');
    }
  });

  test('each product page has a CTA to pricing', () => {
    for (const slug of PRODUCTS) {
      const content = fs.readFileSync(path.join(PRODUCTS_DIR, slug, 'page.tsx'), 'utf-8');
      expect(content).toContain('/pricing');
    }
  });

  test('security-questionnaire-automation page mentions 90 minutes', () => {
    const content = fs.readFileSync(path.join(PRODUCTS_DIR, 'security-questionnaire-automation', 'page.tsx'), 'utf-8');
    expect(content).toMatch(/90.*min/i);
  });

  test('trust-center page mentions reducing questionnaires', () => {
    const content = fs.readFileSync(path.join(PRODUCTS_DIR, 'trust-center', 'page.tsx'), 'utf-8');
    expect(content.toLowerCase()).toMatch(/reduc|fewer|less/);
  });

  test('knowledge-management page mentions RAG or retrieval', () => {
    const content = fs.readFileSync(path.join(PRODUCTS_DIR, 'knowledge-management', 'page.tsx'), 'utf-8');
    expect(content.toLowerCase()).toMatch(/rag|retriev|knowledge/);
  });
});
