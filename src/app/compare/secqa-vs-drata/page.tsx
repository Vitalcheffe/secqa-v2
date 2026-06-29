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
  { icon: Target, title: 'Questionnaire-first, not compliance-first', desc: 'Drata is built for SOC 2 / ISO 27001 evidence collection. SecQA is built for questionnaire response workflow. Different jobs entirely.' },
  { icon: DollarSign, title: '10x cheaper for questionnaire work', desc: 'Drata starts at $8K/year and scales to $30K+. SecQA ships questionnaire responses at $99/mo base + $49 per response.' },
  { icon: Zap, title: '90-minute first-draft guarantee', desc: 'Drata has no questionnaire AI. SecQA ships 90%-complete first drafts in 90 minutes or the questionnaire is free.' },
  { icon: Clock, title: 'Live in hours, not weeks', desc: 'Drata onboarding requires control mapping, evidence hook configuration, and auditor alignment. SecQA is upload-and-go.' },
  { icon: TrendingUp, title: 'No annual contract required', desc: 'Drata locks customers into 12-month terms. SecQA is monthly with a 14-day paid pilot at $499 — prove ROI first.' },
];

const competitorWins = [
  { title: 'Best-in-class SOC 2 automation', desc: 'Drata is the market leader for SOC 2 evidence collection, continuous control monitoring, and auditor-ready reporting.' },
  { title: '300+ pre-built integrations', desc: 'Native integrations with AWS, GCP, Azure, GitHub, GitLab, Okta, Google Workspace, Slack, and every major cloud and HR system.' },
  { title: 'Frameworks: SOC 2, ISO 27001, HIPAA, PCI, GDPR', desc: 'Drata supports more compliance frameworks than any competitor. Multi-framework customers save months of audit prep time.' },
  { title: 'Dedicated CSM and compliance coach', desc: 'Every Drata customer gets a named CSM and access to a compliance coach who helps interpret framework requirements.' },
];

const featureMatrix = [
  { feature: 'Questionnaire response workflow', secqa: true, competitor: false },
  { feature: 'AI first-draft generation (90% complete)', secqa: true, competitor: false },
  { feature: 'Per-question citation back to source', secqa: true, competitor: false },
  { feature: 'SOC 2 evidence collection', secqa: false, competitor: true },
  { feature: 'Continuous control monitoring', secqa: false, competitor: true },
  { feature: 'Trust Center hosting', secqa: true, competitor: true },
  { feature: 'Self-serve checkout', secqa: true, competitor: false },
  { feature: 'Public pricing on website', secqa: true, competitor: false },
  { feature: 'HubSpot CRM integration', secqa: true, competitor: false },
  { feature: 'Slack / Teams notifications', secqa: true, competitor: true },
  { feature: 'SSO (SAML / OIDC)', secqa: true, competitor: true },
  { feature: 'Custom review workflow with SLAs', secqa: true, competitor: false },
  { feature: 'SOC 2 / ISO 27001 / HIPAA frameworks', secqa: false, competitor: true },
  { feature: 'Auditor portal and reporting', secqa: false, competitor: true },
  { feature: 'API access (read / write)', secqa: true, competitor: true },
  { feature: '14-day paid pilot', secqa: true, competitor: false },
];

const migrationSteps = [
  {
    title: 'Keep Drata for SOC 2 evidence (recommended)',
    desc: 'If you are mid-SOC 2 audit, do not cancel Drata. Run SecQA in parallel for questionnaire work. Drata stays for evidence collection until your next audit cycle.',
  },
  {
    title: 'Export your Drata Q&A library',
    desc: 'Drata support exports questionnaire history as CSV. Pull this export and any uploaded documents for bulk import into SecQA.',
  },
  {
    title: 'Bulk import to SecQA',
    desc: 'Drag-and-drop the CSV export. SecQA parses Q&A pairs, embeds them, and tags by framework. Most imports complete in under 30 minutes.',
  },
  {
    title: 'Run your first questionnaire through SecQA',
    desc: 'Upload a live prospect questionnaire. Get a 90%-complete first draft in 90 minutes. Compare with your existing Drata-based workflow for time and quality.',
  },
  {
    title: 'Downgrade Drata at renewal (optional)',
    desc: 'If SecQA fully replaces Drata questionnaire work, downgrade Drata to evidence-only tier. Some teams keep both — Drata for SOC 2, SecQA for questionnaires.',
  },
];

