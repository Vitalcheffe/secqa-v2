import Link from 'next/link';
import { Play, FileText, Brain, Shield, Zap, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Live Demo — Try SecQA without signup',
  description: 'See SecQA process a real 187-question CAIQ questionnaire in 90 seconds.'
};

export default function DemoPage() {
  return (
    <div style={{ background: '#EEEEEE', color: '#222831', fontFamily: 'Inter, sans-serif' }}>
      <nav style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1280px', margin: '0 auto' }}>
        <Link href='/' style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div style={{ width: '36px', height: '36px', background: '#00ADB5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EEEEEE', fontWeight: 800, fontSize: '0.9rem' }}>SQ</div>
          <span style={{ color: '#222831', fontWeight: 700, fontSize: '1.15rem' }}>SecQA</span>
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href='/pricing' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Pricing</Link>
          <Link href='/demo' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Demo</Link>
          <Link href='/auth/sign-in' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Log In</Link>
          <Link href='/pricing' style={{ background: '#00ADB5', color: '#EEEEEE', padding: '0.55rem 1.2rem', borderRadius: '6px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>Request a Demo</Link>
        </div>
      </nav>

      <section style={{ background: '#222831', color: '#EEEEEE', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1rem' }}>Live Demo</h1>
        <p style={{ fontSize: '1.15rem', color: 'rgba(238,238,238,0.7)', maxWidth: '600px', margin: '0 auto' }}>Watch SecQA process a real 187-question CAIQ questionnaire in 90 seconds. No signup, no email, no commitment.</p>
      </section>

      <section style={{ padding: '3rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ background: '#222831', borderRadius: '12px', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <Play size={64} color='#00ADB5' />
            <p style={{ color: 'rgba(238,238,238,0.7)', fontSize: '0.9rem', marginTop: '1rem' }}>3-minute demo video</p>
            <p style={{ color: 'rgba(238,238,238,0.5)', fontSize: '0.75rem' }}>Upload → Parse → Generate → Cite → Export → Slack</p>
          </div>
        </div>
      </section>

      <section style={{ background: '#222831', color: '#EEEEEE', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: 800, marginBottom: '3rem' }}>What you see in the demo</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem' }}>
            {[
              { icon: FileText, n: '01', t: 'Upload', d: 'CAIQ PDF, 187 questions' },
              { icon: Brain, n: '02', t: 'Generate', d: 'Claude drafts in 90 seconds' },
              { icon: Shield, n: '03', t: 'Cite', d: 'Every answer sourced' },
              { icon: Zap, n: '04', t: 'Export', d: 'Word with template' },
              { icon: ArrowRight, n: '05', t: 'Integrate', d: 'Slack notification' }
            ].map((s) => (
              <div key={s.n}>
                <div style={{ fontSize: '0.85rem', color: '#00ADB5', fontWeight: 700, marginBottom: '0.5rem' }}>{s.n}</div>
                <s.icon size={24} color='#00ADB5' />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0.5rem 0 0.3rem' }}>{s.t}</h3>
                <p style={{ fontSize: '0.8rem', color: 'rgba(238,238,238,0.7)', margin: 0 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#222831', color: '#EEEEEE', padding: '3rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>Try with YOUR questionnaire</h2>
        <p style={{ color: 'rgba(238,238,238,0.7)', marginBottom: '1.5rem' }}>14-day paid pilot at $499. We process your next 2 real questionnaires live.</p>
        <Link href='/pricing' style={{ background: '#00ADB5', color: '#EEEEEE', padding: '0.7rem 1.6rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>Start your $499 pilot <ArrowRight size={16} /></Link>
      </section>

      <footer style={{ background: '#222831', padding: '2rem', borderTop: '1px solid rgba(238,238,238,0.08)', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(238,238,238,0.4)' }}>
        © 2026 SecQA. Security questionnaires, answered.
      </footer>
    </div>
  );
}
