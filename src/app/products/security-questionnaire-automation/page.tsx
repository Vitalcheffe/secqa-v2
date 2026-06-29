'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem, SectionDivider, TextReveal } from '@/components/ui/motion';
import { ArrowRight, Brain, FileText, Shield, Zap, BarChart3, Lock, CheckCircle2, ChevronDown, Clock, Users, RefreshCw, Download, GitBranch } from 'lucide-react';

const FEATURES = [
  { icon: Zap, title: '90-minute first draft', desc: 'Upload a 200-question CAIQ. Get a 90%-complete first draft in 90 minutes — answers cited back to your SOC 2, pen test, and internal wiki pages.' },
  { icon: Brain, title: 'AI retrieval-augmented generation', desc: 'SecQA retrieves the right answer for every question from your trusted source documents. No hallucinations — every answer links to its source.' },
  { icon: FileText, title: '30+ format parser', desc: 'CAIQ, SIG, Excel, Word, PDF, Google Docs, VSAQ, Plain-text email. Drag-and-drop any format — SecQA parses questions and exports to your customer\u2019s required template.' },
  { icon: Users, title: 'Multi-reviewer workflow', desc: 'Route security questions to the security team, legal to legal, infra to engineering. Per-team SLAs, threaded comments, and parallel review keep things moving fast.' },
  { icon: GitBranch, title: 'Branching drafts', desc: 'Spin up variant drafts for different prospect tiers (enterprise vs SMB) from a single source. Merge approved answers back into the canonical answer library.' },
  { icon: Download, title: 'One-click export', desc: 'Export to the exact template your prospect sent. SecQA preserves formatting, cell references, and conditional logic. No more 4-hour copy-paste sessions.' },
];

const HOW_IT_WORKS = [
  {
    title: 'Upload the questionnaire',
    desc: 'Drag-and-drop any format (XLSX, DOCX, PDF, CAIQ, SIG). SecQA parses every question, detects the framework (SOC 2, ISO 27001, HIPAA, PCI), and categorizes by domain (security, legal, infra, product).',
  },
  {
    title: 'AI drafts answers in 90 minutes',
    desc: 'SecQA retrieves relevant answers from your trusted source documents — SOC 2 report, pen test summary, internal wiki, approved past answers. Each answer is cited back to its source. Confidence score per answer.',
  },
  {
    title: 'Reviewers edit and approve',
    desc: 'SecQA routes the draft to assigned reviewers by category. Reviewers edit inline, leave threaded comments, and approve or request changes. SLA alerts via Slack when review stalls.',
  },
  {
    title: 'Export to your customer\u2019s format',
    desc: 'One click exports approved answers to the exact template the prospect sent. Formatting, cell references, and conditional logic preserved. Attach to HubSpot deal, sync to Snowflake, send via Resend.',
  },
];

const USE_CASES = [
  {
    title: 'Enterprise sales: 200-question CAIQ in 90 minutes',
    desc: 'A Fortune 500 prospect sends a 200-question CAIQ at 9 AM Monday. Sales needs the response by EOD Wednesday. SecQA drafts 90% in 90 minutes, reviewers approve in 4 hours, response ships Tuesday afternoon. Deal closes Friday.',
  },
  {
    title: 'Vendor risk: 30 vendors in parallel',
    desc: 'Your procurement team requires a 50-question security questionnaire from every new vendor. 30 vendors in onboarding at any time. SecQA ingests all 30 in one batch, sends each vendor a draft to fill, and consolidates the responses for risk scoring.',
  },
  {
    title: 'RFP response: 80-page proposal with security section',
    desc: 'A government RFP requires an 80-page response with a 15-page security section. SecQA parses the RFP, drafts the security section from your compliance evidence, and exports to the government\u2019s required Word template with section numbering.',
  },
];

const INTEGRATIONS = [
  { slug: 'hubspot', name: 'HubSpot', emoji: '📊' },
  { slug: 'slack', name: 'Slack', emoji: '💬' },
  { slug: 'notion', name: 'Notion', emoji: '📝' },
  { slug: 'linear', name: 'Linear', emoji: '📋' },
  { slug: 'snowflake', name: 'Snowflake', emoji: '❄️' },
  { slug: 'resend', name: 'Resend', emoji: '📧' },
];

