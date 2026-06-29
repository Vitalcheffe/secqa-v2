export const metadata = {
  title: 'Acceptable Use Policy — SecQA',
  description: 'Acceptable Use Policy for SecQA. Last updated June 2026.'
};

export default function LegalPage() {
  return (
    <div style={{ background: '#EEEEEE', color: '#222831', fontFamily: 'Inter, sans-serif' }}>
      <section style={{ background: '#222831', color: '#EEEEEE', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 0.5rem' }}>Acceptable Use Policy</h1>
        <p style={{ fontSize: '0.85rem', color: 'rgba(238,238,238,0.5)' }}>Last updated: June 2026</p>
      </section>
      <section style={{ padding: '4rem 2rem', maxWidth: '760px', margin: '0 auto' }}>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>1. Permitted Use</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>SecQA is for automating security questionnaire responses for B2B SaaS companies. Internal business operations only.</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>2. Prohibited Uses</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>No illegal content, malware, unauthorized access, reverse engineering, scraping, rate limit abuse, reselling, export violations.</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>3. Rate Limits</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>100 API requests/min, 10 uploads/hour, 5 concurrent jobs. Exceeding may result in throttling. Persistent abuse may suspend.</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>4. Customer Data Restrictions</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>No PII without consent, no HIPAA/ITAR data, no files over 10MB, no encrypted data you do not control.</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>5. Enforcement</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>Warning, temporary suspension, or permanent termination for serious violations. Notification before suspension except imminent harm.</p>
        <h2 style={ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }>6. Contact</h2>
        <p style={ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }>Report violations: founder@secqa.example</p>
      </section>
      <footer style={{ background: '#222831', padding: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(238,238,238,0.4)' }}>
        © 2026 SecQA. Security questionnaires, answered.
      </footer>
    </div>
  );
}
