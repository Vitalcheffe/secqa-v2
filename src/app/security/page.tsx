import Link from 'next/link';
import { Shield, Lock, Server, Key, ScrollText, FileText, Eye, Zap, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Security — How SecQA protects your compliance data',
  description: 'Detailed security architecture: encryption, access controls, audit logging.'
};

const PILLARS = [
  { icon: Lock, t: 'Encryption', d: 'AES-256 at rest (KMS-managed, 90-day rotation). TLS 1.3 in transit. HSTS enforced. No plaintext storage.' },
  { icon: Server, t: 'Infrastructure', d: 'Single-tenant Postgres on Supabase (SOC2 Type 2). S3 with KMS-managed keys. Vercel (SOC2 Type 2). All in us-east-1.' },
  { icon: Key, t: 'Access control', d: 'RBAC with least-privilege. MFA enforced for all admin accounts. Access revoked within 4 hours of role change.' },
  { icon: ScrollText, t: 'Audit logging', d: 'Every DB query logged. Every API call logged. Logs retained 1 year. Tamper-evident storage.' },
  { icon: Eye, t: 'Monitoring', d: 'Sentry for error monitoring. Anomaly detection on access patterns. Alerting on unusual query volumes.' },
  { icon: Zap, t: 'Incident response', d: 'Documented IR plan. 1-hour escalation for critical incidents. 24-hour customer notification. Post-mortem within 7 days.' }
];

export default function SecurityPage() {
  return (
    <div style={{ background: '#EEEEEE', color: '#222831', fontFamily: 'Inter, sans-serif' }}>
      <nav style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1280px', margin: '0 auto' }}>
        <Link href='/' style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div style={{ width: '36px', height: '36px', background: '#00ADB5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EEEEEE', fontWeight: 800, fontSize: '0.9rem' }}>SQ</div>
          <span style={{ color: '#222831', fontWeight: 700, fontSize: '1.15rem' }}>SecQA</span>
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href='/pricing' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Pricing</Link>
          <Link href='/security' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Security</Link>
          <Link href='/auth/sign-in' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Log In</Link>
          <Link href='/pricing' style={{ background: '#00ADB5', color: '#EEEEEE', padding: '0.55rem 1.2rem', borderRadius: '6px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>Request a Demo</Link>
        </div>
      </nav>

      <section style={{ background: '#222831', color: '#EEEEEE', padding: '5rem 2rem', textAlign: 'center' }}>
        <Shield size={48} color='#00ADB5' />
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '1rem 0 1rem' }}>Security</h1>
        <p style={{ fontSize: '1.15rem', color: 'rgba(238,238,238,0.7)', maxWidth: '600px', margin: '0 auto' }}>We handle your most sensitive compliance answers. Security is not a feature — it is the foundation.</p>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {PILLARS.map((p) => (
            <div key={p.t} style={{ background: '#393E46', color: '#EEEEEE', borderRadius: '12px', padding: '2rem' }}>
              <div style={{ width: '44px', height: '44px', background: '#00ADB5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <p.icon size={20} color='#EEEEEE' />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.5rem' }}>{p.t}</h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.6, margin: 0 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#222831', color: '#EEEEEE', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.5rem' }}>Architecture</h2>
          <pre style={{ background: '#393E46', padding: '1.5rem', borderRadius: '8px', fontSize: '0.8rem', overflowX: 'auto', color: 'rgba(238,238,238,0.8)', lineHeight: 1.5 }}>{`Customer Browser
    │
    ▼ (TLS 1.3)
Vercel Edge Network
    │
    ▼ (VPC peering)
Next.js 16 App (serverless)
    │
    ├──► Supabase Postgres (single-tenant, AES-256, KMS)
    │
    ├──► Anthropic Claude API (zero data retention)
    │
    ├──► Stripe API (PCI DSS Level 1)
    │
    └──► Sentry (error monitoring, PII filtered)`}</pre>
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '760px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.5rem' }}>Compliance status</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {[
            { t: 'SOC2 Type 2', s: 'In progress with Vanta', v: 'Q1 2027', active: false },
            { t: 'GDPR', s: 'Compliant. EU data residency option available.', v: 'Active', active: true },
            { t: 'CCPA', s: 'Compliant. Do Not Sell signal honored.', v: 'Active', active: true },
            { t: 'HIPAA', s: 'Not currently. Roadmap Q2 2027.', v: 'Not yet', active: false },
            { t: 'ISO 27001', s: 'Roadmap Q3 2027.', v: 'Planned', active: false }
          ].map((c) => (
            <div key={c.t} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#393E46', color: '#EEEEEE', padding: '1rem 1.5rem', borderRadius: '8px' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{c.t}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(238,238,238,0.6)' }}>{c.s}</div>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: c.active ? '#00ADB5' : 'rgba(238,238,238,0.5)' }}>{c.v}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#222831', color: '#EEEEEE', padding: '4rem 2rem', textAlign: 'center' }}>
        <FileText size={40} color='#00ADB5' />
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '1rem', marginBottom: '0.5rem' }}>Security documentation</h2>
        <p style={{ color: 'rgba(238,238,238,0.7)', marginBottom: '1.5rem' }}>Security whitepaper, DPA template, and architecture review available under NDA.</p>
        <Link href='/contact' style={{ background: '#00ADB5', color: '#EEEEEE', padding: '0.7rem 1.6rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>Request documentation <ArrowRight size={16} /></Link>
      </section>

      <footer style={{ background: '#222831', padding: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(238,238,238,0.4)' }}>
        © 2026 SecQA. Security questionnaires, answered.
      </footer>
    </div>
  );
}
