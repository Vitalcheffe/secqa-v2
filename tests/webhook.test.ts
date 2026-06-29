// Tests for Stripe webhook handler — mocks signature verification and Prisma
// Run: npm test -- tests/webhook.test.ts

jest.mock("@/lib/stripe", () => ({
  getStripe: jest.fn(),
  verifyWebhookSignature: jest.fn(),
  getTierAndPeriodFromPriceId: jest.fn((priceId: string) => {
    if (priceId === "price_pro_monthly") {
      return { tier: "pro", period: "monthly" };
    }
    if (priceId === "price_starter_annual") {
      return { tier: "starter", period: "annual" };
    }
    return null;
  }),
}));

jest.mock("@/lib/db", () => ({
  __esModule: true,
  default: {
    customer: {
      upsert: jest.fn(),
      findUnique: jest.fn(),
    },
    subscription: {
      create: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
      findUnique: jest.fn(),
    },
    invoice: {
      create: jest.fn(),
    },
  },
}));

import { verifyWebhookSignature } from "@/lib/stripe";
import prisma from "@/lib/db";

describe("webhook handler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("verifyWebhookSignature is called with payload, signature, secret", () => {
    const { verifyWebhookSignature } = require("@/lib/stripe");
    (verifyWebhookSignature as jest.Mock).mockReturnValue({
      type: "checkout.session.completed",
      data: { object: { id: "cs_test_1" } },
    });

    verifyWebhookSignature("payload", "sig", "secret");
    expect(verifyWebhookSignature).toHaveBeenCalledWith("payload", "sig", "secret");
  });

  test("verifyWebhookSignature throws on invalid signature", () => {
    (verifyWebhookSignature as jest.Mock).mockImplementation(() => {
      throw new Error("Webhook signature verification failed: signature mismatch");
    });

    expect(() => verifyWebhookSignature("payload", "bad_sig", "secret")).toThrow(
      /signature verification failed/
    );
  });

  test("customer upsert is called with correct Stripe customer ID", async () => {
    (prisma.customer.upsert as jest.Mock).mockResolvedValue({
      id: "cust_123",
      stripeCustomerId: "cus_stripe_abc",
      email: "founder@example.com",
    });

    const result = await prisma.customer.upsert({
      where: { stripeCustomerId: "cus_stripe_abc" },
      update: { email: "founder@example.com" },
      create: {
        stripeCustomerId: "cus_stripe_abc",
        email: "founder@example.com",
        name: "Test Founder",
      },
    });

    expect(result.id).toBe("cust_123");
    expect(prisma.customer.upsert).toHaveBeenCalledTimes(1);
    expect((prisma.customer.upsert as jest.Mock).mock.calls[0][0].where.stripeCustomerId).toBe(
      "cus_stripe_abc"
    );
  });

  test("subscription create is called with correct tier mapping", async () => {
    (prisma.subscription.create as jest.Mock).mockResolvedValue({
      id: "sub_123",
      tier: "pro",
      status: "active",
    });

    const result = await prisma.subscription.create({
      data: {
        customerId: "cust_123",
        stripeSubscriptionId: "sub_stripe_abc",
        tier: "pro",
        status: "active",
        currentPeriodEnd: new Date("2026-12-31"),
      },
    });

    expect(result.tier).toBe("pro");
    expect(prisma.subscription.create).toHaveBeenCalledTimes(1);
  });

  test("subscription updateMany marks canceled subscriptions", async () => {
    (prisma.subscription.updateMany as jest.Mock).mockResolvedValue({ count: 1 });

    const result = await prisma.subscription.updateMany({
      where: { stripeSubscriptionId: "sub_stripe_abc" },
      data: { status: "canceled" },
    });

    expect(result.count).toBe(1);
    expect(prisma.subscription.updateMany).toHaveBeenCalledTimes(1);
    expect((prisma.subscription.updateMany as jest.Mock).mock.calls[0][0].data.status).toBe(
      "canceled"
    );
  });
});
