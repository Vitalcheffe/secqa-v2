'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem, CountUp, SectionDivider, Card3D } from '@/components/ui/motion';
import {
  ArrowRight,
  Clock,
  Tag,
  Mail,
  Rss,
  AtSign,
  Briefcase,
  BookOpen,
  TrendingUp,
  Sparkles,
  Calendar,
} from 'lucide-react';

const FEATURED = {
  slug: 'how-we-cut-questionnaire-time-from-14h-to-90min',
  title: 'How we cut security questionnaire time from 14h to 90min',
  excerpt: 'The exact RAG architecture, prompt design, and answer library structure that powers SecQA. With code snippets you can adapt for your own compliance workflows.',
  date: '2026-06-28',
  readingTime: '8 min',
  category: 'Engineering',
  author: { name: 'Amine Harchel', role: 'Founder & CEO', initials: 'AH' },
  stats: { reads: '2,847', shares: '142' },
};

const POSTS = [
  { slug: 'vanta-vs-conveyor-vs-secqa-pricing-teardown', title: 'Vanta vs Conveyor vs SecQA: pricing teardown', excerpt: 'Why Vanta charges $5K/year, Conveyor charges $12K/year, and we charge $99/month. The unit economics behind each.', date: '2026-06-27', readingTime: '6 min', category: 'Business' },
  { slug: 'rag-for-compliance-answers', title: 'RAG for compliance answers: what works and what does not', excerpt: 'Hash-based vs OpenAI embeddings. Why 70% accuracy is not enough for compliance. The 2-line fix that got us to 95%.', date: '2026-06-26', readingTime: '10 min', category: 'Engineering' },
  { slug: 'solo-founder-saas-unit-economics', title: 'Solo founder SaaS unit economics: a transparent breakdown', excerpt: 'LTV $2,529. CAC $175. Gross margin 85%. Churn 4%. Here is the full model, with assumptions and sensitivities.', date: '2026-06-25', readingTime: '7 min', category: 'Business' },
  { slug: 'soc2-for-solo-founders', title: 'SOC2 for solo founders: is it worth it?', excerpt: 'Cost: $5K–$15K. Time: 3–6 months. ROI: depends on your ICP. A decision framework for sub-$5M ARR SaaS.', date: '2026-06-24', readingTime: '5 min', category: 'Compliance' },
  { slug: 'ai-native-saas-timeline', title: 'The AI-native SaaS timeline: 6 months to $10K MRR', excerpt: 'Why the old 24-month timeline is dead. How Claude + a solo founder compresses build-to-revenue to 6 months.', date: '2026-06-23', readingTime: '9 min', category: 'Business' },
  { slug: 'prompt-engineering-for-compliance', title: 'Prompt engineering for compliance: grounding without hallucination', excerpt: 'How we structure system prompts to keep Claude grounded in your answer library. Includes the production prompt.', date: '2026-06-22', readingTime: '11 min', category: 'Engineering' },
  { slug: 'the-answer-library-moat', title: 'The answer library moat: why switching costs compound', excerpt: 'Every questionnaire answered makes our RAG smarter for that customer. By month 3, switching cost is real.', date: '2026-06-21', readingTime: '6 min', category: 'Strategy' },
  { slug: 'stripe-billing-for-solo-saas', title: 'Stripe billing for solo SaaS: webhook handling done right', excerpt: 'Idempotency, signature verification, retry logic. The production Stripe setup that handles 1,000+ subscriptions.', date: '2026-06-20', readingTime: '8 min', category: 'Engineering' },
];

const CATEGORIES = [
  { name: 'All', count: 8 },
  { name: 'Engineering', count: 4 },
  { name: 'Business', count: 3 },
  { name: 'Compliance', count: 1 },
  { name: 'Strategy', count: 1 },
];

const TAGS = [
  'RAG', 'Claude', 'SOC2', 'Pricing', 'Stripe', 'Founders', 'Prompt Engineering',
  'Vanta', 'Unit Economics', 'CAIQ', 'Compliance', 'AI-native', 'Webhooks', 'Audit',
];

