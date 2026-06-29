'use client';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem, SectionDivider, CountUp } from '@/components/ui/motion';
import {
  ArrowRight,
  CheckCircle2,
  X,
  Zap,
  DollarSign,
  Clock,
  Target,
  Users,
  Shield,
  RefreshCw,
  TrendingUp,
  HelpCircle,
} from 'lucide-react';

const secqaWins = [
  { icon: Target, title: 'Built for SaaS, not RFP consulting firms', desc: 'Loopio was built for procurement teams handling 500-page government RFPs. SecQA is built for SaaS teams answering 50-300 question security questionnaires.' },
  { icon: DollarSign, title: '10x cheaper for SaaS use cases', desc: 'Loopio starts at $15K/year and scales to $50K+ for teams. SecQA ships questionnaire responses at $99/mo base + $49 per response.' },
  { icon: Zap, title: 'AI-native, not AI-bolted-on', desc: 'Loopio added AI as a feature in 2023. SecQA was built AI-first from day one with retrieval-augmented generation and per-question citations.' },
  { icon: Clock, title: 'Live in hours, not months', desc: 'Loopio onboarding requires content library structuring, role mapping, and reviewer workflow setup. Plan 4-8 weeks. SecQA is upload-and-go in under 4 hours.' },
  { icon: TrendingUp, title: 'Modern, fast UI', desc: 'Loopio UI was built in 2014 and shows it. SecQA ships a 2025-era interface with keyboard shortcuts, real-time collaboration, and sub-second search.' },
];

const competitorWins = [
  { title: 'Mature enterprise RFP handling', desc: 'Loopio is the gold standard for 500+ page government and enterprise RFPs with complex section collaboration, role-based permissions, and version control.' },
  { title: 'Deep content library management', desc: 'Loopio excels at managing 10,000+ answer entries with sophisticated tagging, versioning, and approval workflows built for procurement-scale teams.' },
  { title: 'Review assignment and task tracking', desc: 'Loopio has 10 years of polish on reviewer assignment, deadline tracking, and SLA management. Strong for teams with 20+ contributors per RFP.' },
  { title: 'Enterprise procurement relationships', desc: 'Loopio is pre-approved by Fortune 500 procurement teams. Information security reviews are faster because Loopio is already in the vendor database.' },
];

const featureMatrix = [
  { feature: 'Questionnaire response workflow', secqa: true, competitor: true },
  { feature: 'AI first-draft generation (90% complete)', secqa: true, competitor: false },
  { feature: 'Per-question citation back to source', secqa: true, competitor: false },
  { feature: 'Per-question retrieval-augmented generation', secqa: true, competitor: false },
  { feature: 'Trust Center hosting', secqa: true, competitor: false },
  { feature: 'Self-serve checkout', secqa: true, competitor: false },
  { feature: 'Public pricing on website', secqa: true, competitor: false },
  { feature: 'HubSpot CRM integration', secqa: true, competitor: false },
  { feature: 'Slack / Teams notifications', secqa: true, competitor: true },
  { feature: 'SSO (SAML / OIDC)', secqa: true, competitor: true },
  { feature: 'Custom review workflow with SLAs', secqa: true, competitor: true },
  { feature: 'Content library 10K+ entries', secqa: false, competitor: true },
  { feature: 'Multi-section RFP collaboration (20+ users)', secqa: false, competitor: true },
  { feature: 'Enterprise procurement pre-approval', secqa: false, competitor: true },
  { feature: 'API access (read / write)', secqa: true, competitor: true },
  { feature: '14-day paid pilot', secqa: true, competitor: false },
];

