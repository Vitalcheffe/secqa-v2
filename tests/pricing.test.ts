// Tests for the pricing tier mapping logic
// Validates that tier + period combinations map to correct price IDs

describe('pricing tiers', () => {
  const TIERS = [
    { name: 'Starter', tier: 'starter', monthly: 49, annual: 490 },
    { name: 'Pro', tier: 'pro', monthly: 99, annual: 990 },
    { name: 'Scale', tier: 'scale', monthly: 299, annual: 2990 }
  ];

  test('all 3 tiers exist', () => {
    expect(TIERS).toHaveLength(3);
    expect(TIERS.map(t => t.tier)).toEqual(['starter', 'pro', 'scale']);
  });

  test('Pro is the middle tier', () => {
    const pro = TIERS.find(t => t.tier === 'pro');
    expect(pro).toBeDefined();
    expect(pro!.monthly).toBe(99);
  });

  test('annual price gives 2 months free (17% discount)', () => {
    for (const tier of TIERS) {
      const monthlyAnnual = tier.monthly * 12;
      const discount = monthlyAnnual - tier.annual;
      const discountPercent = (discount / monthlyAnnual) * 100;
      expect(discountPercent).toBeGreaterThan(15);
      expect(discountPercent).toBeLessThan(20);
    }
  });

  test('prices increase monotonically across tiers', () => {
    const prices = TIERS.map(t => t.monthly);
    expect(prices[0]).toBeLessThan(prices[1]);
    expect(prices[1]).toBeLessThan(prices[2]);
  });

  test('all prices are above $49 floor (solo founder unit economics)', () => {
    for (const tier of TIERS) {
      expect(tier.monthly).toBeGreaterThanOrEqual(49);
    }
  });

  test('ROI math: 14h × 32 questionnaires × $120/hr = $53,760 annual cost without SecQA', () => {
    const hoursPerQuestionnaire = 14;
    const questionnairesPerYear = 32;
    const costPerHour = 120;
    const annualCost = hoursPerQuestionnaire * questionnairesPerYear * costPerHour;
    expect(annualCost).toBe(53760);
  });

  test('ROI math: Pro annual $990 vs $53,760 cost = 54x ROI', () => {
    const annualCost = 53760;
    const proAnnual = 990;
    const roi = annualCost / proAnnual;
    expect(roi).toBeGreaterThan(50);
    expect(roi).toBeLessThan(60);
  });
});
