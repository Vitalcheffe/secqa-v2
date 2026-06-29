import Link from 'next/link';
import { Mail, Calendar, MessageCircle } from 'lucide-react';

export const metadata = {
  title: 'Contact SecQA — Talk to the founder directly',
  description: 'No sales reps. You talk directly to the founder.'
};

export default function ContactPage() {
  return (
    <div style={{ background: '#EEEEEE', color: '#222831', fontFamily: 'Inter, sans-serif' }}>
      <nav style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1280px', margin: '0 auto' }}>
        <Link href='/' style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div style={{ width: '36px', height: '36px', background: '#00ADB5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EEEEEE', fontWeight: 800, fontSize: '0.9rem' }}>SQ</div>
          <span style={{ color: '#222831', fontWeight: 700, fontSize: '1.15rem' }}>SecQA</span>
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href='/pricing' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Pricing</Link>
          <Link href='/contact' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Contact</Link>
          <Link href='/auth/sign-in' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Log In</Link>
          <Link href='/pricing' style={{ background: '#00ADB5', color: '#EEEEEE', padding: '0.55rem 1.2rem', borderRadius: '6px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>Request a Demo</Link>
        </div>
      </nav>

      <section style={{ background: '#222831', color: '#EEEEEE', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1rem' }}>Contact SecQA</h1>
        <p style={{ fontSize: '1.15rem', color: 'rgba(238,238,238,0.7)', maxWidth: '600px', margin: '0 auto' }}>No sales reps. No ticketing system. You talk directly to the founder.</p>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {[
            { icon: Mail, t: 'Email', d: 'For anything: questions, feedback, support.', v: 'founder@secqa.example', s: 'Response SLA: 24 hours' },
            { icon: Calendar, t: 'Book a demo', d: '15 minutes. We process your last questionnaire live.', v: 'Open calendar', s: 'Mon–Fri, 8am–6pm ET' },
            { icon: MessageCircle, t: 'Slack community', d: 'Join 80+ SaaS founders discussing compliance.', v: 'Request invite', s: 'Free, no purchase required' }
          ].map((c) => (
            <div key={c.t} style={{ background: '#393E46', color: '#EEEEEE', borderRadius: '12px', padding: '2rem' }}>
              <div style={{ width: '44px', height: '44px', background: '#00ADB5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <c.icon size={20} color='#EEEEEE' />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.5rem' }}>{c.t}</h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(238,238,238,0.7)', marginBottom: '1rem', lineHeight: 1.5 }}>{c.d}</p>
              <div style={{ color: '#00ADB5', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>{c.v}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(238,238,238,0.5)' }}>{c.s}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '3rem 2rem 5rem', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.5rem', textAlign: 'center' }}>Send a message</h2>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type='text' placeholder='Name' style={{ padding: '0.8rem 1rem', borderRadius: '6px', border: '1px solid rgba(34,40,49,0.2)', background: '#EEEEEE', color: '#222831', fontSize: '0.9rem' }} />
          <input type='email' placeholder='Email' style={{ padding: '0.8rem 1rem', borderRadius: '6px', border: '1px solid rgba(34,40,49,0.2)', background: '#EEEEEE', color: '#222831', fontSize: '0.9rem' }} />
          <select style={{ padding: '0.8rem 1rem', borderRadius: '6px', border: '1px solid rgba(34,40,49,0.2)', background: '#EEEEEE', color: '#222831', fontSize: '0.9rem' }}>
            <option>Under $1M ARR</option>
            <option>$1M–$5M ARR</option>
            <option>$5M–$20M ARR</option>
            <option>$20M+ ARR</option>
          </select>
          <textarea rows={5} placeholder='What would you like to discuss?' style={{ padding: '0.8rem 1rem', borderRadius: '6px', border: '1px solid rgba(34,40,49,0.2)', background: '#EEEEEE', color: '#222831', fontSize: '0.9rem', resize: 'vertical' }} />
          <button type='submit' style={{ background: '#00ADB5', color: '#EEEEEE', border: 'none', padding: '0.8rem', borderRadius: '6px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>Send message</button>
        </form>
      </section>

      <footer style={{ background: '#222831', padding: '2rem', borderTop: '1px solid rgba(238,238,238,0.08)', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(238,238,238,0.4)' }}>
        © 2026 SecQA. Security questionnaires, answered.
      </footer>
    </div>
  );
}
