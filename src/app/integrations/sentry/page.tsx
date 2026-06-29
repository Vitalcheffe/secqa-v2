import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Sentry Integration — SecQA',
  description: 'SecQA uses Sentry for error monitoring.'
};

export default function SentryIntegrationPage() {
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
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚨</div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 0.5rem' }}>Sentry + SecQA</h1>
        <p style={{ fontSize: '1.1rem', color: 'rgba(238,238,238,0.7)', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.6 }}>SecQA uses Sentry for error monitoring.</p>
        <Link href='/pricing' style={{ background: '#00ADB5', color: '#EEEEEE', padding: '0.7rem 1.6rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>Get started <ArrowRight size={16} /></Link>
      </section>
      <section style={{ padding: '4rem 2rem', maxWidth: '760px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.5rem' }}>Features</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <li style={ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(238,238,238,0.8)' }><span style={ color: '#00ADB5' }>&#10003;</span><span>Error tracking</span></li>
          <li style={ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(238,238,238,0.8)' }><span style={ color: '#00ADB5' }>&#10003;</span><span>Performance monitoring</span></li>
          <li style={ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(238,238,238,0.8)' }><span style={ color: '#00ADB5' }>&#10003;</span><span>Release tracking</span></li>
          <li style={ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(238,238,238,0.8)' }><span style={ color: '#00ADB5' }>&#10003;</span><span>Custom alerts</span></li>
        </ul>
      </section>
      <section style={{ background: '#222831', color: '#EEEEEE', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.5rem' }}>Setup</h2>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <li style={ display: 'flex', gap: '0.8rem', alignItems: 'start' }><span style={ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,173,181,0.2)', color: '#00ADB5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }>1</span><span style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.8)', paddingTop: '0.2rem' }>Create a Sentry project at sentry.io</span></li>
          <li style={ display: 'flex', gap: '0.8rem', alignItems: 'start' }><span style={ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,173,181,0.2)', color: '#00ADB5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }>2</span><span style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.8)', paddingTop: '0.2rem' }>Copy the DSN</span></li>
          <li style={ display: 'flex', gap: '0.8rem', alignItems: 'start' }><span style={ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,173,181,0.2)', color: '#00ADB5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }>3</span><span style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.8)', paddingTop: '0.2rem' }>Add to SecQA dashboard, Integrations, Sentry</span></li>
          <li style={ display: 'flex', gap: '0.8rem', alignItems: 'start' }><span style={ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,173,181,0.2)', color: '#00ADB5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }>4</span><span style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.8)', paddingTop: '0.2rem' }>Configure alert rules</span></li>
          </ol>
        </div>
      </section>
      <section style={{ background: '#222831', color: '#EEEEEE', padding: '3rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>Ready to connect Sentry?</h2>
        <p style={{ color: 'rgba(238,238,238,0.7)', marginBottom: '1.5rem' }}>Start your 14-day pilot at $499.</p>
        <Link href='/pricing' style={{ background: '#00ADB5', color: '#EEEEEE', padding: '0.7rem 1.6rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>Start your pilot <ArrowRight size={16} /></Link>
      </section>
      <footer style={{ background: '#222831', padding: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(238,238,238,0.4)' }}>
        © 2026 SecQA. Security questionnaires, answered.
      </footer>
    </div>
  );
}
