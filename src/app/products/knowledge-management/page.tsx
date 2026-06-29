'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem, SectionDivider, TextReveal } from '@/components/ui/motion';
import { ArrowRight, Brain, FileText, Shield, Zap, BarChart3, Lock, CheckCircle2, ChevronDown, Database, Search, RefreshCw, GitBranch, Users } from 'lucide-react';

const FEATURES = [
  { icon: Database, title: 'Unified knowledge base', desc: 'Connect Notion, Confluence, Google Drive, Slack, GitHub, internal wikis. SecQA ingests every page, indexes it with embeddings, and uses it as retrieval context for AI answers.' },
  { icon: Search, title: 'Semantic search across everything', desc: 'Find any answer in seconds with full-text and vector search across your entire knowledge base. Results cited back to source page with relevance score.' },
  { icon: Brain, title: 'RAG-powered answer retrieval', desc: 'SecQA uses retrieval-augmented generation to find the right answer for every question. No hallucinations — every AI-drafted answer links to its source document.' },
  { icon: RefreshCw, title: 'Auto-reindex on edit', desc: 'Source documents change? SecQA reindexes within 60 seconds via webhook. No stale answers — your knowledge base is always current.' },
  { icon: GitBranch, title: 'Versioned answer library', desc: 'Every approved answer is versioned. See who approved what, when, and why. Roll back to any prior version. Diff between versions to track changes over time.' },
  { icon: Users, title: 'Per-source access control', desc: 'SecQA only sees what you grant. Restrict access to specific Notion databases, Confluence spaces, or Google Drive folders. Sensitive docs never leak into questionnaire drafts.' },
];

const HOW_IT_WORKS = [
  {
    title: 'Connect your source documents',
    desc: 'One-click integrations with Notion, Confluence, Google Drive, Slack, GitHub, and more. SecQA ingests every page, indexes with embeddings, and runs access-control checks.',
  },
  {
    title: 'AI retrieves answers on demand',
    desc: 'When a questionnaire question arrives, SecQA runs a semantic search across your knowledge base, retrieves the top-k relevant passages, and generates a cited answer draft.',
  },
  {
    title: 'Reviewers approve and version',
    desc: 'Reviewers edit the AI draft, link to additional sources, and approve. Approved answers are versioned in your answer library — searchable, filterable, and reusable on future questionnaires.',
  },
  {
    title: 'Answer library grows with every questionnaire',
    desc: 'Every approved answer feeds back into the knowledge base. Next time the same question appears, SecQA retrieves the previously-approved answer first. ROI compounds over time.',
  },
];

const USE_CASES = [
  {
    title: 'Security wiki auto-feeds questionnaire answers',
    desc: 'Your security team maintains a 200-page Notion wiki covering encryption, access controls, and incident response. SecQA ingests it nightly. Every security question on every questionnaire pulls answers from the wiki with citation links.',
  },
  {
    title: 'Approved answers become a searchable library',
    desc: 'Every approved questionnaire response is auto-versioned in your answer library. Your team gets a searchable, filterable, taggable Q&A database that grows with every questionnaire — no manual curation, no stale wiki pages.',
  },
  {
    title: 'Compliance evidence stays current across sources',
    desc: 'When legal updates a policy in Notion, SecQA reindexes within 60 seconds via webhook. The next questionnaire draft uses the updated policy — no stale answers, no version-mismatch risk. Trust Center updates automatically too.',
  },
];

const INTEGRATIONS = [
  { slug: 'notion', name: 'Notion', emoji: '📝' },
  { slug: 'google-workspace', name: 'Google Workspace', emoji: '📧' },
  { slug: 'slack', name: 'Slack', emoji: '💬' },
  { slug: 'github', name: 'GitHub', emoji: '🐙' },
  { slug: 'snowflake', name: 'Snowflake', emoji: '❄️' },
  { slug: 'postgres', name: 'PostgreSQL', emoji: '🐘' },
];

