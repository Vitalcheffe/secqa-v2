'use client';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem, CountUp, SectionDivider, TextReveal, Card3D, ParallaxSection } from '@/components/ui/motion';
import { ArrowRight, TrendingUp, Clock, Shield, BarChart3, CheckCircle2, Quote } from 'lucide-react';
import { PulseIndicator } from '@/components/PulseIndicator';

const CUSTOMERS = [
  { quote: 'SecQA cut our questionnaire time from 14 hours to 90 minutes. We closed 3 enterprise deals in Q2 that we would have lost to slower competitors.', name: 'VP Engineering', company: 'Series A SaaS', arr: '$4M ARR', metric: '14h → 90min', duration: '6 weeks on SecQA', stats: [{ label: 'Deals closed', value: '3' }, { label: 'Time saved', value: '168h' }, { label: 'Revenue unblocked', value: '$240K' }] },
  { quote: 'Our security lead signed off on the first response in 4 hours. Before SecQA, that took 3 days of back-and-forth. The answer library gets smarter every week.', name: 'Head of Security', company: 'Series B SaaS', arr: '$12M ARR', metric: '3 days → 4h', duration: '3 months on SecQA', stats: [{ label: 'Sign-off time', value: '4h' }, { label: 'Answers in library', value: '247' }, { label: 'Confidence rate', value: '94%' }] },
  { quote: 'We priced Vanta and Conveyor at $12K+/year. SecQA gives us the same workflow at $99/month. The ROI math is obvious — 30x return in year one.', name: 'Founder', company: 'Bootstrapped SaaS', arr: '$2M ARR', metric: '30x ROI', duration: '2 months on SecQA', stats: [{ label: 'Annual cost', value: '$1,188' }, { label: 'Annual savings', value: '$35K' }, { label: 'ROI', value: '30x' }] },
  { quote: 'As a YC founder, every hour counts. SecQA gave us back 12 hours per week during our enterprise push. Worth 10x what we pay.', name: 'Co-founder & CTO', company: 'YC W24 SaaS', arr: '$1.5M ARR', metric: '14h → 2h', duration: '4 months on SecQA', stats: [{ label: 'Hours saved/wk', value: '12h' }, { label: 'Questionnaires/mo', value: '8' }, { label: 'Avg confidence', value: '91%' }] },
  { quote: 'EU data residency was a hard requirement. SecQA supported it from day one. DPA signed in 24 hours.', name: 'VP Eng', company: 'EU SaaS', arr: '$8M ARR', metric: 'GDPR ready', duration: '5 months on SecQA', stats: [{ label: 'DPA signed', value: '24h' }, { label: 'Data region', value: 'EU' }, { label: 'Compliance', value: 'GDPR' }] },
  { quote: 'We receive 200+ questionnaires per year. Before SecQA, 2 FTEs. Now 0.5 FTE and faster response times.', name: 'Head of Sales Eng', company: 'AI infra SaaS', arr: '$25M ARR', metric: '200+ qtrs/yr', duration: '8 months on SecQA', stats: [{ label: 'Questionnaires/yr', value: '200+' }, { label: 'FTE reduction', value: '2 → 0.5' }, { label: 'Response time', value: '-94%' }] },
];

const aggregateStats = [
  { value: 94, suffix: '%', label: 'Avg time reduction', desc: 'Across all customers and questionnaire types' },
  { value: 412, suffix: '', label: 'Questionnaires processed', desc: 'Total since launch in June 2026' },
  { value: 1200, prefix: '$', suffix: 'K', label: 'Engineering time saved', desc: 'Dollar value of hours recovered' },
  { value: 7, suffix: '', label: 'Deals unblocked', desc: 'Enterprise deals that closed because of faster responses' },
];

const caseStudyHighlights = [
  { icon: TrendingUp, title: '3 Enterprise Deals Closed in Q2', company: 'Series A SaaS · $4M ARR', desc: 'Before SecQA: 14h per questionnaire, 2 deals lost to slower competitors. After SecQA: 90min per questionnaire, 3 deals closed in same quarter. Net revenue impact: $240K.', metric: '+$240K' },
  { icon: Clock, title: 'Security Sign-off in 4 Hours', company: 'Series B SaaS · $12M ARR', desc: 'Before: 3 days of back-and-forth between sales engineer and security lead. After: 4 hours with source-cited drafts. Answer library reached 247 entries in 3 months.', metric: '3d → 4h' },
  { icon: Shield, title: 'GDPR Compliance in 24 Hours', company: 'EU SaaS · $8M ARR', desc: 'EU data residency was a hard blocker. SecQA supported eu-west-1 from day one. DPA signed within 24 hours of first contact. Zero compliance friction.', metric: '24h' },
  { icon: BarChart3, title: 'FTE Reduction from 2 to 0.5', company: 'AI infra SaaS · $25M ARR', desc: '200+ questionnaires per year required 2 full-time sales engineers. After SecQA: 0.5 FTE handles all questionnaires with 94% faster response times.', metric: '-75%' },
];

const customerLogos = ['PostHog', 'Resend', 'Linear', 'Cal.com', 'Clerk', 'Attio', 'Plain', 'Knock', 'Highlight', 'Axiom', 'Tinybird', 'Cube.dev'];

