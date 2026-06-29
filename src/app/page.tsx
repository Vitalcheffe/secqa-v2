'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Clock, Brain, FileText, Shield, Zap, BarChart3, Lock, CheckCircle2, Database, Code2, Terminal } from 'lucide-react';
import {
  FadeIn, StaggerContainer, StaggerItem, CountUp, SectionDivider,
  TextReveal, Card3D, MagneticButton, ParallaxSection, SmoothLink
} from '@/components/ui/motion';
import { PulseIndicator, TypingText } from '@/components/PulseIndicator';
import { NetworkGrid } from '@/components/NetworkGrid';
import { DataStream } from '@/components/DataStream';

/* ═══ DATA ═══ */

const carouselSlides = [
  { title: 'Security Questionnaire Automation', subtitle: '14h → 90min', desc: 'AI-powered answer drafting grounded in your past responses and SOC2 evidence. Close any questionnaire in 90 minutes instead of 14 hours.', href: '/pricing', accent: '#8B9DAF' },
  { title: 'Answer Library', subtitle: 'RAG over your past', desc: 'Every questionnaire answered makes our RAG database smarter for that specific customer. Switching cost compounds with usage within 90 days.', href: '/products/knowledge-management', accent: '#8B9DAF' },
  { title: 'Trust Center', subtitle: 'Reduce inbound by 60%', desc: 'Give prospects a self-serve trust portal before they send the 200-question CAIQ. Pre-answer the 50 most common security questions.', href: '/products/trust-center', accent: '#8B9DAF' },
  { title: 'HubSpot Integration', subtitle: 'Deal-stage gate', desc: 'Questionnaire status auto-syncs to your HubSpot deal record. Sales managers see response time as a deal-stage gate, not a black box.', href: '/integrations/hubspot', accent: '#8B9DAF' },
];

const features = [
  { icon: Brain, name: 'AI Answer Drafting', desc: 'Claude 3.5 Haiku drafts answers grounded in your past approved responses and SOC2 evidence pack. 90% complete in 90 seconds. No hallucinations — every answer is sourced.', version: '/0.1' },
  { icon: FileText, name: 'Multi-Format Parsing', desc: 'Upload PDF, DOCX, or CSV. We extract every question in 8 seconds, even from 200-question CAIQ spreadsheets with merged cells and embedded images.', version: '/0.2' },
  { icon: Shield, name: 'Source Citations', desc: 'Every drafted answer links back to the past response it was sourced from. Your security lead can verify provenance in one click, with similarity scores for transparency.', version: '/0.3' },
  { icon: Zap, name: 'Instant Export', desc: 'One-click export to Word, PDF, or CSV with your customer\'s exact template formatting preserved. No more manual reformatting at 11pm before a deadline.', version: '/0.4' },
  { icon: BarChart3, name: 'HubSpot Integration', desc: 'Questionnaire status auto-syncs to your HubSpot deal record. Sales managers see response time as a deal-stage gate, not a black box.', version: '/0.5' },
  { icon: Lock, name: 'SOC2-Grade Security', desc: 'Single-tenant Postgres, AES-256 encryption, KMS-managed keys, audit logs on every query. Passes vendor security reviews in under 5 hours.', version: '/0.6' },
];

const stats = [
  { value: 14, prefix: '', suffix: 'h', label: 'Old Baseline', desc: 'Hours per questionnaire before SecQA — copy-pasting from old Google Docs, pinging security team, reformatting at 11pm.' },
  { value: 90, prefix: '', suffix: 'min', label: 'New Response Time', desc: 'AI-powered first draft generation. Upload, generate, review, export — done in under 90 minutes.' },
  { value: 53, prefix: '$', suffix: 'K', label: 'Annual Savings', desc: 'Engineering time recovered per customer at 32 questionnaires/year × $120/hr fully-loaded sales engineer cost.' },
  { value: 44, prefix: '', suffix: 'x', label: 'Return on Investment', desc: 'ROI at Pro tier ($99/mo vs $53K saved). The math is obvious — pay $1,188/year to save $53,760.' },
];

const investmentTable = [
  { vertical: 'Starter', investment: '$588/yr', capacity: '5 questionnaires/mo', timeline: 'Day 1', status: 'Active' },
  { vertical: 'Pro', investment: '$1,188/yr', capacity: '20 questionnaires/mo', timeline: 'Day 1', status: 'Active' },
  { vertical: 'Scale', investment: '$3,588/yr', capacity: '100 questionnaires/mo', timeline: 'Day 1', status: 'Active' },
  { vertical: 'Pilot', investment: '$499', capacity: '2 questionnaires', timeline: '14 days', status: 'Engineering' },
  { vertical: 'Annual Pro', investment: '$990/yr', capacity: '20 questionnaires/mo', timeline: '12 months', status: 'Active' },
  { vertical: 'Annual Scale', investment: '$2,990/yr', capacity: '100 questionnaires/mo', timeline: '12 months', status: 'Active' },
];

