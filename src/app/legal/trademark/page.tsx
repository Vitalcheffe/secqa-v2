export const metadata = {
  title: 'Trademark Policy — SecQA',
  description: 'Trademark Policy for SecQA. Last updated June 2026.'
};

export default function LegalPage() {
  return (
    <div style={{ background: '#EEEEEE', color: '#222831', fontFamily: 'Inter, sans-serif' }}>
      <section style={{ background: '#222831', color: '#EEEEEE', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 0.5rem' }}>Trademark Policy</h1>
        <p style={{ fontSize: '0.85rem', color: 'rgba(238,238,238,0.5)' }}>Last updated: June 2026</p>
      </section>
      <section style={{ padding: '4rem 2rem', maxWidth: '760px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>1. SecQA Trademarks</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>SecQA, the SecQA logo, and other brand assets are trademarks of SecQA.</p>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>2. Permitted Use</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>You may use SecQA name in factual references, comparison tables, news articles. Logo only with written permission.</p>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>3. Prohibited Use</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>No implied endorsement, no use in your own trademark or domain, no modification, no use with illegal activities.</p>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>4. Attribution</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>When using SecQA trademarks: 'SecQA is a trademark of SecQA. All rights reserved.'</p>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.5rem' }}>5. Contact</h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.7 }}>Trademark questions: founder@secqa.example</p>
      </section>
      <footer style={{ background: '#222831', padding: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(238,238,238,0.4)' }}>
        © 2026 SecQA. Security questionnaires, answered.
      </footer>
    </div>
  );
}
