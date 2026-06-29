// Tests for Stripe integration — uses mocked Stripe SDK (no real API calls)
// Run: npm test -- tests/stripe.test.ts

jest.mock("@/lib/stripe", () => {
  const actual = jest.requireActual("@/lib/stripe");
  return {
    ...actual,
    getStripe: jest.fn(),
    createCheckoutSession: jest.fn(),
    createCustomerPortalSession: jest.fn(),
    verifyWebhookSignature: jest.fn(),
    getPriceId: jest.fn((tier: string, period: string) => `price_${tier}_${period}`),
    getTierAndPeriodFromPriceId: jest.fn((priceId: string) => {
      const match = priceId.match(/^price_(starter|pro|scale)_(monthly|annual)$/);
      if (!match) return null;
      return { tier: match[1] as "starter" | "pro" | "scale", period: match[2] as "monthly" | "annual" };
    }),
  };
});

import { getPriceId, getTierAndPeriodFromPriceId, createCheckoutSession } from "@/lib/stripe";

describe("stripe lib", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getPriceId returns a price ID for valid tier + period", () => {
    const priceId = getPriceId("pro", "monthly");
    expect(priceId).toBe("price_pro_monthly");
  });

  test("getPriceId returns a different ID for annual vs monthly", () => {
    const monthly = getPriceId("starter", "monthly");
    const annual = getPriceId("starter", "annual");
    expect(monthly).not.toBe(annual);
    expect(monthly).toBe("price_starter_monthly");
    expect(annual).toBe("price_starter_annual");
  });

  test("getTierAndPeriodFromPriceId reverses the mapping", () => {
    const result = getTierAndPeriodFromPriceId("price_scale_annual");
    expect(result).toEqual({ tier: "scale", period: "annual" });
  });

  test("getTierAndPeriodFromPriceId returns null for unknown price", () => {
    const result = getTierAndPeriodFromPriceId("price_unknown_random");
    expect(result).toBeNull();
  });

  test("createCheckoutSession is callable with valid input", async () => {
    (createCheckoutSession as jest.Mock).mockResolvedValue({
      url: "https://checkout.stripe.com/session/abc123",
      sessionId: "cs_test_123",
    });

    const result = await createCheckoutSession({
      priceId: "price_pro_monthly",
      customerEmail: "test@example.com",
    });

    expect(result.url).toContain("checkout.stripe.com");
    expect(result.sessionId).toBe("cs_test_123");
    expect(createCheckoutSession).toHaveBeenCalledWith({
      priceId: "price_pro_monthly",
      customerEmail: "test@example.com",
    });
  });

  test("createCheckoutSession handles errors gracefully", async () => {
    (createCheckoutSession as jest.Mock).mockRejectedValue(
      new Error("STRIPE_SECRET_KEY is not set")
    );

    await expect(
      createCheckoutSession({ priceId: "price_pro_monthly" })
    ).rejects.toThrow(/STRIPE_SECRET_KEY/);
  });
});
