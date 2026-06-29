'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem, CountUp, SectionDivider, Card3D } from '@/components/ui/motion';
import {
  ArrowRight,
  MessageCircle,
  FileText,
  BarChart3,
  Calendar,
  Database,
  Cloud,
  Lock,
  Bell,
  Server,
  GitBranch,
  CheckCircle2,
  Plug,
  Zap,
  Code2,
  Settings,
  Clock,
  Star,
} from 'lucide-react';

const FEATURED = [
  {
    icon: MessageCircle,
    name: 'Slack',
    desc: 'Get notified when a questionnaire draft is ready for review. Auto-post to deal channels.',
    status: 'Available',
    tier: 'All tiers',
    setup: '2 min',
    href: '/integrations/slack',
  },
  {
    icon: FileText,
    name: 'Notion',
    desc: 'Auto-create a Notion page with Q&A for collaborative review across your security team.',
    status: 'Available',
    tier: 'All tiers',
    setup: '3 min',
    href: '/integrations/notion',
  },
  {
    icon: BarChart3,
    name: 'HubSpot',
    desc: 'Auto-attach questionnaire status to HubSpot deals. Update deal stage on completion.',
    status: 'Available',
    tier: 'Pro tier+',
    setup: '5 min',
    href: '/integrations/hubspot',
  },
  {
    icon: BarChart3,
    name: 'Salesforce',
    desc: 'Same as HubSpot but for Salesforce. Bi-directional sync on opportunity stage.',
    status: 'Available',
    tier: 'Scale tier',
    setup: '8 min',
    href: '/integrations/salesforce',
  },
  {
    icon: GitBranch,
    name: 'GitHub',
    desc: 'Track security questionnaires as GitHub issues for engineering-owned answers.',
    status: 'Available',
    tier: 'All tiers',
    setup: '4 min',
    href: '/integrations/github',
  },
  {
    icon: Server,
    name: 'Linear',
    desc: 'Auto-create Linear issues for questionnaire answers that need engineering input.',
    status: 'Available',
    tier: 'Pro tier+',
    setup: '3 min',
    href: '/integrations/linear',
  },
];

const CATEGORIES = [
  { name: 'Communication', icon: MessageCircle, integrations: ['Slack', 'Microsoft Teams', 'Discord', 'Zoom'], count: 4 },
  { name: 'Documentation', icon: FileText, integrations: ['Notion', 'Confluence', 'Google Docs', 'GitHub Wiki'], count: 4 },
  { name: 'CRM', icon: BarChart3, integrations: ['HubSpot', 'Salesforce', 'Pipedrive', 'Attio'], count: 4 },
  { name: 'Project Management', icon: Calendar, integrations: ['Linear', 'Jira', 'Asana', 'ClickUp'], count: 4 },
  { name: 'Code', icon: GitBranch, integrations: ['GitHub', 'GitLab', 'Bitbucket', 'Vercel'], count: 4 },
  { name: 'Cloud', icon: Cloud, integrations: ['AWS', 'GCP', 'Azure', 'Cloudflare'], count: 4 },
  { name: 'Auth', icon: Lock, integrations: ['Okta', 'Auth0', 'Azure AD', 'Google Workspace'], count: 4 },
  { name: 'Monitoring', icon: Bell, integrations: ['Datadog', 'Sentry', 'PagerDuty', 'Grafana'], count: 4 },
  { name: 'Data', icon: Database, integrations: ['Snowflake', 'BigQuery', 'Postgres', 'Redshift'], count: 4 },
  { name: 'Email', icon: MessageCircle, integrations: ['Resend', 'SendGrid', 'Mailchimp', 'Postmark'], count: 4 },
];

const SETUP_STEPS = [
  { n: '01', t: 'Connect your account', d: 'Click the integration tile and authenticate with OAuth. We never store passwords — only scoped tokens with minimum required scopes.' },
  { n: '02', t: 'Map your data', d: 'Pick which SecQA events trigger actions in the target tool. Default mappings provided for common workflows.' },
  { n: '03', t: 'Test the flow', d: 'Send a test event and verify it lands in your tool. Iterate on mappings until it matches your team\'s workflow.' },
  { n: '04', t: 'Go live', d: 'Flip the switch. Monitor the activity log for the first 24 hours. Disable anytime without data loss.' },
];

