// Tests for SEO files: sitemap, robots, manifest, favicon
import fs from 'fs';
import path from 'path';

const APP_DIR = path.join(__dirname, '..', 'src', 'app');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

describe('SEO files', () => {
  test('sitemap.ts exists', () => {
    expect(fs.existsSync(path.join(APP_DIR, 'sitemap.ts'))).toBe(true);
  });

  test('robots.ts exists', () => {
    expect(fs.existsSync(path.join(APP_DIR, 'robots.ts'))).toBe(true);
  });

  test('sitemap references at least 25 URLs', () => {
    const content = fs.readFileSync(path.join(APP_DIR, 'sitemap.ts'), 'utf-8');
    // Count entries in the STATIC_ROUTES and INTEGRATION_SLUGS arrays
    const staticMatches = content.match(/'\/[^']+'/g) || [];
    expect(staticMatches.length).toBeGreaterThanOrEqual(25);
  });

  test('sitemap includes integration slugs', () => {
    const content = fs.readFileSync(path.join(APP_DIR, 'sitemap.ts'), 'utf-8');
    expect(content).toContain('slack');
    expect(content).toContain('notion');
    expect(content).toContain('hubspot');
  });

  test('robots disallows /dashboard and /api', () => {
    const content = fs.readFileSync(path.join(APP_DIR, 'robots.ts'), 'utf-8');
    expect(content).toContain('/dashboard/');
    expect(content).toContain('/api/');
  });

  test('robots references sitemap URL', () => {
    const content = fs.readFileSync(path.join(APP_DIR, 'robots.ts'), 'utf-8');
    expect(content).toContain('sitemap.xml');
  });

  test('favicon.svg exists in public/', () => {
    expect(fs.existsSync(path.join(PUBLIC_DIR, 'favicon.svg'))).toBe(true);
  });

  test('manifest.json exists in public/', () => {
    expect(fs.existsSync(path.join(PUBLIC_DIR, 'manifest.json'))).toBe(true);
  });

  test('manifest has correct theme color', () => {
    const content = fs.readFileSync(path.join(PUBLIC_DIR, 'manifest.json'), 'utf-8');
    expect(content).toContain('#10b981');
  });

  test('favicon is valid SVG with emerald color', () => {
    const content = fs.readFileSync(path.join(PUBLIC_DIR, 'favicon.svg'), 'utf-8');
    expect(content).toContain('<svg');
    expect(content).toContain('#10b981');
  });
});
