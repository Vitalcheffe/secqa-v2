// Tests for the nav-config structure
// Validates that all navigation items have required fields

import { navGroups } from '@/config/nav-config';

describe('nav-config', () => {
  test('navGroups is an array with at least 2 groups', () => {
    expect(Array.isArray(navGroups)).toBe(true);
    expect(navGroups.length).toBeGreaterThanOrEqual(2);
  });

  test('every group has a label and items array', () => {
    for (const group of navGroups) {
      expect(typeof group.label).toBe('string');
      expect(Array.isArray(group.items)).toBe(true);
      expect(group.items.length).toBeGreaterThan(0);
    }
  });

  test('every nav item has title and url', () => {
    for (const group of navGroups) {
      for (const item of group.items) {
        expect(typeof item.title).toBe('string');
        expect(typeof item.url).toBe('string');
        expect(item.url.startsWith('/')).toBe(true);
      }
    }
  });

  test('Dashboard link points to /dashboard/overview', () => {
    const overviewGroup = navGroups.find(g => g.label === 'Overview');
    expect(overviewGroup).toBeDefined();
    const dashboardItem = overviewGroup!.items.find(i => i.title === 'Dashboard');
    expect(dashboardItem).toBeDefined();
    expect(dashboardItem!.url).toBe('/dashboard/overview');
  });

  test('all URLs are unique within a group', () => {
    for (const group of navGroups) {
      const urls = group.items.map(i => i.url);
      const uniqueUrls = new Set(urls);
      expect(urls.length).toBe(uniqueUrls.size);
    }
  });

  test('no nav item references /login or /signup (use /auth/sign-in and /auth/sign-up)', () => {
    for (const group of navGroups) {
      for (const item of group.items) {
        expect(item.url).not.toBe('/login');
        expect(item.url).not.toBe('/signup');
      }
    }
  });
});
