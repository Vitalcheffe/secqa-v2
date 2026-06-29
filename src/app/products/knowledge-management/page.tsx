import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Knowledge Management — SecQA Product',
  description: 'Centralized answer library for all your compliance and security content.'
};

const FEATURES = [
  { title: 'Answer library', desc: 'Store past approved answers from every questionnaire, RFP, and security review.' },
  { title: 'AI-powered retrieval', desc: 'RAG retrieves the top 5 most similar past answers. Claude drafts grounded in those sources.' },
  { title: 'Version control', desc: 'Every answer has a version history. Update once and every future questionnaire uses the new version.' },
  { title: 'Approval workflow', desc: 'Drafts route to your security lead for approval. Approved answers become the new source of truth.' },
  { title: 'Usage analytics', desc: 'See which answers are used most, which are stale, which need updating.' },
  { title: 'Bulk import', desc: 'Import 1000+ past answers from CSV, Google Docs, or Confluence. We parse and tag automatically.' }
];

export default function ProductPage() {
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
      <section style={{ background: '#222831', color: '#EEEEEE', padding: '5rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1.5rem' }}>Knowledge Management</h1>
        <p style={{ fontSize: '1.2rem', color: 'rgba(238,238,238,0.7)', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.6 }}>One source of truth for every compliance answer. AI retrieves the right answer for every question.</p>
        <Link href='/pricing' style={{ background: '#00ADB5', color: '#EEEEEE', padding: '0.7rem 1.6rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>Get started <ArrowRight size={16} /></Link>
      </section>
      <section style={{ padding: '5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '3rem', textAlign: 'center' }}>Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {FEATURES.map((f, i) => (
            <div key={`f-${i}`} style={{ background: '#393E46', color: '#EEEEEE', borderRadius: '12px', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.5rem' }}>{f.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{ background: '#222831', color: '#EEEEEE', padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Ready to try?</h2>
        <p style={{ color: 'rgba(238,238,238,0.7)', marginBottom: '1.5rem' }}>14-day paid pilot at $499.</p>
        <Link href='/pricing' style={{ background: '#00ADB5', color: '#EEEEEE', padding: '0.7rem 1.6rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>Start your pilot <ArrowRight size={16} /></Link>
      </section>
      <footer style={{ background: '#222831', padding: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(238,238,238,0.4)' }}>
        © 2026 SecQA. Security questionnaires, answered.
      </footer>
    </div>
  );
}
