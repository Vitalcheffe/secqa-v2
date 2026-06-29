'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, X, Sparkles, ArrowRight } from 'lucide-react';

const TIERS = [
  {
    name: 'Starter',
    tier: 'starter',
    monthly: 49,
    annual: 490,
    tagline: 'For solo founders and small teams',
    description: 'Receiving under 5 security questionnaires per month who need the core workflow without collaboration features.',
    features: [
      'Up to 5 questionnaires per month',
      'RAG over your past questionnaires (unlimited upload)',
      'Claude-powered first-draft generation',
      'Word/Excel/CSV export',
      'Email support (24-hour response SLA)',
      '1 user seat',
      'Basic answer library (10 seeded SOC2 Q&A pairs)'
    ],
    notIncluded: [
      'HubSpot deal integration',
      'Slack support channel',
      'Salesforce integration',
      'Custom template matching',
      'Quarterly answer library audit'
    ],
    cta: 'Start with Starter',
    highlight: false
  },
  {
    name: 'Pro',
    tier: 'pro',
    monthly: 99,
    annual: 990,
    tagline: 'Most popular — for SaaS $1M-$10M ARR',
    description: 'SaaS companies with 1-3 sales engineers handling 10-15 enterprise deals per quarter that trigger security questionnaires.',
    features: [
      'Up to 20 questionnaires per month',
      'Everything in Starter, plus:',
      'HubSpot deal integration with auto-attach',
      'SOC2/CAIQ/SIG seeded answer library (50 templates)',
      'Quarterly answer library audit by AI + human reviewer',
      'Slack support channel (4-hour response SLA)',
      '3 user seats included',
      'Source citation tracking with similarity scores',
      'Slack + Notion webhook integrations',
      '90%-complete-first-draft guarantee'
    ],
    notIncluded: [
      'Salesforce integration',
      'Custom template matching',
      'Dedicated Slack channel',
      'Monthly office hours'
    ],
    cta: 'Start with Pro',
    highlight: true
  },
  {
    name: 'Scale',
    tier: 'scale',
    monthly: 299,
    annual: 2990,
    tagline: 'For SaaS $10M-$50M ARR',
    description: 'SaaS companies with a dedicated sales engineering function and 30+ enterprise deals per quarter requiring complex questionnaire workflows.',
    features: [
      'Unlimited questionnaires (fair use: 100/month soft cap)',
      'Everything in Pro, plus:',
      'Salesforce integration in addition to HubSpot',
      'Custom questionnaire template matching (we build templates for your top 5 customers)',
      'Dedicated Slack channel with founder (1-hour response SLA)',
      'Monthly office hours with the founder',
      'Quarterly business review with ROI calculation',
      '10 user seats included',
      'Priority feature requests (2-week SLA)',
      'Custom SOC2 evidence pack ingestion',
      'White-glove onboarding (2 calls + async support)'
    ],
    notIncluded: [],
    cta: 'Start with Scale',
    highlight: false
  }
];

const COMPARISON_TABLE = [
  { feature: 'Questionnaires per month', starter: '5', pro: '20', scale: '100 (soft cap)' },
  { feature: 'User seats', starter: '1', pro: '3', scale: '10' },
  { feature: 'Claude 3.5 Haiku answer drafting', starter: true, pro: true, scale: true },
  { feature: 'RAG over past questionnaires', starter: true, pro: true, scale: true },
  { feature: 'Word/PDF/CSV export', starter: true, pro: true, scale: true },
  { feature: 'Source citations with similarity scores', starter: false, pro: true, scale: true },
  { feature: 'HubSpot deal integration', starter: false, pro: true, scale: true },
  { feature: 'Salesforce integration', starter: false, pro: false, scale: true },
  { feature: 'SOC2/CAIQ/SIG seeded answer library', starter: '10 templates', pro: '50 templates', scale: '50 + custom' },
  { feature: 'Slack + Notion webhook integrations', starter: false, pro: true, scale: true },
  { feature: 'Custom template matching (top 5 customers)', starter: false, pro: false, scale: true },
  { feature: 'Quarterly answer library audit', starter: false, pro: true, scale: true },
  { feature: 'Support SLA', starter: '24h (email)', pro: '4h (Slack)', scale: '1h (dedicated Slack)' },
  { feature: 'Monthly office hours with founder', starter: false, pro: false, scale: true },
  { feature: '90%-complete-first-draft guarantee', starter: false, pro: true, scale: true },
  { feature: 'Custom SOC2 evidence pack ingestion', starter: false, pro: false, scale: true },
  { feature: 'Priority feature requests (2-week SLA)', starter: false, pro: false, scale: true }
];