const migrationSteps = [
  {
    title: 'Export your Loopio content library',
    desc: 'Loopio admin can export your full content library as CSV plus attachments. Plan 3-5 business days for libraries with 5,000+ entries — Loopio support processes large exports manually.',
  },
  {
    title: 'Bulk import to SecQA',
    desc: 'Drag-and-drop the CSV export. SecQA parses Q&A pairs, tags by category, and embeds every answer for retrieval. Most imports complete in under 1 hour for libraries under 10K entries.',
  },
  {
    title: 'Map reviewers and SLAs',
    desc: 'Loopio reviewer structure maps cleanly to SecQA categories. Set ownership per category (security / legal / infra / product) and per-tier SLAs (24h / 48h / 72h) based on questionnaire size.',
  },
  {
    title: 'Run a live questionnaire through SecQA',
    desc: 'Upload a real prospect questionnaire to SecQA. Get a 90%-complete first draft in 90 minutes. Compare with your existing Loopio workflow for quality, speed, and reviewer hours.',
  },
  {
    title: 'Cancel Loopio at renewal',
    desc: 'Most teams cancel Loopio entirely once SecQA ships 3-5 questionnaires at parity. Typical SaaS saves $15K-$40K per year per switch. Export final backup before cancellation for records.',
  },
];

const faqs = [
  {
    q: 'Does SecQA handle 500-page RFPs like Loopio does?',
    a: 'Not yet. SecQA is optimised for SaaS security questionnaires (50-300 questions). For 500+ page government RFPs with complex section collaboration, keep Loopio. SecQA targets the 95% of SaaS use cases that Loopio is overkill for.',
  },
  {
    q: 'How does SecQA AI compare to Loopio AI?',
    a: 'SecQA uses retrieval-augmented generation with per-question citations back to source documents. Loopio AI returns the closest matching library answer without citation. For SaaS questionnaires, SecQA ships 90% first-draft completeness in 90 minutes. Loopio typically ships 70-80% first-draft in 4-6 hours.',
  },
  {
    q: 'Can I migrate my Loopio content library to SecQA?',
    a: 'Yes. Export from Loopio as CSV plus document ZIP, drag-and-drop into SecQA. Most libraries under 10K entries import in under 1 hour. Larger libraries may need our migration specialist (free during pilot).',
  },
  {
    q: 'What about Loopio reviewer workflows?',
    a: 'SecQA supports reviewer assignment, SLA tracking, and approval workflows. We do not support the complex multi-section collaboration Loopio offers for 20+ contributor RFPs. For SaaS teams with 1-5 reviewers per questionnaire, SecQA is a strict upgrade.',
  },
  {
    q: 'Is SecQA pre-approved by enterprise procurement?',
    a: 'SecQA is newer than Loopio and not yet in every Fortune 500 vendor database. We provide SOC 2 Type II, DPA, security questionnaire, and insurance certificates on request. Most procurement teams approve SecQA within 2-3 weeks of intake.',
  },
];

