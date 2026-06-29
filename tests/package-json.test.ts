// Tests for the package.json configuration
import fs from 'fs';
import path from 'path';

const PACKAGE_JSON = path.join(__dirname, '..', 'package.json');

describe('package.json', () => {
  test('package.json exists', () => {
    expect(fs.existsSync(PACKAGE_JSON)).toBe(true);
  });

  test('package name is secqa-v2', () => {
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf-8'));
    expect(pkg.name).toBe('secqa-v2');
  });

  test('package version is 2.0.0', () => {
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf-8'));
    expect(pkg.version).toBe('2.0.0');
  });

  test('author is VitalCheffe', () => {
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf-8'));
    expect(pkg.author.name).toBe('VitalCheffe');
    expect(pkg.author.email).toBe('amineharchelkorane5@gmail.com');
  });

  test('has all required scripts', () => {
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf-8'));
    const requiredScripts = ['dev', 'build', 'start', 'lint', 'test', 'seed', 'postinstall'];
    for (const script of requiredScripts) {
      expect(pkg.scripts[script]).toBeDefined();
    }
  });

  test('build script includes prisma generate', () => {
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf-8'));
    expect(pkg.scripts.build).toContain('prisma generate');
  });

  test('test script uses jest', () => {
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf-8'));
    expect(pkg.scripts.test).toContain('jest');
  });

  test('has Stripe dependency', () => {
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf-8'));
    expect(pkg.dependencies.stripe).toBeDefined();
  });

  test('has Anthropic SDK dependency', () => {
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf-8'));
    expect(pkg.dependencies['@anthropic-ai/sdk']).toBeDefined();
  });

  test('has Prisma dependencies', () => {
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf-8'));
    expect(pkg.dependencies['@prisma/client']).toBeDefined();
    expect(pkg.devDependencies.prisma).toBeDefined();
  });

  test('has Sentry dependency', () => {
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf-8'));
    expect(pkg.dependencies['@sentry/nextjs']).toBeDefined();
  });

  test('has Clerk dependency', () => {
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf-8'));
    expect(pkg.dependencies['@clerk/nextjs']).toBeDefined();
  });

  test('has document parsing dependencies', () => {
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf-8'));
    expect(pkg.dependencies['pdf-parse']).toBeDefined();
    expect(pkg.dependencies.mammoth).toBeDefined();
    expect(pkg.dependencies['csv-parse']).toBeDefined();
  });

  test('has testing dependencies', () => {
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf-8'));
    expect(pkg.devDependencies.jest).toBeDefined();
    expect(pkg.devDependencies['ts-jest']).toBeDefined();
  });

  test('has Next.js 16+', () => {
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf-8'));
    const nextVersion = pkg.dependencies.next;
    expect(nextVersion).toMatch(/^1[6-9]\.|"\^1[6-9]\./);
  });
});
