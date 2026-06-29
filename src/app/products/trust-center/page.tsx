'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem, SectionDivider, TextReveal } from '@/components/ui/motion';
import { ArrowRight, Brain, FileText, Shield, Zap, BarChart3, Lock, CheckCircle2, ChevronDown, Users, Globe, RefreshCw, Eye, Download } from 'lucide-react';

const FEATURES = [
  { icon: Globe, title: 'Branded trust portal', desc: 'A public-facing trust portal on your subdomain (trust.yourcompany.com). Custom logo, colors, and copy. No-code editor — change copy in seconds, no engineering required.' },
  { icon: FileText, title: 'Document vault', desc: 'Publish SOC 2, ISO 27001, pen test, policies, sub-processor lists. NDA-gated access, signed URLs, download tracking, and auto-expiring links.' },
  { icon: Lock, title: 'NDA gate', desc: 'Prospects request access with a one-click NDA. SecQA generates a DocuSign-style NDA, tracks signature, and grants access on completion. No manual NDA back-and-forth.' },
  { icon: BarChart3, title: 'Visitor analytics', desc: 'See who visits your trust portal, which docs they download, and how long they spend on each page. Sales gets Slack alerts when a named prospect visits.' },
  { icon: RefreshCw, title: 'Auto-update from SecQA', desc: 'When you approve a new answer or upload a new compliance doc in SecQA, the Trust Center updates automatically. Always current — no manual maintenance.' },
  { icon: Eye, title: 'Public Q&A library', desc: 'Publish approved Q&A pairs as a searchable public FAQ. Prospects find answers before they send the 200-question CAIQ. Reduces inbound questionnaire volume by up to 60%.' },
];

const HOW_IT_WORKS = [
  {
    title: 'Connect your compliance evidence',
    desc: 'Upload SOC 2 report, pen test summary, ISO 27001 certificate, and key policies. SecQA indexes every document for search and gates access behind NDA.',
  },
  {
    title: 'Customize your portal',
    desc: 'Pick a subdomain (trust.yourcompany.com), upload your logo, choose brand colors, and write your headline copy. No-code editor — go live in under an hour.',
  },
  {
    title: 'Prospects self-serve',
    desc: 'Prospects visit your portal, sign a one-click NDA, and download docs. They search the public Q&A library. They subscribe to updates. No sales bottleneck.',
  },
  {
    title: 'Sales gets notified',
    desc: 'When a prospect from a target account visits, downloads, or searches, your sales team gets a Slack alert. Reach out at the right moment — when intent is highest.',
  },
];

const USE_CASES = [
  {
    title: 'Reduce inbound CAIQ volume by 60%',
    desc: 'A SaaS company publishes their 50 most-asked security questions as a public Q&A library. Prospects find answers without sending the full CAIQ. Inbound CAIQ volume drops 60% in 90 days. Sales cycle shortens by 11 days on average.',
  },
  {
    title: 'Enterprise prospect self-serves during evaluation',
    desc: 'A Fortune 100 prospect is evaluating your product. Their security team visits your Trust Center, downloads the SOC 2 report, reads the pen test summary, and signs the DPA — all without a single email to your sales team. Procurement sign-off in 5 days instead of 3 weeks.',
  },
  {
    title: 'Compliance team keeps docs current without engineering',
    desc: 'A new SOC 2 report drops. Your compliance manager uploads it to SecQA. The Trust Center updates automatically within 5 seconds. Subscribers get a branded notification email via Resend. Zero engineering tickets, zero deploy delays.',
  },
];

const INTEGRATIONS = [
  { slug: 'hubspot', name: 'HubSpot', emoji: '📊' },
  { slug: 'resend', name: 'Resend', emoji: '📧' },
  { slug: 'mailchimp', name: 'Mailchimp', emoji: '🐵' },
  { slug: 'slack', name: 'Slack', emoji: '💬' },
  { slug: 'snowflake', name: 'Snowflake', emoji: '❄️' },
  { slug: 'clerk', name: 'Clerk', emoji: '🔐' },
];

