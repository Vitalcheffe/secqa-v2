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
  { icon: Target, title: 'Questionnaire AI is our core product', desc: 'Secureframe pivoted to compliance automation. Questionnaire response is a bolt-on feature in their workflow. SecQA is questionnaire-first.' },
  { icon: DollarSign, title: 'Predictable per-questionnaire pricing', desc: 'Secureforce pricing requires sales calls and 12-month commitments. SecQA posts $99/mo base + $49 per questionnaire on the homepage.' },
  { icon: Zap, title: '90-minute first-draft guarantee', desc: 'Secureframe AI typically ships 70-80% first-draft completeness in 2-3 hours. SecQA guarantees 90% in 90 minutes or the questionnaire is free.' },
  { icon: Clock, title: '14-day paid pilot, no contract', desc: 'Secureframe requires annual commitment from day one. SecQA lets you run a $499 pilot, prove ROI, then upgrade — cancel anytime if it does not work.' },
  { icon: TrendingUp, title: 'HubSpot-native deal workflow', desc: 'SecQA auto-attaches approved responses to HubSpot opportunities. Secureframe treats questionnaires as standalone tickets disconnected from revenue.' },
];

const competitorWins = [
  { title: 'Mature SOC 2 / ISO 27001 automation', desc: 'Secureframe pioneered compliance automation with deep integrations and auditor-friendly reporting. Strong choice for multi-framework GRC.' },
  { title: 'Background control monitoring', desc: 'Continuous evidence collection across 200+ integrations. Detects drift before auditors do.' },
  { title: 'Pre-built policy library', desc: '80+ pre-mapped policies for SOC 2, ISO 27001, HIPAA, PCI, GDPR, FedRAMP. Reduces policy drafting time from weeks to days.' },
  { title: 'Established enterprise customer base', desc: 'Trusted by Series C and public companies. Procurement teams recognise Secureframe as a low-risk vendor.' },
];

const featureMatrix = [
  { feature: 'Questionnaire response workflow', secqa: true, competitor: true },
  { feature: 'AI first-draft generation (90% complete)', secqa: true, competitor: false },
  { feature: 'Per-question citation back to source', secqa: true, competitor: true },
  { feature: 'SOC 2 evidence collection', secqa: false, competitor: true },
  { feature: 'Continuous control monitoring', secqa: false, competitor: true },
  { feature: 'Trust Center hosting', secqa: true, competitor: true },
  { feature: 'Self-serve checkout', secqa: true, competitor: false },
  { feature: 'Public pricing on website', secqa: true, competitor: false },
  { feature: 'HubSpot CRM integration', secqa: true, competitor: false },
  { feature: 'Slack / Teams notifications', secqa: true, competitor: true },
  { feature: 'SSO (SAML / OIDC)', secqa: true, competitor: true },
  { feature: 'Custom review workflow with SLAs', secqa: true, competitor: false },
  { feature: 'Pre-built policy library (80+)', secqa: false, competitor: true },
  { feature: 'Auditor portal and reporting', secqa: false, competitor: true },
  { feature: 'API access (read / write)', secqa: true, competitor: true },
  { feature: '14-day paid pilot', secqa: true, competitor: false },
];

const migrationSteps = [
  {
    title: 'Export your Secureframe Q&A history',
    desc: 'Secureframe support exports your questionnaire history as CSV plus uploaded attachments. Allow 2-3 business days for accounts with 500+ historical answers.',
  },
  {
    title: 'Bulk import to SecQA',
    desc: 'Drag-and-drop the CSV. SecQA parses Q&A pairs, tags by framework (SOC 2, ISO 27001, HIPAA), and embeds each answer for retrieval.',
  },
  {
    title: 'Map taxonomy and review SLAs',
    desc: 'Align Secureframe categories to SecQA categories. Set reviewer ownership (security / legal / infra / product) and per-tier SLAs (24h / 48h / 72h).',
  },
  {
    title: 'Run a live questionnaire side-by-side',
    desc: 'Upload the same prospect questionnaire to both tools. Compare first-draft completeness, reviewer hours, and submission time. Most teams see SecQA win by 15-25%.',
  },
  {
    title: 'Cancel Secureframe questionnaire add-on',
    desc: 'Keep Secureframe for SOC 2 evidence if needed. Cancel the questionnaire add-on module — typical savings $5K-$15K per year per account.',
  },
];