const FAQS = [
  {
    q: 'What does the 90%-complete-first-draft guarantee mean?',
    a: 'If your first-draft completeness is below 90%, SecQA refunds the per-questionnaire fee for that draft. Completeness is measured as the percentage of questions with a confident, cited answer. The guarantee applies to all standard frameworks (CAIQ, SIG, ISO 27001, SOC 2).',
  },
  {
    q: 'Which file formats does SecQA parse?',
    a: 'XLSX, XLS, DOCX, DOC, PDF, Google Docs (via export), CAIQ v4, SIG-Lite, VSAQ, plain-text email, and ODT. For Google Docs, export to DOCX or PDF first. Custom or proprietary formats are added on request — typically within 2 weeks.',
  },
  {
    q: 'How does SecQA handle questions it cannot answer confidently?',
    a: 'Questions with confidence below 60% are flagged as "needs review" with the AI\u2019s best-effort draft and 3 candidate source documents. Reviewer sees the draft, the candidate sources, and any related historical answers. This is by design — SecQA never hallucinates an answer.',
  },
  {
    q: 'Can I use SecQA for non-security questionnaires (RFP, RFI, security addenda)?',
    a: 'Yes. While SecQA is tuned for security questionnaires, the same workflow handles RFPs, RFIs, technical due diligence questionnaires, security addenda, and DPA questionnaires. The AI retrieves answers from whatever source documents you connect.',
  },
  {
    q: 'How does pricing work?',
    a: '$99/mo base per workspace (unlimited users) + $49 per questionnaire for AI drafting. 14-day paid pilot at $499 (includes 3 questionnaires). Annual plans get 2 months free. No per-seat pricing — we charge for value (questionnaires drafted), not for headcount.',
  },
];