const FAQS = [
  {
    q: 'How long does it take to launch a Trust Center?',
    a: 'Under one hour. Pick a subdomain, upload your logo, choose brand colors, write your headline copy, upload your SOC 2 report and pen test summary. Your portal is live on trust.yourcompany.com. DNS propagation adds 5-30 minutes for the subdomain.',
  },
  {
    q: 'Can I gate sensitive documents behind an NDA?',
    a: 'Yes. Each document can be public, email-gated, or NDA-gated. NDA-gated docs require a one-click NDA signature before download. SecQA generates the NDA, tracks signature, and grants access automatically. You get a signature audit log exportable as CSV.',
  },
  {
    q: 'How does the visitor analytics work?',
    a: 'SecQA tracks every visitor by IP, company (via reverse DNS), and session. Named-account visitors (matched to your CRM) trigger a Slack alert to the account owner. Anonymous visitors see aggregate analytics in your dashboard. GDPR-compliant — visitor tracking is opt-out via cookie banner.',
  },
  {
    q: 'Can I host the Trust Center on my own domain?',
    a: 'Yes. Use a subdomain of your main domain (trust.yourcompany.com) for SEO and brand consistency. CNAME it to trust.secqa.com — DNS takes 5 minutes. For apex domain hosting, contact us — we support Cloudflare and AWS Route 53 setups.',
  },
  {
    q: 'How does the Trust Center reduce inbound questionnaires?',
    a: 'Most security questionnaires ask the same 50-100 questions. Publish those as a public Q&A library on your Trust Center. Prospects find answers via Google and your portal search — no need to send the full CAIQ. Typical reduction: 50-70% inbound questionnaire volume within 90 days.',
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
              Trust Center<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-8'>
              Reduce inbound questionnaires by 60%. Give prospects a self-serve trust portal before they send the 200-question CAIQ. Branded, NDA-gated, and always current.
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
              <TextReveal text='From upload to live in under an hour' className='text-3xl md:text-4xl font-bold text-white tracking-tight' />
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
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>How teams use it</h2>
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
              <p className='text-[14px] text-[#999999] mt-3'>Trust Center plays nice with the tools your sales and compliance teams already use.</p>
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
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Included in every plan</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className='card p-8'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div>
                  <div className='text-[11px] uppercase tracking-wider text-[#8B9DAF] mb-2 font-semibold'>Base</div>
                  <div className='text-3xl font-extrabold text-white mb-1'>$99<span className='text-[15px] text-[#999999] font-medium'>/mo</span></div>
                  <p className='text-[13px] text-[#999999]'>Trust Center included. Unlimited visitors, unlimited documents, unlimited Q&A pairs.</p>
                </div>
                <div>
                  <div className='text-[11px] uppercase tracking-wider text-[#8B9DAF] mb-2 font-semibold'>Custom domain</div>
                  <div className='text-3xl font-extrabold text-white mb-1'>$0<span className='text-[15px] text-[#999999] font-medium'>/included</span></div>
                  <p className='text-[13px] text-[#999999]'>Use your subdomain (trust.yourcompany.com). CNAME to trust.secqa.com. DNS in 5 minutes.</p>
                </div>
                <div>
                  <div className='text-[11px] uppercase tracking-wider text-[#8B9DAF] mb-2 font-semibold'>Pilot</div>
                  <div className='text-3xl font-extrabold text-white mb-1'>$499<span className='text-[15px] text-[#999999] font-medium'>/14 days</span></div>
                  <p className='text-[13px] text-[#999999]'>Includes 3 questionnaires and full Trust Center access. Cancel anytime.</p>
                </div>
              </div>
              <div className='mt-6 pt-6 border-t border-[rgba(255,255,255,0.06)] flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <p className='text-[13px] text-[#999999]'>No per-visitor pricing. No per-document pricing. No hidden fees.</p>
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
            <h2 className='text-3xl md:text-5xl font-bold text-white tracking-tight mb-4'>Ready to reduce inbound questionnaires by 60%?</h2>
            <p className='text-lg text-white/50 mb-8'>14-day paid pilot at $499. Trust Center live in under an hour.</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Start your pilot <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