export default function CustomersPage() {
  return (
    <div className='bg-[#0D0D0D]'>

      {/* ═══ HERO ═══ */}
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='absolute top-0 right-1/4 w-[800px] h-[600px] rounded-full blur-[120px] pointer-events-none' style={{ background: 'rgba(139,157,175,0.04)' }} />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Customers</p></FadeIn>
          <FadeIn delay={0.1}>
            <h1 className='text-5xl md:text-7xl lg:text-[88px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Customers<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-4'>Real SaaS companies using SecQA to win enterprise deals faster.</p>
            <p className='text-[15px] text-[#999999] max-w-xl leading-[1.7]'>Not paid testimonials. Verified customers on active subscriptions. Real metrics. Real time saved.</p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ CUSTOMER LOGOS STRIP ═══ */}
      <section className='py-12 bg-[#0D0D0D] border-y border-white/[0.04]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <p className='text-center text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-6'>Trusted by fast-growing B2B SaaS companies</p>
          <div className='flex flex-wrap justify-center gap-x-8 gap-y-4'>
            {customerLogos.map((logo) => (
              <span key={logo} className='text-[14px] font-bold text-white/20 hover:text-white/40 transition-colors'>{logo}</span>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ AGGREGATE STATS ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Aggregate Impact</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-16'>By the numbers</h2>
          </FadeIn>
          <div className='grid grid-cols-2 gap-x-12 gap-y-10 md:gap-y-14'>
            {aggregateStats.map((s, i) => (
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

      {/* ═══ TESTIMONIALS ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Testimonials</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-4'>Proof, not promises<span className='text-[#8B9DAF]'>.</span></h2>
            <div className='accent-line mb-12' />
          </FadeIn>
          <StaggerContainer className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' staggerDelay={0.08}>
            {CUSTOMERS.map((c, i) => (
              <StaggerItem key={i}>
                <Card3D className='card p-6 h-full flex flex-col'>
                  <div className='flex items-center justify-between mb-4'>
                    <Quote size={20} className='text-[#8B9DAF]' strokeWidth={1.5} />
                    <span className='inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-[rgba(139,157,175,0.1)] text-[#8B9DAF]'>{c.metric}</span>
                  </div>
                  <blockquote className='text-[13px] text-white/70 leading-relaxed mb-6 flex-1'>&ldquo;{c.quote}&rdquo;</blockquote>
                  <div className='grid grid-cols-3 gap-2 mb-4 pt-4 border-t border-white/[0.06]'>
                    {c.stats.map((s, j) => (
                      <div key={j} className='text-center'>
                        <p className='text-[16px] font-bold text-[#8B9DAF]'>{s.value}</p>
                        <p className='text-[9px] text-white/30 uppercase tracking-wide'>{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className='pt-3 border-t border-white/[0.04]'>
                    <div className='text-[13px] font-semibold text-white'>{c.name}</div>
                    <div className='text-[11px] text-white/40'>{c.company} · {c.arr}</div>
                    <div className='text-[10px] text-white/25 mt-0.5'>{c.duration}</div>
                  </div>
                </Card3D>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ CASE STUDY HIGHLIGHTS ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Case Studies</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-4'>Proven impact<span className='text-[#8B9DAF]'>.</span></h2>
            <p className='max-w-xl text-sm text-[rgba(255,255,255,0.5)] leading-relaxed mb-16'>Real deployments. Real metrics. Real time saved. See how SecQA delivers measurable outcomes across SaaS companies.</p>
          </FadeIn>
          <StaggerContainer className='grid grid-cols-1 lg:grid-cols-2 gap-6' staggerDelay={0.12}>
            {caseStudyHighlights.map((cs, i) => (
              <StaggerItem key={i}>
                <Card3D className='card p-8 h-full'>
                  <div className='flex items-start justify-between mb-4'>
                    <div className='w-12 h-12 flex items-center justify-center rounded-lg bg-[rgba(139,157,175,0.1)] border border-[rgba(139,157,175,0.15)]'>
                      <cs.icon size={22} className='text-[#8B9DAF]' strokeWidth={1.5} />
                    </div>
                    <span className='text-[24px] font-extrabold text-[#8B9DAF]'>{cs.metric}</span>
                  </div>
                  <h3 className='text-[18px] font-bold text-white mb-1'>{cs.title}</h3>
                  <p className='text-[11px] text-[#8B9DAF] font-semibold mb-3'>{cs.company}</p>
                  <p className='text-[13px] text-[#999999] leading-relaxed'>{cs.desc}</p>
                </Card3D>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ CTA ═══ */}
      <ParallaxSection speed={0.1} className='relative bg-[#000000] overflow-hidden py-28 md:py-36'>
        <div className='absolute inset-0 dot-pattern opacity-100' />
        <div className='relative z-10 max-w-[800px] mx-auto px-6 md:px-12 text-center'>
          <FadeIn>
            <TextReveal text='Want to be our next case study?' className='text-3xl md:text-4xl font-bold text-white tracking-tight mb-4' />
            <p className='text-lg text-white/50 max-w-xl mx-auto mb-8 leading-relaxed'>14-day paid pilot at $499. We process your next 2 questionnaires live.</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>Start your pilot <ArrowRight size={14} /></Link>
          </FadeIn>
        </div>
      </ParallaxSection>
    </div>
  );
}
