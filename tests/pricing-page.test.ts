// Tests for the pricing page content
import fs from 'fs';
import path from 'path';

const PRICING_PAGE = path.join(__dirname, '..', 'src', 'app', 'pricing', 'page.tsx');

describe('pricing page', () => {
  test('pricing page exists', () => {
    expect(fs.existsSync(PRICING_PAGE)).toBe(true);
  });

  test('pricing page exports default component', () => {
    const content = fs.readFileSync(PRICING_PAGE, 'utf-8');
    expect(content).toContain('export default');
  });

  test('pricing page is a client component (has useState)', () => {
    const content = fs.readFileSync(PRICING_PAGE, 'utf-8');
    expect(content).toContain("'use client'");
    expect(content).toContain('useState');
  });

  test('pricing page has all 3 tiers', () => {
    const content = fs.readFileSync(PRICING_PAGE, 'utf-8');
    expect(content).toContain('Starter');
    expect(content).toContain('Pro');
    expect(content).toContain('Scale');
  });

  test('pricing page has correct prices', () => {
    const content = fs.readFileSync(PRICING_PAGE, 'utf-8');
    expect(content).toMatch(/49/);
    expect(content).toMatch(/99/);
    expect(content).toMatch(/299/);
  });

  test('pricing page has monthly/annual toggle', () => {
    const content = fs.readFileSync(PRICING_PAGE, 'utf-8');
    expect(content).toMatch(/monthly|annual/i);
  });

  test('pricing page has comparison table', () => {
    const content = fs.readFileSync(PRICING_PAGE, 'utf-8');
    expect(content).toMatch(/comparison|Compare/i);
  });

  test('pricing page has ROI calculator', () => {
    const content = fs.readFileSync(PRICING_PAGE, 'utf-8');
    expect(content).toMatch(/ROI|roi/i);
  });

  test('pricing page has FAQ section', () => {
    const content = fs.readFileSync(PRICING_PAGE, 'utf-8');
    expect(content).toMatch(/FAQ|faq/i);
  });

  test('pricing page has checkout API call', () => {
    const content = fs.readFileSync(PRICING_PAGE, 'utf-8');
    expect(content).toContain('/api/stripe/checkout');
  });

  test('pricing page mentions founding offer', () => {
    const content = fs.readFileSync(PRICING_PAGE, 'utf-8');
    expect(content.toLowerCase()).toMatch(/founding|first 100/i);
  });

  test('pricing page has 17% annual discount', () => {
    const content = fs.readFileSync(PRICING_PAGE, 'utf-8');
    expect(content).toContain('17%');
  });
});
