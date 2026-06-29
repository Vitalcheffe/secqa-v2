'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem, CountUp, SectionDivider, Card3D } from '@/components/ui/motion';
import {
  GitBranch,
  Tag,
  AlertTriangle,
  Zap,
  ArrowRight,
  Wrench,
  Flag,
  Calendar,
  CheckCircle2,
  Code2,
  Rocket,
  Download,
  ExternalLink,
  GitCommit,
} from 'lucide-react';

const STATS = [
  { value: 5, label: 'Major releases', desc: 'From v1.0.0 to v2.0.0' },
  { value: 265, label: 'Passing tests', desc: 'Across 30 test files' },
  { value: 74, label: 'Pages shipped', desc: 'Marketing + dashboard' },
  { value: 25, label: 'API routes', desc: 'All documented' },
];

const UPDATES = [
  {
    date: '2026-06-29',
    version: 'v2.0.0',
    type: 'major',
    title: 'SecQA v2.0 — full redesign',
    summary: 'HarchCorp dark monochromatic design system. Next.js 16, React 19, Tailwind 4. 74 pages, 25 API routes, 265 tests.',
    items: [
      'New 4-color palette — #0A0A0A bg, #8B9DAF accent, white text',
      'Rebuilt on Next.js 16 + React 19 + Tailwind CSS 4',
      '74 pages, 25 API routes, 30 test files, 265 tests',
      'All marketing pages redesigned with Framer Motion animations',
      'New comparison pages: vs Vanta, Conveyor, Drata, Secureframe, Loopio',
    ],
    breaking: ['Color tokens renamed (bg-primary → bg-background)', 'Removed legacy inline-style nav'],
    migration: 'Run `bun run lint:fix` to auto-migrate class names. Manual review for custom color usage.',
    flag: 'redesign_v2',
  },
  {
    date: '2026-06-28',
    version: 'v1.3.0',
    type: 'fix',
    title: 'Vercel build stability',
    summary: 'Fixed Sentry v8 API issues and lazy-loaded pdf-parse to remove test-file side effects.',
    items: [
      'Fixed Sentry v8 API: tracesPropagationTargets typo',
      'Removed non-existent Sentry integrations from config',
      'Lazy-load pdf-parse to avoid test-file side effect',
      'Added postinstall: prisma generate',
    ],
    breaking: [],
    migration: 'No action required.',
    flag: null,
  },
  {
    date: '2026-06-28',
    version: 'v1.2.0',
    type: 'feature',
    title: 'Launch infrastructure',
    summary: 'Stripe billing with webhook verification, Sentry monitoring across client/server/edge, and production-ready Vercel deployment.',
    items: [
      'Stripe billing: checkout, webhook signature verification, customer portal',
      'Sentry monitoring: client, server, and edge configurations',
      'Vercel deployment config with security headers',
      'Pricing tiers: Starter $49, Pro $99, Scale $299',
    ],
    breaking: [],
    migration: 'Set STRIPE_SECRET_KEY and SENTRY_DSN in your .env.local',
    flag: 'billing_stripe',
  },
  {
    date: '2026-06-28',
    version: 'v1.1.0',
    type: 'feature',
    title: 'MVP core',
    summary: 'The five API routes that make SecQA work: parse, generate, cite, export, integrate. Claude 3.5 Haiku integration with RAG.',
    items: [
      '5 API routes: parse, generate, cite, export, integrate',
      'Claude 3.5 Haiku integration with zero data retention',
      'RAG module with hash-based embedding over answer library',
      'Prisma schema with 7 models, fully typed',
      '26 passing tests across parser, RAG, and API routes',
    ],
    breaking: [],
    migration: 'Run `bun run db:push` to apply the Prisma schema',
    flag: 'rag_v1',
  },
  {
    date: '2026-06-27',
    version: 'v1.0.0',
    type: 'major',
    title: 'Initial MVP',
    summary: 'The first working version. Next.js 14 + TypeScript + Tailwind + Prisma. 5 frontend pages, demo mode without API key.',
    items: [
      'Next.js 14 + TypeScript + Tailwind + Prisma setup',
      '5 frontend pages with basic styling',
      'Slack + Notion webhook integrations',
      'Demo mode (works without Anthropic API key)',
      'First commit: June 27, 2026, 14:32 UTC',
    ],
    breaking: [],
    migration: 'N/A — initial release',
    flag: null,
  },
];

