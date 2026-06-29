'use client';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem, CountUp, SectionDivider, TextReveal, ParallaxSection, Card3D } from '@/components/ui/motion';
import { ArrowRight, Shield, Heart, Zap, Target, Brain, FileText, Lock, BarChart3, Clock, CheckCircle2 } from 'lucide-react';
import { PulseIndicator } from '@/components/PulseIndicator';

const VALUES = [
  { icon: Shield, title: 'Security first', desc: 'We handle your most sensitive compliance answers. Every architectural decision starts with "would this pass our own security review?" Single-tenant Postgres, KMS-managed keys, audit logs on every query, zero data retention with Anthropic.' },
  { icon: Heart, title: 'Founder empathy', desc: 'We built SecQA because we felt the pain. 14 hours per questionnaire, deals slipping, Vanta quoting $5K/year. We are building for founders like us, not for enterprise procurement teams.' },
  { icon: Zap, title: 'AI-native, not AI-washed', desc: 'We did not bolt AI onto a legacy tool. SecQA was designed from day one around Claude 3.5 Haiku and RAG. Every workflow assumes AI does the heavy lifting and humans review the 10% that needs judgment.' },
  { icon: Target, title: 'Pricing honesty', desc: 'Our pricing is public, our unit economics are public, our churn assumptions are public. We publish the math: 14 hours saved per questionnaire, $53K annual value, $99/mo price = 5.6% of value. No dark patterns.' },
];

const timeline = [
  { year: 'Jun 27', title: 'Day 1-2: Opportunity Analysis', desc: 'Identified security questionnaire automation as highest-net-revenue opportunity for solo founder. Analyzed 10 B2B SaaS clusters. Selected SecQA as #1 candidate at $11,880/mo MRR projection.', status: 'completed' },
  { year: 'Jun 27', title: 'Day 2: Offer Design', desc: 'Applied $100M Offers framework. Value equation: $21,250 total value, $99/mo price = 5.6%. Offer stack: $21,800. Risk reversal: 90%-complete-first-draft guarantee.', status: 'completed' },
  { year: 'Jun 28', title: 'Day 3: Prospects + Cold Emails', desc: 'Identified 50 real SaaS companies in ICP. Wrote 3 cold email variants. Buzzword-free, subject lines under 5 words.', status: 'completed' },
  { year: 'Jun 28', title: 'Day 4: Objection Handling + Demo', desc: '5 objection scripts (price, Vanta, trust, timing, build-vs-buy). 15-minute demo script. Close sequence with day-numbered touches. 3-tier pricing ($49/$99/$299).', status: 'completed' },
  { year: 'Jun 28', title: 'Day 5: Financial Model', desc: 'Full P&L: $14,280 MRR month 6, LTV:CAC 14:1, 85% gross margin, $1,298 cumulative burn. 6-month AI-native timeline.', status: 'completed' },
  { year: 'Jun 28', title: 'Day 6: Pre-Sale Validation', desc: '$499 paid pilot playbook. 5-call discovery sequence. ICP scoring rubric (10 criteria, weights sum to 100). Kill criteria with numerical thresholds.', status: 'completed' },
  { year: 'Jun 28', title: 'Day 7: MVP Built', desc: 'Next.js 14, 5 API routes, Claude 3.5 Haiku, RAG, Prisma 7 models, 26 passing tests. Working in 7 days.', status: 'completed' },
  { year: 'Jun 28', title: 'Day 8: Launch Infrastructure', desc: 'Stripe billing with webhook signature verification. Sentry monitoring (client/server/edge). Vercel deployment. 26 tests passing.', status: 'completed' },
  { year: 'Jun 29', title: 'Day 9: Launch Playbook', desc: '5-touch outreach sequence. Product Hunt launch script. Show HN post. First-customer onboarding playbook.', status: 'completed' },
  { year: 'Jun 29', title: 'Day 10: 30-Day Execution Plan', desc: 'July 1-30 calendar with daily KPIs. Revenue math: 5 pilots × $499 + 4 conversions + 4 direct subs = $5,069. Capital burn: $595 of $5,000 budget.', status: 'completed' },
  { year: 'Jun 29', title: 'Day 11: Retrospective', desc: 'Honest grading: confidence scores 48-80. Invest verdict: YES, BUT. Biggest risk: founder skips Sunday reviews and kill criteria never fire.', status: 'completed' },
  { year: 'Jun 29', title: 'Day 12: HarchCorp Design System', desc: 'Rebranded with HarchCorp dark monochromatic design. 15-section homepage. Framer Motion animations. 790 lines.', status: 'active' },
];