const faqs = [
  {
    q: 'Does SecQA replace Secureframe for SOC 2?',
    a: 'No. SecQA does not collect SOC 2 evidence or generate auditor reports. If you need SOC 2 / ISO 27001 / HIPAA evidence automation, keep Secureframe. Use SecQA for the questionnaire response workload that Secureframe handles poorly.',
  },
  {
    q: 'How does SecQA AI compare to Secureframe AI on questionnaires?',
    a: 'SecQA ships 90% first-draft completeness in 90 minutes. Secureframe AI typically ships 70-80% first-draft in 2-3 hours. For most SaaS questionnaires under 200 questions, SecQA wins on both speed and completeness. For niche frameworks (FedRAMP, HITRUST), results vary — run the pilot side-by-side.',
  },
  {
    q: 'Can I run Secureframe and SecQA together?',
    a: 'Yes — recommended for most SaaS teams. Secureframe handles evidence collection and audit prep. SecQA handles inbound questionnaire response. They share no overlap and integrate with the same CRM.',
  },
  {
    q: 'What about Secureframe Trust Center?',
    a: 'SecQA Trust Center is included on every plan and live in under an hour. We mirror your Secureframe Trust Center badges, documents, and sub-processor page so prospects see no disruption during the switch.',
  },
  {
    q: 'How long does migration take?',
    a: 'Questionnaire-only migration: 1-2 business days for bulk import + tag cleanup. Full Secureframe exit (not recommended mid-audit): 30-60 days for SOC 2 evidence transition. Our migration specialist assists at no charge during the 14-day pilot.',
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
              SecQA vs<br />Secureframe<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed'>
              Secureframe is the compliance automation pioneer. SecQA is the questionnaire response specialist. Secureframe added questionnaire AI as a feature — we built the whole product around it.
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
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-[#8B9DAF] mt-0.5 shrink-0' /><span className='text-[13px] text-[#CCCCCC]'>HubSpot deal workflow included</span></li>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-[#8B9DAF] mt-0.5 shrink-0' /><span className='text-[13px] text-[#CCCCCC]'>14-day paid pilot at $499</span></li>
                </ul>
              </div>
            </FadeIn>
            <FadeIn direction='left' delay={0.1}>
              <div className='card p-8 h-full'>
                <div className='flex items-center justify-between mb-6'>
                  <h3 className='text-xl font-bold text-white'>Secureframe</h3>
                  <span className='status-badge-engineering'>Compliance-first</span>
                </div>
                <div className='flex items-baseline gap-1 mb-2'>
                  <span className='text-5xl font-extrabold text-white'>Custom</span>
                </div>
                <p className='text-[13px] text-[#666666] mb-6'>Typical contract $10K-$30K/year. 12-month term. Sales demo required.</p>
                <ul className='space-y-3'>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-white/30 mt-0.5 shrink-0' /><span className='text-[13px] text-white/50'>SOC 2 / ISO 27001 / HIPAA automation</span></li>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-white/30 mt-0.5 shrink-0' /><span className='text-[13px] text-white/50'>200+ pre-built integrations</span></li>
                  <li className='flex items-start gap-3'><CheckCircle2 size={16} className='text-white/30 mt-0.5 shrink-0' /><span className='text-[13px] text-white/50'>Pre-built policy library (80+)</span></li>
                  <li className='flex items-start gap-3'><X size={16} className='text-white/30 mt-0.5 shrink-0' /><span className='text-[13px] text-white/50'>Questionnaire AI as a feature, not core</span></li>
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
              <p className='text-[14px] text-[#999999] mt-3 max-w-2xl'>16 capabilities side-by-side. Both tools offer Trust Center — but the questionnaire workflow depth differs sharply.</p>
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
                      <th className='text-center text-[12px] uppercase tracking-wider text-[#999999] font-semibold px-6 py-4'>Secureframe</th>
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
              <p className='text-[14px] text-[#999999] mt-3 max-w-2xl'>Five reasons SaaS teams add SecQA on top of Secureframe (or replace Secureframe questionnaire add-on entirely).</p>
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
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Where Secureframe wins</h2>
              <p className='text-[14px] text-[#999999] mt-3 max-w-2xl'>Secureframe is the right choice for multi-framework compliance automation. We do not pretend otherwise.</p>
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
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Migration guide: Secureframe → SecQA</h2>
              <p className='text-[14px] text-[#999999] mt-3 max-w-2xl'>For questionnaire work. Most teams keep Secureframe for SOC 2 evidence and replace the questionnaire add-on with SecQA.</p>
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
              <p className='text-[14px] text-[#999999] mt-3 max-w-2xl'>Assumes Secureframe base plan ($15K/year) plus questionnaire add-on vs. SecQA on top of Secureframe evidence tier.</p>
            </div>
          </FadeIn>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <FadeIn direction='right'>
              <div className='card p-8 ring-1 ring-[rgba(139,157,175,0.25)]'>
                <h3 className='text-[15px] font-bold text-white mb-6'>SecQA + Secureframe evidence tier</h3>
                <div className='space-y-4 mb-6'>
                  <div className='flex justify-between text-[13px]'><span className='text-[#999999]'>Secureframe evidence only</span><span className='text-[#CCCCCC] stat-mono'>$10,000</span></div>
                  <div className='flex justify-between text-[13px]'><span className='text-[#999999]'>SecQA annual ($99 × 12 + 48 × $49)</span><span className='text-[#CCCCCC] stat-mono'>$3,540</span></div>
                  <div className='flex justify-between text-[13px] border-t border-[rgba(255,255,255,0.06)] pt-4'><span className='text-white font-bold'>Annual total</span><span className='text-[#8B9DAF] stat-mono text-xl font-extrabold'><CountUp to={13540} prefix='$' /></span></div>
                </div>
                <p className='text-[12px] text-[#666666]'>Best of both: evidence automation + questionnaire AI.</p>
              </div>
            </FadeIn>
            <FadeIn direction='left' delay={0.1}>
              <div className='card p-8'>
                <h3 className='text-[15px] font-bold text-white mb-6'>Secureframe full plan (incl. questionnaire)</h3>
                <div className='space-y-4 mb-6'>
                  <div className='flex justify-between text-[13px]'><span className='text-[#999999]'>Secureframe annual</span><span className='text-[#CCCCCC] stat-mono'>$18,000</span></div>
                  <div className='flex justify-between text-[13px]'><span className='text-[#999999]'>Questionnaire add-on</span><span className='text-[#CCCCCC] stat-mono'>$4,800</span></div>
                  <div className='flex justify-between text-[13px] border-t border-[rgba(255,255,255,0.06)] pt-4'><span className='text-white font-bold'>Annual total</span><span className='text-white stat-mono text-xl font-extrabold'><CountUp to={22800} prefix='$' /></span></div>
                </div>
                <p className='text-[12px] text-[#666666]'>Questionnaire AI is a feature, not a core product. 12-month commitment required.</p>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <div className='mt-8 card p-6 flex items-center gap-4 ring-1 ring-[rgba(139,157,175,0.2)]'>
              <TrendingUp size={24} className='text-[#8B9DAF] shrink-0' />
              <p className='text-[14px] text-[#CCCCCC]'>
                <span className='text-white font-bold'>Annual savings with SecQA: <span className='stat-mono text-[#8B9DAF]'>$9,260</span></span>
                <span className='text-[#999999]'> — 41% cost reduction at the same questionnaire volume.</span>
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
                Choose Secureframe if your primary pain is SOC 2 / ISO 27001 / HIPAA evidence collection with pre-built policy templates and auditor-friendly reporting.
              </p>
              <p className='text-[14px] text-[#999999] leading-[1.8]'>
                Choose SecQA if your primary pain is inbound questionnaire response. For most SaaS teams at $1M-$20M ARR, the right answer is both: Secureframe for evidence, SecQA for questionnaires. Replace Secureframe questionnaire add-on with SecQA — same evidence workflow, better questionnaire AI, lower total cost.
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