const FAQS = [
  {
    q: 'What is RAG and why does it matter for questionnaire answers?',
    a: 'RAG (Retrieval-Augmented Generation) is an AI technique where the model retrieves relevant passages from your source documents before generating an answer. This eliminates hallucinations — every answer is grounded in real evidence you control. SecQA shows the source citation for every sentence in every AI-drafted answer.',
  },
  {
    q: 'How often does SecQA reindex my knowledge base?',
    a: 'Default is nightly (3 AM local time). Webhook-driven updates run within 60 seconds of any page edit if you enable them. Hourly and weekly options are also available — choose based on how often your wiki changes. Manual reindex is one click in the dashboard.',
  },
  {
    q: 'Does SecQA see all my Notion / Confluence / Google Drive content?',
    a: 'No. SecQA only sees the pages and databases you explicitly share. For Notion, use the Connections menu per page. For Confluence, use space-level permissions. For Google Drive, use folder-level sharing. Sensitive docs never leak into questionnaire drafts.',
  },
  {
    q: 'How does the answer library grow over time?',
    desc: 'Every approved questionnaire answer is versioned and indexed in your answer library. When the same question appears on a future questionnaire, SecQA retrieves the previously-approved answer first. The library compounds ROI — the more you use SecQA, the faster future questionnaires get drafted.',
    a: 'Every approved questionnaire answer is versioned and indexed in your answer library. When the same question appears on a future questionnaire, SecQA retrieves the previously-approved answer first. The library compounds ROI — the more you use SecQA, the faster future questionnaires get drafted.',
  },
  {
    q: 'Can I export my answer library if I cancel?',
    a: 'Yes — full export as JSON, CSV, and Markdown. Every answer includes the question text, approved answer, citations, reviewer, approval date, and version history. Your knowledge base is yours — no lock-in.',
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
              Knowledge Management<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-8'>
              One source of truth for every compliance answer. RAG-powered retrieval across Notion, Confluence, Google Drive, and more. Every answer cited back to source. No hallucinations, ever.
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
              <TextReveal text='Connect sources, retrieve answers, ship in minutes' className='text-3xl md:text-4xl font-bold text-white tracking-tight' />
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
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Plugs into your knowledge sources</h2>
              <p className='text-[14px] text-[#999999] mt-3'>One-click connections to the wikis, drives, and chat tools your team already uses.</p>
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
                  <p className='text-[13px] text-[#999999]'>Unlimited source connections. Unlimited reindexing. Unlimited answer library entries.</p>
                </div>
                <div>
                  <div className='text-[11px] uppercase tracking-wider text-[#8B9DAF] mb-2 font-semibold'>Per questionnaire</div>
                  <div className='text-3xl font-extrabold text-white mb-1'>$49<span className='text-[15px] text-[#999999] font-medium'>/draft</span></div>
                  <p className='text-[13px] text-[#999999]'>AI retrieval + drafting. Includes semantic search, citation, and versioning. 90%-complete guarantee.</p>
                </div>
                <div>
                  <div className='text-[11px] uppercase tracking-wider text-[#8B9DAF] mb-2 font-semibold'>Pilot</div>
                  <div className='text-3xl font-extrabold text-white mb-1'>$499<span className='text-[15px] text-[#999999] font-medium'>/14 days</span></div>
                  <p className='text-[13px] text-[#999999]'>Includes 3 questionnaires and full knowledge management access. Cancel anytime.</p>
                </div>
              </div>
              <div className='mt-6 pt-6 border-t border-[rgba(255,255,255,0.06)] flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <p className='text-[13px] text-[#999999]'>No per-source pricing. No per-document pricing. Export your answer library anytime.</p>
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
            <h2 className='text-3xl md:text-5xl font-bold text-white tracking-tight mb-4'>Ready to unify your compliance knowledge?</h2>
            <p className='text-lg text-white/50 mb-8'>14-day paid pilot at $499. Connect your sources in under 20 minutes.</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Start your pilot <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