const FEATURE_FLAGS = [
  { name: 'redesign_v2', status: 'GA', rollout: '100%', desc: 'HarchCorp dark design system, all pages' },
  { name: 'billing_stripe', status: 'GA', rollout: '100%', desc: 'Stripe checkout + customer portal' },
  { name: 'rag_v1', status: 'GA', rollout: '100%', desc: 'Hash-based RAG over answer library' },
  { name: 'salesforce_sync', status: 'Beta', rollout: '25%', desc: 'Bi-directional Salesforce opportunity sync (Scale tier)' },
  { name: 'eu_residency', status: 'Beta', rollout: '10%', desc: 'EU Postgres region for GDPR data residency' },
  { name: 'cite_v2', status: 'Internal', rollout: '5%', desc: 'Improved citation tracking with paragraph-level precision' },
  { name: 'multi_tenant_orgs', status: 'Planned', rollout: '0%', desc: 'Organization hierarchy for holding companies' },
  { name: 'audit_log_export', status: 'Planned', rollout: '0%', desc: 'CSV/SIEM export of audit logs for compliance teams' },
];

const TYPE_META: Record<string, { label: string; cls: string; icon: typeof GitBranch }> = {
  major: { label: 'Major', cls: 'status-badge-active', icon: Rocket },
  feature: { label: 'Feature', cls: 'status-badge-engineering', icon: Zap },
  fix: { label: 'Fix', cls: 'status-badge-design', icon: Wrench },
};

