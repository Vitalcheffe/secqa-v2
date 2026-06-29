'use client';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem, SectionDivider } from '@/components/ui/motion';
import { ArrowRight, CheckCircle2, AlertCircle, Zap, GitBranch, Users, FileText, Webhook, Settings, Bug } from 'lucide-react';

const FEATURES = [
  { icon: Bug, title: 'Auto-create issues for blocked answers', desc: 'When a SecQA reviewer marks a question as "blocked", SecQA auto-creates a Linear issue with the question text, draft answer, and source citations.' },
  { icon: GitBranch, title: 'Branch-based issue linking', desc: 'Tag a Linear issue with the questionnaire ID and SecQA syncs the resolution back to the questionnaire draft automatically.' },
  { icon: Users, title: 'Team-based reviewer assignment', desc: 'Route blocked answers to the right Linear team: security, infra, product, or legal. Each team gets a configurable SLA.' },
  { icon: FileText, title: 'Cited source documents', desc: 'Each auto-created Linear issue includes cited source documents from your knowledge base — reviewers see exactly what the AI used.' },
  { icon: Webhook, title: 'Bi-directional webhook sync', desc: 'Status changes in Linear propagate to SecQA in real time. Approvals in SecQA close the Linear issue automatically.' },
  { icon: Settings, title: 'Custom issue templates', desc: 'Define per-team issue templates with priority, label, and description fields. Tailor the issue to your engineering workflow.' },
];

const STEPS = [
  {
    title: 'Create a Linear API key',
    desc: 'Go to Linear → Settings → API → Personal API keys → New API key. Name it "SecQA" and grant workspace-level access.',
    code: '# Key name: SecQA\n# Scope: read, write\n# Workspace: Your workspace',
  },
  {
    title: 'Copy the API key',
    desc: 'After creating the key, copy it. Linear only shows the key once — store it securely.',
    code: 'lin_api_YOUR_LINEAR_KEY
  },
  {
    title: 'Connect Linear in SecQA dashboard',
    desc: 'In SecQA → Settings → Integrations → Linear, paste the API key. Click "Test connection" — you should see your Linear workspace name and team list.',
    code: 'POST /api/integrations/linear\n{\n  "api_key": "lin_api_YOUR_LINEAR_KEY
  },
  {
    title: 'Map SecQA categories to Linear teams',
    desc: 'For each SecQA category (security, legal, infra, product), pick a Linear team. Blocked answers in that category auto-route to the team.',
    code: '# Mapping\nsecurity → SEC (Security)\nlegal    → LEG (Legal)\ninfra    → INF (Infra)\nproduct  → PROD (Product)',
  },
  {
    title: 'Configure issue templates (optional)',
    desc: 'Define per-team issue templates with priority, label, and description. Use template variables: {{question}}, {{draft_answer}}, {{citations}}, {{reviewer}}.',
    code: '# Template: SEC issue\nTitle: [SecQA] {{question}}\nPriority: High\nLabels: questionnaire, blocked\nDescription: {{draft_answer}}\n\nSources:\n{{citations}}',
  },
  {
    title: 'Test with a sample blocked question',
    desc: 'In SecQA, mark any questionnaire question as "blocked" with a comment. Within 5 seconds, you should see a new Linear issue in the mapped team. Resolve it in Linear — SecQA should auto-update the questionnaire status.',
  },
];

const CONFIG = [
  { option: 'API key', type: 'string', default: '—', desc: 'Linear personal API key for workspace-level access.' },
  { option: 'Workspace slug', type: 'string', default: '—', desc: 'Linear workspace slug found in your workspace URL.' },
  { option: 'Default priority', type: 'enum', default: 'high', desc: 'Default priority for auto-created Linear issues. Options: urgent, high, medium, low.' },
  { option: 'Auto-close on approval', type: 'boolean', default: 'true', desc: 'When a questionnaire answer is approved in SecQA, auto-close the linked Linear issue.' },
  { option: 'Team mapping', type: 'object', default: '{}', desc: 'Map of SecQA categories to Linear team IDs.' },
  { option: 'Issue template', type: 'object', default: '{}', desc: 'Per-team issue template with title, priority, labels, and description fields.' },
];

const USE_CASES = [
  {
    title: 'Infra question blocked → Linear INF issue',
    desc: 'A question about your KMS key rotation policy is marked blocked in SecQA. Within 5 seconds, a Linear issue appears in the INF team with the question text, draft answer, and cited Notion wiki page. Engineer resolves in Linear — SecQA updates the questionnaire draft automatically.',
  },
  {
    title: 'Multi-team coordination on a 200-question questionnaire',
    desc: 'A complex enterprise questionnaire has 30 blocked questions across security, legal, and product. SecQA creates 30 Linear issues across 3 teams with per-team SLAs. Each team lead gets a Slack ping with their issues. No spreadsheet tracking, no email threads.',
  },
  {
    title: 'Recurring questions auto-resolved from past issues',
    desc: 'When the same question appears on a future questionnaire, SecQA retrieves the previous Linear issue resolution and uses it as the answer draft. Reviewer just confirms — no re-blocking the same question.',
  },
];

const FAQS = [
  {
    q: 'Does the integration work with Linear GraphQL API?',
    a: 'Yes. SecQA uses the Linear GraphQL API v2 for all read/write operations. We follow Linear rate limits (6000 points per hour per workspace) and batch mutations for efficiency.',
  },
  {
    q: 'Can I have multiple Linear workspaces connected?',
    a: 'Yes — connect multiple Linear workspaces in Settings → Integrations → Linear. Each workspace requires its own API key. Use team prefixes to distinguish issues from different workspaces.',
  },
  {
    q: 'My Linear team uses a triage project. Will issues skip triage?',
    a: 'By default, SecQA creates issues directly in the mapped team (skipping triage). You can configure "submit to triage" mode in team mapping if you prefer human triage before assignment.',
  },
  {
    q: 'How do I unlink a Linear issue from a questionnaire?',
    desc: 'In the questionnaire draft view, click the Linear issue badge → "Unlink". The Linear issue stays open in your workspace but is no longer synced with the questionnaire. You can re-link via issue ID.',
    a: 'In the questionnaire draft view, click the Linear issue badge → "Unlink". The Linear issue stays open in your workspace but is no longer synced with the questionnaire. You can re-link via issue ID.',
  },
];

const RELATED = [
  { slug: 'jira', name: 'Jira', emoji: '🎫' },
  { slug: 'slack', name: 'Slack', emoji: '💬' },
  { slug: 'github', name: 'GitHub', emoji: '🐙' },
  { slug: 'notion', name: 'Notion', emoji: '📝' },
];

export default function LinearIntegrationPage() {
  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Integrations</p></FadeIn>
          <FadeIn delay={0.1}>
            <div className='text-5xl mb-6'>📋</div>
            <h1 className='text-5xl md:text-6xl lg:text-[72px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Linear + SecQA<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-8'>
              Auto-create Linear issues for blocked questionnaire answers, route by team, and sync resolution back to the draft. Built for engineering-first SaaS teams that live in Linear.
            </p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Connect Linear <ArrowRight size={14} />
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
              <p className='text-[14px] text-[#999999] mt-3'>Setup takes 10-15 minutes. Requires Linear workspace admin access to generate an API key.</p>
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
            <h2 className='text-3xl md:text-5xl font-bold text-white tracking-tight mb-4'>Ready to connect Linear?</h2>
            <p className='text-lg text-white/50 mb-8'>14-day paid pilot at $499. Connect Linear in under 15 minutes.</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Start your pilot <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