const STATUS_INDICATORS = [
  { label: 'Available', count: 28, desc: 'Production-ready, install from dashboard' },
  { label: 'Beta', count: 12, desc: 'Functional, may have rough edges' },
  { label: 'Roadmap', count: 18, desc: 'Planned, vote on the public roadmap' },
  { label: 'Custom', count: 6, desc: 'Scale tier — built to spec in 2 weeks' },
];

export default function IntegrationsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className='bg-[#0D0D0D] text-white'>
      {/* ═══ HERO ═══ */}
      <section className='relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='absolute top-0 right-1/4 w-[800px] h-[600px] rounded-full blur-[120px] pointer-events-none bg-[#8B9DAF]/[0.04]' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-6'>Integrations</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className='text-5xl md:text-7xl lg:text-[88px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              64 integrations.<br />One workflow<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-4'>
              Connect SecQA to your existing security and sales stack. 64 integrations across 10 categories, from Slack notifications to Snowflake data sync.
            </p>
            <p className='text-[15px] text-[#999999] max-w-xl leading-[1.7]'>
              OAuth-based. Scoped tokens. Zero passwords stored. Disable anytime without data loss.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ STATUS INDICATORS ═══ */}
      <section className='py-16 md:py-20 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <StaggerContainer className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'>
            {STATUS_INDICATORS.map((s) => (
              <StaggerItem key={s.label}>
                <div className='card text-center h-full'>
                  <div className='text-3xl md:text-4xl font-bold text-white mb-1'>
                    <CountUp to={s.count} />
                  </div>
                  <div className='flex items-center justify-center gap-1.5 mb-2'>
                    <span className='w-1.5 h-1.5 rounded-full bg-[#8B9DAF] animate-pulse' />
                    <span className='text-sm font-semibold text-white'>{s.label}</span>
                  </div>
                  <p className='text-xs text-[#999999] leading-snug'>{s.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ FEATURED INTEGRATIONS ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Featured Integrations</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
              Most-used by our customers<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <div className='accent-line mb-12' />
          </FadeIn>
          <StaggerContainer className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
            {FEATURED.map((f) => (
              <StaggerItem key={f.name}>
                <Link href={f.href} className='block h-full group'>
                  <Card3D className='h-full'>
                    <div className='flex items-start justify-between mb-5'>
                      <div className='w-12 h-12 rounded-full bg-[#8B9DAF]/10 flex items-center justify-center transition-colors group-hover:bg-[#8B9DAF]/20'>
                        <f.icon size={22} className='text-[#8B9DAF]' />
                      </div>
                      <span className='status-badge status-badge-active'>
                        <span className='w-1.5 h-1.5 rounded-full bg-[#8B9DAF] animate-pulse' />
                        {f.status}
                      </span>
                    </div>
                    <h3 className='text-lg font-semibold text-white mb-2'>{f.name}</h3>
                    <p className='text-sm text-[#999999] leading-[1.7] mb-4'>{f.desc}</p>
                    <div className='flex items-center justify-between pt-4 border-t border-white/4'>
                      <div className='flex items-center gap-3 text-xs text-[#666666]'>
                        <span className='inline-flex items-center gap-1'>
                          <Star size={11} className='text-[#8B9DAF]' />
                          {f.tier}
                        </span>
                        <span className='inline-flex items-center gap-1'>
                          <Clock size={11} />
                          {f.setup}
                        </span>
                      </div>
                      <ArrowRight size={16} className='text-[#666666] group-hover:text-[#8B9DAF] group-hover:translate-x-1 transition-all' />
                    </div>
                  </Card3D>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ ALL CATEGORIES ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>All Integrations</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
              Browse by category<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <div className='accent-line mb-12' />
          </FadeIn>
          <StaggerContainer className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.name;
              return (
                <StaggerItem key={cat.name}>
                  <button
                    type='button'
                    onClick={() => setActiveCategory(isActive ? null : cat.name)}
                    className={`card w-full text-left h-full transition-colors ${
                      isActive ? 'border-[#8B9DAF]/30 bg-[#8B9DAF]/[0.03]' : ''
                    }`}
                  >
                    <div className='flex items-center justify-between mb-4'>
                      <div className='flex items-center gap-3'>
                        <div className='w-9 h-9 rounded-full bg-[#8B9DAF]/10 flex items-center justify-center'>
                          <Icon size={16} className='text-[#8B9DAF]' />
                        </div>
                        <h3 className='text-base font-semibold text-white'>{cat.name}</h3>
                      </div>
                      <span className='version-tag'>{cat.count}</span>
                    </div>
                    <ul className='space-y-2'>
                      {cat.integrations.map((int) => (
                        <li key={int} className='flex items-center gap-2 text-sm text-[#999999]'>
                          <span className='w-1 h-1 rounded-full bg-[#8B9DAF]' />
                          {int}
                          <CheckCircle2 size={11} className='text-[#8B9DAF]/60 ml-auto' />
                        </li>
                      ))}
                    </ul>
                  </button>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ SETUP STEPS PREVIEW ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Setup Preview</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
              Four steps to live<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <div className='accent-line mb-12' />
          </FadeIn>
          <StaggerContainer className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
            {SETUP_STEPS.map((s) => (
              <StaggerItem key={s.n}>
                <div className='card h-full'>
                  <div className='flex items-center justify-between mb-4'>
                    <span className='version-tag text-[#8B9DAF]'>{s.n}</span>
                    <Settings size={16} className='text-[#666666]' />
                  </div>
                  <h3 className='text-base font-semibold text-white mb-2'>{s.t}</h3>
                  <p className='text-sm text-[#999999] leading-[1.7]'>{s.d}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeIn delay={0.2}>
            <div className='mt-8 card overflow-hidden p-0'>
              <div className='flex items-center gap-2 px-5 py-3 border-b border-white/6 bg-white/[0.02]'>
                <Code2 size={16} className='text-[#8B9DAF]' />
                <span className='text-xs font-mono text-[#999999]'>Example: Slack webhook payload</span>
              </div>
              <pre className='p-5 md:p-6 overflow-x-auto no-scrollbar text-xs leading-[1.7] text-[#CCCCCC] font-mono'>
                <code>{`POST https://hooks.slack.com/services/T0/B0/XXX
Content-Type: application/json

{
  "event": "questionnaire.draft_ready",
  "questionnaire_id": "q_8f3a...",
  "deal": { "name": "Acme Corp", "stage": "Procurement" },
  "draft_url": "https://app.secqa.example/q/q_8f3a/review",
  "completion_pct": 92,
  "owner": "jane@yoursaas.com"
}`}</code>
              </pre>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ CUSTOM INTEGRATION CTA ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='card relative overflow-hidden'>
              <div className='absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] pointer-events-none bg-[#8B9DAF]/[0.06]' />
              <div className='relative z-10 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-center'>
                <div>
                  <div className='flex items-center gap-2 mb-4'>
                    <Plug size={18} className='text-[#8B9DAF]' />
                    <span className='section-label !mb-0'>Custom Integrations</span>
                  </div>
                  <h2 className='text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-white tracking-tight mb-4'>
                    Need an integration we don&apos;t have?<span className='text-[#8B9DAF]'>.</span>
                  </h2>
                  <p className='text-[15px] text-[#999999] leading-[1.7] mb-6 max-w-xl'>
                    Scale tier includes custom integration building with a 2-week SLA. We have built custom connectors
                    for internal tools, legacy CRMs, and proprietary security platforms. If it has an API (or even a
                    CSV export), we can integrate it.
                  </p>
                  <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3'>
                    <Link
                      href='/contact'
                      className='inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md text-sm font-semibold hover:bg-white/90 transition-colors'
                    >
                      <Zap size={16} />
                      Talk to us
                    </Link>
                    <Link
                      href='/pricing'
                      className='inline-flex items-center gap-2 border border-white/12 text-white px-6 py-3 rounded-md text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-colors'
                    >
                      See Scale tier
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-3'>
                  <div className='p-4 rounded-lg border border-white/6 bg-white/[0.02]'>
                    <div className='text-2xl font-bold text-[#8B9DAF] mb-1'>2 wk</div>
                    <p className='text-xs text-[#999999]'>Build SLA</p>
                  </div>
                  <div className='p-4 rounded-lg border border-white/6 bg-white/[0.02]'>
                    <div className='text-2xl font-bold text-[#8B9DAF] mb-1'>6</div>
                    <p className='text-xs text-[#999999]'>Custom built to date</p>
                  </div>
                  <div className='p-4 rounded-lg border border-white/6 bg-white/[0.02]'>
                    <div className='text-2xl font-bold text-[#8B9DAF] mb-1'>100%</div>
                    <p className='text-xs text-[#999999]'>On-time delivery</p>
                  </div>
                  <div className='p-4 rounded-lg border border-white/6 bg-white/[0.02]'>
                    <div className='text-2xl font-bold text-[#8B9DAF] mb-1'>∞</div>
                    <p className='text-xs text-[#999999]'>Maintenance included</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
