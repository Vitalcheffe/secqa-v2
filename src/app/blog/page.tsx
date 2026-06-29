import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Blog — SecQA insights on security questionnaires and B2B SaaS',
  description: 'Guides, teardowns, and lessons from building SecQA. Topics: security questionnaire automation, SOC2, RAG, AI-native SaaS, solo founder economics.'
};

const POSTS = [
  { slug: 'how-we-cut-questionnaire-time-from-14h-to-90min', title: 'How we cut security questionnaire time from 14h to 90min', excerpt: 'The exact RAG architecture, prompt design, and answer library structure that powers SecQA. With code.', date: '2026-06-28', readingTime: '8 min', category: 'Engineering' },
  { slug: 'vanta-vs-conveyor-vs-secqa-pricing-teardown', title: 'Vanta vs Conveyor vs SecQA: pricing teardown', excerpt: 'Why Vanta charges $5K/year, Conveyor charges $12K/year, and we charge $99/month. The unit economics behind each.', date: '2026-06-27', readingTime: '6 min', category: 'Business' },
  { slug: 'rag-for-compliance-answers', title: 'RAG for compliance answers: what works and what does not', excerpt: 'Hash-based vs OpenAI embeddings. Why 70% accuracy is not enough for compliance. The 2-line fix that got us to 95%.', date: '2026-06-26', readingTime: '10 min', category: 'Engineering' },
  { slug: 'solo-founder-saas-unit-economics', title: 'Solo founder SaaS unit economics: a transparent breakdown', excerpt: 'LTV $2,529. CAC $175. Gross margin 85%. Churn 4%. Here is the full model, with assumptions and sensitivities.', date: '2026-06-25', readingTime: '7 min', category: 'Business' },
  { slug: 'soc2-for-solo-founders', title: 'SOC2 for solo founders: is it worth it?', excerpt: 'Cost: $5K-$15K. Time: 3-6 months. ROI: depends on your ICP. A decision framework for sub-$5M ARR SaaS.', date: '2026-06-24', readingTime: '5 min', category: 'Compliance' },
  { slug: 'ai-native-saas-timeline', title: 'The AI-native SaaS timeline: 6 months to $10K MRR', excerpt: 'Why the old 24-month timeline is dead. How Claude + a solo founder compresses build-to-revenue to 6 months.', date: '2026-06-23', readingTime: '9 min', category: 'Business' }
];

export default function BlogPage() {
  return (
    <div className='flex flex-col'>
      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <h1 className='text-4xl font-bold tracking-tight'>Blog</h1>
          <p className='mt-4 text-lg text-muted-foreground'>Guides, teardowns, and lessons from building SecQA.</p>
        </div>
      </section>

      <section>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <div className='space-y-8'>
            {POSTS.map((post) => (
              <article key={post.slug} className='border-b pb-8'>
                <div className='flex items-center gap-3 mb-2'>
                  <Badge variant='secondary'>{post.category}</Badge>
                  <span className='text-xs text-muted-foreground'>{post.date} · {post.readingTime} read</span>
                </div>
                <h2 className='text-xl font-bold mb-2'><Link href={`/blog/${post.slug}`} className='hover:text-primary'>{post.title}</Link></h2>
                <p className='text-sm text-muted-foreground'>{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className='mt-3 inline-block text-sm text-primary hover:underline'>Read more →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
