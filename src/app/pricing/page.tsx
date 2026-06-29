'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';

const TIERS = [
  {
    name: 'Starter',
    tier: 'starter',
    monthly: 49,
    annual: 490,
    tagline: 'For solo founders',
    description: 'Under 5 questionnaires per month. Core workflow without collaboration.',
    features: [
      'Up to 5 questionnaires/month',
      'RAG over past questionnaires',
      'Claude first-draft generation',
      'Word/Excel/CSV export',
      'Email support (24h SLA)',
      '1 user seat'
    ],
    notIncluded: ['HubSpot integration', 'Slack support', 'Salesforce integration', 'Custom templates'],
    cta: 'Start with Starter',
    highlight: false
  },
  {
    name: 'Pro',
    tier: 'pro',
    monthly: 99,
    annual: 990,
    tagline: 'Most popular',
    description: 'SaaS $1M–$10M ARR with 1–3 sales engineers handling 10–15 deals per quarter.',
    features: [
      'Up to 20 questionnaires/month',
      'Everything in Starter, plus:',
      'HubSpot deal integration',
      'SOC2/CAIQ/SIG answer library (50)',
      'Quarterly library audit',
      'Slack support (4h SLA)',
      '3 user seats',
      'Source citation tracking',
      '90%-complete-first-draft guarantee'
    ],
    notIncluded: ['Salesforce integration', 'Custom template matching', 'Dedicated Slack channel'],
    cta: 'Start with Pro',
    highlight: true
  },
  {
    name: 'Scale',
    tier: 'scale',
    monthly: 299,
    annual: 2990,
    tagline: 'For $10M–$50M ARR',
    description: 'Dedicated sales engineering function, 30+ enterprise deals per quarter.',
    features: [
      'Unlimited (100/month fair use)',
      'Everything in Pro, plus:',
      'Salesforce integration',
      'Custom template matching (top 5)',
      'Dedicated Slack (1h SLA)',
      'Monthly office hours',
      '10 user seats',
      'Priority feature requests',
      'White-glove onboarding'
    ],
    notIncluded: [],
    cta: 'Start with Scale',
    highlight: false
  }
];

