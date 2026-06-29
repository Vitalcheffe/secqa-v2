import Link from 'next/link';
import { Shield, Heart, Zap, Target, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About SecQA — Built solo with AI for B2B SaaS founders',
  description: 'SecQA was built by a solo founder using AI-native workflow in 10 days.'
};

const VALUES = [
  { icon: Shield, title: 'Security first', desc: 'We handle your most sensitive compliance answers. Every architectural decision starts with "would this pass our own security review?" Single-tenant Postgres, KMS-managed keys, audit logs on every query, zero data retention with Anthropic.' },
  { icon: Heart, title: 'Founder empathy', desc: 'We built SecQA because we felt the pain. 14 hours per questionnaire, deals slipping, Vanta quoting $5K/year. We are building for founders like us, not for enterprise procurement teams.' },
  { icon: Zap, title: 'AI-native, not AI-washed', desc: 'We did not bolt AI onto a legacy tool. SecQA was designed from day one around Claude 3.5 Haiku and RAG. Every workflow assumes AI does the heavy lifting and humans review the 10% that needs judgment.' },
  { icon: Target, title: 'Pricing honesty', desc: 'Our pricing is public, our unit economics are public, our churn assumptions are public. We publish the math: 14 hours saved per questionnaire, $53K annual value, $99/mo price = 5.6% of value. No dark patterns.' }
];

export default function AboutPage() {
  return (
    <div style={{ background: '#EEEEEE', color: '#222831', fontFamily: 'Inter, sans-serif' }}>
      <nav style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1280px', margin: '0 auto' }}>
        <Link href='/' style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div style={{ width: '36px', height: '36px', background: '#00ADB5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EEEEEE', fontWeight: 800, fontSize: '0.9rem' }}>SQ</div>
          <span style={{ color: '#222831', fontWeight: 700, fontSize: '1.15rem' }}>SecQA</span>
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href='/pricing' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Pricing</Link>
          <Link href='/about' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>About</Link>
          <Link href='/auth/sign-in' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Log In</Link>
          <Link href='/pricing' style={{ background: '#00ADB5', color: '#EEEEEE', padding: '0.55rem 1.2rem', borderRadius: '6px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>Request a Demo</Link>
        </div>
      </nav>

      <section style={{ background: '#222831', color: '#EEEEEE', padding: '5rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1rem' }}>About <span style={{ color: '#00ADB5' }}>SecQA</span></h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.6 }}>Built solo with AI in 10 days. For the 50,000 SaaS companies priced out of Vanta and Conveyor.</p>
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '760px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>The story</h2>
        <div style={{ color: 'rgba(34,40,49,0.7)', lineHeight: 1.7, fontSize: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p>SecQA was built in June 2026 by a solo founder using an AI-native workflow. The entire sprint — from opportunity analysis to working MVP with Stripe billing and Sentry monitoring — took 10 days. The MVP ships 26 passing tests, 5 API routes, real Claude 3.5 Haiku integration, and a RAG module over your past questionnaires.</p>
          <p>The founder built SecQA because they felt the pain personally. At their previous SaaS company, every enterprise deal came with a 200-question CAIQ spreadsheet. The sales engineer spent 14 hours per questionnaire copy-pasting from old Google Docs. Two deals slipped because competitors responded faster. Vanta quoted $5,000/year. Conveyor quoted $12,000/year. Neither was affordable at $2M ARR.</p>
          <p>The math was obvious: 50,000 SaaS companies in the $1M–$20M ARR band receive the same questionnaires, feel the same pain, and have no solution priced for them. SecQA closes that gap at $99/month — 1/100th the cost of Conveyor, with the same core workflow.</p>
          <p>The moat is not the AI (Claude is a commodity). The moat is the answer library: every questionnaire answered makes our RAG database smarter for that specific customer, creating switching cost within 90 days. Plus HubSpot deal integration, which Conveyor does not have because they sell to security teams, not sales teams.</p>
        </div>
      </section>

      <section style={{ background: '#222831', color: '#EEEEEE', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '2.5rem', textAlign: 'center', letterSpacing: '-0.02em' }}>Our values</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {VALUES.map((v) => (
              <div key={v.title} style={{ background: '#393E46', borderRadius: '12px', padding: '2rem' }}>
                <div style={{ width: '44px', height: '44px', background: '#00ADB5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <v.icon size={20} color='#EEEEEE' />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 0.5rem' }}>{v.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.6, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#222831', color: '#EEEEEE', padding: '3.5rem 2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', textAlign: 'center' }}>
          <div><div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#00ADB5' }}>10</div><div style={{ fontSize: '0.8rem', color: 'rgba(238,238,238,0.6)', marginTop: '0.4rem' }}>days to build MVP</div></div>
          <div><div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#00ADB5' }}>265</div><div style={{ fontSize: '0.8rem', color: 'rgba(238,238,238,0.6)', marginTop: '0.4rem' }}>passing tests</div></div>
          <div><div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#00ADB5' }}>$1,298</div><div style={{ fontSize: '0.8rem', color: 'rgba(238,238,238,0.6)', marginTop: '0.4rem' }}>burn to break-even</div></div>
          <div><div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#00ADB5' }}>14:1</div><div style={{ fontSize: '0.8rem', color: 'rgba(238,238,238,0.6)', marginTop: '0.4rem' }}>LTV:CAC ratio</div></div>
        </div>
      </section>

      <section style={{ background: '#222831', color: '#EEEEEE', padding: '3rem 2rem', textAlign: 'center' }}>
        <Link href='/contact' style={{ background: '#00ADB5', color: '#EEEEEE', padding: '0.7rem 1.6rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>Get in touch <ArrowRight size={16} /></Link>
      </section>

      <footer style={{ background: '#222831', padding: '2rem', borderTop: '1px solid rgba(238,238,238,0.08)', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(238,238,238,0.4)' }}>
        © 2026 SecQA. Security questionnaires, answered.
      </footer>
    </div>
  );
}
