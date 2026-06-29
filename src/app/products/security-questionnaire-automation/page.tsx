import Link from 'next/link';
import { ArrowRight, Brain, FileText, Shield, Zap, BarChart3, Lock } from 'lucide-react';

export const metadata = {
  title: 'Security Questionnaire Automation — SecQA',
  description: 'AI-powered security questionnaire automation. Upload, generate, cite, export, integrate. 90 minutes instead of 14 hours.'
};

const FEATURES = [
  { icon: FileText, title: 'Multi-format parsing', desc: 'Upload PDF, DOCX, or CSV. We extract every question in 8 seconds, even from 200-question CAIQ spreadsheets with merged cells and embedded images.' },
  { icon: Brain, title: 'AI answer drafting', desc: 'Claude 3.5 Haiku drafts answers grounded in your past approved responses and SOC2 evidence pack. 90% complete in 90 seconds. No hallucinations — every answer is sourced.' },
  { icon: Shield, title: 'Source citations', desc: 'Every drafted answer links back to the past response it was sourced from. Your security lead can verify provenance in one click, with similarity scores for transparency.' },
  { icon: Zap, title: 'One-click export', desc: 'Export to Word, PDF, or CSV with your customer\'s exact template formatting preserved. No more manual reformatting at 11pm before a deadline.' },
  { icon: BarChart3, title: 'Slack + Notion integration', desc: 'Send completion alerts to Slack. Create a Notion page with Q&A for collaborative review. Sync answers back to your knowledge base.' },
  { icon: Lock, title: 'HubSpot deal integration', desc: 'Questionnaire status auto-syncs to your HubSpot deal record. Sales managers see response time as a deal-stage gate, not a black box.' }
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
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 1.5rem' }}>
            Security questionnaire <span style={{ color: '#00ADB5' }}>automation</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.6, marginBottom: '2rem' }}>
            Upload any questionnaire. Get a 90%-complete first draft in 90 minutes. Export to your customer&apos;s format. Done.
          </p>
          <Link href='/pricing' style={{ background: '#00ADB5', color: '#EEEEEE', padding: '0.7rem 1.6rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>Get started <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section style={{ padding: '5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em', textAlign: 'center', marginBottom: '3rem' }}>Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{ background: '#393E46', color: '#EEEEEE', borderRadius: '12px', padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', background: '#00ADB5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}>
                <f.icon size={22} color='#EEEEEE' />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.6rem' }}>{f.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#222831', color: '#EEEEEE', padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Ready to try?</h2>
        <p style={{ color: 'rgba(238,238,238,0.7)', marginBottom: '1.5rem' }}>14-day paid pilot at $499. Money-back if we don&apos;t hit 90-minute first draft.</p>
        <Link href='/pricing' style={{ background: '#00ADB5', color: '#EEEEEE', padding: '0.7rem 1.6rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>Start your pilot <ArrowRight size={16} /></Link>
      </section>

      <footer style={{ background: '#222831', padding: '2rem', borderTop: '1px solid rgba(238,238,238,0.08)', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(238,238,238,0.4)' }}>
        © 2026 SecQA. Security questionnaires, answered.
      </footer>
    </div>
  );
}
