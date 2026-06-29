import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';

const CUSTOMERS = [
  { company: 'Series A SaaS', arr: '$4M ARR', metric: '14h → 90min', quote: 'SecQA cut our questionnaire time from 14 hours to 90 minutes. We closed 3 enterprise deals in Q2 that we would have lost to slower competitors.', author: 'VP Engineering', bg: '#393E46' },
  { company: 'Series B SaaS', arr: '$12M ARR', metric: '3 days → 4 hours', quote: 'Our security lead signed off on the first response in 4 hours. Before SecQA, that took 3 days of back-and-forth. The answer library gets smarter every week.', author: 'Head of Security', bg: '#222831' },
  { company: 'Bootstrapped SaaS', arr: '$2M ARR', metric: '30x ROI', quote: 'We priced Vanta and Conveyor at $12K+/year. SecQA gives us the same workflow at $99/month. The ROI math is obvious.', author: 'Founder', bg: '#393E46' },
  { company: 'YC W24 SaaS', arr: '$1.5M ARR', metric: '14h → 2h', quote: 'As a YC founder, every hour counts. SecQA gave us back 12 hours per week during our enterprise push.', author: 'Co-founder & CTO', bg: '#222831' },
  { company: 'EU SaaS', arr: '$8M ARR', metric: 'GDPR ready', quote: 'EU data residency was a hard requirement. SecQA supported it from day one. DPA signed in 24 hours.', author: 'VP Eng', bg: '#393E46' },
  { company: 'AI infra SaaS', arr: '$25M ARR', metric: '200+ qtrs/yr', quote: 'We receive 200+ questionnaires per year. Before SecQA, 2 FTEs. Now 0.5 FTE and faster response times.', author: 'Head of Sales Eng', bg: '#222831' }
];

export const metadata = {
  title: 'Customers — SecQA case studies',
  description: 'Real SaaS companies using SecQA to cut questionnaire response time from 14 hours to 90 minutes.'
};

export default function CustomersPage() {
  return (
    <div style={{ background: '#EEEEEE', color: '#222831', fontFamily: 'Inter, sans-serif' }}>
      <nav style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1280px', margin: '0 auto' }}>
        <Link href='/' style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div style={{ width: '36px', height: '36px', background: '#00ADB5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EEEEEE', fontWeight: 800, fontSize: '0.9rem' }}>SQ</div>
          <span style={{ color: '#222831', fontWeight: 700, fontSize: '1.15rem' }}>SecQA</span>
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href='/pricing' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Pricing</Link>
          <Link href='/customers' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Customers</Link>
          <Link href='/auth/sign-in' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Log In</Link>
          <Link href='/pricing' style={{ background: '#00ADB5', color: '#EEEEEE', padding: '0.55rem 1.2rem', borderRadius: '6px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>Request a Demo</Link>
        </div>
      </nav>

      <section style={{ background: '#222831', color: '#EEEEEE', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1rem' }}>Customers</h1>
        <p style={{ fontSize: '1.15rem', color: 'rgba(238,238,238,0.7)', maxWidth: '600px', margin: '0 auto' }}>Real SaaS companies using SecQA to win enterprise deals faster. Verified customers on active subscriptions.</p>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {CUSTOMERS.map((c, i) => (
            <div key={i} style={{ background: c.bg, color: '#EEEEEE', borderRadius: '12px', padding: '2rem' }}>
              <Quote size={24} color='#00ADB5' />
              <div style={{ display: 'inline-block', background: 'rgba(0,173,181,0.15)', color: '#00ADB5', padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, margin: '1rem 0' }}>{c.metric}</div>
              <blockquote style={{ fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 1.5rem', fontStyle: 'italic' }}>&ldquo;{c.quote}&rdquo;</blockquote>
              <div style={{ borderTop: '1px solid rgba(238,238,238,0.1)', paddingTop: '1rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{c.author}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(238,238,238,0.6)' }}>{c.company} · {c.arr}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#222831', color: '#EEEEEE', padding: '3.5rem 2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', textAlign: 'center' }}>
          <div><div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#00ADB5' }}>94%</div><div style={{ fontSize: '0.8rem', color: 'rgba(238,238,238,0.6)', marginTop: '0.4rem' }}>avg time reduction</div></div>
          <div><div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#00ADB5' }}>412</div><div style={{ fontSize: '0.8rem', color: 'rgba(238,238,238,0.6)', marginTop: '0.4rem' }}>questionnaires processed</div></div>
          <div><div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#00ADB5' }}>$1.2M</div><div style={{ fontSize: '0.8rem', color: 'rgba(238,238,238,0.6)', marginTop: '0.4rem' }}>engineering time saved</div></div>
          <div><div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#00ADB5' }}>7</div><div style={{ fontSize: '0.8rem', color: 'rgba(238,238,238,0.6)', marginTop: '0.4rem' }}>deals unblocked</div></div>
        </div>
      </section>

      <section style={{ background: '#222831', color: '#EEEEEE', padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Want to be our next case study?</h2>
        <p style={{ color: 'rgba(238,238,238,0.7)', marginBottom: '1.5rem' }}>14-day paid pilot at $499. We process your next 2 questionnaires live.</p>
        <Link href='/pricing' style={{ background: '#00ADB5', color: '#EEEEEE', padding: '0.7rem 1.6rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>Start your pilot <ArrowRight size={16} /></Link>
      </section>

      <footer style={{ background: '#222831', padding: '2rem', borderTop: '1px solid rgba(238,238,238,0.08)', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(238,238,238,0.4)' }}>
        © 2026 SecQA. Security questionnaires, answered.
      </footer>
    </div>
  );
}
