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
  { icon: DollarSign, title: 'Priced for SaaS $1M-$20M ARR', desc: 'Self-serve $99/mo base + per-questionnaire pricing. No procurement calls.' },
  { icon: Zap, title: 'Self-serve checkout, no sales calls', desc: 'Sign up, pay, and ship your first questionnaire response in the same afternoon.' },
  { icon: Clock, title: '14-day paid pilot at $499', desc: 'Prove ROI before annual commitment. Vanta typically requires a 12-month contract.' },
  { icon: Target, title: '90%-complete-first-draft guarantee', desc: 'We refund the questionnaire fee if first-draft completeness is below 90%.' },
  { icon: TrendingUp, title: 'HubSpot deal integration', desc: 'Auto-attach approved responses to opportunities. Forecast compliance work as deal risk.' },
];

const competitorWins = [
  { title: 'Mature GRC suite', desc: 'Vanta covers SOC 2, ISO 27001, HIPAA, PCI, FedRAMP, GDPR with 350+ pre-built integrations.' },
  { title: 'Continuous control monitoring', desc: 'Real-time evidence collection from AWS, GCP, Azure, GitHub, Okta and more.' },
  { title: 'Enterprise brand recognition', desc: 'Auditors and prospects recognise Vanta. Trust Center is a known signal.' },
  { title: 'Dedicated implementation team', desc: 'Customer success manager, onboarding specialist, and Slack Connect channel for $50M+ ARR accounts.' },
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
  { feature: 'Custom answer review workflow', secqa: true, competitor: false },
  { feature: 'Compliance framework templates', secqa: true, competitor: true },
  { feature: 'Vulnerability scanner integrations', secqa: false, competitor: true },
  { feature: 'Audit log export', secqa: true, competitor: true },
  { feature: '14-day paid pilot', secqa: true, competitor: false },
];

const migrationSteps = [
  {
    title: 'Export your answer library from Vanta',
    desc: 'Pull every approved answer, evidence file, and control mapping as CSV / PDF. Vanta support can generate a bulk export on request.',
  },
  {
    title: 'Upload to SecQA in one batch',
    desc: 'Drag-and-drop the export. SecQA parses 30+ formats (XLSX, DOCX, PDF, CAIQ, SIG) and indexes every Q&A pair with embeddings.',
  },
  {
    title: 'Map answer ownership and review SLAs',
    desc: 'Assign each answer category (security, legal, infra, product) to a reviewer. Set 24h / 48h / 72h SLAs by questionnaire tier.',
  },
  {
    title: 'Run your first questionnaire through SecQA',
    desc: 'Upload a live prospect questionnaire. Get a 90%-complete first draft in 90 minutes. Compare quality side-by-side with your Vanta workflow.',
  },
  {
    title: 'Cancel Vanta at renewal',
    desc: 'Once SecQA ships 3 questionnaires at parity, downgrade Vanta to evidence-only tier or cancel outright. Most teams save $40K+ per year.',
  },
];

const faqs = [
  {
    q: 'Will I lose my Vanta Trust Center if I switch?',
    a: 'No. SecQA Trust Center is included in every plan and can be live in under an hour. We help you mirror the page structure, badges, and document list so prospects see no disruption during the switch.',
  },
  {
    q: 'Does SecQA replace Vanta for SOC 2 evidence collection?',
    a: 'No — SecQA focuses on questionnaire response and trust signalling, not continuous control monitoring. If you need SOC 2 / ISO 27001 evidence automation, keep Vanta (or Drata) for that and use SecQA for the questionnaire workload. They are complementary.',
  },
  {
    q: 'How long does migration typically take?',
    a: 'For teams with 500-2,000 historical answers, migration completes in 1-2 business days. The bulk-upload parser handles 95% of formats automatically. Our team assists with edge cases at no charge during the 14-day pilot.',
  },
  {
    q: 'Can I run SecQA and Vanta in parallel during the pilot?',
    a: 'Yes — that is the recommended approach. Run live questionnaires through both tools for 2 weeks, compare first-draft completeness, reviewer hours, and time-to-submission. Cancel the slower one at the end.',
  },
  {
    q: 'What happens to my historical answers if I cancel Vanta?',
    a: 'You own your data. Export from Vanta before cancellation (CSV + document ZIP), and re-import to SecQA anytime. We retain your imported answers for the full life of your account.',
  },
];

