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
  { icon: DollarSign, title: 'Self-serve pricing visible on day one', desc: 'Conveyor requires a sales call. SecQA posts $99/mo base on the homepage and lets you checkout in 90 seconds.' },
  { icon: Zap, title: '90-minute first-draft guarantee', desc: 'Conveyor AI typically returns 70-75% first-draft completeness. SecQA guarantees 90% or the questionnaire is free.' },
  { icon: Clock, title: 'No 12-month contract minimum', desc: 'Conveyor locks most customers into annual deals. SecQA is monthly, cancel anytime, refund if it does not work.' },
  { icon: Target, title: 'Built for SaaS $1M-$20M ARR', desc: 'Conveyor targets enterprise customers with 500+ questionnaires per year. SecQA scales down to 12 questionnaires per year profitably.' },
  { icon: TrendingUp, title: 'HubSpot deal-aware workflow', desc: 'Auto-attach approved responses to HubSpot opportunities. Conveyor treats questionnaires as standalone tickets.' },
];

const competitorWins = [
  { title: 'Mature enterprise customer base', desc: 'Conveyor is trusted by Fortune 500 buyers and has a proven track record at 500+ questionnaires per year per customer.' },
  { title: 'Deep Salesforce integration', desc: 'Bi-directional sync with Salesforce opportunities, account records, and CPQ — built for revenue teams running SFDC as their CRM of record.' },
  { title: 'Dedicated customer success', desc: 'Every account gets a named CSM and quarterly business reviews. Onboarding specialist included for $50K+ contracts.' },
  { title: 'Advanced AI training on enterprise data', desc: 'Conveyor has 7+ years of enterprise questionnaire data training their answer-matching model. Hard to beat on niche question types.' },
];

const featureMatrix = [
  { feature: 'AI first-draft generation', secqa: true, competitor: true },
  { feature: '90%-complete-first-draft guarantee', secqa: true, competitor: false },
  { feature: 'Public pricing on website', secqa: true, competitor: false },
  { feature: 'Self-serve checkout (no sales call)', secqa: true, competitor: false },
  { feature: '14-day paid pilot', secqa: true, competitor: false },
  { feature: 'HubSpot CRM integration', secqa: true, competitor: false },
  { feature: 'Salesforce CRM integration', secqa: true, competitor: true },
  { feature: 'Trust Center hosting', secqa: true, competitor: true },
  { feature: 'Per-question citation to source', secqa: true, competitor: true },
  { feature: 'SOC 2 / ISO 27001 evidence collection', secqa: false, competitor: false },
  { feature: 'Custom review workflow with SLAs', secqa: true, competitor: true },
  { feature: 'SSO (SAML / OIDC)', secqa: true, competitor: true },
  { feature: 'Audit log and SOC 2 reporting', secqa: true, competitor: true },
  { feature: 'API access (read / write)', secqa: true, competitor: true },
  { feature: 'Slack / Teams notifications', secqa: true, competitor: true },
  { feature: 'Bulk questionnaire import (100+ Q)', secqa: true, competitor: true },
];

const migrationSteps = [
  {
    title: 'Request a Conveyor data export',
    desc: 'Conveyor support can export your full Q&A library as CSV plus document attachments. Expect 3-5 business days for accounts with 1,000+ historical answers.',
  },
  {
    title: 'Import to SecQA via bulk uploader',
    desc: 'Drag-and-drop the CSV export. SecQA parses Q&A pairs, embeds them in our retrieval index, and assigns ownership based on category tags.',
  },
  {
    title: 'Reconcile taxonomy and tags',
    desc: 'Map Conveyor categories to SecQA categories. Most teams need 30-60 minutes of cleanup. Our migration specialist assists at no charge during the 14-day pilot.',
  },
  {
    title: 'Run a live questionnaire side-by-side',
    desc: 'Upload the same questionnaire to both tools. Compare first-draft completeness, reviewer hours, and time-to-submission. Most teams see SecQA win on all three.',
  },
  {
    title: 'Cancel Conveyor at renewal',
    desc: 'Export your data one final time before cancellation for backup. Downgrade Conveyor or cancel outright — typical SaaS saves $15K-$30K per year per switch.',
  },
];

