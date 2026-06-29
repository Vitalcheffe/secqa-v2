// Tests for the homepage content
// Validates that the homepage has all required sections and trust signals

import fs from 'fs';
import path from 'path';

const HOMEPAGE = path.join(__dirname, '..', 'src', 'app', 'page.tsx');

describe('homepage', () => {
  test('homepage file exists', () => {
    expect(fs.existsSync(HOMEPAGE)).toBe(true);
  });

  test('homepage exports default component', () => {
    const content = fs.readFileSync(HOMEPAGE, 'utf-8');
    expect(content).toContain('export default');
  });

  test('homepage has metadata with title and description', () => {
    const content = fs.readFileSync(HOMEPAGE, 'utf-8');
    expect(content).toContain('export const metadata');
    expect(content).toMatch(/title.*SecQA/i);
  });

  test('homepage mentions 90 minutes (key value prop)', () => {
    const content = fs.readFileSync(HOMEPAGE, 'utf-8');
    expect(content).toMatch(/90.*min/i);
  });

  test('homepage mentions 14 hours (baseline pain)', () => {
    const content = fs.readFileSync(HOMEPAGE, 'utf-8');
    expect(content).toMatch(/14.*hour/i);
  });

  test('homepage mentions pricing ($99 or $49 or $299)', () => {
    const content = fs.readFileSync(HOMEPAGE, 'utf-8');
    expect(content).toMatch(/\$99|\$49|\$299/);
  });

  test('homepage has hero section', () => {
    const content = fs.readFileSync(HOMEPAGE, 'utf-8');
    expect(content).toMatch(/hero|Hero/i);
  });

  test('homepage has trust signals (SOC2, encryption, etc.)', () => {
    const content = fs.readFileSync(HOMEPAGE, 'utf-8');
    expect(content).toMatch(/SOC2|encryption|AES/i);
  });

  test('homepage has testimonials section', () => {
    const content = fs.readFileSync(HOMEPAGE, 'utf-8');
    expect(content).toMatch(/testimonial|Testimonial/i);
  });

  test('homepage has FAQ section', () => {
    const content = fs.readFileSync(HOMEPAGE, 'utf-8');
    expect(content).toMatch(/faq|FAQ|Frequently/i);
  });

  test('homepage has pricing preview', () => {
    const content = fs.readFileSync(HOMEPAGE, 'utf-8');
    expect(content).toMatch(/pricing|Pricing/i);
  });

  test('homepage has CTA to /pricing or /dashboard', () => {
    const content = fs.readFileSync(HOMEPAGE, 'utf-8');
    expect(content).toMatch(/href=.*['"]\/pricing['"]|href=.*['"]\/dashboard['"]/);
  });

  test('homepage has footer with legal links', () => {
    const content = fs.readFileSync(HOMEPAGE, 'utf-8');
    expect(content).toMatch(/footer|Footer/i);
    expect(content).toContain('/legal/terms');
    expect(content).toContain('/legal/privacy');
  });

  test('homepage mentions founding customer offer', () => {
    const content = fs.readFileSync(HOMEPAGE, 'utf-8');
    expect(content.toLowerCase()).toMatch(/founding|first 100/i);
  });
});