export default function ComparisonPage() {
  return (
    <div className='bg-[#0D0D0D]'>
      {/* Hero */}
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Compare</p></FadeIn>
          <FadeIn delay={0.1}>
            <h1 className='text-5xl md:text-7xl lg:text-[88px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              SecQA vs<br />Vanta<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed'>
              A factual comparison for B2B SaaS founders. Vanta is the SOC 2 evidence leader. SecQA is the questionnaire response leader. Most SaaS teams under $20M ARR need both — but only one moves deals forward.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider className='max-w-[1400px]' />

      {/* Pricing cards */}
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
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-[#8B9DAF] mt-0.5 shrink-0' /><span className='text-[13px] text-[#CCCCCC]'>14-day paid pilot at $499</span></li>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-[#8B9DAF] mt-0.5 shrink-0' /><span className='text-[13px] text-[#CCCCCC]'>Self-serve checkout, cancel anytime</span></li>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-[#8B9DAF] mt-0.5 shrink-0' /><span className='text-[13px] text-[#CCCCCC]'>90%-complete-first-draft guarantee</span></li>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-[#8B9DAF] mt-0.5 shrink-0' /><span className='text-[13px] text-[#CCCCCC]'>HubSpot deal integration included</span></li>
                </ul>
              </div>
            </FadeIn>
            <FadeIn direction='left' delay={0.1}>
              <div className='card p-8 h-full'>
                <div className='flex items-center justify-between mb-6'>
                  <h3 className='text-xl font-bold text-white'>Vanta</h3>
                  <span className='status-badge-engineering'>Enterprise GRC</span>
                </div>
                <div className='flex items-baseline gap-1 mb-2'>
                  <span className='text-5xl font-extrabold text-white'>$5,000</span>
                  <span className='text-[14px] text-[#999999]'>/year starting</span>
                </div>
                <p className='text-[13px] text-[#666666] mb-6'>Typical contract $8K-$25K/year. Sales-led, 12-month term.</p>
                <ul className='space-y-3'>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-white/30 mt-0.5 shrink-0' /><span className='text-[13px] text-white/50'>SOC 2 / ISO 27001 / HIPAA evidence automation</span></li>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-white/30 mt-0.5 shrink-0' /><span className='text-[13px] text-white/50'>350+ pre-built integrations</span></li>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-white/30 mt-0.5 shrink-0' /><span className='text-[13px] text-white/50'>Continuous control monitoring</span></li>
                  <li className='flex items-start gap-3'><X size={16} className='text-white/30 mt-0.5 shrink-0' /><span className='text-[13px] text-white/50'>No questionnaire-first workflow</span></li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Feature comparison table */}
      <section className='py-16 md:py-24 bg-[#111111]'>
        <div className='max-w-[1200px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Feature matrix</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Detailed feature comparison</h2>
              <p className='text-[14px] text-[#999999] mt-3 max-w-2xl'>16 capabilities side-by-side. Honest checkmarks only — no marketing fluff.</p>
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
                      <th className='text-center text-[12px] uppercase tracking-wider text-[#999999] font-semibold px-6 py-4'>Vanta</th>
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

      {/* Where SecQA wins */}
      <section className='py-16 md:py-24 bg-[#0D0D0D]'>
        <div className='max-w-[1200px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Honest assessment</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Where SecQA wins</h2>
              <p className='text-[14px] text-[#999999] mt-3 max-w-2xl'>Five concrete reasons SaaS teams under $20M ARR choose SecQA over Vanta for questionnaire response.</p>
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

      {/* Where competitor wins */}
      <section className='py-16 md:py-24 bg-[#111111]'>
        <div className='max-w-[1200px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>The honest truth</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Where Vanta wins</h2>
              <p className='text-[14px] text-[#999999] mt-3 max-w-2xl'>Vanta is the better choice for continuous compliance and audit evidence. We do not pretend otherwise.</p>
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

      {/* Migration guide */}
      <section className='py-16 md:py-24 bg-[#0D0D0D]'>
        <div className='max-w-[1200px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Switch in 5 steps</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Migration guide: Vanta → SecQA</h2>
              <p className='text-[14px] text-[#999999] mt-3 max-w-2xl'>Most teams complete migration in 1-2 business days. No code changes, no data loss, no prospect-facing disruption.</p>
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

      {/* ROI calculator */}
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
                <h3 className='text-[15px] font-bold text-white mb-6'>Vanta annual cost</h3>
                <div className='space-y-4 mb-6'>
                  <div className='flex justify-between text-[13px]'><span className='text-[#999999]'>Starter plan (12-mo contract)</span><span className='text-[#CCCCCC] stat-mono'>$8,000</span></div>
                  <div className='flex justify-between text-[13px]'><span className='text-[#999999]'>Questionnaire add-on</span><span className='text-[#CCCCCC] stat-mono'>$4,800</span></div>
                  <div className='flex justify-between text-[13px] border-t border-[rgba(255,255,255,0.06)] pt-4'><span className='text-white font-bold'>Annual total</span><span className='text-white stat-mono text-xl font-extrabold'><CountUp to={12800} prefix='$' /></span></div>
                </div>
                <p className='text-[12px] text-[#666666]'>Implementation fee waived for $50K+ contracts. 12-month commitment required.</p>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <div className='mt-8 card p-6 flex items-center gap-4 ring-1 ring-[rgba(139,157,175,0.2)]'>
              <TrendingUp size={24} className='text-[#8B9DAF] shrink-0' />
              <p className='text-[14px] text-[#CCCCCC]'>
                <span className='text-white font-bold'>Annual savings with SecQA: <span className='stat-mono text-[#8B9DAF]'>$9,260</span></span>
                <span className='text-[#999999]'> — 72% cost reduction at the same questionnaire volume.</span>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
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

      {/* Which is best for you */}
      <section className='py-16 md:py-24 bg-[#111111]'>
        <div className='max-w-[900px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='card p-8 md:p-12'>
              <h3 className='text-2xl font-bold text-white mb-4'>Which is best for you?</h3>
              <p className='text-[14px] text-[#999999] leading-[1.8] mb-6'>
                Choose Vanta if you are $50M+ ARR with a dedicated security team, budget for enterprise tools, and need continuous SOC 2 / ISO 27001 evidence collection.
              </p>
              <p className='text-[14px] text-[#999999] leading-[1.8]'>
                Choose SecQA if you are $1M-$20M ARR and need questionnaire response workflow at a price that makes sense for your deal volume. Most early-stage SaaS teams run SecQA as their primary tool and add Vanta only when an enterprise customer demands SOC 2 evidence automation.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
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