const POPULAR = [
  { slug: 'how-we-cut-questionnaire-time-from-14h-to-90min', title: 'How we cut questionnaire time from 14h to 90min', reads: '2,847' },
  { slug: 'vanta-vs-conveyor-vs-secqa-pricing-teardown', title: 'Vanta vs Conveyor vs SecQA pricing teardown', reads: '1,923' },
  { slug: 'rag-for-compliance-answers', title: 'RAG for compliance answers', reads: '1,654' },
  { slug: 'solo-founder-saas-unit-economics', title: 'Solo founder SaaS unit economics', reads: '1,402' },
];

const AUTHORS = [
  { name: 'Amine Harchel', role: 'Founder & CEO', initials: 'AH', posts: 12, bio: 'Ex-sales engineer. Built SecQA after spending 14 hours per questionnaire at his last SaaS.' },
  { name: 'Sarah Chen', role: 'Security advisor', initials: 'SC', posts: 3, bio: 'Former CISO at three public SaaS companies. Reviews every SecQA security post.' },
  { name: 'Marcus Webb', role: 'Engineering advisor', initials: 'MW', posts: 2, bio: 'Staff engineer at Stripe. Writes about billing infrastructure and webhook reliability.' },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filteredPosts = activeCategory === 'All'
    ? POSTS
    : POSTS.filter((p) => p.category === activeCategory);

  return (
    <div className='bg-[#0D0D0D] text-white'>
      {/* ═══ HERO ═══ */}
      <section className='relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='absolute top-0 left-1/3 w-[700px] h-[500px] rounded-full blur-[120px] pointer-events-none bg-[#8B9DAF]/[0.04]' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-6'>Blog</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className='text-5xl md:text-7xl lg:text-[88px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Guides, teardowns,<br />and lessons<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-4'>
              From building SecQA in public. Engineering deep-dives, pricing teardowns, compliance explainers, and honest founder unit economics.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ FEATURED POST HERO ═══ */}
      <section className='py-20 md:py-28 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Featured Post</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link href={`/blog/${FEATURED.slug}`} className='block group'>
              <Card3D className='relative overflow-hidden'>
                <div className='absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none bg-[#8B9DAF]/[0.06]' />
                <div className='relative z-10 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-12 items-center'>
                  <div>
                    <div className='flex flex-wrap items-center gap-3 mb-5'>
                      <span className='status-badge status-badge-active'>
                        <Sparkles size={11} />
                        {FEATURED.category}
                      </span>
                      <span className='text-xs text-[#666666] inline-flex items-center gap-1.5'>
                        <Calendar size={11} />
                        {FEATURED.date}
                      </span>
                      <span className='text-xs text-[#666666] inline-flex items-center gap-1.5'>
                        <Clock size={11} />
                        {FEATURED.readingTime} read
                      </span>
                    </div>
                    <h2 className='text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-white tracking-tight mb-4 leading-tight group-hover:text-[#8B9DAF] transition-colors'>
                      {FEATURED.title}
                    </h2>
                    <p className='text-[15px] text-[#999999] leading-[1.7] mb-6'>
                      {FEATURED.excerpt}
                    </p>
                    <div className='flex items-center justify-between flex-wrap gap-4'>
                      <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-full bg-[#8B9DAF]/15 flex items-center justify-center text-sm font-semibold text-[#8B9DAF]'>
                          {FEATURED.author.initials}
                        </div>
                        <div>
                          <div className='text-sm font-semibold text-white'>{FEATURED.author.name}</div>
                          <div className='text-xs text-[#666666]'>{FEATURED.author.role}</div>
                        </div>
                      </div>
                      <span className='inline-flex items-center gap-1.5 text-sm text-[#8B9DAF] group-hover:gap-2.5 transition-all'>
                        Read article
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-3'>
                    <div className='p-4 rounded-lg border border-white/6 bg-white/[0.02]'>
                      <TrendingUp size={16} className='text-[#8B9DAF] mb-2' />
                      <div className='text-xl font-bold text-white'>{FEATURED.stats.reads}</div>
                      <p className='text-xs text-[#666666]'>Reads</p>
                    </div>
                    <div className='p-4 rounded-lg border border-white/6 bg-white/[0.02]'>
                      <Sparkles size={16} className='text-[#8B9DAF] mb-2' />
                      <div className='text-xl font-bold text-white'>{FEATURED.stats.shares}</div>
                      <p className='text-xs text-[#666666]'>Shares</p>
                    </div>
                  </div>
                </div>
              </Card3D>
            </Link>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ POST GRID WITH CATEGORIES ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>All Posts</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
              Recent writing<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <div className='accent-line mb-8' />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className='flex flex-wrap items-center gap-2 mb-10'>
              {CATEGORIES.map((c) => (
                <button
                  key={c.name}
                  type='button'
                  onClick={() => setActiveCategory(c.name)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    activeCategory === c.name
                      ? 'bg-white text-black'
                      : 'border border-white/10 text-[#999999] hover:border-white/25 hover:text-white'
                  }`}
                >
                  {c.name}
                  <span className={`ml-1.5 ${activeCategory === c.name ? 'text-black/60' : 'text-[#666666]'}`}>
                    {c.count}
                  </span>
                </button>
              ))}
            </div>
          </FadeIn>

          <StaggerContainer className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
            {filteredPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link href={`/blog/${post.slug}`} className='block h-full group'>
                  <Card3D className='h-full flex flex-col'>
                    <div className='flex items-center gap-3 mb-4 text-xs'>
                      <span className='status-badge status-badge-active'>{post.category}</span>
                      <span className='text-[#666666]'>{post.readingTime} read</span>
                    </div>
                    <h3 className='text-lg font-semibold text-white mb-3 leading-snug group-hover:text-[#8B9DAF] transition-colors'>
                      {post.title}
                    </h3>
                    <p className='text-sm text-[#999999] leading-[1.7] mb-5 flex-1'>{post.excerpt}</p>
                    <div className='flex items-center justify-between pt-4 border-t border-white/4'>
                      <span className='text-xs text-[#666666] inline-flex items-center gap-1.5'>
                        <Calendar size={11} />
                        {post.date}
                      </span>
                      <ArrowRight size={14} className='text-[#666666] group-hover:text-[#8B9DAF] group-hover:translate-x-1 transition-all' />
                    </div>
                  </Card3D>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ POPULAR TAGS + POPULAR POSTS ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <div className='grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12'>
            <FadeIn>
              <p className='section-label mb-4'>Popular Tags</p>
              <h2 className='text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white tracking-tight mb-6'>
                Browse by topic<span className='text-[#8B9DAF]'>.</span>
              </h2>
              <div className='accent-line mb-8' />
              <div className='flex flex-wrap gap-2'>
                {TAGS.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${tag.toLowerCase()}`}
                    className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/8 text-xs text-[#999999] hover:border-[#8B9DAF]/40 hover:text-[#8B9DAF] transition-colors'
                  >
                    <Tag size={11} />
                    {tag}
                  </Link>
                ))}
              </div>

              <div className='mt-12'>
                <p className='section-label mb-4'>Authors</p>
                <h3 className='text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold text-white tracking-tight mb-6'>
                  Who writes here<span className='text-[#8B9DAF]'>.</span>
                </h3>
                <StaggerContainer className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                  {AUTHORS.map((a) => (
                    <StaggerItem key={a.name}>
                      <div className='card h-full'>
                        <div className='flex items-center gap-3 mb-3'>
                          <div className='w-12 h-12 rounded-full bg-[#8B9DAF]/15 flex items-center justify-center text-base font-semibold text-[#8B9DAF]'>
                            {a.initials}
                          </div>
                          <div>
                            <div className='text-sm font-semibold text-white'>{a.name}</div>
                            <div className='text-xs text-[#666666]'>{a.role}</div>
                          </div>
                        </div>
                        <p className='text-xs text-[#999999] leading-[1.7] mb-3'>{a.bio}</p>
                        <div className='text-xs text-[#8B9DAF]'>{a.posts} posts</div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className='lg:sticky lg:top-20'>
                <p className='section-label mb-4'>Most Read</p>
                <h3 className='text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold text-white tracking-tight mb-6'>
                  This month<span className='text-[#8B9DAF]'>.</span>
                </h3>
                <div className='card p-0 overflow-hidden'>
                  {POPULAR.map((p, i) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className={`flex items-start gap-4 p-5 hover:bg-white/[0.02] transition-colors ${
                        i !== POPULAR.length - 1 ? 'border-b border-white/4' : ''
                      }`}
                    >
                      <span className='version-tag text-[#8B9DAF] text-lg font-bold mt-0.5'>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className='flex-1 min-w-0'>
                        <h4 className='text-sm font-medium text-white leading-snug mb-1.5 hover:text-[#8B9DAF] transition-colors'>
                          {p.title}
                        </h4>
                        <span className='text-xs text-[#666666]'>{p.reads} reads</span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className='mt-6 flex items-center gap-3'>
                  <a href='#' className='w-10 h-10 rounded-full border border-white/8 flex items-center justify-center text-[#999999] hover:border-[#8B9DAF]/40 hover:text-[#8B9DAF] transition-colors' aria-label='RSS feed'>
                    <Rss size={16} />
                  </a>
                  <a href='#' className='w-10 h-10 rounded-full border border-white/8 flex items-center justify-center text-[#999999] hover:border-[#8B9DAF]/40 hover:text-[#8B9DAF] transition-colors' aria-label='Twitter'>
                    <AtSign size={16} />
                  </a>
                  <a href='#' className='w-10 h-10 rounded-full border border-white/8 flex items-center justify-center text-[#999999] hover:border-[#8B9DAF]/40 hover:text-[#8B9DAF] transition-colors' aria-label='LinkedIn'>
                    <Briefcase size={16} />
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ NEWSLETTER ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[900px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='card relative overflow-hidden text-center'>
              <div className='absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[120px] pointer-events-none bg-[#8B9DAF]/[0.06]' />
              <div className='relative z-10'>
                <div className='w-14 h-14 rounded-full bg-[#8B9DAF]/10 flex items-center justify-center mx-auto mb-5'>
                  <Mail size={26} className='text-[#8B9DAF]' />
                </div>
                <p className='section-label mb-3'>Newsletter</p>
                <h2 className='text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white tracking-tight mb-3'>
                  One post a week. No spam<span className='text-[#8B9DAF]'>.</span>
                </h2>
                <p className='text-sm text-[#999999] leading-[1.7] mb-8 max-w-md mx-auto'>
                  Every Tuesday: one deep-dive on AI-native SaaS, compliance automation, or solo-founder unit economics.
                  Unsubscribe with one click. 1,200+ founders already subscribed.
                </p>
                {subscribed ? (
                  <div className='inline-flex items-center gap-2 px-5 py-3 rounded-md border border-[#8B9DAF]/30 bg-[#8B9DAF]/[0.03] text-sm text-[#8B9DAF]'>
                    <BookOpen size={16} />
                    You&apos;re in. Check your inbox for confirmation.
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubscribed(true);
                    }}
                    className='flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto'
                  >
                    <input
                      type='email'
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='founder@yoursaas.com'
                      className='w-full px-4 py-3 rounded-md bg-white/[0.04] border border-white/8 text-white text-sm placeholder:text-[#666666] focus:border-[#8B9DAF] focus:outline-none transition-colors'
                    />
                    <button
                      type='submit'
                      className='w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black px-5 py-3 rounded-md text-sm font-semibold hover:bg-white/90 transition-colors whitespace-nowrap'
                    >
                      Subscribe
                      <ArrowRight size={14} />
                    </button>
                  </form>
                )}
                <div className='flex items-center justify-center gap-6 mt-8 text-xs text-[#666666]'>
                  <span className='inline-flex items-center gap-1.5'>
                    <CountUp to={1200} suffix='+' /> subscribers
                  </span>
                  <span>·</span>
                  <span>Weekly cadence</span>
                  <span>·</span>
                  <span>No tracking pixels</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