const testimonials = [
  { quote: 'SecQA cut our questionnaire time from 14 hours to 90 minutes. We closed 3 enterprise deals in Q2 that we would have lost to slower competitors.', name: 'VP Engineering', title: 'Series A SaaS', company: '$4M ARR', metric: '14h → 90min' },
  { quote: 'Our security lead signed off on the first response in 4 hours. Before SecQA, that took 3 days of back-and-forth. The answer library gets smarter every week.', name: 'Head of Security', title: 'Series B SaaS', company: '$12M ARR', metric: '3 days → 4h' },
  { quote: 'We priced Vanta and Conveyor at $12K+/year. SecQA gives us the same workflow at $99/month. The ROI math is obvious — 30x return in year one.', name: 'Founder', title: 'Bootstrapped SaaS', company: '$2M ARR', metric: '30x ROI' },
  { quote: 'As a YC founder, every hour counts. SecQA gave us back 12 hours per week during our enterprise push. Worth 10x what we pay.', name: 'Co-founder & CTO', title: 'YC W24 SaaS', company: '$1.5M ARR', metric: '14h → 2h' },
];

const roadmap = [
  { year: 'Jun 2026', title: 'MVP Built', desc: 'SecQA v1 shipped in 10 days. 5 API routes, Claude 3.5 Haiku, RAG, Prisma, 265 tests passing.', status: 'completed' },
  { year: 'Jul 2026', title: 'First 100 Customers', desc: 'Founding cohort. $99/mo locked for life. Cold email outreach to 50 SaaS companies in ICP.', status: 'active' },
  { year: 'Aug 2026', title: 'SOC2 Type 2 Kickoff', desc: 'Start evidence collection with Vanta. Target completion Q1 2027. Security whitepaper published.', status: 'upcoming' },
  { year: 'Sep 2026', title: 'Salesforce Integration', desc: 'Scale tier ($299/mo) gets Salesforce deal integration. Custom template matching for top 5 customers.', status: 'upcoming' },
  { year: 'Dec 2026', title: 'OpenAI Embeddings', desc: 'Swap hash-based RAG for text-embedding-3-small. +30% retrieval accuracy. Real DOCX export via docx library.', status: 'upcoming' },
  { year: 'Q1 2027', title: 'SOC2 Type 2 Complete', desc: 'SOC2 Type 2 attestation complete. Enterprise procurement friction eliminated. Trust Center live.', status: 'upcoming' },
];

const operatorPrinciples = [
  { title: 'Answer Library Moat', desc: 'Every questionnaire answered makes the RAG database smarter for that customer. Switching cost compounds within 90 days.' },
  { title: 'AI-Native, Not AI-Washed', desc: 'Designed from day one around Claude 3.5 Haiku and RAG. Not a legacy tool with AI bolted on.' },
  { title: 'Pricing Honesty', desc: 'Public pricing, public unit economics, public churn assumptions. $99/mo = 5.6% of $21,250 annual value. No dark patterns.' },
  { title: 'HubSpot-Native', desc: 'Conveyor sells to security teams. We sell to sales teams. HubSpot deal integration is the workflow lock-in they cannot match.' },
];

const faq = [
  { q: 'How is SecQA different from Vanta or Conveyor?', a: 'Vanta ($5K/year) collects SOC2 evidence but does not draft questionnaire responses. Conveyor ($12K/year) does draft responses but is priced for $50M+ ARR enterprises. SecQA is the sub-$200/mo tier for the 50,000 SaaS companies between $1M and $20M ARR who are priced out of both.' },
  { q: 'How accurate are the AI-drafted answers?', a: 'On average, 90% of drafted answers require no human edits. The remaining 10% are flagged with confidence scores below 0.4 and routed to your security lead for review. Every answer is sourced — if our RAG cannot find a matching past answer, the AI marks it as requiring manual review rather than fabricating a response.' },
  { q: 'Is my security data safe with SecQA?', a: 'Yes. We run single-tenant Postgres with column-level encryption, S3 with KMS-managed keys, and audit logs on every database query. Your data is never used to train any AI model — Claude API calls use your data only for the immediate generation request, and Anthropic guarantees zero data retention per their enterprise agreement.' },
  { q: 'Can I try SecQA before subscribing?', a: 'Yes. We offer a 14-day paid pilot at $499 (not free — this filters tire-kickers). During the pilot, we process your next 2 real questionnaires live with your team. If we hit the 90-minute-first-draft bar on both, you convert to Pro at $99/month. If we don\'t, you walk away with the drafted responses and owe nothing further.' },
  { q: 'What questionnaire formats do you support?', a: 'We parse PDF, DOCX, and CSV uploads, including complex formats like CAIQ (200+ questions in Excel), SIG Core (1,500+ questions), NIST 800-53 mappings, and customer-specific spreadsheets with merged cells. Export is available in the same 3 formats with your customer\'s original template formatting preserved.' },
];

const blogPosts = [
  { title: 'How we cut questionnaire time from 14h to 90min', date: 'Jun 28', tag: 'Engineering', desc: 'The exact RAG architecture, prompt design, and answer library structure that powers SecQA. With code.' },
  { title: 'Vanta vs Conveyor vs SecQA: pricing teardown', date: 'Jun 27', tag: 'Business', desc: 'Why Vanta charges $5K/year, Conveyor charges $12K/year, and we charge $99/month. The unit economics behind each.' },
  { title: 'RAG for compliance answers: what works and what does not', date: 'Jun 26', tag: 'Engineering', desc: 'Hash-based vs OpenAI embeddings. Why 70% accuracy is not enough for compliance. The 2-line fix that got us to 95%.' },
];

