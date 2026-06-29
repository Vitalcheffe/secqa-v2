export const metadata = {
  title: 'Security Policy — SecQA',
  description: 'Security Policy for SecQA. Last updated June 2026.'
};

export default function LegalPage() {
  return (
    <div style={{ background: '#EEEEEE', color: '#222831', fontFamily: 'Inter, sans-serif' }}>
      <section style={{ background: '#222831', color: '#EEEEEE', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 0.5rem' }}>Security Policy</h1>
        <p style={{ fontSize: '0.85rem', color: 'rgba(238,238,238,0.5)' }}>Last updated: June 2026</p>
      </section>
      <section style={{ padding: '4rem 2rem', maxWidth: '760px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>1. Architecture</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>AES-256 at rest (KMS, 90-day rotation). TLS 1.3 in transit. Single-tenant Postgres. RBAC with least-privilege. Audit logging on every query.</p>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>2. Infrastructure</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>Vercel (SOC2 Type 2) for app. Supabase (SOC2 Type 2) for Postgres. AWS for S3 and KMS. All in us-east-1.</p>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>3. Access Control</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>IAM roles. MFA required. No shared credentials. Access revoked within 4 hours of role change.</p>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>4. Vulnerability Management</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>Continuous scanning via Sentry and Dependabot. Critical: 7 days. High: 30 days. Medium: 90 days. Annual pen test.</p>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>5. Incident Response</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>4 severity levels. Critical (P0) escalated within 1 hour. Customer notification within 24 hours. Post-mortem within 7 days.</p>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>6. Compliance</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>SOC2 Type 2: Q1 2027. GDPR: compliant. CCPA: compliant. HIPAA: Q2 2027. ISO 27001: Q3 2027.</p>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>7. Sub-processors</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>All maintain SOC2 or equivalent. Reviewed annually. 30 days notice before adding new.</p>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>8. Data Handling</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>Encrypted at rest and in transit. Decrypted only in memory during processing. Never written to disk in plaintext. AI training: never.</p>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>9. Business Continuity</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>Daily backups retained 30 days. Weekly 1 year. RPO 24h, RTO 4h. Semi-annual DR test. 99.5% availability target.</p>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>10. Contact</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>Security questions: founder@secqa.example</p>
      </section>
      <footer style={{ background: '#222831', padding: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(238,238,238,0.4)' }}>
        © 2026 SecQA. Security questionnaires, answered.
      </footer>
    </div>
  );
}