export default function ComparisonPage() {
  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Compare</p></FadeIn>
          <FadeIn delay={0.1}>
            <h1 className='text-5xl md:text-7xl lg:text-[88px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              SecQA vs<br />Loopio<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed'>
              Loopio is the enterprise RFP leader built for procurement teams. SecQA is the AI-native questionnaire response tool built for SaaS teams. Different customers, different jobs — this page helps you pick.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider className='max-w-[1400px]' />

      <section className='py-16 md:py-24 bg-[#0D0D0D]'>
        <div className='max-w-[1200px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12 text-center'>
              <p className='section-label mb-4'>Pricing</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Side-by-side pricing</h2>
            </div>
          </FadeIn>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <FadeIn direction='right'>
              <div className='card p-8 ring-1 ring-[rgba(139,157,175,0.25)] h-full'>
                <div className='flex items-center justify-between mb-6'>
                  <h3 className='text-xl font-bold text-white'>SecQA</h3>
                  <span className='status-badge-active'>SaaS-first</span>
                </div>
                <div className='flex items-baseline gap-1 mb-2'>
                  <span className='text-5xl font-extrabold text-[#8B9DAF]'>$99</span>
                  <span className='text-[14px] text-[#999999]'>/month base</span>
                </div>
                <p className='text-[13px] text-[#666666] mb-6'>+$49 per questionnaire response after the included 2/mo</p>
                <ul className='space-y-3'>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-[#8B9DAF] mt-0.5 shrink-0' /><span className='text-[13px] text-[#CCCCCC]'>90%-complete-first-draft guarantee</span></li>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-[#8B9DAF] mt-0.5 shrink-0' /><span className='text-[13px] text-[#CCCCCC]'>Self-serve checkout, cancel anytime</span></li>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-[#8B9DAF] mt-0.5 shrink-0' /><span className='text-[13px] text-[#CCCCCC]'>AI-native with per-question citations</span></li>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-[#8B9DAF] mt-0.5 shrink-0' /><span className='text-[13px] text-[#CCCCCC]'>14-day paid pilot at $499</span></li>
                </ul>
              </div>
            </FadeIn>
            <FadeIn direction='left' delay={0.1}>
              <div className='card p-8 h-full'>
                <div className='flex items-center justify-between mb-6'>
                  <h3 className='text-xl font-bold text-white'>Loopio</h3>
                  <span className='status-badge-engineering'>Enterprise RFP</span>
                </div>
                <div className='flex items-baseline gap-1 mb-2'>
                  <span className='text-5xl font-extrabold text-white'>$15K+</span>
                  <span className='text-[14px] text-[#999999]'>/year</span>
                </div>
                <p className='text-[13px] text-[#666666] mb-6'>Typical contract $15K-$50K/year. 12-month term. Sales demo required.</p>
                <ul className='space-y-3'>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-white/30 mt-0.5 shrink-0' /><span className='text-[13px] text-white/50'>Enterprise RFP (500+ page) handling</span></li>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-white/30 mt-0.5 shrink-0' /><span className='text-[13px] text-white/50'>10K+ entry content library</span></li>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-white/30 mt-0.5 shrink-0' /><span className='text-[13px] text-white/50'>20+ contributor collaboration</span></li>
                  <li className='flex items-start gap-3'><X size={16} className='text-white/30 mt-0.5 shrink-0' /><span className='text-[13px] text-white/50'>Overkill for SaaS questionnaires</span></li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className='py-16 md:py-24 bg-[#111111]'>
        <div className='max-w-[1200px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Feature matrix</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Detailed feature comparison</h2>
              <p className='text-[14px] text-[#999999] mt-3 max-w-2xl'>16 capabilities side-by-side. Loopio wins on enterprise scale — SecQA wins on AI quality and SaaS fit.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className='card overflow-hidden'>
              <div className='overflow-x-auto no-scrollbar'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b border-[rgba(255,255,255,0.06)]'>
                      <th className='text-left text-[12px] uppercase tracking-wider text-[#999999] font-semibold px-6 py-4'>Capability</th>
                      <th className='text-center text-[12px] uppercase tracking-wider text-[#8B9DAF] font-semibold px-6 py-4'>SecQA</th>
                      <th className='text-center text-[12px] uppercase tracking-wider text-[#999999] font-semibold px-6 py-4'>Loopio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {featureMatrix.map((row) => (
                      <tr key={row.feature} className='border-b border-[rgba(255,255,255,0.04)] last:border-0 hover:bg-[rgba(255,255,255,0.02)] transition-colors'>
                        <td className='px-6 py-4 text-[13px] text-[#CCCCCC]'>{row.feature}</td>
                        <td className='px-6 py-4 text-center'>
                          {row.secqa ? <CheckCircle2 size={16} className='text-[#8B9DAF] inline' /> : <X size={16} className='text-[#444444] inline' />}
                        </td>
                        <td className='px-6 py-4 text-center'>
                          {row.competitor ? <CheckCircle2 size={16} className='text-white/60 inline' /> : <X size={16} className='text-[#444444] inline' />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className='py-16 md:py-24 bg-[#0D0D0D]'>
        <div className='max-w-[1200px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Honest assessment</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Where SecQA wins</h2>
              <p className='text-[14px] text-[#999999] mt-3 max-w-2xl'>Five reasons SaaS teams under $20M ARR choose SecQA over Loopio for questionnaire response.</p>
            </div>
          </FadeIn>
          <StaggerContainer className='grid grid-cols-1 md:grid-cols-2 gap-6' staggerDelay={0.08}>
            {secqaWins.map((w) => (
              <StaggerItem key={w.title}>
                <div className='card p-6 h-full flex gap-4'>
                  <div className='w-10 h-10 rounded-lg bg-[rgba(139,157,175,0.1)] border border-[rgba(139,157,175,0.15)] flex items-center justify-center shrink-0'>
                    <w.icon size={18} className='text-[#8B9DAF]' />
                  </div>
                  <div>
                    <h3 className='text-[15px] font-bold text-white mb-1.5'>{w.title}</h3>
                    <p className='text-[13px] text-[#999999] leading-relaxed'>{w.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className='py-16 md:py-24 bg-[#111111]'>
        <div className='max-w-[1200px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>The honest truth</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Where Loopio wins</h2>
              <p className='text-[14px] text-[#999999] mt-3 max-w-2xl'>Loopio is the right choice for enterprise procurement teams handling 500-page RFPs. We do not pretend otherwise.</p>
            </div>
          </FadeIn>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {competitorWins.map((w, i) => (
              <FadeIn key={w.title} delay={i * 0.08}>
                <div className='card p-6 h-full'>
                  <div className='flex items-center gap-2 mb-2'>
                    <Shield size={14} className='text-white/40' />
                    <h3 className='text-[15px] font-bold text-white/80'>{w.title}</h3>
                  </div>
                  <p className='text-[13px] text-white/50 leading-relaxed'>{w.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className='py-16 md:py-24 bg-[#0D0D0D]'>
        <div className='max-w-[1200px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Switch in 5 steps</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Migration guide: Loopio → SecQA</h2>
              <p className='text-[14px] text-[#999999] mt-3 max-w-2xl'>Most SaaS teams complete migration in 1-3 business days. Larger Loopio libraries (10K+ entries) may take a week.</p>
            </div>
          </FadeIn>
          <div className='space-y-4'>
            {migrationSteps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className='card p-6 flex flex-col md:flex-row gap-6'>
                  <div className='flex md:flex-col items-center gap-4 md:gap-2 md:w-32 shrink-0'>
                    <span className='w-10 h-10 flex items-center justify-center rounded-full bg-[#8B9DAF] text-black text-[14px] font-extrabold'>{i + 1}</span>
                    <div className='hidden md:block h-px flex-1 bg-[rgba(139,157,175,0.15)]' />
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-[16px] font-bold text-white mb-2'>{step.title}</h3>
                    <p className='text-[13px] text-[#999999] leading-relaxed'>{step.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className='py-16 md:py-24 bg-[#111111]'>
        <div className='max-w-[1200px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>ROI comparison</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Annual cost for 50 questionnaires</h2>
              <p className='text-[14px] text-[#999999] mt-3 max-w-2xl'>Same questionnaire volume, same team, same year. SaaS use case — not 500-page enterprise RFPs.</p>
            </div>
          </FadeIn>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <FadeIn direction='right'>
              <div className='card p-8 ring-1 ring-[rgba(139,157,175,0.25)]'>
                <h3 className='text-[15px] font-bold text-white mb-6'>SecQA annual cost</h3>
                <div className='space-y-4 mb-6'>
                  <div className='flex justify-between text-[13px]'><span className='text-[#999999]'>Base plan ($99 × 12)</span><span className='text-[#CCCCCC] stat-mono'>$1,188</span></div>
                  <div className='flex justify-between text-[13px]'><span className='text-[#999999]'>48 extra questionnaires ($49 ea)</span><span className='text-[#CCCCCC] stat-mono'>$2,352</span></div>
                  <div className='flex justify-between text-[13px] border-t border-[rgba(255,255,255,0.06)] pt-4'><span className='text-white font-bold'>Annual total</span><span className='text-[#8B9DAF] stat-mono text-xl font-extrabold'><CountUp to={3540} prefix='$' /></span></div>
                </div>
                <p className='text-[12px] text-[#666666]'>No implementation fee. No contract minimum. Cancel anytime.</p>
              </div>
            </FadeIn>
            <FadeIn direction='left' delay={0.1}>
              <div className='card p-8'>
                <h3 className='text-[15px] font-bold text-white mb-6'>Loopio annual cost</h3>
                <div className='space-y-4 mb-6'>
                  <div className='flex justify-between text-[13px]'><span className='text-[#999999]'>Starter plan (12-mo contract)</span><span className='text-[#CCCCCC] stat-mono'>$18,000</span></div>
                  <div className='flex justify-between text-[13px]'><span className='text-[#999999]'>Implementation / onboarding</span><span className='text-[#CCCCCC] stat-mono'>$5,000</span></div>
                  <div className='flex justify-between text-[13px] border-t border-[rgba(255,255,255,0.06)] pt-4'><span className='text-white font-bold'>Annual total</span><span className='text-white stat-mono text-xl font-extrabold'><CountUp to={23000} prefix='$' /></span></div>
                </div>
                <p className='text-[12px] text-[#666666]'>Pricing scales with content library size and user count. 12-month commitment required.</p>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <div className='mt-8 card p-6 flex items-center gap-4 ring-1 ring-[rgba(139,157,175,0.2)]'>
              <TrendingUp size={24} className='text-[#8B9DAF] shrink-0' />
              <p className='text-[14px] text-[#CCCCCC]'>
                <span className='text-white font-bold'>Annual savings with SecQA: <span className='stat-mono text-[#8B9DAF]'>$19,460</span></span>
                <span className='text-[#999999]'> — 85% cost reduction for SaaS use cases at the same questionnaire volume.</span>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className='py-16 md:py-24 bg-[#0D0D0D]'>
        <div className='max-w-[900px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12 text-center'>
              <p className='section-label mb-4'>FAQ</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Switching questions, answered</h2>
            </div>
          </FadeIn>
          <div className='space-y-4'>
            {faqs.map((f, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className='card p-6'>
                  <div className='flex items-start gap-3 mb-3'>
                    <HelpCircle size={18} className='text-[#8B9DAF] mt-0.5 shrink-0' />
                    <h3 className='text-[15px] font-bold text-white'>{f.q}</h3>
                  </div>
                  <p className='text-[13px] text-[#999999] leading-[1.7] pl-7'>{f.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className='py-16 md:py-24 bg-[#111111]'>
        <div className='max-w-[900px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='card p-8 md:p-12'>
              <h3 className='text-2xl font-bold text-white mb-4'>Which is best for you?</h3>
              <p className='text-[14px] text-[#999999] leading-[1.8] mb-6'>
                Choose Loopio if you are an enterprise procurement team handling 500+ page government RFPs with 20+ contributors, complex section collaboration, and a 10,000+ entry content library.
              </p>
              <p className='text-[14px] text-[#999999] leading-[1.8]'>
                Choose SecQA if you are a SaaS team at $1M-$20M ARR answering 50-300 question security questionnaires from prospects and customers. Loopio is overkill for this use case — both in cost and in workflow complexity. Most SaaS teams switch from Loopio to SecQA within 60 days of the pilot.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className='py-20 md:py-28 bg-[#0D0D0D]'>
        <div className='max-w-[900px] mx-auto px-6 md:px-12 text-center'>
          <FadeIn>
            <h2 className='text-3xl md:text-5xl font-bold text-white tracking-tight mb-4'>Try SecQA free for 14 days</h2>
            <p className='text-lg text-white/50 mb-8'>Paid pilot at $499. Ship your first questionnaire response by Friday.</p>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
              <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
                Start your pilot <ArrowRight size={14} />
              </Link>
              <Link href='/demo' className='inline-flex items-center gap-2.5 border border-[rgba(255,255,255,0.15)] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/5 transition-colors'>
                Book a demo <RefreshCw size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
