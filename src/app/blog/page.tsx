import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Blog — SecQA insights on security questionnaires and B2B SaaS',
  description: 'Guides, teardowns, and lessons from building SecQA.'
};

const POSTS = [
  { slug: 'how-we-cut-questionnaire-time-from-14h-to-90min', title: 'How we cut security questionnaire time from 14h to 90min', excerpt: 'The exact RAG architecture, prompt design, and answer library structure that powers SecQA. With code.', date: '2026-06-28', readingTime: '8 min', category: 'Engineering' },
  { slug: 'vanta-vs-conveyor-vs-secqa-pricing-teardown', title: 'Vanta vs Conveyor vs SecQA: pricing teardown', excerpt: 'Why Vanta charges $5K/year, Conveyor charges $12K/year, and we charge $99/month. The unit economics behind each.', date: '2026-06-27', readingTime: '6 min', category: 'Business' },
  { slug: 'rag-for-compliance-answers', title: 'RAG for compliance answers: what works and what does not', excerpt: 'Hash-based vs OpenAI embeddings. Why 70% accuracy is not enough for compliance. The 2-line fix that got us to 95%.', date: '2026-06-26', readingTime: '10 min', category: 'Engineering' },
  { slug: 'solo-founder-saas-unit-economics', title: 'Solo founder SaaS unit economics: a transparent breakdown', excerpt: 'LTV $2,529. CAC $175. Gross margin 85%. Churn 4%. Here is the full model, with assumptions and sensitivities.', date: '2026-06-25', readingTime: '7 min', category: 'Business' },
  { slug: 'soc2-for-solo-founders', title: 'SOC2 for solo founders: is it worth it?', excerpt: 'Cost: $5K–$15K. Time: 3–6 months. ROI: depends on your ICP. A decision framework for sub-$5M ARR SaaS.', date: '2026-06-24', readingTime: '5 min', category: 'Compliance' },
  { slug: 'ai-native-saas-timeline', title: 'The AI-native SaaS timeline: 6 months to $10K MRR', excerpt: 'Why the old 24-month timeline is dead. How Claude + a solo founder compresses build-to-revenue to 6 months.', date: '2026-06-23', readingTime: '9 min', category: 'Business' }
];

export default function BlogPage() {
  return (
    <div style={{ background: '#EEEEEE', color: '#222831', fontFamily: 'Inter, sans-serif' }}>
      <nav style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1280px', margin: '0 auto' }}>
        <Link href='/' style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div style={{ width: '36px', height: '36px', background: '#00ADB5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EEEEEE', fontWeight: 800, fontSize: '0.9rem' }}>SQ</div>
          <span style={{ color: '#222831', fontWeight: 700, fontSize: '1.15rem' }}>SecQA</span>
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href='/pricing' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Pricing</Link>
          <Link href='/blog' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Blog</Link>
          <Link href='/auth/sign-in' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Log In</Link>
          <Link href='/pricing' style={{ background: '#00ADB5', color: '#EEEEEE', padding: '0.55rem 1.2rem', borderRadius: '6px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>Request a Demo</Link>
        </div>
      </nav>

      <section style={{ background: '#222831', color: '#EEEEEE', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1rem' }}>Blog</h1>
        <p style={{ fontSize: '1.15rem', color: 'rgba(238,238,238,0.7)', maxWidth: '600px', margin: '0 auto' }}>Guides, teardowns, and lessons from building SecQA.</p>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {POSTS.map((post) => (
            <article key={post.slug} style={{ background: '#393E46', color: '#EEEEEE', borderRadius: '12px', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '999px', background: 'rgba(0,173,181,0.2)', color: '#00ADB5', fontWeight: 600 }}>{post.category}</span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(238,238,238,0.5)' }}>{post.date} · {post.readingTime} read</span>
              </div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>
                <Link href={`/blog/${post.slug}`} style={{ color: '#EEEEEE', textDecoration: 'none' }}>{post.title}</Link>
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.6, margin: 0 }}>{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} style={{ display: 'inline-block', marginTop: '1rem', color: '#00ADB5', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600 }}>Read more →</Link>
            </article>
          ))}
        </div>
      </section>

      <footer style={{ background: '#222831', padding: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(238,238,238,0.4)' }}>
        © 2026 SecQA. Security questionnaires, answered.
      </footer>
    </div>
  );
}