const faqs = [
  {
    q: 'Does SecQA replace Drata for SOC 2 compliance?',
    a: 'No. SecQA does not collect SOC 2 evidence, run continuous control monitoring, or generate auditor-ready reports. If SOC 2 / ISO 27001 / HIPAA evidence automation is your primary need, keep Drata. Use SecQA for the questionnaire response workload Drata does not handle.',
  },
  {
    q: 'Can I run Drata and SecQA together?',
    a: 'Yes — this is the recommended setup for most SaaS teams. Drata handles evidence collection and audit prep. SecQA handles inbound questionnaire response. They share no overlap and integrate with the same CRM (HubSpot or Salesforce).',
  },
  {
    q: 'How long does migration take?',
    a: 'If you are migrating questionnaire work only, expect 1-2 business days for bulk import + tag cleanup. If you are migrating away from Drata entirely (not recommended mid-audit), plan 30-60 days for SOC 2 evidence transition.',
  },
  {
    q: 'Does SecQA integrate with the same tools Drata does?',
    a: 'SecQA integrates with HubSpot, Salesforce, Slack, Notion, Linear, Jira, GitHub, and the major identity providers (Okta, Auth0, Clerk, Google Workspace). For cloud infrastructure monitoring, we rely on what Drata or your CSPM tool already provides — SecQA does not duplicate that.',
  },
  {
    q: 'What about Drata Trust Center?',
    a: 'SecQA Trust Center is included on every plan. We help you mirror your Drata Trust Center badges, document list, and sub-processor page during onboarding. Most teams have a live SecQA Trust Center within 24 hours.',
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
              SecQA vs<br />Drata<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed'>
              Drata is the SOC 2 evidence automation leader. SecQA is the questionnaire response leader. They are complementary tools — most SaaS teams run both. This page explains when to choose which.
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
                  <span className='status-badge-active'>Questionnaire-first</span>
                </div>
                <div className='flex items-baseline gap-1 mb-2'>
                  <span className='text-5xl font-extrabold text-[#8B9DAF]'>$99</span>
                  <span className='text-[14px] text-[#999999]'>/month base</span>
                </div>
                <p className='text-[13px] text-[#666666] mb-6'>+$49 per questionnaire response after the included 2/mo</p>
                <ul className='space-y-3'>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-[#8B9DAF] mt-0.5 shrink-0' /><span className='text-[13px] text-[#CCCCCC]'>90%-complete-first-draft guarantee</span></li>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-[#8B9DAF] mt-0.5 shrink-0' /><span className='text-[13px] text-[#CCCCCC]'>Self-serve checkout, cancel anytime</span></li>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-[#8B9DAF] mt-0.5 shrink-0' /><span className='text-[13px] text-[#CCCCCC]'>Trust Center included</span></li>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-[#8B9DAF] mt-0.5 shrink-0' /><span className='text-[13px] text-[#CCCCCC]'>14-day paid pilot at $499</span></li>
                </ul>
              </div>
            </FadeIn>
            <FadeIn direction='left' delay={0.1}>
              <div className='card p-8 h-full'>
                <div className='flex items-center justify-between mb-6'>
                  <h3 className='text-xl font-bold text-white'>Drata</h3>
                  <span className='status-badge-engineering'>Compliance-first</span>
                </div>
                <div className='flex items-baseline gap-1 mb-2'>
                  <span className='text-5xl font-extrabold text-white'>$8K+</span>
                  <span className='text-[14px] text-[#999999]'>/year</span>
                </div>
                <p className='text-[13px] text-[#666666] mb-6'>Typical contract $8K-$30K/year. 12-month term. Sales demo required.</p>
                <ul className='space-y-3'>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-white/30 mt-0.5 shrink-0' /><span className='text-[13px] text-white/50'>SOC 2 / ISO 27001 / HIPAA evidence</span></li>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-white/30 mt-0.5 shrink-0' /><span className='text-[13px] text-white/50'>300+ pre-built integrations</span></li>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-white/30 mt-0.5 shrink-0' /><span className='text-[13px] text-white/50'>Continuous control monitoring</span></li>
                  <li className='flex items-start gap-3'><X size={16} className='text-white/30 mt-0.5 shrink-0' /><span className='text-[13px] text-white/50'>No questionnaire AI workflow</span></li>
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
              <p className='text-[14px] text-[#999999] mt-3 max-w-2xl'>16 capabilities side-by-side. SecQA and Drata are complementary — only 4 of 16 rows overlap.</p>
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
                      <th className='text-center text-[12px] uppercase tracking-wider text-[#999999] font-semibold px-6 py-4'>Drata</th>
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
              <p className='text-[14px] text-[#999999] mt-3 max-w-2xl'>Five reasons SaaS teams add SecQA on top of Drata (or instead of, for questionnaire-only use cases).</p>
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
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Where Drata wins</h2>
              <p className='text-[14px] text-[#999999] mt-3 max-w-2xl'>Drata is the right choice for SOC 2 / ISO 27001 / HIPAA evidence automation. We do not pretend otherwise.</p>
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
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Migration guide: Drata → SecQA</h2>
              <p className='text-[14px] text-[#999999] mt-3 max-w-2xl'>For questionnaire work only. Most teams keep Drata for SOC 2 evidence and add SecQA on top.</p>
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
              <p className='text-[14px] text-[#999999] mt-3 max-w-2xl'>Assumes you already pay for Drata ($15K/year). Adding SecQA on top vs handling questionnaires manually in Drata.</p>
            </div>
          </FadeIn>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <FadeIn direction='right'>
              <div className='card p-8 ring-1 ring-[rgba(139,157,175,0.25)]'>
                <h3 className='text-[15px] font-bold text-white mb-6'>SecQA (added on top of Drata)</h3>
                <div className='space-y-4 mb-6'>
                  <div className='flex justify-between text-[13px]'><span className='text-[#999999]'>Base plan ($99 × 12)</span><span className='text-[#CCCCCC] stat-mono'>$1,188</span></div>
                  <div className='flex justify-between text-[13px]'><span className='text-[#999999]'>48 extra questionnaires ($49 ea)</span><span className='text-[#CCCCCC] stat-mono'>$2,352</span></div>
                  <div className='flex justify-between text-[13px] border-t border-[rgba(255,255,255,0.06)] pt-4'><span className='text-white font-bold'>SecQA annual cost</span><span className='text-[#8B9DAF] stat-mono text-xl font-extrabold'><CountUp to={3540} prefix='$' /></span></div>
                </div>
                <p className='text-[12px] text-[#666666]'>Drata stays at $15K for SOC 2 evidence. Total compliance spend: $18,540.</p>
              </div>
            </FadeIn>
            <FadeIn direction='left' delay={0.1}>
              <div className='card p-8'>
                <h3 className='text-[15px] font-bold text-white mb-6'>Drata only (manual questionnaire work)</h3>
                <div className='space-y-4 mb-6'>
                  <div className='flex justify-between text-[13px]'><span className='text-[#999999]'>Drata annual cost</span><span className='text-[#CCCCCC] stat-mono'>$15,000</span></div>
                  <div className='flex justify-between text-[13px]'><span className='text-[#999999]'>Engineer hours @ $150/hr (200 hrs)</span><span className='text-[#CCCCCC] stat-mono'>$30,000</span></div>
                  <div className='flex justify-between text-[13px] border-t border-[rgba(255,255,255,0.06)] pt-4'><span className='text-white font-bold'>Annual total (incl. labor)</span><span className='text-white stat-mono text-xl font-extrabold'><CountUp to={45000} prefix='$' /></span></div>
                </div>
                <p className='text-[12px] text-[#666666]'>Engineer time calculated at 4 hours per questionnaire × 50 questionnaires.</p>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <div className='mt-8 card p-6 flex items-center gap-4 ring-1 ring-[rgba(139,157,175,0.2)]'>
              <TrendingUp size={24} className='text-[#8B9DAF] shrink-0' />
              <p className='text-[14px] text-[#CCCCCC]'>
                <span className='text-white font-bold'>Annual savings with SecQA: <span className='stat-mono text-[#8B9DAF]'>$26,460</span></span>
                <span className='text-[#999999]'> — 59% reduction in total compliance spend (incl. engineer labor).</span>
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
                Choose Drata if your primary pain is SOC 2 / ISO 27001 / HIPAA evidence collection, continuous control monitoring, or audit-ready reporting. Drata is the market leader here.
              </p>
              <p className='text-[14px] text-[#999999] leading-[1.8]'>
                Choose SecQA if your primary pain is inbound questionnaire response from prospects and customers. For most SaaS teams at $1M-$20M ARR, the right answer is both: Drata for evidence, SecQA for questionnaires. Run them in parallel — there is no overlap.
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
