// Seed Stripe products and prices for the 3 tiers × 2 periods = 6 prices
// Run: npx ts-node scripts/seed-tiers.ts
// Output: prints the price IDs to add to .env.local

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-04-10",
});

const TIERS = [
  {
    name: "Starter",
    description: "Up to 5 questionnaires/month — solo founders and small teams",
    monthly: 49,
    annual: 490,
  },
  {
    name: "Pro",
    description: "Up to 20 questionnaires/month — SaaS companies $1M-$10M ARR (Most Popular)",
    monthly: 99,
    annual: 990,
  },
  {
    name: "Scale",
    description: "Unlimited questionnaires — SaaS companies $10M-$50M ARR with Salesforce",
    monthly: 299,
    annual: 2990,
  },
];

async function main() {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("STRIPE_SECRET_KEY not set. Add it to .env.local first.");
    process.exit(1);
  }

  console.log("Creating products and prices in Stripe...\n");

  const results: Array<{ tier: string; period: string; priceId: string }> = [];

  for (const tier of TIERS) {
    // Create the product
    const product = await stripe.products.create({
      name: `SecQA ${tier.name}`,
      description: tier.description,
      metadata: { tier: tier.name.toLowerCase() },
    });

    // Create monthly price
    const monthlyPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: tier.monthly * 100,
      currency: "usd",
      recurring: { interval: "month" },
      metadata: { tier: tier.name.toLowerCase(), period: "monthly" },
    });

    // Create annual price (2 months free = ~17% discount)
    const annualPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: tier.annual * 100,
      currency: "usd",
      recurring: { interval: "year" },
      metadata: { tier: tier.name.toLowerCase(), period: "annual" },
    });

    results.push(
      { tier: tier.name.toLowerCase(), period: "monthly", priceId: monthlyPrice.id },
      { tier: tier.name.toLowerCase(), period: "annual", priceId: annualPrice.id }
    );

    console.log(`${tier.name}: product ${product.id}`);
    console.log(`  Monthly: ${monthlyPrice.id} ($${tier.monthly}/mo)`);
    console.log(`  Annual:  ${annualPrice.id} ($${tier.annual}/yr)\n`);
  }

  console.log("\n=== ADD THESE TO .env.local ===\n");
  for (const r of results) {
    const envKey = `STRIPE_PRICE_${r.tier.toUpperCase()}_${r.period.toUpperCase()}`;
    console.log(`${envKey}=${r.priceId}`);
  }

  // Also create the webhook endpoint if not exists
  console.log("\n=== WEBHOOK SETUP ===");
  console.log("Create a webhook endpoint at: https://your-domain.com/api/stripe/webhook");
  console.log("Subscribe to: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted");
  console.log("Add STRIPE_WEBHOOK_SECRET to .env.local");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
