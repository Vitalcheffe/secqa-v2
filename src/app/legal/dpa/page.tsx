export const metadata = {
  title: 'Data Processing Agreement — SecQA',
  description: 'Data Processing Agreement for SecQA. Last updated June 2026.'
};

export default function LegalPage() {
  return (
    <div style={{ background: '#EEEEEE', color: '#222831', fontFamily: 'Inter, sans-serif' }}>
      <section style={{ background: '#222831', color: '#EEEEEE', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 0.5rem' }}>Data Processing Agreement</h1>
        <p style={{ fontSize: '0.85rem', color: 'rgba(238,238,238,0.5)' }}>Last updated: June 2026</p>
      </section>
      <section style={{ padding: '4rem 2rem', maxWidth: '760px', margin: '0 auto' }}>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>1. Parties</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>This DPA is between SecQA (Processor) and the customer (Controller).</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>2. Definitions</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>Controller determines purposes. Processor processes on behalf. Customer Data is personal data uploaded. Sub-processor is any third party.</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>3. Scope</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>Applies to processing of Customer Data by Processor on behalf of Controller.</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>4. Processor Obligations</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>Process only on documented instructions. Ensure confidentiality. Implement security measures. Notify of breaches. Assist with data subject requests.</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>5. Sub-processors</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>Anthropic, AWS, Supabase, Stripe, Vercel, Sentry. 30 days notice before adding new. Controller may object.</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>6. Security Measures</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>AES-256, TLS 1.3, RBAC, MFA, audit logging, daily backups, 4-hour RTO. Reviewed annually.</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>7. International Transfers</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>SCCs apply to transfers outside EEA. EU data residency on Scale tier.</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>8. Data Subject Rights</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>Assist Controller in fulfilling requests. Forward requests within 5 business days. Notify Controller of government requests.</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>9. Audit Rights</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>Controller may audit once per year with 30 days notice. SOC2 Type 2 report available once complete.</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>10. Deletion</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>Delete all Customer Data within 30 days of termination. Written confirmation on request. Backups overwritten within 90 days.</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>11. Contact</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>DPA questions: founder@secqa.example</p>
      </section>
      <footer style={{ background: '#222831', padding: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(238,238,238,0.4)' }}>
        © 2026 SecQA. Security questionnaires, answered.
      </footer>
    </div>
  );
}
