export const metadata = {
  title: 'Privacy Policy — SecQA',
  description: 'Privacy Policy for SecQA. Last updated June 2026.'
};

export default function LegalPage() {
  return (
    <div style={{ background: '#EEEEEE', color: '#222831', fontFamily: 'Inter, sans-serif' }}>
      <section style={{ background: '#222831', color: '#EEEEEE', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 0.5rem' }}>Privacy Policy</h1>
        <p style={{ fontSize: '0.85rem', color: 'rgba(238,238,238,0.5)' }}>Last updated: June 2026</p>
      </section>
      <section style={{ padding: '4rem 2rem', maxWidth: '760px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>1. Information We Collect</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>Account information (name, email), Customer Data (questionnaires, answers), Usage Data (API calls, logs), Payment Information (via Stripe).</p>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>2. How We Use Information</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>To provide the Service, process payments, communicate, improve (aggregate only), comply with legal obligations. We do NOT train AI models or sell data.</p>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>3. Legal Basis (GDPR)</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>Contract (provide Service), Legal Obligation (tax/regulatory), Legitimate Interest (improve, prevent fraud), Consent (marketing).</p>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>4. Data Retention</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>Customer Data retained for active subscription. Deleted within 30 days of closure. Backups overwritten within 90 days. Account info retained 7 years for tax.</p>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>5. Data Sharing</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>Sub-processors: Anthropic, AWS, Supabase, Stripe, Vercel, Sentry. All with signed DPAs. No other sharing without consent.</p>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>6. International Transfers</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>Data may be processed in US. EU data residency available on Scale tier. EU-US transfers covered by SCCs.</p>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>7. Your Rights</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>Access, Rectification, Erasure, Portability, Objection, Restriction. Email founder@secqa.example. Response within 30 days.</p>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>8. Cookies</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>Essential cookies for auth. Analytics cookies anonymized. No advertising cookies.</p>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>9. Children's Privacy</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>Not intended for children under 16. We do not knowingly collect data from children.</p>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>10. Data Breach</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>Notification within 72 hours (GDPR) via email. Includes nature, data affected, measures, steps you can take.</p>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>11. Contact</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>Privacy questions: founder@secqa.example</p>
      </section>
      <footer style={{ background: '#222831', padding: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(238,238,238,0.4)' }}>
        © 2026 SecQA. Security questionnaires, answered.
      </footer>
    </div>
  );
}
