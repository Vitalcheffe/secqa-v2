// Tests for the theme configuration
import fs from 'fs';
import path from 'path';

const THEME_DIR = path.join(__dirname, '..', 'src', 'styles', 'themes');
const THEME_CONFIG = path.join(__dirname, '..', 'src', 'components', 'themes', 'theme.config.ts');

describe('theme configuration', () => {
  test('secqa theme CSS file exists', () => {
    expect(fs.existsSync(path.join(THEME_DIR, 'secqa.css'))).toBe(true);
  });

  test('theme.config.ts exists', () => {
    expect(fs.existsSync(THEME_CONFIG)).toBe(true);
  });

  test('secqa is the default theme', () => {
    const content = fs.readFileSync(THEME_CONFIG, 'utf-8');
    expect(content).toMatch(/DEFAULT_THEME\s*=\s*['"]secqa['"]/);
  });

  test('theme config includes secqa in THEMES array', () => {
    const content = fs.readFileSync(THEME_CONFIG, 'utf-8');
    expect(content).toContain("value: 'secqa'");
  });

  test('secqa theme uses locked accent color #00ADB5', () => {
    const content = fs.readFileSync(path.join(THEME_DIR, 'secqa.css'), 'utf-8');
    // Locked palette: #00ADB5 (teal accent)
    expect(content).toContain('#00ADB5');
    expect(content).toContain('#222831');
    expect(content).toContain('#393E46');
    expect(content).toContain('#EEEEEE');
  });

  test('secqa theme has dark mode variant', () => {
    const content = fs.readFileSync(path.join(THEME_DIR, 'secqa.css'), 'utf-8');
    expect(content).toMatch(/\.dark|dark/i);
  });

  test('secqa theme defines all required CSS variables', () => {
    const content = fs.readFileSync(path.join(THEME_DIR, 'secqa.css'), 'utf-8');
    const requiredVars = [
      '--background', '--foreground', '--card', '--primary',
      '--secondary', '--muted', '--accent', '--destructive',
      '--border', '--input', '--ring'
    ];
    for (const v of requiredVars) {
      expect(content).toContain(v);
    }
  });

  test('secqa theme defines sidebar variables', () => {
    const content = fs.readFileSync(path.join(THEME_DIR, 'secqa.css'), 'utf-8');
    expect(content).toContain('--sidebar');
    expect(content).toContain('--sidebar-primary');
  });

  test('secqa theme defines chart variables', () => {
    const content = fs.readFileSync(path.join(THEME_DIR, 'secqa.css'), 'utf-8');
    expect(content).toContain('--chart-1');
    expect(content).toContain('--chart-5');
  });

  test('theme.css imports secqa theme', () => {
    const themeCss = fs.readFileSync(path.join(__dirname, '..', 'src', 'styles', 'theme.css'), 'utf-8');
    expect(themeCss).toContain("themes/secqa.css");
  });
});