export default function ProductPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Product</p></FadeIn>
          <FadeIn delay={0.1}>
            <h1 className='text-5xl md:text-7xl lg:text-[88px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Security Questionnaire Automation<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-8'>
              Upload any questionnaire. Get a 90%-complete first draft in 90 minutes. Reviewers edit and approve. Export to your customer\u2019s format. Ship in hours, not weeks.
            </p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Start your 14-day pilot <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>

      <SectionDivider className='max-w-[1400px]' />

      <section className='py-16 md:py-24 bg-[#0D0D0D]'>
        <div className='max-w-[1200px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Features</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>What you get</h2>
            </div>
          </FadeIn>
          <StaggerContainer className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' staggerDelay={0.07}>
            {FEATURES.map((f) => (
              <StaggerItem key={f.title}>
                <div className='card p-6 h-full'>
                  <div className='w-10 h-10 rounded-lg bg-[rgba(139,157,175,0.1)] border border-[rgba(139,157,175,0.15)] flex items-center justify-center mb-4'>
                    <f.icon size={18} className='text-[#8B9DAF]' />
                  </div>
                  <h3 className='text-[15px] font-bold text-white mb-2'>{f.title}</h3>
                  <p className='text-[13px] text-[#999999] leading-relaxed'>{f.desc}</p>
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
              <p className='section-label mb-4'>How it works</p>
              <TextReveal text='From upload to export in 90 minutes' className='text-3xl md:text-4xl font-bold text-white tracking-tight' />
            </div>
          </FadeIn>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {HOW_IT_WORKS.map((step, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className='card p-6 h-full'>
                  <div className='flex items-start gap-4 mb-3'>
                    <span className='w-9 h-9 flex items-center justify-center rounded-full bg-[#8B9DAF] text-black text-[14px] font-extrabold shrink-0'>{i + 1}</span>
                    <h3 className='text-[16px] font-bold text-white pt-1'>{step.title}</h3>
                  </div>
                  <p className='text-[13px] text-[#999999] leading-[1.7] pl-13'>{step.desc}</p>
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
              <p className='section-label mb-4'>Use cases</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Built for every questionnaire workflow</h2>
            </div>
          </FadeIn>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {USE_CASES.map((uc, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className='card p-6 h-full'>
                  <div className='text-[11px] uppercase tracking-wider text-[#8B9DAF] mb-3 font-semibold'>Scenario {i + 1}</div>
                  <h3 className='text-[15px] font-bold text-white mb-3'>{uc.title}</h3>
                  <p className='text-[13px] text-[#999999] leading-relaxed'>{uc.desc}</p>
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
              <p className='section-label mb-4'>Integrations</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Plugs into your stack</h2>
              <p className='text-[14px] text-[#999999] mt-3'>SecQA plays nice with the tools your team already lives in.</p>
            </div>
          </FadeIn>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
            {INTEGRATIONS.map((r, i) => (
              <FadeIn key={r.slug} delay={i * 0.05}>
                <Link href={`/integrations/${r.slug}`} className='card p-4 flex flex-col items-center text-center hover:bg-[rgba(255,255,255,0.02)] transition-colors group'>
                  <span className='text-2xl mb-2'>{r.emoji}</span>
                  <p className='text-[13px] font-bold text-white group-hover:text-[#8B9DAF] transition-colors'>{r.name}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className='py-16 md:py-24 bg-[#0D0D0D]'>
        <div className='max-w-[1000px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Pricing</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Pay for value, not seats</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className='card p-8'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div>
                  <div className='text-[11px] uppercase tracking-wider text-[#8B9DAF] mb-2 font-semibold'>Base</div>
                  <div className='text-3xl font-extrabold text-white mb-1'>$99<span className='text-[15px] text-[#999999] font-medium'>/mo</span></div>
                  <p className='text-[13px] text-[#999999]'>Per workspace. Unlimited users, unlimited questionnaires uploaded.</p>
                </div>
                <div>
                  <div className='text-[11px] uppercase tracking-wider text-[#8B9DAF] mb-2 font-semibold'>Per questionnaire</div>
                  <div className='text-3xl font-extrabold text-white mb-1'>$49<span className='text-[15px] text-[#999999] font-medium'>/draft</span></div>
                  <p className='text-[13px] text-[#999999]'>AI drafting, multi-reviewer workflow, and one-click export. 90%-complete guarantee.</p>
                </div>
                <div>
                  <div className='text-[11px] uppercase tracking-wider text-[#8B9DAF] mb-2 font-semibold'>Pilot</div>
                  <div className='text-3xl font-extrabold text-white mb-1'>$499<span className='text-[15px] text-[#999999] font-medium'>/14 days</span></div>
                  <p className='text-[13px] text-[#999999]'>Includes 3 questionnaires. Annual plans get 2 months free.</p>
                </div>
              </div>
              <div className='mt-6 pt-6 border-t border-[rgba(255,255,255,0.06)] flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <p className='text-[13px] text-[#999999]'>No per-seat pricing. No procurement calls. Cancel anytime.</p>
                <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-5 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-white/90 transition-colors self-start'>
                  See full pricing <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className='py-16 md:py-24 bg-[#111111]'>
        <div className='max-w-[900px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>FAQ</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Questions, answered</h2>
            </div>
          </FadeIn>
          <div className='space-y-3'>
            {FAQS.map((f, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className='card overflow-hidden'>
                  <button
                    type='button'
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className='w-full flex items-center justify-between gap-3 p-6 text-left hover:bg-[rgba(255,255,255,0.02)] transition-colors'
                    aria-expanded={openFaq === i}
                  >
                    <div className='flex items-start gap-3'>
                      <CheckCircle2 size={18} className='text-[#8B9DAF] mt-0.5 shrink-0' />
                      <h3 className='text-[15px] font-bold text-white'>{f.q}</h3>
                    </div>
                    <ChevronDown size={18} className={`text-[#999999] shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className='px-6 pb-6 pl-13'>
                      <p className='text-[13px] text-[#999999] leading-[1.7] pl-7'>{f.a}</p>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className='py-20 md:py-28 bg-[#0D0D0D]'>
        <div className='max-w-[900px] mx-auto px-6 md:px-12 text-center'>
          <FadeIn>
            <h2 className='text-3xl md:text-5xl font-bold text-white tracking-tight mb-4'>Ready to ship questionnaires in 90 minutes?</h2>
            <p className='text-lg text-white/50 mb-8'>14-day paid pilot at $499. Includes 3 questionnaires. Cancel anytime.</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Start your pilot <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
