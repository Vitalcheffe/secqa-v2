'use client';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem, SectionDivider } from '@/components/ui/motion';
import { ArrowRight, CheckCircle2, AlertCircle, Zap, FileText, Database, Search, Webhook, Settings, BookOpen } from 'lucide-react';

const FEATURES = [
  { icon: Database, title: 'Sync Notion pages as answer sources', desc: 'Connect any Notion database or page. SecQA ingests content nightly and uses it as retrieval context for AI-generated answers.' },
  { icon: Search, title: 'Semantic search across your wiki', desc: 'Find any answer in seconds with full-text and vector search across your entire Notion workspace. Cited back to source page.' },
  { icon: FileText, title: 'Auto-export approved responses', desc: 'Push approved questionnaire responses back to a Notion database with question, answer, category, and reviewer tags.' },
  { icon: BookOpen, title: 'Trust Center doc sync', desc: 'Mirror your Notion trust documents (SOC 2, pen test, policies) to your SecQA Trust Center automatically — always up to date.' },
  { icon: Webhook, title: 'Webhook-driven updates', desc: 'Notion page edits trigger immediate re-indexing. No stale answers — your knowledge base is always current.' },
  { icon: Settings, title: 'Granular access control', desc: 'Connect specific databases and pages. SecQA only sees what you grant — never your whole workspace.' },
];

