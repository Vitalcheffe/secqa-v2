import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'SecQA vs Drata — Comparison',
  description: 'Detailed comparison: SecQA vs Drata.'
};

export default function ComparisonPage() {
  return (
    <div style={{ background: '#EEEEEE', color: '#222831', fontFamily: 'Inter, sans-serif' }}>
      <nav style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1280px', margin: '0 auto' }}>
        <Link href='/' style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div style={{ width: '36px', height: '36px', background: '#00ADB5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EEEEEE', fontWeight: 800, fontSize: '0.9rem' }}>SQ</div>
          <span style={{ color: '#222831', fontWeight: 700, fontSize: '1.15rem' }}>SecQA</span>
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href='/pricing' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Pricing</Link>
          <Link href='/integrations' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Integrations</Link>
          <Link href='/auth/sign-in' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Log In</Link>
          <Link href='/pricing' style={{ background: '#00ADB5', color: '#EEEEEE', padding: '0.55rem 1.2rem', borderRadius: '6px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>Request a Demo</Link>
        </div>
      </nav>
      <section style={{ background: '#222831', color: '#EEEEEE', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1rem' }}>SecQA vs <span style={{ color: '#00ADB5' }}>Drata</span></h1>
        <p style={{ fontSize: '1.1rem', color: 'rgba(238,238,238,0.7)', maxWidth: '600px', margin: '0 auto' }}>A factual comparison for B2B SaaS founders.</p>
      </section>
      <section style={{ padding: '3rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div style={{ background: '#222831', color: '#EEEEEE', borderRadius: '12px', padding: '2rem', border: '2px solid #00ADB5' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1.2rem', margin: '0 0 0.5rem' }}>SecQA</h3>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#00ADB5', margin: '0.5rem 0' }}>$99/month</div>
            <p style={{ fontSize: '0.85rem', color: 'rgba(238,238,238,0.7)' }}>Built for SaaS $1M-$20M ARR</p>
          </div>
          <div style={{ background: '#393E46', color: '#EEEEEE', borderRadius: '12px', padding: '2rem' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1.2rem', margin: '0 0 0.5rem' }}>Drata</h3>
            <div style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0' }}>$10,000+/year</div>
            <p style={{ fontSize: '0.85rem', color: 'rgba(238,238,238,0.7)' }}>Continuous compliance monitoring</p>
          </div>
        </div>
      </section>
      <section style={{ background: '#222831', color: '#EEEEEE', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Where SecQA wins</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem' }}><span style={{ color: '#00ADB5' }}>&#10003;</span><span>Priced for SaaS $1M-$20M ARR</span></li>
              <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem' }}><span style={{ color: '#00ADB5' }}>&#10003;</span><span>Self-serve checkout, no sales calls</span></li>
              <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem' }}><span style={{ color: '#00ADB5' }}>&#10003;</span><span>14-day paid pilot at $499</span></li>
              <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem' }}><span style={{ color: '#00ADB5' }}>&#10003;</span><span>HubSpot deal integration</span></li>
              <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem' }}><span style={{ color: '#00ADB5' }}>&#10003;</span><span>90%-complete-first-draft guarantee</span></li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontWeight: 700, marginBottom: '1rem', color: 'rgba(238,238,238,0.6)' }}>Where Drata wins</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem', color: 'rgba(238,238,238,0.5)' }}><span>&#10003;</span><span>More mature product</span></li>
              <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem', color: 'rgba(238,238,238,0.5)' }}><span>&#10003;</span><span>Larger integration ecosystem</span></li>
              <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem', color: 'rgba(238,238,238,0.5)' }}><span>&#10003;</span><span>Brand recognition in enterprise</span></li>
              <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem', color: 'rgba(238,238,238,0.5)' }}><span>&#10003;</span><span>Dedicated implementation team</span></li>
            </ul>
          </div>
        </div>
      </section>
      <section style={{ padding: '3rem 2rem', maxWidth: '760px', margin: '0 auto' }}>
        <h3 style={{ fontWeight: 700, marginBottom: '0.8rem' }}>Which is best for you?</h3>
        <p style={{ fontSize: '0.9rem', color: 'rgba(34,40,49,0.7)', lineHeight: 1.6 }}>Choose Drata if you are $50M+ ARR with dedicated security team. Choose SecQA if you are $1M-$20M ARR and need questionnaire response workflow at a price that makes sense.</p>
      </section>
      <section style={{ background: '#222831', color: '#EEEEEE', padding: '3rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>Try SecQA</h2>
        <p style={{ color: 'rgba(238,238,238,0.7)', marginBottom: '1.5rem' }}>14-day paid pilot at $499.</p>
        <Link href='/pricing' style={{ background: '#00ADB5', color: '#EEEEEE', padding: '0.7rem 1.6rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>Start your pilot <ArrowRight size={16} /></Link>
      </section>
      <footer style={{ background: '#222831', padding: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(238,238,238,0.4)' }}>
        © 2026 SecQA. Security questionnaires, answered.
      </footer>
    </div>
  );
}
