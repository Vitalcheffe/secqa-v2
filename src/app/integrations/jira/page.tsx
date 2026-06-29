'use client';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem, SectionDivider } from '@/components/ui/motion';
import { ArrowRight, CheckCircle2, AlertCircle, Zap, GitBranch, Users, FileText, Webhook, Settings, Bug } from 'lucide-react';

const FEATURES = [
  { icon: Bug, title: 'Auto-create issues for blocked answers', desc: 'When a SecQA reviewer marks a question as "blocked", SecQA auto-creates a Jira issue with the question text, draft answer, and source citations.' },
  { icon: GitBranch, title: 'Issue-type routing by category', desc: 'Route blocked security questions to a "Security Review" issue type, infra questions to "Infra Task", and legal questions to "Legal Approval".' },
  { icon: Users, title: 'Project and component assignment', desc: 'Auto-assign issues to Jira projects and components based on SecQA category. Each team gets their existing Jira workflow.' },
  { icon: FileText, title: 'Cited source documents in description', desc: 'Each auto-created Jira issue includes cited source documents from your knowledge base — reviewers see exactly what the AI used.' },
  { icon: Webhook, title: 'Bi-directional webhook sync', desc: 'Status transitions in Jira propagate to SecQA in real time. Approvals in SecQA transition the Jira issue to Done automatically.' },
  { icon: Settings, title: 'JQL filters and custom fields', desc: 'Filter which Jira projects SecQA can write to. Map SecQA questionnaire fields to Jira custom fields for native reporting.' },
];

const STEPS = [
  {
    title: 'Create an API token in Jira',
    desc: 'Go to https://id.atlassian.com/manage-profile/security/api-tokens → Create API token. Name it "SecQA".',
    code: '# Token name: SecQA\n# Permissions: Used with Atlassian account email for Basic Auth',
  },
  {
    title: 'Copy the API token and account email',
    desc: 'After creating the token, copy it. You will also need your Atlassian account email (e.g., founder@acme.com) for Basic Auth.',
    code: 'Email:  founder@acme.com\nToken:  ATATT3-YOUR_JIRA_TOKEN
  },
  {
    title: 'Connect Jira in SecQA dashboard',
    desc: 'In SecQA → Settings → Integrations → Jira, enter your Atlassian email and API token. Click "Test connection" — you should see your Jira site name and accessible projects.',
    code: 'POST /api/integrations/jira\n{\n  "email": "founder@acme.com",\n  "api_token": "ATATT3xFfGF0...",\n  "site": "acme"\n}',
  },
  {
    title: 'Map SecQA categories to Jira projects and issue types',
    desc: 'For each SecQA category (security, legal, infra, product), pick a Jira project and issue type. Blocked answers in that category auto-route there.',
    code: '# Mapping\nsecurity → SEC project, "Security Review" type\nlegal    → LEG project, "Legal Approval" type\ninfra    → INF project, "Infra Task" type\nproduct  → PROD project, "Product Question" type',
  },
  {
    title: 'Configure issue templates (optional)',
    desc: 'Define per-project issue templates with priority, labels, components, and description. Use template variables: {{question}}, {{draft_answer}}, {{citations}}, {{reviewer}}.',
    code: '# Template: SEC issue\nSummary: [SecQA] {{question}}\nPriority: High\nLabels: questionnaire, blocked\nComponents: compliance\nDescription: {{draft_answer}}',
  },
  {
    title: 'Test with a sample blocked question',
    desc: 'In SecQA, mark any questionnaire question as "blocked" with a comment. Within 10 seconds, you should see a new Jira issue in the mapped project. Transition it to Done in Jira — SecQA should auto-update the questionnaire status.',
  },
];

