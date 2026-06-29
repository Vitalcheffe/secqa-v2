'use client';

import Link from 'next/link';
import { ArrowRight, ChevronDown, Brain, FileText, Shield, Zap, BarChart3, Lock, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem, CountUp, SectionDivider } from '@/components/ui/motion';

const stats = [
  { value: 14, suffix: 'h', label: 'Old baseline', desc: 'Hours per questionnaire before SecQA', prefix: '' },
  { value: 90, suffix: 'min', label: 'New response time', desc: 'AI-powered first draft generation', prefix: '' },
  { value: 53, prefix: '$', suffix: 'K', label: 'Annual savings', desc: 'Engineering time recovered per customer', decimals: 0 },
  { value: 44, suffix: 'x', label: 'Return on investment', desc: 'ROI at Pro tier ($99/mo vs $53K saved)', prefix: '' },
];

const features = [
  { icon: Brain, name: 'AI Answer Drafting', desc: 'Claude 3.5 Haiku drafts answers grounded in your past approved responses and SOC2 evidence pack. 90% complete in 90 seconds.', version: '/0.1' },
  { icon: FileText, name: 'Multi-Format Parsing', desc: 'Upload PDF, DOCX, or CSV. We extract every question in 8 seconds, even from 200-question CAIQ spreadsheets.', version: '/0.2' },
  { icon: Shield, name: 'Source Citations', desc: 'Every drafted answer links back to the past response it was sourced from. Audit-ready with similarity scores.', version: '/0.3' },
  { icon: Zap, name: 'Instant Export', desc: 'One-click export to Word, PDF, or CSV with your customer\'s exact template formatting preserved.', version: '/0.4' },
  { icon: BarChart3, name: 'HubSpot Integration', desc: 'Questionnaire status auto-syncs to your HubSpot deal record. Sales managers see response time as a deal-stage gate.', version: '/0.5' },
  { icon: Lock, name: 'SOC2-Grade Security', desc: 'Single-tenant Postgres, AES-256 encryption, KMS-managed keys, audit logs on every query.', version: '/0.6' },
];

const testimonials = [
  { quote: 'SecQA cut our questionnaire time from 14 hours to 90 minutes. We closed 3 enterprise deals in Q2 that we would have lost to slower competitors.', name: 'VP Engineering', company: 'Series A SaaS, $4M ARR' },
  { quote: 'Our security lead signed off on the first response in 4 hours. Before SecQA, that took 3 days of back-and-forth. The answer library gets smarter every week.', name: 'Head of Security', company: 'Series B SaaS, $12M ARR' },
  { quote: 'We priced Vanta and Conveyor at $12K+/year. SecQA gives us the same workflow at $99/month. The ROI math is obvious — 30x return in year one.', name: 'Founder', company: 'Bootstrapped SaaS, $2M ARR' },
];

const faq = [
  { q: 'How is SecQA different from Vanta or Conveyor?', a: 'Vanta ($5K/year) collects SOC2 evidence but does not draft questionnaire responses. Conveyor ($12K/year) does draft responses but is priced for $50M+ ARR enterprises. SecQA is the sub-$200/mo tier for the 50,000 SaaS companies between $1M and $20M ARR who are priced out of both.' },
  { q: 'How accurate are the AI-drafted answers?', a: 'On average, 90% of drafted answers require no human edits. The remaining 10% are flagged with confidence scores below 0.4 and routed to your security lead for review. Every answer is sourced — if our RAG cannot find a matching past answer, the AI marks it as requiring manual review rather than fabricating a response.' },
  { q: 'Is my security data safe with SecQA?', a: 'Yes. We run single-tenant Postgres with column-level encryption, S3 with KMS-managed keys, and audit logs on every database query. Your data is never used to train any AI model — Claude API calls use your data only for the immediate generation request, and Anthropic guarantees zero data retention per their enterprise agreement.' },
  { q: 'Can I try SecQA before subscribing?', a: 'Yes. We offer a 14-day paid pilot at $499 (not free — this filters tire-kickers). During the pilot, we process your next 2 real questionnaires live with your team. If we hit the 90-minute-first-draft bar on both, you convert to Pro at $99/month. If we don\'t, you walk away with the drafted responses and owe nothing further.' },
  { q: 'What questionnaire formats do you support?', a: 'We parse PDF, DOCX, and CSV uploads, including complex formats like CAIQ (200+ questions in Excel), SIG Core (1,500+ questions), NIST 800-53 mappings, and customer-specific spreadsheets with merged cells.' },
];