const STEPS = [
  {
    title: 'Create a Notion integration',
    desc: 'Go to notion.so/my-integrations → New integration. Name it "SecQA", pick your workspace, and save.',
    code: '# Integration name: SecQA\n# Type: Internal\n# Workspace: Your workspace',
  },
  {
    title: 'Copy the Internal Integration Secret',
    desc: 'After creating the integration, copy the secret starting with "secret_" or "ntn_". You will paste this into SecQA.',
    code: 'Internal secret:  secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
  {
    title: 'Share target pages with the integration',
    desc: 'Open each Notion database or page you want SecQA to access → "..." menu → Connections → Add SecQA. The integration only sees pages it has been explicitly granted.',
  },
  {
    title: 'Connect Notion in SecQA dashboard',
    desc: 'In SecQA → Settings → Integrations → Notion, paste the integration secret. Click "Test connection" — SecQA will list the pages you shared.',
    code: 'POST /api/integrations/notion\n{\n  "internal_secret": "secret_xxxxx...",\n  "workspace_name": "Acme"\n}',
  },
  {
    title: 'Map Notion databases to SecQA categories',
    desc: 'For each Notion database, pick a SecQA category (security / legal / infra / product). SecQA will use pages from that database as retrieval context for that category.',
    code: '# Mapping\nSecurity Wiki  → security\nLegal Docs      → legal\nInfra Runbooks  → infra\nProduct Specs   → product',
  },
  {
    title: 'Configure auto-export (optional)',
    desc: 'Pick a Notion database to receive approved questionnaire responses. SecQA creates a row per question with question text, approved answer, reviewer, and source citations.',
  },
];

const CONFIG = [
  { option: 'Internal integration secret', type: 'string', default: '—', desc: 'Notion internal integration secret used for API authentication.' },
  { option: 'Sync frequency', type: 'enum', default: 'nightly', desc: 'How often SecQA re-indexes your Notion pages. Options: hourly, nightly, weekly, webhook-only.' },
  { option: 'Auto-export database ID', type: 'string', default: '—', desc: 'Notion database ID where approved responses are pushed as new rows.' },
  { option: 'Max pages per database', type: 'integer', default: '500', desc: 'Cap on the number of pages SecQA indexes per database to control API usage.' },
  { option: 'Category mapping', type: 'object', default: '{}', desc: 'Map of Notion database IDs to SecQA categories (security / legal / infra / product).' },
  { option: 'Include nested pages', type: 'boolean', default: 'true', desc: 'Whether to recursively index child pages within shared parent pages.' },
];

const USE_CASES = [
  {
    title: 'Security wiki auto-feeds questionnaire answers',
    desc: 'Your security team maintains a 200-page Notion wiki covering encryption, access controls, and incident response. SecQA ingests it nightly. Every security question on every questionnaire pulls answers from the wiki with citation links.',
  },
  {
    title: 'Approved answers become a Q&A database',
    desc: 'Every approved questionnaire response is auto-exported to a Notion database. Your team gets a searchable, filterable, taggable answer library that grows with every questionnaire — no manual curation.',
  },
  {
    title: 'Trust Center docs always current',
    desc: 'Your SOC 2 report, pen test summary, and policies live in Notion. SecQA mirrors them to your Trust Center. When legal updates the policy page in Notion, Trust Center updates within 24 hours automatically.',
  },
];

const FAQS = [
  {
    q: 'Does SecQA see all my Notion content?',
    a: 'No. SecQA only sees the pages and databases you explicitly share with the integration via the Connections menu. We never access your full workspace, and you can revoke access at any time from Notion.',
  },
  {
    q: 'How often is Notion content re-indexed?',
    a: 'Default is nightly (3 AM local time). Webhook-driven updates run within 60 seconds of any page edit if you enable them. Hourly and weekly options are also available — choose based on how often your wiki changes.',
  },
  {
    q: 'My Notion page has tables and callouts. Does SecQA parse them?',
    a: 'Yes. SecQA parses all Notion block types including tables, callouts, code blocks, toggles, and synced blocks. Tables are flattened to key-value pairs for retrieval; code blocks are preserved verbatim.',
  },
  {
    q: 'Can I use a public Notion page as an answer source?',
    a: 'Yes. Paste the public Notion URL in Settings → Integrations → Notion → Public pages. SecQA fetches the page every 24 hours without requiring an integration secret. Useful for community-published security docs.',
  },
];

const RELATED = [
  { slug: 'slack', name: 'Slack', emoji: '💬' },
  { slug: 'linear', name: 'Linear', emoji: '📋' },
  { slug: 'google-workspace', name: 'Google Workspace', emoji: '📧' },
  { slug: 'hubspot', name: 'HubSpot', emoji: '📊' },
];

export default function NotionIntegrationPage() {
  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Integrations</p></FadeIn>
          <FadeIn delay={0.1}>
            <div className='text-5xl mb-6'>📝</div>
            <h1 className='text-5xl md:text-6xl lg:text-[72px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Notion + SecQA<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-8'>
              Turn your Notion wiki into a queryable knowledge base for questionnaire responses. Sync pages, search semantically, and auto-export approved answers back to a Notion database.
            </p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Connect Notion <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>

      <SectionDivider className='max-w-[1400px]' />

      <section className='py-16 md:py-24 bg-[#0D0D0D]'>
        <div className='max-w-[1200px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Capabilities</p>
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
        <div className='max-w-[1000px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Setup</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Detailed setup guide</h2>
              <p className='text-[14px] text-[#999999] mt-3'>Setup takes 15-20 minutes. Requires Notion workspace admin access to create the integration.</p>
            </div>
          </FadeIn>
          <div className='space-y-4'>
            {STEPS.map((step, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className='card p-6'>
                  <div className='flex items-start gap-4 mb-3'>
                    <span className='w-9 h-9 flex items-center justify-center rounded-full bg-[#8B9DAF] text-black text-[14px] font-extrabold shrink-0'>{i + 1}</span>
                    <h3 className='text-[16px] font-bold text-white pt-1'>{step.title}</h3>
                  </div>
                  <p className='text-[13px] text-[#999999] leading-[1.7] mb-4 pl-13'>{step.desc}</p>
                  {step.code && (
                    <pre className='bg-[#0A0A0A] border border-[rgba(255,255,255,0.06)] rounded-lg p-4 ml-13 overflow-x-auto no-scrollbar'><code className='text-[12px] text-[#8B9DAF] font-mono leading-relaxed whitespace-pre'>{step.code}</code></pre>
                  )}
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
              <p className='section-label mb-4'>Configuration</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Configuration options</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className='card overflow-hidden'>
              <div className='overflow-x-auto no-scrollbar'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b border-[rgba(255,255,255,0.06)]'>
                      <th className='text-left text-[12px] uppercase tracking-wider text-[#999999] font-semibold px-6 py-4'>Option</th>
                      <th className='text-left text-[12px] uppercase tracking-wider text-[#999999] font-semibold px-6 py-4'>Type</th>
                      <th className='text-left text-[12px] uppercase tracking-wider text-[#999999] font-semibold px-6 py-4'>Default</th>
                      <th className='text-left text-[12px] uppercase tracking-wider text-[#999999] font-semibold px-6 py-4'>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CONFIG.map((row) => (
                      <tr key={row.option} className='border-b border-[rgba(255,255,255,0.04)] last:border-0'>
                        <td className='px-6 py-4 text-[13px] text-white font-medium font-mono'>{row.option}</td>
                        <td className='px-6 py-4 text-[12px] text-[#999999] font-mono'>{row.type}</td>
                        <td className='px-6 py-4 text-[12px] text-[#CCCCCC] font-mono'>{row.default}</td>
                        <td className='px-6 py-4 text-[13px] text-[#999999]'>{row.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className='py-16 md:py-24 bg-[#111111]'>
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

      <section className='py-16 md:py-24 bg-[#0D0D0D]'>
        <div className='max-w-[900px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Troubleshooting</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>FAQ & troubleshooting</h2>
            </div>
          </FadeIn>
          <div className='space-y-4'>
            {FAQS.map((f, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className='card p-6'>
                  <div className='flex items-start gap-3 mb-3'>
                    <AlertCircle size={18} className='text-[#8B9DAF] mt-0.5 shrink-0' />
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
        <div className='max-w-[1200px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Related</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Related integrations</h2>
            </div>
          </FadeIn>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {RELATED.map((r, i) => (
              <FadeIn key={r.slug} delay={i * 0.06}>
                <Link href={`/integrations/${r.slug}`} className='card p-5 flex items-center gap-3 hover:bg-[rgba(255,255,255,0.02)] transition-colors group'>
                  <span className='text-2xl'>{r.emoji}</span>
                  <div>
                    <p className='text-[14px] font-bold text-white group-hover:text-[#8B9DAF] transition-colors'>{r.name}</p>
                    <p className='text-[11px] text-[#666666]'>View integration</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className='py-20 md:py-28 bg-[#0D0D0D]'>
        <div className='max-w-[900px] mx-auto px-6 md:px-12 text-center'>
          <FadeIn>
            <h2 className='text-3xl md:text-5xl font-bold text-white tracking-tight mb-4'>Ready to connect Notion?</h2>
            <p className='text-lg text-white/50 mb-8'>14-day paid pilot at $499. Connect Notion in under 20 minutes.</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Start your pilot <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
