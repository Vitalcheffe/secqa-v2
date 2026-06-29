import { Shield, Lock, FileText, Server, Key, ScrollText } from 'lucide-react';

export const metadata = {
  title: 'Trust Center — SecQA security and compliance',
  description: 'Public trust center for SecQA. Security architecture, compliance status, data handling.'
};

const CONTROLS = [
  { icon: Lock, t: 'Encryption at rest', d: 'AES-256 on all customer data. KMS-managed keys with 90-day automatic rotation.', s: 'Active' },
  { icon: Shield, t: 'Encryption in transit', d: 'TLS 1.3 enforced. HSTS enabled. Legacy protocols (TLS 1.0/1.1) disabled.', s: 'Active' },
  { icon: Server, t: 'Single-tenant Postgres', d: 'Per-customer database isolation. No shared schemas. Row-level security on Scale tier.', s: 'Active' },
  { icon: Key, t: 'Key management', d: 'AWS KMS with customer-specific master keys. CMK rotation every 90 days.', s: 'Active' },
  { icon: ScrollText, t: 'Audit logging', d: 'Every database query logged. Logs retained 1 year. Tamper-evident storage.', s: 'Active' },
  { icon: FileText, t: 'SOC2 Type 2', d: 'In progress with Vanta. Estimated completion Q1 2027.', s: 'In Progress' }
];

const SUB_PROCESSORS = [
  { name: 'Anthropic', purpose: 'Claude 3.5 Haiku API', location: 'US', dpa: 'Zero data retention' },
  { name: 'AWS', purpose: 'S3, KMS', location: 'us-east-1', dpa: 'SOC2, ISO 27001, FedRAMP' },
  { name: 'Supabase', purpose: 'Postgres hosting', location: 'us-east-1', dpa: 'SOC2 Type 2' },
  { name: 'Stripe', purpose: 'Payment processing', location: 'US', dpa: 'PCI DSS Level 1' },
  { name: 'Vercel', purpose: 'App hosting + CDN', location: 'Global edge', dpa: 'SOC2 Type 2' },
  { name: 'Sentry', purpose: 'Error monitoring', location: 'US/EU', dpa: 'GDPR compliant' }
];

export default function TrustCenterPage() {
  return (
    <div style={{ background: '#EEEEEE', color: '#222831', fontFamily: 'Inter, sans-serif' }}>
      <section style={{ background: '#222831', color: '#EEEEEE', padding: '5rem 2rem 4rem', textAlign: 'center' }}>
        <Shield size={48} color='#00ADB5' />
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '1rem 0 1rem' }}>Trust Center</h1>
        <p style={{ fontSize: '1.15rem', color: 'rgba(238,238,238,0.7)', maxWidth: '600px', margin: '0 auto' }}>Security and compliance information for SecQA. Updated continuously. Last reviewed: June 2026.</p>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>Security controls</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {CONTROLS.map((c) => (
            <div key={c.t} style={{ background: '#393E46', color: '#EEEEEE', borderRadius: '12px', padding: '1.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div style={{ width: '40px', height: '40px', background: '#00ADB5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <c.icon size={18} color='#EEEEEE' />
                </div>
                <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '999px', background: c.s === 'Active' ? 'rgba(0,173,181,0.2)' : 'rgba(238,238,238,0.1)', color: c.s === 'Active' ? '#00ADB5' : 'rgba(238,238,238,0.6)', fontWeight: 600 }}>{c.s}</span>
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.5rem' }}>{c.t}</h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.5, margin: 0 }}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#222831', color: '#EEEEEE', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '2rem' }}>Sub-processors</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(238,238,238,0.1)' }}>
                  <th style={{ textAlign: 'left', padding: '0.8rem', fontSize: '0.8rem', fontWeight: 700, color: 'rgba(238,238,238,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Provider</th>
                  <th style={{ textAlign: 'left', padding: '0.8rem', fontSize: '0.8rem', fontWeight: 700, color: 'rgba(238,238,238,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Purpose</th>
                  <th style={{ textAlign: 'left', padding: '0.8rem', fontSize: '0.8rem', fontWeight: 700, color: 'rgba(238,238,238,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location</th>
                  <th style={{ textAlign: 'left', padding: '0.8rem', fontSize: '0.8rem', fontWeight: 700, color: 'rgba(238,238,238,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>DPA</th>
                </tr>
              </thead>
              <tbody>
                {SUB_PROCESSORS.map((s) => (
                  <tr key={s.name} style={{ borderBottom: '1px solid rgba(238,238,238,0.05)' }}>
                    <td style={{ padding: '0.8rem', fontWeight: 600, fontSize: '0.9rem' }}>{s.name}</td>
                    <td style={{ padding: '0.8rem', fontSize: '0.85rem', color: 'rgba(238,238,238,0.7)' }}>{s.purpose}</td>
                    <td style={{ padding: '0.8rem', fontSize: '0.85rem', color: 'rgba(238,238,238,0.7)' }}>{s.location}</td>
                    <td style={{ padding: '0.8rem', fontSize: '0.85rem', color: 'rgba(238,238,238,0.7)' }}>{s.dpa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '760px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem' }}>Data handling</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', color: 'rgba(34,40,49,0.7)', lineHeight: 1.7 }}>
          <p><strong style={{ color: '#222831' }}>Retention:</strong> Customer data retained for active subscription. Deleted within 30 days of account closure. Backups overwritten within 90 days.</p>
          <p><strong style={{ color: '#222831' }}>Deletion:</strong> Delete anytime via admin UI. Permanent within 30 days. Deletion certificate on request.</p>
          <p><strong style={{ color: '#222831' }}>Portability:</strong> Export all data in CSV format anytime from dashboard.</p>
          <p><strong style={{ color: '#222831' }}>AI training:</strong> We never use customer data to train AI models. Claude API calls use data only for immediate generation. Anthropic guarantees zero data retention.</p>
          <p><strong style={{ color: '#222831' }}>Incident response:</strong> Critical incidents escalated within 1 hour. Customers notified within 24 hours of confirmed breach per DPA.</p>
        </div>
      </section>

      <footer style={{ background: '#222831', padding: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(238,238,238,0.4)' }}>
        © 2026 SecQA. Security questionnaires, answered.
      </footer>
    </div>
  );
}
