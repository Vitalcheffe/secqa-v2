// Tests for the auth helper module
// Validates subscription gating logic

jest.mock('@/lib/db', () => ({
  __esModule: true,
  default: {
    customer: {
      findUnique: jest.fn(),
    },
  },
}));

import { hasActiveSubscription, type CustomerContext } from '@/lib/auth';

describe('auth helper', () => {
  test('hasActiveSubscription returns false for null context', () => {
    expect(hasActiveSubscription(null)).toBe(false);
  });

  test('hasActiveSubscription returns false when no tier', () => {
    const ctx: CustomerContext = {
      customerId: 'cust_1',
      stripeCustomerId: 'cus_stripe_1',
      email: 'test@example.com',
      tier: null,
      status: null,
      currentPeriodEnd: null,
    };
    expect(hasActiveSubscription(ctx)).toBe(false);
  });

  test('hasActiveSubscription returns false when status is not active', () => {
    const ctx: CustomerContext = {
      customerId: 'cust_1',
      stripeCustomerId: 'cus_stripe_1',
      email: 'test@example.com',
      tier: 'pro',
      status: 'past_due',
      currentPeriodEnd: new Date(Date.now() + 30 * 86400 * 1000),
    };
    expect(hasActiveSubscription(ctx)).toBe(false);
  });

  test('hasActiveSubscription returns true for active sub with future period end', () => {
    const ctx: CustomerContext = {
      customerId: 'cust_1',
      stripeCustomerId: 'cus_stripe_1',
      email: 'test@example.com',
      tier: 'pro',
      status: 'active',
      currentPeriodEnd: new Date(Date.now() + 30 * 86400 * 1000),
    };
    expect(hasActiveSubscription(ctx)).toBe(true);
  });

  test('hasActiveSubscription returns false when period end is in the past (beyond grace)', () => {
    const ctx: CustomerContext = {
      customerId: 'cust_1',
      stripeCustomerId: 'cus_stripe_1',
      email: 'test@example.com',
      tier: 'pro',
      status: 'active',
      currentPeriodEnd: new Date(Date.now() - 2 * 86400 * 1000), // 2 days ago, beyond 24h grace
    };
    expect(hasActiveSubscription(ctx)).toBe(false);
  });

  test('hasActiveSubscription returns true within 24h grace period after period end', () => {
    const ctx: CustomerContext = {
      customerId: 'cust_1',
      stripeCustomerId: 'cus_stripe_1',
      email: 'test@example.com',
      tier: 'pro',
      status: 'active',
      currentPeriodEnd: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago, within 24h grace
    };
    expect(hasActiveSubscription(ctx)).toBe(true);
  });
});