export default function ChangelogPage() {
  const [expanded, setExpanded] = useState<string | null>('v2.0.0');

  return (
    <div className='bg-[#0D0D0D] text-white'>
      {/* ═══ HERO ═══ */}
      <section className='relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='absolute top-0 right-1/4 w-[800px] h-[600px] rounded-full blur-[120px] pointer-events-none bg-[#8B9DAF]/[0.04]' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-6'>Changelog</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className='text-5xl md:text-7xl lg:text-[88px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              What we shipped,<br />when we shipped it<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-4'>
              Every release, every breaking change, every migration guide. No marketing fluff — just diffs and decisions.
            </p>
            <div className='flex flex-wrap items-center gap-3 mt-6'>
              <a
                href='#'
                className='inline-flex items-center gap-2 border border-white/12 text-white px-4 py-2 rounded-md text-xs font-medium hover:border-white/25 hover:bg-white/[0.03] transition-colors'
              >
                <GitBranch size={14} className='text-[#8B9DAF]' />
                View on GitHub
              </a>
              <a
                href='#'
                className='inline-flex items-center gap-2 border border-white/12 text-white px-4 py-2 rounded-md text-xs font-medium hover:border-white/25 hover:bg-white/[0.03] transition-colors'
              >
                <Download size={14} className='text-[#8B9DAF]' />
                RSS feed
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ STATS ═══ */}
      <section className='py-16 md:py-20 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <StaggerContainer className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'>
            {STATS.map((s) => (
              <StaggerItem key={s.label}>
                <div className='card text-center h-full'>
                  <div className='text-3xl md:text-4xl font-bold text-white mb-1'>
                    <CountUp to={s.value} />
                  </div>
                  <div className='text-sm font-semibold text-white mb-1'>{s.label}</div>
                  <p className='text-xs text-[#666666]'>{s.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ VERSION TIMELINE ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[1100px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Release Timeline</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
              Five versions, ten days<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <div className='accent-line mb-12' />
          </FadeIn>

          <div className='relative'>
            {/* vertical line */}
            <div className='absolute left-[19px] md:left-[27px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-[#8B9DAF]/40 via-white/10 to-transparent' />

            <StaggerContainer className='space-y-4' staggerDelay={0.08}>
              {UPDATES.map((u) => {
                const meta = TYPE_META[u.type];
                const Icon = meta.icon;
                const isExpanded = expanded === u.version;
                return (
                  <StaggerItem key={u.version}>
                    <div className='relative pl-12 md:pl-16'>
                      {/* node */}
                      <div className={`absolute left-0 top-1 w-10 h-10 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center ${
                        u.type === 'major' ? 'border-[#8B9DAF] bg-[#8B9DAF]/10' : 'border-white/15 bg-[#0D0D0D]'
                      }`}>
                        <Icon size={16} className={u.type === 'major' ? 'text-[#8B9DAF]' : 'text-[#999999]'} />
                      </div>

                      <button
                        type='button'
                        onClick={() => setExpanded(isExpanded ? null : u.version)}
                        className='card w-full text-left'
                      >
                        <div className='flex flex-wrap items-center gap-3 mb-3'>
                          <span className={`status-badge ${meta.cls}`}>
                            {meta.label}
                          </span>
                          <span className='version-tag text-[#8B9DAF] font-semibold'>{u.version}</span>
                          <span className='text-xs text-[#666666] inline-flex items-center gap-1.5'>
                            <Calendar size={11} />
                            {u.date}
                          </span>
                          {u.flag && (
                            <span className='text-xs text-[#666666] inline-flex items-center gap-1.5 ml-auto'>
                              <Flag size={11} className='text-[#8B9DAF]' />
                              {u.flag}
                            </span>
                          )}
                        </div>
                        <h3 className='text-base md:text-lg font-semibold text-white mb-2'>{u.title}</h3>
                        <p className='text-sm text-[#999999] leading-[1.7]'>{u.summary}</p>

                        {isExpanded && (
                          <div className='mt-5 space-y-5'>
                            <div>
                              <p className='text-xs uppercase tracking-[0.15em] text-[#666666] mb-2 flex items-center gap-1.5'>
                                <CheckCircle2 size={12} className='text-[#8B9DAF]' />
                                Shipped
                              </p>
                              <ul className='space-y-1.5'>
                                {u.items.map((item, j) => (
                                  <li key={j} className='text-sm text-[#CCCCCC] flex items-start gap-2'>
                                    <span className='text-[#8B9DAF] mt-1.5 w-1 h-1 rounded-full bg-current flex-shrink-0' />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {u.breaking.length > 0 && (
                              <div className='p-4 rounded-md border border-[#8B9DAF]/20 bg-[#8B9DAF]/[0.03]'>
                                <p className='text-xs uppercase tracking-[0.15em] text-[#8B9DAF] mb-2 flex items-center gap-1.5'>
                                  <AlertTriangle size={12} />
                                  Breaking changes
                                </p>
                                <ul className='space-y-1.5'>
                                  {u.breaking.map((b, j) => (
                                    <li key={j} className='text-sm text-[#CCCCCC] flex items-start gap-2'>
                                      <span className='text-[#8B9DAF] mt-1.5 w-1 h-1 rounded-full bg-current flex-shrink-0' />
                                      {b}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div className='p-4 rounded-md border border-white/6 bg-white/[0.02]'>
                              <p className='text-xs uppercase tracking-[0.15em] text-[#666666] mb-2 flex items-center gap-1.5'>
                                <Code2 size={12} className='text-[#8B9DAF]' />
                                Migration guide
                              </p>
                              <p className='text-sm text-[#999999] leading-[1.7]'>{u.migration}</p>
                            </div>
                          </div>
                        )}

                        <div className='mt-4 flex items-center gap-1.5 text-xs text-[#8B9DAF]'>
                          {isExpanded ? 'Collapse' : 'Expand details'}
                          <ArrowRight size={12} className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        </div>
                      </button>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ FEATURE FLAGS ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Feature Flags</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
              What&apos;s live, what&apos;s coming<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <div className='accent-line mb-12' />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className='card overflow-x-auto no-scrollbar p-0'>
              <table className='data-table'>
                <thead>
                  <tr>
                    <th>Flag name</th>
                    <th>Status</th>
                    <th>Rollout</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {FEATURE_FLAGS.map((f) => (
                    <tr key={f.name}>
                      <td>
                        <span className='inline-flex items-center gap-2 font-mono text-xs'>
                          <Flag size={12} className='text-[#8B9DAF]' />
                          {f.name}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`status-badge ${
                            f.status === 'GA' ? 'status-badge-active' :
                            f.status === 'Beta' ? 'status-badge-engineering' : 'status-badge-design'
                          }`}
                        >
                          {f.status === 'GA' && (
                            <span className='w-1.5 h-1.5 rounded-full bg-[#8B9DAF] animate-pulse' />
                          )}
                          {f.status}
                        </span>
                      </td>
                      <td className='text-[#999999] font-mono text-xs'>{f.rollout}</td>
                      <td className='text-[#999999]'>{f.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-xs text-[#666666] mt-4'>
              Beta flags are opt-in via dashboard settings. GA flags are enabled for all customers automatically.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ MIGRATION GUIDES SUMMARY ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Migration Guides</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
              Upgrade paths, all in one place<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <div className='accent-line mb-12' />
          </FadeIn>
          <StaggerContainer className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
            {UPDATES.filter((u) => u.breaking.length > 0 || u.migration !== 'N/A — initial release').map((u) => (
              <StaggerItem key={u.version}>
                <Link href='#' className='block group h-full'>
                  <Card3D className='h-full'>
                    <div className='flex items-center justify-between mb-4'>
                      <span className='version-tag text-[#8B9DAF] font-semibold'>{u.version}</span>
                      {u.breaking.length > 0 ? (
                        <span className='inline-flex items-center gap-1.5 text-xs text-[#8B9DAF]'>
                          <AlertTriangle size={12} />
                          {u.breaking.length} breaking
                        </span>
                      ) : (
                        <span className='inline-flex items-center gap-1.5 text-xs text-[#666666]'>
                          <CheckCircle2 size={12} />
                          No breaking changes
                        </span>
                      )}
                    </div>
                    <h3 className='text-base font-semibold text-white mb-2 group-hover:text-[#8B9DAF] transition-colors'>
                      {u.title}
                    </h3>
                    <p className='text-sm text-[#999999] leading-[1.7] mb-4'>{u.migration}</p>
                    <div className='flex items-center gap-1.5 text-xs text-[#8B9DAF] pt-3 border-t border-white/4'>
                      Read full guide
                      <ArrowRight size={12} className='group-hover:translate-x-1 transition-transform' />
                    </div>
                  </Card3D>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ CTA ═══ */}
      <section className='py-24 md:py-28 bg-[#111111]'>
        <div className='max-w-[900px] mx-auto px-6 md:px-12 text-center'>
          <FadeIn>
            <GitCommit size={36} className='text-[#8B9DAF] mx-auto mb-5' />
            <h2 className='text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white tracking-tight mb-3'>
              Building in public<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <p className='text-[15px] text-[#999999] leading-[1.7] mb-8 max-w-xl mx-auto'>
              Star the repo, watch releases, or subscribe to the changelog RSS feed. We ship every week.
            </p>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-3'>
              <a
                href='#'
                className='inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md text-sm font-semibold hover:bg-white/90 transition-colors'
              >
                <GitBranch size={16} />
                Star on GitHub
              </a>
              <Link
                href='/blog'
                className='inline-flex items-center gap-2 border border-white/12 text-white px-6 py-3 rounded-md text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-colors'
              >
                Read the blog
                <ExternalLink size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
