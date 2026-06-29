// Tests for the README documentation
import fs from 'fs';
import path from 'path';

const README = path.join(__dirname, '..', 'README.md');

describe('README', () => {
  test('README.md exists', () => {
    expect(fs.existsSync(README)).toBe(true);
  });

  test('README mentions SecQA', () => {
    const content = fs.readFileSync(README, 'utf-8');
    expect(content).toMatch(/SecQA/i);
  });

  test('README has setup instructions', () => {
    const content = fs.readFileSync(README, 'utf-8');
    expect(content.toLowerCase()).toMatch(/setup|installation|getting started/i);
  });

  test('README mentions npm install', () => {
    const content = fs.readFileSync(README, 'utf-8');
    expect(content).toContain('npm install');
  });

  test('README mentions prisma generate', () => {
    const content = fs.readFileSync(README, 'utf-8');
    expect(content).toContain('prisma generate');
  });

  test('README has environment variables section', () => {
    const content = fs.readFileSync(README, 'utf-8');
    expect(content.toLowerCase()).toMatch(/environment variables|env vars/i);
  });

  test('README mentions deployment', () => {
    const content = fs.readFileSync(README, 'utf-8');
    expect(content.toLowerCase()).toMatch(/deploy|vercel/i);
  });

  test('README mentions the 5 demo actions', () => {
    const content = fs.readFileSync(README, 'utf-8');
    expect(content).toMatch(/upload|Upload/i);
    expect(content).toMatch(/generate|Generate/i);
    expect(content).toMatch(/export|Export/i);
  });

  test('README mentions Stripe', () => {
    const content = fs.readFileSync(README, 'utf-8');
    expect(content).toContain('Stripe');
  });

  test('README mentions Claude/Anthropic', () => {
    const content = fs.readFileSync(README, 'utf-8');
    expect(content.toLowerCase()).toMatch(/claude|anthropic/i);
  });

  test('README has author VitalCheffe', () => {
    const content = fs.readFileSync(README, 'utf-8');
    expect(content).toContain('VitalCheffe');
  });

  test('README is at least 100 lines', () => {
    const content = fs.readFileSync(README, 'utf-8');
    const lines = content.split('\n');
    expect(lines.length).toBeGreaterThanOrEqual(100);
  });
});
