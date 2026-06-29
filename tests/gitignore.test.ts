// Tests for the gitignore file
import fs from 'fs';
import path from 'path';

const GITIGNORE = path.join(__dirname, '..', '.gitignore');

describe('.gitignore', () => {
  test('.gitignore exists', () => {
    expect(fs.existsSync(GITIGNORE)).toBe(true);
  });

  test('ignores node_modules', () => {
    const content = fs.readFileSync(GITIGNORE, 'utf-8');
    expect(content).toContain('node_modules');
  });

  test('ignores .next build output', () => {
    const content = fs.readFileSync(GITIGNORE, 'utf-8');
    expect(content).toContain('.next');
  });

  test('ignores .env files (prevents secret leaks)', () => {
    const content = fs.readFileSync(GITIGNORE, 'utf-8');
    expect(content).toMatch(/\.env/);
  });

  test('ignores database files', () => {
    const content = fs.readFileSync(GITIGNORE, 'utf-8');
    expect(content).toMatch(/\.db|dev\.db/i);
  });

  test('ignores Vercel directory', () => {
    const content = fs.readFileSync(GITIGNORE, 'utf-8');
    expect(content).toContain('.vercel');
  });

  test('ignores OS files (.DS_Store, Thumbs.db)', () => {
    const content = fs.readFileSync(GITIGNORE, 'utf-8');
    expect(content).toContain('.DS_Store');
    expect(content).toContain('Thumbs.db');
  });

  test('ignores IDE files', () => {
    const content = fs.readFileSync(GITIGNORE, 'utf-8');
    expect(content).toMatch(/\.vscode|\.idea/i);
  });

  test('ignores log files', () => {
    const content = fs.readFileSync(GITIGNORE, 'utf-8');
    expect(content).toMatch(/\*\.log|npm-debug/i);
  });

  test('ignores exports directory (runtime artifacts)', () => {
    const content = fs.readFileSync(GITIGNORE, 'utf-8');
    expect(content).toContain('exports/');
  });
});