const FAQ = [
  { q: 'What is the 90%-complete-first-draft guarantee?', a: 'If our tool does not produce a 90%-complete first-draft response within 90 minutes on your first 3 paid questionnaires, we refund your current month in full and credit you the next month free.' },
  { q: 'Can I switch tiers later?', a: 'Yes. Upgrade or downgrade anytime from the Stripe customer portal. Upgrades take effect immediately; downgrades at next billing cycle.' },
  { q: 'What happens if I exceed my monthly limit?', a: 'We email you at 80%. If you exceed, we still process and auto-upgrade you for the next cycle. No workflow blocking.' },
  { q: 'Do you offer annual billing?', a: 'Yes. 17% discount (2 months free). Annual locks in Claude API costs for 12 months. Annual customers show 92% Year-2 retention vs 71% monthly.' },
  { q: 'What is the founding customer offer?', a: 'First 100 customers lock in their pricing tier for life. We are at customer 24. Price doubles for customer 101+.' },
  { q: 'Is there a free trial?', a: 'No. We offer a 14-day paid pilot at $499 instead. Free trials attract tire-kickers; paid pilots filter for real buying intent.' }
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
      alert(`Checkout error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <div style={{ background: '#EEEEEE', color: '#222831', fontFamily: 'Inter, sans-serif' }}>
      {/* NAV */}
      <nav style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1280px', margin: '0 auto' }}>
        <Link href='/' style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div style={{ width: '36px', height: '36px', background: '#00ADB5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EEEEEE', fontWeight: 800, fontSize: '0.9rem' }}>SQ</div>
          <span style={{ color: '#222831', fontWeight: 700, fontSize: '1.15rem' }}>SecQA</span>
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href='/pricing' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Pricing</Link>
          <Link href='/integrations' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Integrations</Link>
          <Link href='/customers' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Customers</Link>
          <Link href='/auth/sign-in' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Log In</Link>
          <Link href='/pricing' style={{ background: '#00ADB5', color: '#EEEEEE', padding: '0.55rem 1.2rem', borderRadius: '6px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>Request a Demo</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: '#222831', color: '#EEEEEE', padding: '5rem 2rem 4rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 1rem' }}>
            Simple, transparent <span style={{ color: '#00ADB5' }}>pricing</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'rgba(238,238,238,0.7)', maxWidth: '560px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Pick the plan that matches your deal volume. First 100 customers lock founding pricing for life.
          </p>
          <div style={{ display: 'inline-flex', background: '#393E46', borderRadius: '8px', padding: '4px' }}>
            <button onClick={() => setPeriod('monthly')} style={{ background: period === 'monthly' ? '#00ADB5' : 'transparent', color: '#EEEEEE', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>Monthly</button>
            <button onClick={() => setPeriod('annual')} style={{ background: period === 'annual' ? '#00ADB5' : 'transparent', color: '#EEEEEE', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>
              Annual <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Save 17%</span>
            </button>
          </div>
        </div>
      </section>

      {/* TIER CARDS */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {TIERS.map((tier) => (
            <div key={tier.tier} style={{
              background: tier.highlight ? '#222831' : '#393E46',
              color: '#EEEEEE',
              borderRadius: '12px',
              padding: '2rem',
              position: 'relative',
              border: tier.highlight ? '2px solid #00ADB5' : 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              {tier.highlight && (
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#00ADB5', color: '#EEEEEE', padding: '0.3rem 0.9rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>MOST POPULAR</div>
              )}
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0 0 0.3rem' }}>{tier.name}</h3>
              <p style={{ fontSize: '0.85rem', color: '#00ADB5', fontWeight: 600, margin: '0 0 1.2rem' }}>{tier.tagline}</p>
              <div style={{ marginBottom: '1.2rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>${period === 'monthly' ? tier.monthly : Math.round(tier.annual / 12)}</span>
                <span style={{ color: 'rgba(238,238,238,0.6)', fontSize: '0.95rem' }}>/mo</span>
                {period === 'annual' && <div style={{ fontSize: '0.75rem', color: '#00ADB5', marginTop: '0.3rem' }}>${tier.annual}/year billed annually</div>}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.5, marginBottom: '1.5rem' }}>{tier.description}</p>
              <button onClick={() => handleCheckout(tier.tier as 'starter' | 'pro' | 'scale')} style={{
                width: '100%',
                background: tier.highlight ? '#00ADB5' : 'transparent',
                color: '#EEEEEE',
                border: tier.highlight ? 'none' : '1px solid rgba(238,238,238,0.3)',
                padding: '0.7rem',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem'
              }}>
                {tier.cta} <ArrowRight size={15} />
              </button>
              <ul style={{ listStyle: 'none', padding: 0, margin: '1.5rem 0 0', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {tier.features.map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'start', gap: '0.5rem', fontSize: '0.85rem' }}>
                    <CheckCircle2 size={15} color='#00ADB5' style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{f}</span>
                  </li>
                ))}
                {tier.notIncluded.map((f, i) => (
                  <li key={`n${i}`} style={{ display: 'flex', alignItems: 'start', gap: '0.5rem', fontSize: '0.85rem', color: 'rgba(238,238,238,0.4)' }}>
                    <X size={15} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ROI BAND */}
      <section style={{ background: '#222831', color: '#EEEEEE', padding: '3.5rem 2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', textAlign: 'center' }}>
          <div><div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#EEEEEE' }}>$53,760</div><div style={{ fontSize: '0.85rem', color: 'rgba(238,238,238,0.6)', marginTop: '0.4rem' }}>Annual cost without SecQA</div></div>
          <div style={{ borderLeft: '1px solid rgba(238,238,238,0.1)', borderRight: '1px solid rgba(238,238,238,0.1)' }}><div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#EEEEEE' }}>$1,188</div><div style={{ fontSize: '0.85rem', color: 'rgba(238,238,238,0.6)', marginTop: '0.4rem' }}>Annual cost with Pro</div></div>
          <div><div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#00ADB5' }}>44x</div><div style={{ fontSize: '0.85rem', color: 'rgba(238,238,238,0.6)', marginTop: '0.4rem' }}>Return on investment</div></div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '4rem 2rem', maxWidth: '760px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', textAlign: 'center', marginBottom: '2.5rem' }}>Pricing FAQ</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {FAQ.map((item, i) => (
            <div key={i} style={{ background: '#393E46', color: '#EEEEEE', borderRadius: '8px', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.5rem' }}>{item.q}</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.6, margin: 0 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#222831', color: '#EEEEEE', padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 1rem' }}>Still have questions?</h2>
        <p style={{ color: 'rgba(238,238,238,0.7)', marginBottom: '1.5rem' }}>Book a 15-minute call. We&apos;ll process your last questionnaire live as a demo.</p>
        <Link href='/contact' style={{ background: '#00ADB5', color: '#EEEEEE', padding: '0.7rem 1.6rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>Talk to the founder <ArrowRight size={16} /></Link>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#222831', padding: '2rem', borderTop: '1px solid rgba(238,238,238,0.08)', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(238,238,238,0.4)' }}>
        © 2026 SecQA. Security questionnaires, answered.
      </footer>
    </div>
  );
}