const faqs = [
  {
    q: 'Does SecQA support Salesforce like Conveyor does?',
    a: 'Yes — Salesforce integration is included on every plan with bi-directional opportunity sync, custom field mapping, and CPQ-compatible attachments. HubSpot is the default CRM, but Salesforce is fully supported.',
  },
  {
    q: 'How does SecQA AI compare to Conveyor AI on accuracy?',
    a: 'For SaaS questionnaires under 200 questions, SecQA ships 90% first-draft completeness within 90 minutes. Conveyor typically ships 70-75% first-draft in 2-4 hours. For niche regulated industries (FedRAMP, HITRUST), Conveyor has more training data and may outperform — we recommend running the pilot side-by-side to compare.',
  },
  {
    q: 'What if my team is already mid-contract with Conveyor?',
    a: 'Most Conveyor contracts allow cancellation at renewal with 60-day notice. Run SecQA in parallel for the last 60 days of your contract, prove ROI, then cancel. We will credit the parallel-run cost against your first annual renewal if you switch.',
  },
  {
    q: 'Does SecQA replace Conveyor Trust Center?',
    a: 'Yes. SecQA Trust Center is included in every plan and can be live in under an hour. We help you mirror badges, document list, and sub-processor page so prospects see no disruption.',
  },
  {
    q: 'How fast can we be live on SecQA?',
    a: 'Self-serve signup to first questionnaire response is typically under 4 hours. Enterprise onboarding with SSO, custom review workflows, and Salesforce sync is 3-5 business days.',
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
              SecQA vs<br />Conveyor<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed'>
              Conveyor is the enterprise questionnaire leader with deep Salesforce integration. SecQA is the modern alternative for SaaS teams who want Conveyor-grade quality without the sales-led procurement gauntlet.
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
                  <span className='status-badge-active'>Recommended for $1M-$20M ARR</span>
                </div>
                <div className='flex items-baseline gap-1 mb-2'>
                  <span className='text-5xl font-extrabold text-[#8B9DAF]'>$99</span>
                  <span className='text-[14px] text-[#999999]'>/month base</span>
                </div>
                <p className='text-[13px] text-[#666666] mb-6'>+$49 per questionnaire response after the included 2/mo</p>
                <ul className='space-y-3'>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-[#8B9DAF] mt-0.5 shrink-0' /><span className='text-[13px] text-[#CCCCCC]'>Self-serve checkout, cancel anytime</span></li>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-[#8B9DAF] mt-0.5 shrink-0' /><span className='text-[13px] text-[#CCCCCC]'>90%-complete-first-draft guarantee</span></li>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-[#8B9DAF] mt-0.5 shrink-0' /><span className='text-[13px] text-[#CCCCCC]'>HubSpot + Salesforce included</span></li>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-[#8B9DAF] mt-0.5 shrink-0' /><span className='text-[13px] text-[#CCCCCC]'>14-day paid pilot at $499</span></li>
                </ul>
              </div>
            </FadeIn>
            <FadeIn direction='left' delay={0.1}>
              <div className='card p-8 h-full'>
                <div className='flex items-center justify-between mb-6'>
                  <h3 className='text-xl font-bold text-white'>Conveyor</h3>
                  <span className='status-badge-engineering'>Sales-led</span>
                </div>
                <div className='flex items-baseline gap-1 mb-2'>
                  <span className='text-5xl font-extrabold text-white'>Custom</span>
                </div>
                <p className='text-[13px] text-[#666666] mb-6'>Typical contract $15K-$50K/year. 12-month term. Sales demo required.</p>
                <ul className='space-y-3'>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-white/30 mt-0.5 shrink-0' /><span className='text-[13px] text-white/50'>Enterprise-grade AI trained on 7 years of data</span></li>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-white/30 mt-0.5 shrink-0' /><span className='text-[13px] text-white/50'>Deep Salesforce / CPQ integration</span></li>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-white/30 mt-0.5 shrink-0' /><span className='text-[13px] text-white/50'>Named CSM and quarterly business reviews</span></li>
                  <li className='flex items-start gap-3'><X size={16} className='text-white/30 mt-0.5 shrink-0' /><span className='text-[13px] text-white/50'>No self-serve pricing</span></li>
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
              <p className='text-[14px] text-[#999999] mt-3 max-w-2xl'>16 capabilities side-by-side. Both tools are questionnaire-first — the differences are in pricing model, contract terms, and CRM focus.</p>
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
                      <th className='text-center text-[12px] uppercase tracking-wider text-[#999999] font-semibold px-6 py-4'>Conveyor</th>
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
              <p className='text-[14px] text-[#999999] mt-3 max-w-2xl'>Five reasons SaaS teams under $20M ARR choose SecQA over Conveyor for questionnaire response.</p>
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
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Where Conveyor wins</h2>
              <p className='text-[14px] text-[#999999] mt-3 max-w-2xl'>Conveyor is the right choice for enterprise teams running 500+ questionnaires per year on Salesforce. We do not pretend otherwise.</p>
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
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Migration guide: Conveyor → SecQA</h2>
              <p className='text-[14px] text-[#999999] mt-3 max-w-2xl'>Most teams complete migration in 1-3 business days depending on Conveyor export turnaround.</p>
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
              <p className='text-[14px] text-[#999999] mt-3 max-w-2xl'>Same questionnaire volume, same team, same year. The only difference is which tool you pay for.</p>
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
                <h3 className='text-[15px] font-bold text-white mb-6'>Conveyor annual cost</h3>
                <div className='space-y-4 mb-6'>
                  <div className='flex justify-between text-[13px]'><span className='text-[#999999]'>Growth plan (12-mo contract)</span><span className='text-[#CCCCCC] stat-mono'>$18,000</span></div>
                  <div className='flex justify-between text-[13px]'><span className='text-[#999999]'>Implementation fee</span><span className='text-[#CCCCCC] stat-mono'>$2,500</span></div>
                  <div className='flex justify-between text-[13px] border-t border-[rgba(255,255,255,0.06)] pt-4'><span className='text-white font-bold'>Annual total</span><span className='text-white stat-mono text-xl font-extrabold'><CountUp to={20500} prefix='$' /></span></div>
                </div>
                <p className='text-[12px] text-[#666666]'>Pricing varies by questionnaire volume. 12-month commitment required.</p>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <div className='mt-8 card p-6 flex items-center gap-4 ring-1 ring-[rgba(139,157,175,0.2)]'>
              <TrendingUp size={24} className='text-[#8B9DAF] shrink-0' />
              <p className='text-[14px] text-[#CCCCCC]'>
                <span className='text-white font-bold'>Annual savings with SecQA: <span className='stat-mono text-[#8B9DAF]'>$16,960</span></span>
                <span className='text-[#999999]'> — 83% cost reduction at the same questionnaire volume.</span>
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
                Choose Conveyor if you are an enterprise team running 500+ questionnaires per year on Salesforce, with budget for a dedicated CSM and quarterly business reviews.
              </p>
              <p className='text-[14px] text-[#999999] leading-[1.8]'>
                Choose SecQA if you are a SaaS team at $1M-$20M ARR running 12-200 questionnaires per year and need questionnaire response workflow at a price that fits your deal volume. Both tools can run in parallel during evaluation — most teams cancel Conveyor within 60 days of starting SecQA.
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
