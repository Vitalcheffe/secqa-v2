'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem, CountUp, SectionDivider, TextReveal } from '@/components/ui/motion';
import { ArrowRight, CheckCircle2, X, ChevronDown, Calculator, Zap, Shield, BarChart3, Lock, Clock, FileText, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const tiers = [
  {
    name: 'Starter', price: 49, priceDetail: '/month',
    description: 'For solo founders and small teams receiving under 5 questionnaires a month.',
    features: [
      { text: 'Up to 5 questionnaires/month', included: true },
      { text: 'RAG over past questionnaires', included: true },
      { text: 'Claude first-draft generation', included: true },
      { text: 'Word/Excel/CSV export', included: true },
      { text: 'Email support (24h SLA)', included: true },
      { text: '1 user seat', included: true },
      { text: 'Basic answer library (10 seeded Q&A)', included: true },
      { text: 'HubSpot deal integration', included: false },
      { text: 'Slack support channel', included: false },
      { text: 'Salesforce integration', included: false },
      { text: 'Custom template matching', included: false },
      { text: 'Quarterly answer library audit', included: false },
      { text: '90%-complete-first-draft guarantee', included: false },
      { text: 'Source citation tracking', included: false },
    ],
    cta: 'Start with Starter', ctaStyle: 'border border-white/12 text-white hover:border-white/25 hover:bg-white/[0.03]',
    highlight: false, badge: '',
  },
  {
    name: 'Pro', price: 99, priceDetail: '/month',
    description: 'For SaaS companies $1M-$10M ARR with 1-3 sales engineers handling 10-15 deals per quarter.',
    features: [
      { text: 'Up to 20 questionnaires/month', included: true },
      { text: 'Everything in Starter, plus:', included: true },
      { text: 'HubSpot deal integration', included: true },
      { text: 'SOC2/CAIQ/SIG answer library (50)', included: true },
      { text: 'Quarterly library audit', included: true },
      { text: 'Slack support (4h SLA)', included: true },
      { text: '3 user seats', included: true },
      { text: 'Source citation tracking', included: true },
      { text: 'Slack + Notion webhook integrations', included: true },
      { text: '90%-complete-first-draft guarantee', included: true },
      { text: 'Salesforce integration', included: false },
      { text: 'Custom template matching', included: false },
      { text: 'Dedicated Slack channel', included: false },
      { text: 'Monthly office hours', included: false },
    ],
    cta: 'Start with Pro', ctaStyle: 'bg-white text-black hover:bg-white/90',
    highlight: true, badge: 'Most Popular',
  },
  {
    name: 'Scale', price: 299, priceDetail: '/month',
    description: 'For SaaS companies $10M-$50M ARR with dedicated sales engineering function and 30+ enterprise deals per quarter.',
    features: [
      { text: 'Unlimited (100/month fair use)', included: true },
      { text: 'Everything in Pro, plus:', included: true },
      { text: 'Salesforce integration', included: true },
      { text: 'Custom template matching (top 5)', included: true },
      { text: 'Dedicated Slack (1h SLA)', included: true },
      { text: 'Monthly office hours with founder', included: true },
      { text: '10 user seats', included: true },
      { text: 'Priority feature requests (2-week SLA)', included: true },
      { text: 'Custom SOC2 evidence ingestion', included: true },
      { text: 'White-glove onboarding', included: true },
      { text: 'Quarterly business review with ROI', included: true },
      { text: 'Custom integrations (2-week SLA)', included: true },
      { text: 'EU data residency option', included: true },
      { text: 'DPA + custom security review', included: true },
    ],
    cta: 'Start with Scale', ctaStyle: 'border border-white/12 text-white hover:border-white/25 hover:bg-white/[0.03]',
    highlight: false, badge: '',
  },
];

const comparisonTable = [
  { feature: 'Questionnaires per month', starter: '5', pro: '20', scale: '100 (soft cap)' },
  { feature: 'User seats', starter: '1', pro: '3', scale: '10' },
  { feature: 'Claude 3.5 Haiku answer drafting', starter: true, pro: true, scale: true },
  { feature: 'RAG over past questionnaires', starter: true, pro: true, scale: true },
  { feature: 'Word/PDF/CSV export', starter: true, pro: true, scale: true },
  { feature: 'Source citations with similarity scores', starter: false, pro: true, scale: true },
  { feature: 'HubSpot deal integration', starter: false, pro: true, scale: true },
  { feature: 'Salesforce integration', starter: false, pro: false, scale: true },
  { feature: 'SOC2/CAIQ/SIG seeded answer library', starter: '10 templates', pro: '50 templates', scale: '50 + custom' },
  { feature: 'Slack + Notion webhook integrations', starter: false, pro: true, scale: true },
  { feature: 'Custom template matching (top 5 customers)', starter: false, pro: false, scale: true },
  { feature: 'Quarterly answer library audit', starter: false, pro: true, scale: true },
  { feature: 'Support SLA', starter: '24h (email)', pro: '4h (Slack)', scale: '1h (dedicated Slack)' },
  { feature: 'Monthly office hours with founder', starter: false, pro: false, scale: true },
  { feature: '90%-complete-first-draft guarantee', starter: false, pro: true, scale: true },
  { feature: 'Custom SOC2 evidence pack ingestion', starter: false, pro: false, scale: true },
  { feature: 'Priority feature requests (2-week SLA)', starter: false, pro: false, scale: true },
  { feature: 'EU data residency option', starter: false, pro: false, scale: true },
];

const costOptimizationTips = [
  { icon: Calculator, title: 'Annual Prepay Discount', desc: 'Commit to annual billing for 17% off (2 months free). Locks in Claude API costs and shows 92% Year-2 retention vs 71% monthly.' },
  { icon: Zap, title: 'Answer Library Compounding', desc: 'Every questionnaire answered makes your RAG database smarter. By month 3, 90% of answers are auto-matched — no manual review needed.' },
  { icon: Shield, title: 'Founding Customer Lock', desc: 'First 100 customers lock pricing for life. We are at customer 24. Price doubles for customer 101+. Lock in $99/mo forever.' },
  { icon: BarChart3, title: 'ROI Compounding', desc: 'Month 1: 8h saved per questionnaire. Month 6: 12.5h saved (answer library grew). Month 12: 13.5h saved (90%+ auto-match rate).' },
];

const faqs = [
  { q: 'What is the 90%-complete-first-draft guarantee?', a: 'If, after uploading your first 3 paid questionnaires, our tool does not produce a 90%-complete first-draft response within 90 minutes, we refund your current month in full and credit you the next month free. The guarantee is capped at the first 3 questionnaires per customer to prevent abuse from customers uploading malformed PDFs.' },
  { q: 'Can I switch tiers later?', a: 'Yes. You can upgrade or downgrade at any time from the Stripe customer portal. Upgrades take effect immediately; downgrades take effect at the next billing cycle. Annual subscribers can upgrade mid-year with prorated billing.' },
  { q: 'What happens if I exceed my monthly questionnaire limit?', a: 'We email you when you hit 80% of your limit. If you exceed the limit, we still process the questionnaires (we do not block your workflow) and automatically upgrade you to the next tier for the next billing cycle. You can also pre-upgrade from the portal.' },
  { q: 'Do you offer annual billing?', a: 'Yes. Annual billing gives you 2 months free (17% discount). Annual subscribers also get priority support and early access to new features. We offer annual because it locks in Claude API costs for 12 months and annual customers exhibit 92% Year-2 retention vs 71% for monthly.' },
  { q: 'What is the founding customer offer?', a: 'The first 100 paying customers lock in their pricing tier for life. We are at customer 24 today. When we hit 100, prices increase for new customers — but founding customers keep their rate forever, even as we add features. The price doubles to $198/mo (Pro) for customer 101+.' },
  { q: 'Is there a free trial?', a: 'No. We offer a 14-day paid pilot at $499 instead. Free trials attract tire-kickers who never convert; paid pilots filter for real buying intent. If we hit the success criteria during the pilot (90-minute first draft on 2 real questionnaires + security lead sign-off), you convert to Pro. If not, you walk away with the drafted responses.' },
  { q: 'What payment methods do you accept?', a: 'All major credit cards via Stripe (Visa, Mastercard, American Express, Discover). For Scale tier annual contracts, we can also accept ACH transfer or wire — contact us for invoicing.' },
  { q: 'Can I cancel anytime?', a: 'Yes. Cancel from the Stripe customer portal with one click. Monthly subscriptions cancel at the end of the current billing cycle. Annual subscriptions cancel at the end of the prepaid year (no prorated refund, but you keep access for the full year).' },
  { q: 'How does the answer library work?', a: 'Every questionnaire you process adds Q&A pairs to your private answer library. When a new questionnaire arrives, our RAG system retrieves the top 5 most similar past answers. Claude drafts a new answer grounded in those sources. By month 3, your library typically has 100+ entries and 90%+ of new questions find a match.' },
  { q: 'What happens to my data if I cancel?', a: 'You can export all your data (questionnaires, answers, answer library) in CSV format at any time from the dashboard. Upon account closure, we delete all Customer Data within 30 days. Backup snapshots are overwritten within 90 days. We provide a deletion certificate on request.' },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [questionnaires, setQuestionnaires] = useState(20);

  const monthlyCost = period === 'annual' ? 99 * 10 : 99 * 12;
  const annualSavings = 14 * questionnaires * 12 * 120;
  const roi = Math.round(annualSavings / monthlyCost);

  return (
    <div className='bg-[#0D0D0D]'>

      {/* ═══ HERO ═══ */}
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='absolute top-0 right-1/4 w-[800px] h-[600px] rounded-full blur-[120px] pointer-events-none' style={{ background: 'rgba(139,157,175,0.04)' }} />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Pricing</p></FadeIn>
          <FadeIn delay={0.1}>
            <h1 className='text-5xl md:text-7xl lg:text-[88px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Transparent<br />Pricing<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-4'>No hidden fees. No surprise invoices. No negotiated discounts.</p>
            <p className='text-[15px] text-[#999999] max-w-xl leading-[1.7]'>Pick the plan that matches your deal volume. First 100 customers lock founding pricing for life.</p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className='mt-8 inline-flex bg-[#1A1A1A] border border-white/[0.06] rounded-lg p-1'>
              <button onClick={() => setPeriod('monthly')} className={`px-5 py-2 rounded-md text-[12px] font-semibold transition-colors ${period === 'monthly' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}>Monthly</button>
              <button onClick={() => setPeriod('annual')} className={`px-5 py-2 rounded-md text-[12px] font-semibold transition-colors ${period === 'annual' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}>Annual <span className='text-[#8B9DAF]'>Save 17%</span></button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ TIER CARDS ═══ */}
      <section className='pb-28 md:pb-36 bg-[#0D0D0D]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {tiers.map((tier, i) => (
              <FadeIn key={tier.name} delay={i * 0.08}>
                <div className={`card p-8 h-full flex flex-col relative ${tier.highlight ? 'ring-1 ring-[rgba(139,157,175,0.3)]' : ''}`}>
                  {tier.badge && <span className='absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] font-bold bg-[rgba(139,157,175,0.15)] text-[#8B9DAF]'>{tier.badge}</span>}
                  <div className='mb-6'>
                    <h3 className='text-lg font-bold text-white mb-1'>{tier.name}</h3>
                    <div className='flex items-baseline gap-1 mb-2'>
                      <span className='text-4xl font-extrabold text-white'>${period === 'annual' ? Math.round(tier.price * 10 / 12) : tier.price}</span>
                      <span className='text-[14px] text-[#999999]'>{tier.priceDetail}</span>
                    </div>
                    {period === 'annual' && <p className='text-[11px] text-[#8B9DAF] mt-1'>${tier.price * 10}/year billed annually</p>}
                    <p className='text-[13px] text-[#666666] leading-[1.6] mt-2'>{tier.description}</p>
                  </div>
                  <div className='accent-line mb-6' />
                  <ul className='space-y-2.5 flex-1 mb-8'>
                    {tier.features.map((f, j) => (
                      <li key={j} className='flex items-start gap-3'>
                        {f.included ? <CheckCircle2 size={14} className='text-[#8B9DAF] mt-0.5 shrink-0' /> : <X size={14} className='text-[#333333] mt-0.5 shrink-0' />}
                        <span className={`text-[12px] ${f.included ? 'text-[#CCCCCC]' : 'text-[#444444]'}`}>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href='/pricing' className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-[13px] font-semibold transition-all ${tier.ctaStyle}`}>{tier.cta} <ArrowRight size={14} /></Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ COMPARISON TABLE ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Feature Comparison</p>
            <h2 className='text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4'>Compare all features<span className='text-[#8B9DAF]'>.</span></h2>
            <div className='accent-line mb-12' />
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className='card overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b border-white/[0.06]'>
                    <th className='text-left p-4 text-[10px] font-bold tracking-[0.15em] uppercase text-white/30'>Feature</th>
                    <th className='text-center p-4 text-[10px] font-bold tracking-[0.15em] uppercase text-white/30'>Starter</th>
                    <th className='text-center p-4 text-[10px] font-bold tracking-[0.15em] uppercase text-[#8B9DAF]'>Pro</th>
                    <th className='text-center p-4 text-[10px] font-bold tracking-[0.15em] uppercase text-white/30'>Scale</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row, i) => (
                    <motion.tr key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03, duration: 0.3 }} className='border-b border-white/[0.03] hover:bg-white/[0.01] transition-colors'>
                      <td className='p-4 text-[13px] text-white/80'>{row.feature}</td>
                      <td className='p-4 text-center text-[13px] text-[#999999]'>
                        {typeof row.starter === 'boolean' ? (row.starter ? <CheckCircle2 size={14} className='text-[#8B9DAF] inline' /> : <X size={14} className='text-[#333333] inline' />) : row.starter}
                      </td>
                      <td className='p-4 text-center text-[13px] text-[#CCCCCC] bg-[rgba(139,157,175,0.03)]'>
                        {typeof row.pro === 'boolean' ? (row.pro ? <CheckCircle2 size={14} className='text-[#8B9DAF] inline' /> : <X size={14} className='text-[#333333] inline' />) : row.pro}
                      </td>
                      <td className='p-4 text-center text-[13px] text-[#999999]'>
                        {typeof row.scale === 'boolean' ? (row.scale ? <CheckCircle2 size={14} className='text-[#8B9DAF] inline' /> : <X size={14} className='text-[#333333] inline' />) : row.scale}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ ROI CALCULATOR ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>ROI Calculator</p>
            <h2 className='text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4'>Estimate your savings<span className='text-[#8B9DAF]'>.</span></h2>
            <div className='accent-line mb-6' />
            <p className='max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12'>Drag the slider to match your questionnaire volume. See exactly how much you save with SecQA Pro.</p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className='card p-8 md:p-12'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
                <div>
                  <label className='block text-[12px] font-bold tracking-[0.15em] uppercase text-white/40 mb-4'>Questionnaires per year</label>
                  <input type='range' min='5' max='100' value={questionnaires} onChange={(e) => setQuestionnaires(parseInt(e.target.value))} className='w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#8B9DAF]' />
                  <div className='flex justify-between mt-2 text-[10px] text-white/30'>
                    <span>5</span><span>25</span><span>50</span><span>75</span><span>100</span>
                  </div>
                  <p className='text-4xl font-extrabold text-white mt-6'>{questionnaires}<span className='text-[16px] text-white/40 ml-2'>questionnaires/yr</span></p>
                </div>
                <div className='space-y-6'>
                  <div>
                    <p className='text-[11px] font-bold tracking-[0.15em] uppercase text-white/30 mb-1'>Without SecQA</p>
                    <p className='text-3xl font-extrabold text-[#A0524B]'>${annualSavings.toLocaleString()}</p>
                    <p className='text-[11px] text-white/30 mt-1'>14h × {questionnaires} × $120/hr</p>
                  </div>
                  <div>
                    <p className='text-[11px] font-bold tracking-[0.15em] uppercase text-white/30 mb-1'>With SecQA Pro ({period === 'annual' ? 'annual' : 'monthly'})</p>
                    <p className='text-3xl font-extrabold text-white'>${monthlyCost.toLocaleString()}</p>
                    <p className='text-[11px] text-white/30 mt-1'>$99/mo × {period === 'annual' ? '10 (annual)' : '12 (monthly)'}</p>
                  </div>
                  <div className='pt-4 border-t border-white/[0.06]'>
                    <p className='text-[11px] font-bold tracking-[0.15em] uppercase text-white/30 mb-1'>Net ROI</p>
                    <p className='text-4xl font-extrabold text-[#8B9DAF]'>{roi}x</p>
                    <p className='text-[11px] text-white/30 mt-1'>${(annualSavings - monthlyCost).toLocaleString()} net annual savings</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ COST OPTIMIZATION ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Cost Optimization</p>
            <h2 className='text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4'>Maximize your savings<span className='text-[#8B9DAF]'>.</span></h2>
            <div className='accent-line mb-12' />
          </FadeIn>
          <StaggerContainer className='grid grid-cols-1 md:grid-cols-2 gap-6' staggerDelay={0.1}>
            {costOptimizationTips.map((tip) => (
              <StaggerItem key={tip.title}>
                <div className='card p-8 h-full'>
                  <div className='w-12 h-12 flex items-center justify-center rounded-lg bg-[rgba(139,157,175,0.1)] border border-[rgba(139,157,175,0.15)] mb-4'>
                    <tip.icon size={22} className='text-[#8B9DAF]' strokeWidth={1.5} />
                  </div>
                  <h3 className='text-[18px] font-bold text-white mb-2'>{tip.title}</h3>
                  <p className='text-[13px] text-[#999999] leading-relaxed'>{tip.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ FAQ ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[900px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>FAQ</p>
            <h2 className='text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4'>Pricing FAQ<span className='text-[#8B9DAF]'>.</span></h2>
            <div className='accent-line mb-12' />
          </FadeIn>
          <div className='space-y-3'>
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div className='card overflow-hidden'>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className='w-full flex items-center justify-between p-6 text-left'>
                    <h3 className='text-[14px] font-semibold text-white pr-4'>{faq.q}</h3>
                    <ChevronDown size={16} className={`text-white/40 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }} className='overflow-hidden'>
                        <div className='px-6 pb-6'><p className='text-[13px] text-[#999999] leading-[1.7]'>{faq.a}</p></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ CTA ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[800px] mx-auto px-6 md:px-12 text-center'>
          <FadeIn>
            <Clock size={40} className='text-[#8B9DAF] mx-auto mb-6' strokeWidth={1.5} />
            <TextReveal text='Still have questions?' className='text-3xl md:text-4xl font-bold text-white tracking-tight mb-4' />
            <p className='text-lg text-white/50 max-w-xl mx-auto mb-8 leading-relaxed'>Book a 15-minute call. We&apos;ll process your last questionnaire live as a demo.</p>
            <div className='flex flex-wrap items-center justify-center gap-4'>
              <Link href='/contact' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>Talk to the founder <ArrowRight size={14} /></Link>
              <Link href='/demo' className='inline-flex items-center gap-2.5 border border-white/[0.12] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all'>Watch demo</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