const CONFIG = [
  { option: 'Atlassian email', type: 'string', default: '—', desc: 'Atlassian account email used for Basic Auth.' },
  { option: 'API token', type: 'string', default: '—', desc: 'Atlassian API token generated from id.atlassian.com.' },
  { option: 'Site name', type: 'string', default: '—', desc: 'Jira Cloud site name (e.g., acme for acme.atlassian.net).' },
  { option: 'Default priority', type: 'enum', default: 'high', desc: 'Default priority for auto-created Jira issues.' },
  { option: 'Auto-transition on approval', type: 'boolean', default: 'true', desc: 'When a questionnaire answer is approved in SecQA, auto-transition the linked Jira issue to Done.' },
  { option: 'Project mapping', type: 'object', default: '{}', desc: 'Map of SecQA categories to Jira project keys and issue type IDs.' },
];

const USE_CASES = [
  {
    title: 'Infra question blocked → Jira INF task',
    desc: 'A question about your AWS S3 bucket policy is marked blocked in SecQA. Within 10 seconds, a Jira issue appears in the INF project with the question text, draft answer, and cited Notion wiki page. Engineer resolves in Jira — SecQA updates the questionnaire draft automatically.',
  },
  {
    title: 'Legal approval routing for DPA questions',
    desc: 'Any question mentioning DPA, GDPR, or data processing is auto-routed to the LEG project as a "Legal Approval" issue. Legal counsel reviews and approves in Jira — the approval status syncs back to SecQA.',
  },
  {
    title: 'Sprint-based SLA tracking',
    desc: 'Jira issues from SecQA appear in your team active sprint. Sprint completion and burndown charts include questionnaire work — engineering managers see the real cost of compliance work.',
  },
];

const FAQS = [
  {
    q: 'Does this integration work with Jira Server / Data Center?',
    a: 'No. The SecQA Jira integration supports Jira Cloud only. Jira Server / Data Center requires a different auth model (PAT) and a different API base URL. Contact us if you need Server / DC support.',
  },
  {
    q: 'My Jira project uses custom workflows. Will the integration respect them?',
    a: 'Yes. SecQA never bypasses workflow rules. Auto-created issues respect your project required fields, validators, and post-functions. Auto-transition on approval uses your "Done" transition ID — if you have multiple Done transitions, configure which one to use in settings.',
  },
  {
    q: 'How does SecQA handle Jira rate limits?',
    a: 'Jira Cloud rate limits are per-user and per-method. SecQA batches API calls and respects Jira 429 responses with exponential backoff. Default is 50 calls per minute per integration — well within Jira Cloud limits.',
  },
  {
    q: 'Can I have multiple Jira sites connected?',
    a: 'Yes — connect multiple Jira sites in Settings → Integrations → Jira. Each site requires its own API token and Atlassian account. Use project prefixes to distinguish issues from different sites.',
  },
];

const RELATED = [
  { slug: 'linear', name: 'Linear', emoji: '📋' },
  { slug: 'slack', name: 'Slack', emoji: '💬' },
  { slug: 'github', name: 'GitHub', emoji: '🐙' },
  { slug: 'salesforce', name: 'Salesforce', emoji: '☁️' },
];

export default function JiraIntegrationPage() {
  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Integrations</p></FadeIn>
          <FadeIn delay={0.1}>
            <div className='text-5xl mb-6'>🎫</div>
            <h1 className='text-5xl md:text-6xl lg:text-[72px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Jira + SecQA<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-8'>
              Auto-create Jira issues for blocked questionnaire answers, route by project and issue type, and sync resolution back to the draft. Built for enterprise teams running Jira as their system of record.
            </p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Connect Jira <ArrowRight size={14} />
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
              <p className='text-[14px] text-[#999999] mt-3'>Setup takes 20-30 minutes. Requires Jira Cloud admin access to create an API token.</p>
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
            <h2 className='text-3xl md:text-5xl font-bold text-white tracking-tight mb-4'>Ready to connect Jira?</h2>
            <p className='text-lg text-white/50 mb-8'>14-day paid pilot at $499. Connect Jira in under 30 minutes.</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Start your pilot <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