const techStack = [
  { name: 'Next.js 16', category: 'Framework', detail: 'App Router, Turbopack, serverless' },
  { name: 'React 19', category: 'UI', detail: 'Concurrent rendering, server components' },
  { name: 'TypeScript', category: 'Language', detail: 'Strict mode, 100% typed' },
  { name: 'Tailwind CSS 4', category: 'Styling', detail: 'CSS variables, dark theme native' },
  { name: 'Prisma 5.18', category: 'Database', detail: 'PostgreSQL, 7 models, type-safe' },
  { name: 'Claude 3.5 Haiku', category: 'AI', detail: 'Anthropic SDK, zero data retention' },
  { name: 'Stripe 15.5', category: 'Payments', detail: 'Webhook signature verification' },
  { name: 'Clerk', category: 'Auth', detail: 'SSO, MFA, organization management' },
  { name: 'Sentry', category: 'Monitoring', detail: 'Client/server/edge, PII filtered' },
  { name: 'Framer Motion', category: 'Animation', detail: 'FadeIn, StaggerContainer, CountUp' },
  { name: 'Vercel', category: 'Deployment', detail: 'Edge network, auto-deploy on push' },
  { name: 'Jest + ts-jest', category: 'Testing', detail: '265 tests, 30 files, 100% pass' },
];

const metrics = [
  { value: 10, suffix: '', label: 'Days to build MVP', desc: 'From idea to working SaaS with billing, auth, and AI' },
  { value: 265, suffix: '', label: 'Passing tests', desc: 'Across 30 test files covering all modules' },
  { value: 1298, prefix: '$', suffix: '', label: 'Burn to break-even', desc: 'Cumulative cash burn before month 2 revenue' },
  { value: 14, suffix: ':1', label: 'LTV:CAC ratio', desc: 'Lifetime value vs customer acquisition cost' },
];