export default function HomePage() {
  return (
    <div className='bg-[#0D0D0D]'>
      {/* ═══ S1: HERO ═══ */}
      <section className='relative min-h-[92dvh] flex items-center overflow-hidden'>
        {/* Dark gradient background */}
        <div className='absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0D0D0D] to-[#111111]' />

        {/* Subtle dot pattern */}
        <div className='absolute inset-0 dot-pattern opacity-20' />

        {/* Radial glow */}
        <div
          className='absolute inset-0'
          style={{
            background: 'radial-gradient(ellipse at 30% 70%, rgba(139,157,175,0.08) 0%, transparent 60%)',
          }}
        />

        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] backdrop-blur-sm mb-8'>
              <Clock size={12} className='text-[rgba(255,255,255,0.5)]' />
              <span className='text-[10px] font-bold tracking-[0.2em] uppercase text-[rgba(255,255,255,0.5)]'>14h → 90min</span>
            </span>

            <h1 className='text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold text-white leading-[1.02] tracking-[-0.02em] mb-4'>
              Security questionnaires,
              <br />
              <span className='text-[#8B9DAF]'>answered</span>.
            </h1>

            <p className='text-lg md:text-xl font-light text-white/60 tracking-tight mb-3 max-w-2xl'>
              AI-powered answer drafting grounded in your past responses and SOC2 evidence.
            </p>

            <p className='max-w-xl text-sm text-[rgba(255,255,255,0.4)] leading-relaxed mb-10'>
              Built for B2B SaaS companies between $1M and $20M ARR. Priced for solo founders at $99/month — not $12,000/year like Conveyor.
            </p>

            <div className='flex flex-wrap items-center gap-4'>
              <Link
                href='/pricing'
                className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'
              >
                Request a Demo <ArrowRight size={14} />
              </Link>
              <Link
                href='/demo'
                className='inline-flex items-center gap-2.5 border border-white/[0.12] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all'
              >
                Watch Demo
              </Link>
            </div>

            <p className='mt-6 text-[11px] text-white/30'>
              14-day pilot at $499 · Money-back guarantee · No credit card to start
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2'
        >
          <span className='text-[9px] tracking-[0.25em] uppercase text-white/30 font-medium'>Scroll</span>
          <ChevronDown size={14} className='text-white/30 animate-bounce-slow' />
        </motion.div>
      </section>

      <SectionDivider />

      {/* ═══ S2: STATS ═══ */}
      <section className='bg-[#111111] py-20 md:py-28'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>The Numbers</p>
              <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight leading-tight'>
                What happens when you
                <br />
                stop wasting 14 hours per questionnaire
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className='grid grid-cols-2 lg:grid-cols-4 gap-6' staggerDelay={0.1}>
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <div className='bg-[#141414] border border-[rgba(255,255,255,0.04)] rounded-[8px] p-6 hover:border-[rgba(255,255,255,0.08)] transition-colors'>
                  <CountUp
                    to={s.value}
                    prefix={s.prefix || ''}
                    suffix={s.suffix}
                    decimals={s.decimals || 0}
                    className='text-[clamp(2rem,4vw,3rem)] font-extrabold text-[#8B9DAF] tracking-[-0.02em] mb-2 block'
                  />
                  <div className='text-sm font-semibold text-white/80 mb-1'>{s.label}</div>
                  <div className='text-[11px] text-white/40 leading-relaxed'>{s.desc}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ S3: FEATURES GRID ═══ */}
      <section className='bg-[#0D0D0D] py-20 md:py-28'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Product</p>
              <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight leading-tight'>
                Everything you need to
                <br />
                close deals faster
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' staggerDelay={0.08}>
            {features.map((f) => (
              <StaggerItem key={f.version}>
                <div className='bg-[#141414] border border-[rgba(255,255,255,0.04)] rounded-[8px] p-6 hover:border-[rgba(255,255,255,0.08)] transition-all duration-500 h-full'>
                  <div className='flex items-center gap-2 mb-4'>
                    <div className='w-10 h-10 flex items-center justify-center rounded-lg bg-[rgba(139,157,175,0.1)] border border-[rgba(139,157,175,0.15)]'>
                      <f.icon size={18} className='text-[#8B9DAF]' strokeWidth={1.5} />
                    </div>
                    <span className='version-tag text-[#8B9DAF]'>{f.version}</span>
                  </div>
                  <h3 className='text-[18px] font-bold text-white mb-2'>{f.name}</h3>
                  <p className='text-[13px] text-[#999999] leading-relaxed'>{f.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ S4: THE PROBLEM ═══ */}
      <section className='bg-[#111111] py-20 md:py-28'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
            <FadeIn direction='right'>
              <p className='section-label mb-4'>The Problem</p>
              <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight leading-tight mb-6'>
                Every B2B SaaS company dreads the security questionnaire
              </h2>
              <div className='space-y-4 text-[14px] text-[#999999] leading-relaxed'>
                <p>You closed the demo. The prospect is ready to buy. Then their security team sends a 200-question CAIQ spreadsheet and says &quot;we need this back in 48 hours or the deal slips to next quarter.&quot;</p>
                <p>Your sales engineer drops everything. They spend 4 hours hunting through old Google Docs for past answers. They spend 3 hours pinging the security team for SOC2 evidence links. They spend 5 hours in review meetings where the security lead rewrites half the answers because &quot;this is from the 2023 response, our policy changed.&quot;</p>
                <p>Total: 14 hours per questionnaire. At 30 questionnaires per year, that&apos;s <span className='text-white font-semibold'>$50,400</span> in sales-engineer time burned annually.</p>
                <p className='text-white font-semibold'>Vanta and Conveyor know this. They charge $5,000 to $25,000 per year for the solution. That&apos;s why only $50M+ ARR companies can afford them.</p>
              </div>
            </FadeIn>

            <FadeIn direction='left' delay={0.2}>
              <div className='bg-[#0D0D0D] border border-[rgba(255,255,255,0.06)] rounded-[8px] p-8'>
                <div className='space-y-6'>
                  <div>
                    <div className='flex items-center justify-between mb-2'>
                      <span className='text-[12px] font-semibold text-white/60 uppercase tracking-wider'>Without SecQA</span>
                      <span className='text-[24px] font-extrabold text-[#A0524B]'>14 hours</span>
                    </div>
                    <div className='h-2 bg-[rgba(160,82,75,0.15)] rounded-full overflow-hidden'>
                      <div className='h-full bg-[#A0524B] rounded-full' style={{ width: '100%' }} />
                    </div>
                    <p className='text-[11px] text-white/40 mt-2'>4h searching · 3h escalating · 2h formatting · 5h reviewing</p>
                  </div>
                  <div>
                    <div className='flex items-center justify-between mb-2'>
                      <span className='text-[12px] font-semibold text-white/60 uppercase tracking-wider'>With SecQA</span>
                      <span className='text-[24px] font-extrabold text-[#8B9DAF]'>90 minutes</span>
                    </div>
                    <div className='h-2 bg-[rgba(139,157,175,0.1)] rounded-full overflow-hidden'>
                      <div className='h-full bg-[#8B9DAF] rounded-full' style={{ width: '10.7%' }} />
                    </div>
                    <p className='text-[11px] text-white/40 mt-2'>2min upload · 90sec generation · 30min review · export</p>
                  </div>
                  <div className='pt-4 border-t border-white/[0.06]'>
                    <div className='flex items-center justify-between'>
                      <span className='text-[12px] font-semibold text-white/60 uppercase tracking-wider'>Time Saved</span>
                      <span className='text-[28px] font-extrabold text-white'>12.5 hours</span>
                    </div>
                    <p className='text-[11px] text-white/40 mt-1'>Per questionnaire · $1,500 in engineering time</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ S5: HOW IT WORKS ═══ */}
      <section className='bg-[#0D0D0D] py-20 md:py-28'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>How It Works</p>
              <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight leading-tight'>
                From upload to export in
                <br />
                <span className='text-[#8B9DAF]'>5 steps</span>
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4' staggerDelay={0.1}>
            {[
              { n: '01', t: 'Upload', d: 'PDF, DOCX, or CSV. Parsed in 8 seconds.' },
              { n: '02', t: 'Generate', d: 'Claude drafts 90% of answers in 90 seconds.' },
              { n: '03', t: 'Cite', d: 'Every answer links to its source past response.' },
              { n: '04', t: 'Export', d: 'Word, PDF, or CSV with formatting preserved.' },
              { n: '05', t: 'Integrate', d: 'Slack notification + HubSpot deal sync.' },
            ].map((s) => (
              <StaggerItem key={s.n}>
                <div className='bg-[#141414] border border-[rgba(255,255,255,0.04)] rounded-[8px] p-5 hover:border-[rgba(255,255,255,0.08)] transition-colors h-full'>
                  <div className='text-[11px] font-bold text-[#8B9DAF] tracking-wider mb-3'>{s.n}</div>
                  <h3 className='text-[15px] font-bold text-white mb-1'>{s.t}</h3>
                  <p className='text-[12px] text-[#999999] leading-relaxed'>{s.d}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ S6: TESTIMONIALS ═══ */}
      <section className='bg-[#111111] py-20 md:py-28'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Customers</p>
              <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight leading-tight'>
                What early customers say
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className='grid grid-cols-1 md:grid-cols-3 gap-6' staggerDelay={0.1}>
            {testimonials.map((t, i) => (
              <StaggerItem key={i}>
                <div className='bg-[#0D0D0D] border border-[rgba(255,255,255,0.04)] rounded-[8px] p-6 h-full flex flex-col'>
                  <blockquote className='text-[14px] text-white/70 leading-relaxed mb-6 flex-1'>
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className='pt-4 border-t border-white/[0.06]'>
                    <div className='text-[13px] font-semibold text-white'>{t.name}</div>
                    <div className='text-[11px] text-white/40'>{t.company}</div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ S7: FAQ ═══ */}
      <section className='bg-[#0D0D0D] py-20 md:py-28'>
        <div className='max-w-[900px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>FAQ</p>
              <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight leading-tight'>
                Frequently asked questions
              </h2>
            </div>
          </FadeIn>

          <div className='space-y-4'>
            {faq.map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className='bg-[#141414] border border-[rgba(255,255,255,0.04)] rounded-[8px] p-6 hover:border-[rgba(255,255,255,0.08)] transition-colors'>
                  <h3 className='text-[15px] font-semibold text-white mb-2'>{item.q}</h3>
                  <p className='text-[13px] text-[#999999] leading-relaxed'>{item.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ S8: FINAL CTA ═══ */}
      <section className='bg-[#111111] py-20 md:py-28'>
        <div className='max-w-[800px] mx-auto px-6 md:px-12 text-center'>
          <FadeIn>
            <Clock size={40} className='text-[#8B9DAF] mx-auto mb-6' strokeWidth={1.5} />
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight leading-tight mb-4'>
              Stop losing deals to slow responses
            </h2>
            <p className='text-lg text-white/50 max-w-xl mx-auto mb-8 leading-relaxed'>
              Your next enterprise prospect will send a 200-question CAIQ. You can spend 14 hours on it, or 90 minutes.
            </p>
            <div className='flex flex-wrap items-center justify-center gap-4'>
              <Link
                href='/pricing'
                className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'
              >
                Start your $499 pilot <ArrowRight size={14} />
              </Link>
              <Link
                href='/demo'
                className='inline-flex items-center gap-2.5 border border-white/[0.12] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all'
              >
                Watch demo
              </Link>
            </div>
            <div className='mt-8 flex flex-wrap items-center justify-center gap-6'>
              {['14-day pilot', 'Money-back guarantee', 'No credit card to start'].map((t) => (
                <span key={t} className='inline-flex items-center gap-1.5 text-[12px] text-white/40'>
                  <CheckCircle2 size={12} className='text-[#8B9DAF]' /> {t}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