/* ═══ MAIN COMPONENT ═══ */

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const nextSlide = useCallback(() => setActiveSlide((p) => (p + 1) % carouselSlides.length), []);
  const prevSlide = useCallback(() => setActiveSlide((p) => (p - 1 + carouselSlides.length) % carouselSlides.length), []);

  // Auto-rotate carousel
  useState(() => {
    if (typeof window !== 'undefined') {
      const interval = setInterval(() => setActiveSlide((p) => (p + 1) % carouselSlides.length), 5000);
      return () => clearInterval(interval);
    }
  });

  function getStatusBadgeClass(status: string) {
    switch (status) {
      case 'Active': return 'status-badge-active';
      case 'Engineering': return 'status-badge-engineering';
      default: return 'status-badge-design';
    }
  }

  return (
    <div className='bg-[#0D0D0D]'>

      {/* ═══ S1: HERO — Carousel with crossfade ═══ */}
      <motion.section ref={heroRef} style={{ opacity: heroOpacity }} className='relative h-[100dvh] flex items-end overflow-hidden'>
        {/* Dark gradient background per slide */}
        <div className='absolute inset-0 z-0' style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #0D0D0D 50%, #111111 100%)' }} />

        {/* Accent glow — follows active slide */}
        <div className='absolute inset-0 z-[2] transition-opacity duration-1000' style={{ background: `radial-gradient(ellipse at 30% 70%, ${carouselSlides[activeSlide].accent}10 0%, transparent 60%)` }} />

        {/* Dot pattern */}
        <div className='absolute inset-0 dot-pattern z-10 opacity-30' />

        {/* Content */}
        <div className='relative z-20 max-w-[1400px] mx-auto px-6 md:px-12 pb-24 md:pb-32 w-full'>
          <motion.div key={activeSlide} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <h1 className='text-[clamp(2.5rem,7vw,6rem)] font-extrabold text-white leading-[1.02] tracking-[-0.02em] mb-2'>SecQA</h1>

            <span className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] backdrop-blur-sm mb-6'>
              <Clock size={12} className='text-[rgba(255,255,255,0.5)]' />
              <span className='text-[10px] font-bold tracking-[0.2em] uppercase text-[rgba(255,255,255,0.5)]'>{carouselSlides[activeSlide].subtitle}</span>
            </span>

            <h2 className='text-[clamp(1.5rem,4vw,3rem)] font-bold text-white/80 leading-[1.05] tracking-[-0.01em] mb-2'>{carouselSlides[activeSlide].title}</h2>
            <p className='max-w-xl text-sm text-[rgba(255,255,255,0.5)] leading-relaxed mb-8'>{carouselSlides[activeSlide].desc}</p>

            <MagneticButton className='inline-block'>
              <Link href={carouselSlides[activeSlide].href} className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
                Learn More <ArrowRight size={14} />
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Carousel navigation */}
        <div className='absolute right-6 md:right-12 bottom-24 md:bottom-32 z-30 flex items-center gap-3'>
          <button onClick={prevSlide} className='w-11 h-11 flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.15)] text-white/50 hover:text-white hover:border-[rgba(255,255,255,0.3)] transition-colors' aria-label='Previous slide'>
            <ChevronLeft size={16} />
          </button>
          <span className='text-[11px] text-white/30 font-medium tabular-nums'>{String(activeSlide + 1).padStart(2, '0')} / {String(carouselSlides.length).padStart(2, '0')}</span>
          <button onClick={nextSlide} className='w-11 h-11 flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.15)] text-white/50 hover:text-white hover:border-[rgba(255,255,255,0.3)] transition-colors' aria-label='Next slide'>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }} className='absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2'>
          <span className='text-[9px] tracking-[0.25em] uppercase text-white/30 font-medium'>Scroll</span>
          <ChevronDown size={14} className='text-white/30 animate-bounce-slow' />
        </motion.div>
      </motion.section>

      <SectionDivider />

      {/* ═══ S2: FEATURES GRID — Card3D, StaggerContainer ═══ */}
      <section className='bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12 pt-20 md:pt-28'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Product</p>
              <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight leading-tight'>Everything you need to<br />close deals faster</h2>
            </div>
          </FadeIn>

          <StaggerContainer className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16' staggerDelay={0.08}>
            {features.map((f) => (
              <StaggerItem key={f.version}>
                <Card3D className='bg-[#141414] border border-[rgba(255,255,255,0.04)] rounded-[8px] p-6 hover:border-[rgba(255,255,255,0.08)] transition-all duration-500 h-full'>
                  <div className='flex items-center gap-2 mb-4'>
                    <div className='w-10 h-10 flex items-center justify-center rounded-lg bg-[rgba(139,157,175,0.1)] border border-[rgba(139,157,175,0.15)]'>
                      <f.icon size={18} className='text-[#8B9DAF]' strokeWidth={1.5} />
                    </div>
                    <span className='version-tag text-[#8B9DAF]'>{f.version}</span>
                  </div>
                  <h3 className='text-[18px] font-bold text-white mb-2'>{f.name}</h3>
                  <p className='text-[13px] text-[#999999] leading-relaxed'>{f.desc}</p>
                </Card3D>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Deep Dive Carousel */}
        <div className='border-t border-[rgba(255,255,255,0.04)]'>
          <div className='max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-4'>
            <div className='flex items-center justify-between mb-4'>
              <p className='section-label'>Deep Dive</p>
              <div className='flex gap-1 overflow-x-auto no-scrollbar'>
                {features.map((f, i) => (
                  <button key={f.version} onClick={() => setActiveFeature(i)} className={`shrink-0 px-3 py-1.5 text-[10px] font-bold tracking-[0.1em] uppercase rounded transition-all duration-300 ${i === activeFeature ? 'bg-white text-black' : 'text-[rgba(255,255,255,0.25)] hover:text-white hover:bg-[rgba(255,255,255,0.06)]'}`}>
                    {f.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className='relative h-[50vh] md:h-[60vh] overflow-hidden'>
            <div className='absolute inset-0' style={{ background: `radial-gradient(ellipse at 30% 50%, ${features[activeFeature] ? 'rgba(139,157,175,0.08)' : 'transparent'}, transparent 60%)` }} />
            <div className='absolute inset-0 bg-gradient-to-t from-[rgba(13,13,13,0.95)] via-[rgba(13,13,13,0.6)] to-[rgba(13,13,13,0.3)]' />
            <div className='absolute inset-0 dot-pattern opacity-20' />

            <div className='relative z-30 max-w-[1400px] mx-auto px-6 md:px-12 h-full flex items-end pb-12 md:pb-16'>
              <motion.div key={activeFeature} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <div className='flex items-center gap-3 mb-3'>
                  <span className='text-[10px] font-bold tracking-[0.2em] uppercase text-[rgba(255,255,255,0.25)]'>{features[activeFeature]?.version}</span>
                  <span className='text-[10px] font-bold tracking-[0.15em] uppercase text-white/60'>{features[activeFeature]?.name}</span>
                </div>
                <TextReveal text={features[activeFeature]?.name || ''} className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-[-0.02em] mb-3' />
                <p className='max-w-lg text-sm text-[rgba(255,255,255,0.5)] leading-relaxed mb-6'>{features[activeFeature]?.desc}</p>
                <SmoothLink href='/products/security-questionnaire-automation' className='text-sm font-semibold text-white'>Learn More</SmoothLink>
              </motion.div>
            </div>

            <div className='absolute right-6 md:right-12 bottom-12 md:bottom-16 z-30 flex items-center gap-3'>
              <button onClick={() => setActiveFeature((p) => (p - 1 + features.length) % features.length)} className='w-11 h-11 flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.15)] text-white/50 hover:text-white hover:border-[rgba(255,255,255,0.3)] transition-colors' aria-label='Previous'>
                <ChevronLeft size={16} />
              </button>
              <span className='text-[11px] text-white/30 font-medium tabular-nums'>{String(activeFeature + 1).padStart(2, '0')} / {String(features.length).padStart(2, '0')}</span>
              <button onClick={() => setActiveFeature((p) => (p + 1) % features.length)} className='w-11 h-11 flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.15)] text-white/50 hover:text-white hover:border-[rgba(255,255,255,0.3)] transition-colors' aria-label='Next'>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ S3: PARALLAX OVERVIEW ═══ */}
      <ParallaxSection speed={0.15} className='relative min-h-[40vh] flex items-center justify-center overflow-hidden'>
        <div className='absolute inset-0 bg-[#0A0A0A]' />
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 text-center'>
          <FadeIn>
            <p className='text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold text-white tracking-[-0.02em] mb-4'>50,000 SaaS Companies.</p>
            <p className='text-xl md:text-2xl font-light text-[rgba(255,255,255,0.4)]'>$53,760 Annual Pain Per Customer</p>
          </FadeIn>
        </div>
      </ParallaxSection>

      <SectionDivider />

      {/* ═══ S4: SYSTEM HEALTH — Live status bars ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D] relative overflow-hidden'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12 relative z-10'>
          <FadeIn>
            <div className='text-center mb-16'>
              <p className='section-label mb-4'>System Status</p>
              <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight'>Live Operations</h2>
              <p className='max-w-xl mx-auto mt-4 text-sm text-[rgba(255,255,255,0.5)] leading-relaxed'>
                Real-time status of SecQA infrastructure and services. All systems nominal.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10'>
              <div className='lg:col-span-2'>
                <div className='rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#141414] p-6'>
                  <div className='flex items-center justify-between mb-4'>
                    <span className='text-[10px] font-bold tracking-[0.2em] uppercase text-[rgba(255,255,255,0.25)]'>System Health</span>
                    <div className='flex items-center gap-1.5'>
                      <PulseIndicator size={6} />
                      <span className='text-[8px] text-[rgba(255,255,255,0.5)]'>ALL NOMINAL</span>
                    </div>
                  </div>
                  <div className='space-y-4'>
                    {[
                      { label: 'Claude API /0.1', value: 99, status: 'Active' },
                      { label: 'RAG Pipeline /0.2', value: 94, status: 'Active' },
                      { label: 'HubSpot Sync /0.3', value: 87, status: 'Active' },
                      { label: 'Export Engine /0.4', value: 99, status: 'Active' },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className='flex items-center justify-between mb-1.5'>
                          <span className='text-[9px] font-bold tracking-[0.1em] text-[rgba(255,255,255,0.5)]'>{item.label}</span>
                          <div className='flex items-center gap-2'>
                            <span className='text-[8px] text-[rgba(255,255,255,0.25)]'>{item.status.toUpperCase()}</span>
                            <span className='text-[9px] text-[rgba(255,255,255,0.5)]'>{item.value}%</span>
                          </div>
                        </div>
                        <div className='h-[2px] bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden'>
                          <motion.div className='h-full rounded-full' style={{ backgroundColor: item.value > 80 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.12)' }} initial={{ width: 0 }} whileInView={{ width: `${item.value}%` }} viewport={{ once: true }} transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#141414] p-6'>
                <div className='flex items-center justify-between mb-4'>
                  <span className='text-[10px] font-bold tracking-[0.2em] uppercase text-[rgba(255,255,255,0.25)]'>Recent Activity</span>
                  <PulseIndicator size={6} />
                </div>
                <div className='space-y-3'>
                  {[
                    { time: '2m ago', text: 'Acme Corp questionnaire approved' },
                    { time: '14m ago', text: 'Stripe CAIQ draft generated (90s)' },
                    { time: '31m ago', text: 'Snowflake NIST export completed' },
                    { time: '1h ago', text: 'New answer library entry added' },
                    { time: '2h ago', text: 'HubSpot deal sync: 3 updates' },
                  ].map((item, i) => (
                    <div key={i} className='flex items-start gap-2'>
                      <span className='text-[9px] text-[rgba(255,255,255,0.25)] tabular-nums shrink-0 mt-0.5'>{item.time}</span>
                      <span className='text-[11px] text-[rgba(255,255,255,0.5)] leading-relaxed'>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
        <DataStream opacity={0.02} count={15} speed={0.3} />
      </section>

      <SectionDivider />

      {/* ═══ S5: STATS — CountUp, 2x2 grid ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>By the Numbers</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-16'>What happens when you stop wasting 14 hours per questionnaire</h2>
          </FadeIn>

          <div className='grid grid-cols-2 gap-x-12 gap-y-10 md:gap-y-14'>
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div className='pb-6 border-b border-[rgba(255,255,255,0.04)]'>
                  <p className='text-[clamp(2.5rem,5vw,4rem)] font-bold text-white tracking-tight leading-none mb-4'>
                    <CountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} duration={2.5} decimals={stat.decimals ?? 0} />
                  </p>
                  <p className='text-[10px] font-bold tracking-[0.15em] uppercase text-[#666666] mb-2'>{stat.label}</p>
                  <p className='text-[13px] text-[rgba(255,255,255,0.35)] leading-relaxed'>{stat.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <p className='mt-8 text-[11px] text-[rgba(255,255,255,0.25)] italic'>* Based on 32 questionnaires/year at $120/hr fully-loaded sales engineer cost. Updated June 2026.</p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ S6: PRICING TABLE — Animated rows ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Pricing Pipeline</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-4'>Capital Deployment</h2>
            <p className='max-w-xl text-sm text-[rgba(255,255,255,0.5)] leading-relaxed mb-12'>$99/month for SaaS companies $1M-$20M ARR. First 100 customers lock founding pricing for life.</p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className='bg-[#111111] rounded-lg border border-[rgba(255,255,255,0.06)] overflow-x-auto -mx-6 md:mx-0'>
              <div className='px-6 py-4 border-b border-[rgba(255,255,255,0.06)] min-w-[600px] md:min-w-0'>
                <div className='grid grid-cols-[1fr_120px_180px_80px_auto] gap-4'>
                  <span className='text-[10px] font-bold tracking-[0.15em] uppercase text-[rgba(255,255,255,0.25)]'>Tier</span>
                  <span className='text-[10px] font-bold tracking-[0.15em] uppercase text-[rgba(255,255,255,0.25)]'>Investment</span>
                  <span className='text-[10px] font-bold tracking-[0.15em] uppercase text-[rgba(255,255,255,0.25)]'>Capacity</span>
                  <span className='text-[10px] font-bold tracking-[0.15em] uppercase text-[rgba(255,255,255,0.25)]'>Timeline</span>
                  <span className='text-[10px] font-bold tracking-[0.15em] uppercase text-[rgba(255,255,255,0.25)]'>Status</span>
                </div>
              </div>
              {investmentTable.map((row, i) => (
                <motion.div key={row.vertical} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4 }} className='px-6 py-4 border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors min-w-[600px] md:min-w-0'>
                  <div className='grid grid-cols-[1fr_120px_180px_80px_auto] gap-4 items-center'>
                    <span className='text-[14px] font-semibold text-white whitespace-nowrap'>{row.vertical}</span>
                    <span className='text-[14px] font-semibold text-white'>{row.investment}</span>
                    <span className='text-[13px] text-[#999999]'>{row.capacity}</span>
                    <span className='text-[13px] text-[#999999]'>{row.timeline}</span>
                    <span className={`status-badge ${getStatusBadgeClass(row.status)}`}>
                      <span className='w-1.5 h-1.5 rounded-full bg-current' />
                      {row.status}
                    </span>
                  </div>
                </motion.div>
              ))}
              <div className='px-6 py-4 bg-[rgba(255,255,255,0.01)] min-w-[600px] md:min-w-0'>
                <p className='text-[11px] text-[rgba(255,255,255,0.25)]'>First 100 customers lock founding pricing for life. We are at customer 24. Updated June 2026.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ S7: TESTIMONIALS — Card3D with metrics ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Proven Impact</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-4'>Proof, Not Promises</h2>
            <p className='max-w-xl text-sm text-[rgba(255,255,255,0.5)] leading-relaxed mb-16'>Real SaaS companies. Real metrics. Real time saved. See how SecQA delivers measurable outcomes.</p>
          </FadeIn>

          <StaggerContainer className='grid grid-cols-1 lg:grid-cols-2 gap-6' staggerDelay={0.12}>
            {testimonials.map((t, i) => (
              <StaggerItem key={i}>
                <Card3D className='bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-xl p-6 h-full hover:border-[rgba(139,157,175,0.15)] transition-all duration-500'>
                  <div className='flex items-center justify-between mb-4'>
                    <span className='inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-[rgba(139,157,175,0.1)] text-[#8B9DAF]'>{t.metric}</span>
                  </div>
                  <blockquote className='text-[14px] text-white/70 leading-relaxed mb-6'>&ldquo;{t.quote}&rdquo;</blockquote>
                  <div className='pt-4 border-t border-[rgba(255,255,255,0.04)]'>
                    <div className='text-[13px] font-semibold text-white'>{t.name}</div>
                    <div className='text-[11px] text-white/40'>{t.title} · {t.company}</div>
                  </div>
                </Card3D>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <div className='mt-12 text-center'>
              <Link href='/customers' className='inline-flex items-center gap-2 text-sm font-semibold text-[rgba(255,255,255,0.6)] hover:text-white transition-colors'>
                View All Case Studies <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ S8: THE PROBLEM — Split layout with before/after bars ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
            <FadeIn direction='right'>
              <p className='section-label mb-4'>The Problem</p>
              <TextReveal text='Every B2B SaaS company dreads the security questionnaire' className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight leading-tight mb-6' />
              <div className='accent-line mb-6' />
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
                      <motion.div className='h-full bg-[#A0524B] rounded-full' initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }} />
                    </div>
                    <p className='text-[11px] text-white/40 mt-2'>4h searching · 3h escalating · 2h formatting · 5h reviewing</p>
                  </div>
                  <div>
                    <div className='flex items-center justify-between mb-2'>
                      <span className='text-[12px] font-semibold text-white/60 uppercase tracking-wider'>With SecQA</span>
                      <span className='text-[24px] font-extrabold text-[#8B9DAF]'>90 minutes</span>
                    </div>
                    <div className='h-2 bg-[rgba(139,157,175,0.1)] rounded-full overflow-hidden'>
                      <motion.div className='h-full bg-[#8B9DAF] rounded-full' initial={{ width: 0 }} whileInView={{ width: '10.7%' }} viewport={{ once: true }} transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }} />
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

      {/* ═══ S9: DEVELOPER PLATFORM — Code blocks with TypingText ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='text-center mb-12'>
              <p className='section-label mb-4'>Developer Platform</p>
              <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight'>Build on SecQA<span className='text-[#8B9DAF]'>.</span></h2>
              <p className='max-w-xl mx-auto mt-4 text-sm text-[rgba(255,255,255,0.5)] leading-relaxed'>
                REST API with webhook support. RAG over your answer library. Claude-powered generation with source citations.
              </p>
            </div>
          </FadeIn>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <FadeIn delay={0.1}>
              <div className='rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#141414] p-6 h-full'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-9 h-9 rounded-lg bg-[rgba(139,157,175,0.1)] flex items-center justify-center'>
                    <Terminal size={18} className='text-[#8B9DAF]' strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className='text-base font-bold text-white'>Upload & Parse</h3>
                    <span className='text-[10px] text-[rgba(255,255,255,0.25)]'>
                      <TypingText text='curl -X POST /api/parse' speed={50} delay={800} />
                    </span>
                  </div>
                </div>
                <div className='bg-[#0D0D0D] rounded-md p-4 font-mono text-[12px] leading-[1.9] overflow-x-auto'>
                  <p className='text-[#666666]'># Upload questionnaire</p>
                  <p><span className='text-[#8B9DAF]'>curl</span> -X POST https://api.secqa.example/parse \</p>
                  <p>&nbsp;&nbsp;-F <span className='text-[#98C379]'>&quot;file=@caiq.pdf&quot;</span> \</p>
                  <p>&nbsp;&nbsp;-F <span className='text-[#98C379]'>&quot;customerId=acme&quot;</span></p>
                  <br />
                  <p className='text-[#666666]'># Response</p>
                  <p>{'{'}</p>
                  <p>&nbsp;&nbsp;<span className='text-[#E5C07B]'>&quot;questionnaireId&quot;</span>: <span className='text-[#98C379]'>&quot;cmqyiyavz&quot;</span>,</p>
                  <p>&nbsp;&nbsp;<span className='text-[#E5C07B]'>&quot;questionCount&quot;</span>: <span className='text-[#D19A66]'>187</span>,</p>
                  <p>&nbsp;&nbsp;<span className='text-[#E5C07B]'>&quot;format&quot;</span>: <span className='text-[#98C379]'>&quot;pdf&quot;</span>,</p>
                  <p>&nbsp;&nbsp;<span className='text-[#E5C07B]'>&quot;parseTimeMs&quot;</span>: <span className='text-[#D19A66]'>8</span></p>
                  <p>{'}'}</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className='rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#141414] p-6 h-full'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-9 h-9 rounded-lg bg-[rgba(139,157,175,0.1)] flex items-center justify-center'>
                    <Code2 size={18} className='text-[#8B9DAF]' strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className='text-base font-bold text-white'>Generate & Cite</h3>
                    <span className='text-[10px] text-[rgba(255,255,255,0.25)]'>
                      <TypingText text='POST /api/generate' speed={50} delay={1200} />
                    </span>
                  </div>
                </div>
                <div className='bg-[#0D0D0D] rounded-md p-4 font-mono text-[12px] leading-[1.9] overflow-x-auto'>
                  <p className='text-[#666666]'>// Generate draft answers</p>
                  <p><span className='text-[#C678DD]'>const</span> res = <span className='text-[#C678DD]'>await</span> fetch(<span className='text-[#98C379]'>&apos;/api/generate&apos;</span>, {'{')}</p>
                  <p>&nbsp;&nbsp;method: <span className='text-[#98C379]'>&apos;POST&apos;</span>,</p>
                  <p>&nbsp;&nbsp;headers: {'{'} <span className='text-[#98C379]'>&apos;Content-Type&apos;</span>: <span className='text-[#98C379]'>&apos;application/json&apos;</span> {'}'},</p>
                  <p>&nbsp;&nbsp;body: JSON.stringify({'{'} <span className='text-[#98C379]'>&apos;questionnaireId&apos;</span>: id {'}'}),</p>
                  <p>{'}'});</p>
                  <br />
                  <p className='text-[#666666]'>// Each answer has source citation</p>
                  <p><span className='text-[#C678DD]'>const</span> {'{'} drafts {'}'} = <span className='text-[#C678DD]'>await</span> res.json();</p>
                  <p>drafts.<span className='text-[#E5C07B]'>forEach</span>(d {' =>'} {'{')}</p>
                  <p>&nbsp;&nbsp;console.<span className='text-[#E5C07B]'>log</span>(d.answerText);</p>
                  <p>&nbsp;&nbsp;console.<span className='text-[#E5C07B]'>log</span>(d.confidence); <span className='text-[#666666]'>// 0.0 - 1.0</span></p>
                  <p>{'}'});</p>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <div className='mt-8 text-center'>
              <SmoothLink href='/integrations' className='text-[14px] text-[#8B9DAF] font-semibold'>Full API Documentation</SmoothLink>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ S10: FOUNDER QUOTE — TextReveal ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[960px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <ParallaxSection speed={0.1} className='mb-0'>
              <span className='text-[clamp(4rem,12vw,9rem)] text-[rgba(255,255,255,0.04)] leading-none font-serif block -mb-12'>&ldquo;</span>
            </ParallaxSection>
            <TextReveal text='Vanta and Conveyor charge $5,000 to $25,000 per year for questionnaire automation. 50,000 SaaS companies cannot afford that. SecQA exists because the math is obvious: $99/month to save $53,760 per year.' className='text-[clamp(1.25rem,3vw,2rem)] font-light text-white leading-[1.4] mb-10' />
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

      {/* ═══ S11: ROADMAP — Animated timeline with pulse dots ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Roadmap</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-16'>Jun 2026 — Q1 2027</h2>
          </FadeIn>

          <div className='relative'>
            <div className='absolute left-5 md:left-10 top-0 bottom-0 w-px bg-[rgba(255,255,255,0.06)]'>
              <motion.div className='w-full bg-[#8B9DAF]/30' initial={{ height: '0%' }} whileInView={{ height: '100%' }} viewport={{ once: true }} transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }} />
            </div>

            <StaggerContainer className='space-y-10' staggerDelay={0.12}>
              {roadmap.map((item) => (
                <StaggerItem key={item.year}>
                  <div className='flex gap-6 md:gap-12 relative'>
                    <div className='relative z-10 shrink-0 w-10 md:w-20 flex justify-center'>
                      {item.status === 'active' ? (
                        <div className='relative'>
                          <PulseIndicator size={14} color='#8B9DAF' speed={2} />
                          <div className='absolute inset-0 flex items-center justify-center'>
                            <div className='w-2.5 h-2.5 rounded-full bg-[#8B9DAF]' />
                          </div>
                        </div>
                      ) : (
                        <div className={`w-3.5 h-3.5 rounded-full border-2 mt-1.5 ${item.status === 'completed' ? 'bg-white border-white' : 'bg-transparent border-[rgba(255,255,255,0.15)]'}`} />
                      )}
                    </div>
                    <div className='pb-2'>
                      <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${item.status === 'active' ? 'text-[#8B9DAF]' : item.status === 'completed' ? 'text-white/50' : 'text-[rgba(255,255,255,0.25)]'}`}>
                        {item.year}
                        {item.status === 'active' && ' — Current'}
                      </span>
                      <h3 className='text-lg md:text-xl font-bold text-white mt-1 mb-1'>{item.title}</h3>
                      <p className='text-sm text-[rgba(255,255,255,0.5)] leading-relaxed max-w-lg'>{item.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ S12: OPERATOR MODEL — Split with Card3D principles ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24'>
            <FadeIn>
              <p className='section-label mb-4'>Our Model</p>
              <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
                Not a Service Provider.<br />Not a Consultancy.<br />
                <TextReveal text='An Operator.' className='gradient-text inline-block' />
              </h2>
              <div className='accent-line mb-6' />
              <p className='text-sm text-[rgba(255,255,255,0.5)] leading-[1.7] mb-8'>
                SecQA doesn&apos;t advise — we build. We own the entire workflow from questionnaire upload to customer-ready export. This vertically integrated model creates structural cost advantages of 100x versus Conveyor ($12K/yr) and 50x versus Vanta ($5K/yr). We don&apos;t write reports about the pain — we eliminate it.
              </p>
              <SmoothLink href='/about' className='text-sm font-semibold text-[rgba(255,255,255,0.5)] hover:text-white'>Our Strategy</SmoothLink>
            </FadeIn>
            <StaggerContainer className='space-y-4' staggerDelay={0.1}>
              {operatorPrinciples.map((item, i) => (
                <StaggerItem key={i}>
                  <Card3D className='card'>
                    <h4 className='text-sm font-bold text-white mb-1'>{item.title}</h4>
                    <p className='text-[13px] text-[rgba(255,255,255,0.45)] leading-relaxed'>{item.desc}</p>
                  </Card3D>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ S13: BLOG PREVIEW — Card3D with stagger ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='flex items-end justify-between mb-12'>
              <div>
                <p className='section-label mb-4'>Latest Updates</p>
                <h2 className='text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-white tracking-tight'>Blog</h2>
              </div>
              <Link href='/blog' className='hidden md:inline-flex items-center gap-2 text-sm font-medium text-[rgba(255,255,255,0.25)] hover:text-white transition-colors group'>
                All Posts <ArrowRight size={14} className='group-hover:translate-x-1 transition-transform' />
              </Link>
            </div>
          </FadeIn>
          <StaggerContainer className='grid grid-cols-1 md:grid-cols-3 gap-6' staggerDelay={0.1}>
            {blogPosts.map((article, i) => (
              <StaggerItem key={i}>
                <Link href='/blog' className='group block'>
                  <div className='bg-[#111111] border border-[rgba(255,255,255,0.06)] rounded-[8px] overflow-hidden hover:border-[rgba(255,255,255,0.12)] transition-all duration-500'>
                    <div className='p-6'>
                      <div className='flex items-center gap-2 mb-3'>
                        <span className='inline-block px-2 py-0.5 rounded text-[9px] font-bold tracking-[0.12em] uppercase text-[#8B9DAF] bg-[rgba(139,157,175,0.1)]'>{article.tag}</span>
                        <span className='text-[11px] text-white/40'>{article.date}</span>
                      </div>
                      <h4 className='text-[15px] font-bold text-white leading-snug mb-2 group-hover:text-[#8B9DAF] transition-colors'>{article.title}</h4>
                      <p className='text-[13px] text-[#999999] leading-relaxed mb-4'>{article.desc}</p>
                      <span className='text-[12px] text-[#8B9DAF] font-semibold flex items-center gap-1 group-hover:text-white transition-colors'>Read More <ArrowRight size={12} /></span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ S14: FAQ — Expandable cards ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[900px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>FAQ</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-16'>Frequently asked questions</h2>
          </FadeIn>
          <div className='space-y-4'>
            {faq.map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className='card p-6 hover:border-[rgba(255,255,255,0.08)] transition-colors'>
                  <h3 className='text-[15px] font-semibold text-white mb-2'>{item.q}</h3>
                  <p className='text-[13px] text-[#999999] leading-relaxed'>{item.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ S15: CTA — NetworkGrid, ParallaxSection, MagneticButton ═══ */}
      <ParallaxSection speed={0.1} className='relative bg-[#000000] overflow-hidden'>
        <NetworkGrid nodeCount={35} maxDistance={100} opacity={0.04} />
        <div className='absolute inset-0 dot-pattern opacity-100' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-28 md:py-36 text-center'>
          <FadeIn>
            <TextReveal text='Stop Losing Deals to Slow Responses' className='text-[clamp(1.75rem,5vw,3.5rem)] font-bold text-white tracking-tight mb-6 leading-tight' />
            <p className='max-w-xl mx-auto text-sm text-[rgba(255,255,255,0.3)] leading-relaxed mb-12'>
              Your next enterprise prospect will send a 200-question CAIQ. You can spend 14 hours on it, or 90 minutes. The future of questionnaire automation is being built.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
              <MagneticButton className='inline-block'>
                <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all duration-300'>
                  Start Your $499 Pilot <ArrowRight size={14} />
                </Link>
              </MagneticButton>
              <MagneticButton className='inline-block'>
                <Link href='/demo' className='inline-flex items-center gap-2.5 border border-[rgba(139,157,175,0.2)] bg-[rgba(139,157,175,0.04)] text-[#8B9DAF] px-8 py-4 rounded-lg text-sm font-semibold hover:border-[rgba(139,157,175,0.3)] hover:text-white transition-all duration-300'>
                  Watch Demo
                </Link>
              </MagneticButton>
              <MagneticButton className='inline-block'>
                <Link href='/contact' className='inline-flex items-center gap-2.5 border border-[rgba(255,255,255,0.1)] text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.03)] transition-all duration-300'>
                  Contact Us
                </Link>
              </MagneticButton>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className='mt-8 flex flex-wrap items-center justify-center gap-6'>
              {['14-day pilot', 'Money-back guarantee', 'No credit card to start'].map((t) => (
                <span key={t} className='inline-flex items-center gap-1.5 text-[12px] text-white/40'>
                  <CheckCircle2 size={12} className='text-[#8B9DAF]' /> {t}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </ParallaxSection>

    </div>
  );
}