const FAQ = [
  {
    q: 'What is the 90%-complete-first-draft guarantee?',
    a: 'If, after uploading your first 3 paid questionnaires, our tool does not produce a 90%-complete first-draft response within 90 minutes, we refund your current month in full and credit you the next month free. The guarantee is capped at the first 3 questionnaires per customer to prevent abuse.'
  },
  {
    q: 'Can I switch tiers later?',
    a: 'Yes. You can upgrade or downgrade at any time from the Stripe customer portal. Upgrades take effect immediately; downgrades take effect at the next billing cycle. Annual subscribers can upgrade mid-year with prorated billing.'
  },
  {
    q: 'What happens if I exceed my monthly questionnaire limit?',
    a: 'We email you when you hit 80% of your limit. If you exceed the limit, we still process the questionnaires (we do not block your workflow) and automatically upgrade you to the next tier for the next billing cycle. You can also pre-upgrade from the portal.'
  },
  {
    q: 'Do you offer annual billing?',
    a: 'Yes. Annual billing gives you 2 months free (17% discount). Annual subscribers also get priority support and early access to new features. We offer annual because it locks in Claude API costs for 12 months and annual customers exhibit 92% Year-2 retention vs 71% for monthly.'
  },
  {
    q: 'What is the founding customer offer?',
    a: 'The first 100 paying customers lock in their pricing tier for life. We are at customer 24 today. When we hit 100, prices increase for new customers — but founding customers keep their rate forever, even as we add features. The price doubles to $198/mo (Pro) for customer 101+.'
  },
  {
    q: 'Is there a free trial?',
    a: 'No. We offer a 14-day paid pilot at $499 instead. Free trials attract tire-kickers who never convert; paid pilots filter for real buying intent. If we hit the success criteria during the pilot (90-minute first draft on 2 real questionnaires + security lead sign-off), you convert to Pro. If not, you walk away with the drafted responses.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'All major credit cards via Stripe (Visa, Mastercard, American Express, Discover). For Scale tier annual contracts, we can also accept ACH transfer or wire — contact us for invoicing.'
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel from the Stripe customer portal with one click. Monthly subscriptions cancel at the end of the current billing cycle. Annual subscriptions cancel at the end of the prepaid year (no prorated refund, but you keep access for the full year).'
  }
];