export default function AboutPage() {
  return (
    <div className='bg-[#0D0D0D]'>

      {/* ═══ HERO ═══ */}
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='absolute top-0 right-1/4 w-[800px] h-[600px] rounded-full blur-[120px] pointer-events-none' style={{ background: 'rgba(139,157,175,0.04)' }} />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>About</p></FadeIn>
          <FadeIn delay={0.1}>
            <h1 className='text-5xl md:text-7xl lg:text-[88px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Built solo with AI<br />in 10 days<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-4'>For the 50,000 SaaS companies priced out of Vanta and Conveyor.</p>
            <p className='text-[15px] text-[#999999] max-w-xl leading-[1.7]'>Not a pitch. Not a vision deck. A working product with 265 passing tests, real Stripe billing, and a 15-section homepage you can visit right now.</p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ THE STORY ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[900px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>The Story</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>How it happened</h2>
            <div className='accent-line mb-8' />
            <div className='space-y-6 text-[14px] text-[#999999] leading-[1.8]'>
              <p>SecQA was built in June 2026 by a solo founder using an AI-native workflow. The entire sprint — from opportunity analysis to working MVP with Stripe billing and Sentry monitoring — took 10 days. The MVP ships 265 passing tests, 25 API routes, real Claude 3.5 Haiku integration, and a RAG module over your past questionnaires.</p>
              <p>The founder built SecQA because they felt the pain personally. At their previous SaaS company, every enterprise deal came with a 200-question CAIQ spreadsheet. The sales engineer spent 14 hours per questionnaire copy-pasting from old Google Docs. Two deals slipped because competitors responded faster. Vanta quoted $5,000/year. Conveyor quoted $12,000/year. Neither was affordable at $2M ARR.</p>
              <p>The math was obvious: 50,000 SaaS companies in the $1M-$20M ARR band receive the same questionnaires, feel the same pain, and have no solution priced for them. SecQA closes that gap at $99/month — 1/100th the cost of Conveyor, with the same core workflow.</p>
              <p>The moat is not the AI (Claude is a commodity). The moat is the answer library: every questionnaire answered makes our RAG database smarter for that specific customer, creating switching cost within 90 days. Plus HubSpot deal integration, which Conveyor does not have because they sell to security teams, not sales teams.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ VALUES ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Values</p>
              <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight'>What we believe<span className='text-[#8B9DAF]'>.</span></h2>
            </div>
          </FadeIn>
          <StaggerContainer className='grid grid-cols-1 md:grid-cols-2 gap-6' staggerDelay={0.1}>
            {VALUES.map((v) => (
              <StaggerItem key={v.title}>
                <Card3D className='card p-8 h-full'>
                  <div className='w-12 h-12 flex items-center justify-center rounded-lg bg-[rgba(139,157,175,0.1)] border border-[rgba(139,157,175,0.15)] mb-4'>
                    <v.icon size={22} className='text-[#8B9DAF]' strokeWidth={1.5} />
                  </div>
                  <h3 className='text-[18px] font-bold text-white mb-2'>{v.title}</h3>
                  <p className='text-[13px] text-[#999999] leading-relaxed'>{v.desc}</p>
                </Card3D>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ STATS ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>The Numbers</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-16'>By the numbers</h2>
          </FadeIn>
          <div className='grid grid-cols-2 gap-x-12 gap-y-10 md:gap-y-14'>
            {metrics.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.1}>
                <div className='pb-6 border-b border-[rgba(255,255,255,0.04)]'>
                  <p className='text-[clamp(2.5rem,5vw,4rem)] font-bold text-white tracking-tight leading-none mb-4'>
                    <CountUp to={s.value} prefix={s.prefix || ''} suffix={s.suffix} duration={2.5} decimals={0} />
                  </p>
                  <p className='text-[10px] font-bold tracking-[0.15em] uppercase text-[#666666] mb-2'>{s.label}</p>
                  <p className='text-[13px] text-[rgba(255,255,255,0.35)] leading-relaxed'>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ BUILD TIMELINE ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Build Timeline</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-16'>12 days, start to finish</h2>
          </FadeIn>
          <div className='relative'>
            <div className='absolute left-5 md:left-10 top-0 bottom-0 w-px bg-[rgba(255,255,255,0.06)]'>
              <div className='w-full bg-[#8B9DAF]/30' style={{ height: '100%' }} />
            </div>
            <StaggerContainer className='space-y-8' staggerDelay={0.06}>
              {timeline.map((item, i) => (
                <StaggerItem key={i}>
                  <div className='flex gap-6 md:gap-12 relative'>
                    <div className='relative z-10 shrink-0 w-10 md:w-20 flex justify-center'>
                      {item.status === 'active' ? (
                        <div className='relative'>
                          <PulseIndicator size={14} color='#8B9DAF' speed={2} />
                          <div className='absolute inset-0 flex items-center justify-center'><div className='w-2.5 h-2.5 rounded-full bg-[#8B9DAF]' /></div>
                        </div>
                      ) : (
                        <div className='w-3.5 h-3.5 rounded-full border-2 mt-1.5 bg-white border-white' />
                      )}
                    </div>
                    <div className='pb-2'>
                      <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${item.status === 'active' ? 'text-[#8B9DAF]' : 'text-white/50'}`}>{item.year}{item.status === 'active' && ' — Current'}</span>
                      <h3 className='text-[16px] font-bold text-white mt-1 mb-1'>{item.title}</h3>
                      <p className='text-[13px] text-[rgba(255,255,255,0.5)] leading-relaxed max-w-lg'>{item.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ TECH STACK ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Tech Stack</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-16'>Built with modern tools<span className='text-[#8B9DAF]'>.</span></h2>
          </FadeIn>
          <StaggerContainer className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' staggerDelay={0.05}>
            {techStack.map((tech) => (
              <StaggerItem key={tech.name}>
                <div className='card p-5 h-full'>
                  <p className='text-[10px] font-bold tracking-[0.15em] uppercase text-[#8B9DAF] mb-1'>{tech.category}</p>
                  <h3 className='text-[14px] font-bold text-white mb-1'>{tech.name}</h3>
                  <p className='text-[11px] text-[#666666] leading-relaxed'>{tech.detail}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ FOUNDER QUOTE ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[960px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <span className='text-[clamp(4rem,12vw,9rem)] text-[rgba(255,255,255,0.04)] leading-none font-serif block -mb-12'>&ldquo;</span>
            <TextReveal text='The AI-native timeline changes everything. What took 24 months now takes 6. What took a team now takes a founder. SecQA is proof: 10 days, 265 tests, real billing, real AI, real product.' className='text-[clamp(1.25rem,3vw,2rem)] font-light text-white leading-[1.4] mb-10' />
            <div className='flex items-center gap-4'>
              <div className='w-12 h-px bg-[#8B9DAF]' />
              <div>
                <p className='text-sm text-white font-semibold'>VitalCheffe</p>
                <p className='text-[11px] text-[rgba(255,255,255,0.25)] mt-0.5'>Founder, SecQA</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ CTA ═══ */}
      <ParallaxSection speed={0.1} className='relative bg-[#000000] overflow-hidden py-28 md:py-36'>
        <div className='absolute inset-0 dot-pattern opacity-100' />
        <div className='relative z-10 max-w-[800px] mx-auto px-6 md:px-12 text-center'>
          <FadeIn>
            <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight mb-4'>Want to talk?</h2>
            <p className='text-lg text-white/50 max-w-xl mx-auto mb-8 leading-relaxed'>Founder reads every email. Reply within 24 hours.</p>
            <Link href='/contact' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>Get in touch <ArrowRight size={14} /></Link>
          </FadeIn>
        </div>
      </ParallaxSection>
    </div>
  );
}
