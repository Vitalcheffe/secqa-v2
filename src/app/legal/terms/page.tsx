export const metadata = {
  title: 'Terms of Service — SecQA',
  description: 'Terms of Service for SecQA. Last updated June 2026.'
};

export default function LegalPage() {
  return (
    <div style={{ background: '#EEEEEE', color: '#222831', fontFamily: 'Inter, sans-serif' }}>
      <section style={{ background: '#222831', color: '#EEEEEE', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 0.5rem' }}>Terms of Service</h1>
        <p style={{ fontSize: '0.85rem', color: 'rgba(238,238,238,0.5)' }}>Last updated: June 2026</p>
      </section>
      <section style={{ padding: '4rem 2rem', maxWidth: '760px', margin: '0 auto' }}>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>1. Acceptance of Terms</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>By accessing or using SecQA, you agree to be bound by these Terms. If you do not agree, you may not access or use the Service.</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>2. Eligibility</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>You must be at least 18 years old and legally able to enter into contracts. You are responsible for maintaining account security.</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>3. Subscription and Payment</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>Three tiers: Starter ($49/mo), Pro ($99/mo), Scale ($299/mo). Annual billing at 17% discount. Payments via Stripe. Subscriptions auto-renew until canceled.</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>4. Acceptable Use</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>You agree not to: use the Service for illegal purposes; upload malware; reverse engineer; scrape; exceed rate limits; resell without permission.</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>5. Customer Data</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>You retain ownership of all data you upload. We process data only to provide the Service. We never use Customer Data to train AI models. Anthropic guarantees zero data retention.</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>6. Intellectual Property</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>SecQA is owned by us. These Terms do not grant rights to our trademarks. We claim no ownership over your Customer Data.</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>7. Disclaimers</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>THE SERVICE IS PROVIDED AS IS WITHOUT WARRANTIES. We do not warrant the Service will be uninterrupted or error-free.</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>8. Limitation of Liability</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>Our total liability shall not exceed the amount paid in the 12 months preceding the claim.</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>9. Indemnification</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>You agree to indemnify us from claims arising from your breach of Terms or your Customer Data.</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>10. Termination</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>Either party may terminate anytime. Upon termination: access ends, data deleted within 30 days, annual subscribers retain access until prepaid year ends.</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>11. Governing Law</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>Governed by Delaware law. Disputes resolved in Delaware courts. Jury trial waived.</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>12. Contact</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>Questions: founder@secqa.example</p>
      </section>
      <footer style={{ background: '#222831', padding: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(238,238,238,0.4)' }}>
        © 2026 SecQA. Security questionnaires, answered.
      </footer>
    </div>
  );
}