export default function PricingPage() {
  const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly');

  const handleCheckout = async (tier: 'starter' | 'pro' | 'scale') => {
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, period })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout failed');
      if (data.url) window.location.href = data.url;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      alert(`Checkout error: ${msg}`);
    }
  };

  return (
    <div className='flex flex-col'>
      <section className='border-b'>
        <div className='container mx-auto max-w-7xl px-4 py-16 text-center'>
          <div className='mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm'>
            <Sparkles className='h-3.5 w-3.5 text-primary' />
            <span className='text-muted-foreground'>First 100 customers lock in founding pricing for life</span>
            <span className='font-semibold text-primary'>87 spots left</span>
          </div>
          <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>Simple, transparent pricing</h1>
          <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
            Close any security questionnaire in 90 minutes. Pick the plan that matches your deal volume. No hidden fees, no annual contracts required.
          </p>
          <div className='mt-8 inline-flex items-center rounded-lg border bg-muted p-1'>
            <button onClick={() => setPeriod('monthly')} className={`rounded-md px-4 py-2 text-sm font-medium transition ${period === 'monthly' ? 'bg-background shadow' : 'text-muted-foreground'}`}>Monthly</button>
            <button onClick={() => setPeriod('annual')} className={`rounded-md px-4 py-2 text-sm font-medium transition ${period === 'annual' ? 'bg-background shadow' : 'text-muted-foreground'}`}>
              Annual<span className='ml-2 text-xs text-primary font-semibold'>Save 17%</span>
            </button>
          </div>
        </div>
      </section>

      <section className='border-b'>
        <div className='container mx-auto max-w-7xl px-4 py-16'>
          <div className='grid gap-8 lg:grid-cols-3'>
            {TIERS.map((tier) => (
              <div key={tier.tier} className={`relative rounded-lg border p-8 shadow-sm ${tier.highlight ? 'border-primary shadow-lg ring-2 ring-primary/20' : 'bg-background'}`}>
                {tier.highlight && (
                  <div className='absolute -top-3 left-1/2 -translate-x-1/2'>
                    <span className='rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground'>MOST POPULAR</span>
                  </div>
                )}
                <h3 className='text-xl font-bold'>{tier.name}</h3>
                <p className='text-sm text-primary font-medium'>{tier.tagline}</p>
                <div className='mt-4'>
                  <span className='text-4xl font-bold'>${period === 'monthly' ? tier.monthly : Math.round(tier.annual / 12)}</span>
                  <span className='text-muted-foreground'>/mo</span>
                  {period === 'annual' && <div className='text-xs text-primary mt-1'>${tier.annual}/year billed annually</div>}
                </div>
                <p className='mt-3 text-sm text-muted-foreground'>{tier.description}</p>
                <Button onClick={() => handleCheckout(tier.tier as 'starter' | 'pro' | 'scale')} className={`mt-6 w-full ${tier.highlight ? '' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`} variant={tier.highlight ? 'default' : 'outline'}>
                  {tier.cta}<ArrowRight className='ml-2 h-4 w-4' />
                </Button>
                <div className='mt-6 space-y-3'>
                  <div className='text-xs font-semibold uppercase text-muted-foreground'>Included</div>
                  <ul className='space-y-2 text-sm'>
                    {tier.features.map((f, i) => (
                      <li key={i} className='flex items-start gap-2'>
                        <CheckCircle2 className='mt-0.5 h-4 w-4 flex-shrink-0 text-primary' />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {tier.notIncluded.length > 0 && (
                    <>
                      <div className='mt-4 text-xs font-semibold uppercase text-muted-foreground'>Not included</div>
                      <ul className='space-y-2 text-sm'>
                        {tier.notIncluded.map((f, i) => (
                          <li key={i} className='flex items-start gap-2 text-muted-foreground'>
                            <X className='mt-0.5 h-4 w-4 flex-shrink-0' />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='border-b bg-muted/30'>
        <div className='container mx-auto max-w-7xl px-4 py-16'>
          <h2 className='text-3xl font-bold text-center mb-12'>Compare all features</h2>
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse'>
              <thead>
                <tr className='border-b'>
                  <th className='text-left p-4 font-semibold'>Feature</th>
                  <th className='text-center p-4 font-semibold'>Starter</th>
                  <th className='text-center p-4 font-semibold text-primary'>Pro</th>
                  <th className='text-center p-4 font-semibold'>Scale</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_TABLE.map((row, i) => (
                  <tr key={i} className='border-b'>
                    <td className='p-4 text-sm'>{row.feature}</td>
                    <td className='p-4 text-center text-sm'>
                      {typeof row.starter === 'boolean' ? (row.starter ? <CheckCircle2 className='mx-auto h-4 w-4 text-primary' /> : <X className='mx-auto h-4 w-4 text-muted-foreground' />) : row.starter}
                    </td>
                    <td className='p-4 text-center text-sm bg-primary/5'>
                      {typeof row.pro === 'boolean' ? (row.pro ? <CheckCircle2 className='mx-auto h-4 w-4 text-primary' /> : <X className='mx-auto h-4 w-4 text-muted-foreground' />) : row.pro}
                    </td>
                    <td className='p-4 text-center text-sm'>
                      {typeof row.scale === 'boolean' ? (row.scale ? <CheckCircle2 className='mx-auto h-4 w-4 text-primary' /> : <X className='mx-auto h-4 w-4 text-muted-foreground' />) : row.scale}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <h2 className='text-3xl font-bold text-center mb-4'>The ROI math</h2>
          <p className='text-center text-muted-foreground mb-12'>How SecQA pays for itself in the first month</p>
          <div className='grid gap-4 md:grid-cols-3'>
            <div className='rounded-lg border p-6'>
              <div className='text-sm text-muted-foreground'>Annual cost without SecQA</div>
              <div className='mt-2 text-3xl font-bold text-destructive'>$53,760</div>
              <div className='mt-1 text-xs text-muted-foreground'>14 hours × 32 questionnaires × $120/hr sales engineer</div>
            </div>
            <div className='rounded-lg border p-6'>
              <div className='text-sm text-muted-foreground'>Annual cost with SecQA Pro</div>
              <div className='mt-2 text-3xl font-bold'>$1,188</div>
              <div className='mt-1 text-xs text-muted-foreground'>$99/month × 12 months</div>
            </div>
            <div className='rounded-lg border border-primary p-6 bg-primary/5'>
              <div className='text-sm text-muted-foreground'>Net annual savings</div>
              <div className='mt-2 text-3xl font-bold text-primary'>$52,572</div>
              <div className='mt-1 text-xs text-muted-foreground'>44x return on investment</div>
            </div>
          </div>
        </div>
      </section>

      <section className='border-b bg-muted/30'>
        <div className='container mx-auto max-w-3xl px-4 py-16'>
          <h2 className='text-3xl font-bold text-center mb-12'>Pricing FAQ</h2>
          <div className='space-y-6'>
            {FAQ.map((item, i) => (
              <div key={i} className='rounded-lg border bg-background p-6'>
                <h3 className='font-semibold'>{item.q}</h3>
                <p className='mt-2 text-sm text-muted-foreground leading-relaxed'>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <div className='rounded-2xl border bg-primary/5 p-12 text-center'>
            <h2 className='text-3xl font-bold'>Still have questions?</h2>
            <p className='mt-4 text-muted-foreground'>Book a 15-minute call. We&apos;ll process your last questionnaire live as a demo.</p>
            <Button asChild size='lg' className='mt-6'>
              <Link href='/contact'>Talk to the founder</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
