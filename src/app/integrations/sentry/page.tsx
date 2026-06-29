'use client';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem, SectionDivider } from '@/components/ui/motion';
import { ArrowRight, CheckCircle2, AlertCircle, Zap, Bug, Users, FileText, Webhook, Settings, Shield } from 'lucide-react';

const FEATURES = [
  { icon: Bug, title: 'Error tracking data as answer source', desc: 'SecQA ingests Sentry error counts, release health, and project structure. Questionnaire answers cite real error and uptime data.' },
  { icon: Shield, title: 'Issue resolution time cited', desc: 'When a prospect asks about incident response, SecQA cites your Sentry issue resolution time medians for the last 90 days.' },
  { icon: FileText, title: 'Release health metrics in answers', desc: 'Questionnaire answers about deployment safety cite Sentry release health: crash-free users, adoption rate, and regression detection.' },
  { icon: Users, title: 'Project-level access control', desc: 'Connect Sentry teams and projects selectively. SecQA only sees what you grant — keep customer-identifying project data private.' },
  { icon: Webhook, title: 'Issue webhook sync', desc: 'Sentry issue webhooks create SecQA timeline entries. Use issue history as cited evidence for incident response questions.' },
  { icon: Settings, title: 'Per-team integration scopes', desc: 'Configure which Sentry teams SecQA can read. Granular control for organisations with strict team boundaries.' },
];

const STEPS = [
  {
    title: 'Create a Sentry auth token',
    desc: 'Go to sentry.io → Settings → API Keys → Auth Tokens → Create New Token. Name it "SecQA".',
    code: '# Token name: SecQA\n# Scopes: project:read, team:read, org:read, event:read\n# Expiration: 1 year (recommended)',
  },
  {
    title: 'Copy the auth token',
    desc: 'After creating the token, copy it. Sentry only shows the token once — store it securely.',
    code: 'sntrys_eyJpYXQiOjE3MDAw...',
  },
  {
    title: 'Connect Sentry in SecQA dashboard',
    desc: 'In SecQA → Settings → Integrations → Sentry, paste the auth token and your Sentry org slug. Click "Test connection" — you should see your Sentry org name and team count.',
    code: 'POST /api/integrations/sentry\n{\n  "auth_token": "sntrys_eyJpYXQi...",\n  "org_slug": "acme"\n}',
  },
  {
    title: 'Select projects to index',
    desc: 'Pick which Sentry projects SecQA should index. We recommend starting with your main backend, web frontend, and mobile apps.',
    code: '# Indexed projects\napi-server       (production)\nweb-frontend     (production)\nmobile-ios       (production)\nmobile-android   (production)',
  },
  {
    title: 'Configure issue webhook (optional)',
    desc: 'In Sentry → Settings → Integrations → Webhooks, add the SecQA webhook URL. When Sentry creates a new issue, SecQA logs a timeline entry for compliance use.',
    code: '# Webhook URL\nhttps://api.secqa.com/integrations/sentry/webhook\n# Events: issue (created, resolved, ignored)',
  },
  {
    title: 'Verify with a sample questionnaire',
    desc: 'Run a sample questionnaire. Questions about incident response and uptime should cite specific Sentry projects, error counts, and resolution time medians.',
  },
];

const CONFIG = [
  { option: 'Auth token', type: 'string', default: '—', desc: 'Sentry auth token with project:read, team:read, event:read scopes.' },
  { option: 'Org slug', type: 'string', default: '—', desc: 'Sentry organisation slug found in your sentry.io URL.' },
  { option: 'Indexed projects', type: 'string[]', default: '[]', desc: 'List of Sentry project slugs to index as answer sources.' },
  { option: 'Lookback window (days)', type: 'integer', default: '90', desc: 'How far back SecQA pulls issue and release health data.' },
  { option: 'Issue webhook URL', type: 'string', default: '—', desc: 'SecQA webhook URL for Sentry issue events.' },
  { option: 'Exclude customer projects', type: 'string[]', default: '[]', desc: 'Project slugs to exclude (e.g., customer-identifying projects).' },
];

const USE_CASES = [
  {
    title: 'MTTR cited from Sentry issue data',
    desc: 'A prospect asks "What is your mean time to resolve production incidents?" SecQA queries Sentry issue history, calculates 47-minute median MTTR over the last 90 days, and writes an answer citing the data range.',
  },
  {
    title: 'Release safety cited from Sentry release health',
    desc: 'A question about deployment safety gets answered with a citation to your Sentry release health: 99.8% crash-free users, 12-minute regression detection, automatic rollback on >2% crash rate.',
  },
  {
    title: 'Error budget consumption cited',
    desc: 'A question about error budget gets answered with Sentry data: 78% of error budget consumed over the last 30 days, with the top 3 error categories and their resolution status.',
  },
];

const FAQS = [
  {
    q: 'Does SecQA need write access to my Sentry account?',
    a: 'No. The auth token scopes are read-only: project:read, team:read, event:read. SecQA never resolves issues, modifies projects, or creates alerts. Read-only by design.',
  },
  {
    q: 'My Sentry org has 50+ projects. Will SecQA index all?',
    a: 'Only if you select all. Default is to index specific projects you pick. For large orgs, we recommend indexing 3-5 production projects and excluding staging, internal tools, and customer-identifying projects.',
  },
  {
    q: 'How far back does SecQA pull Sentry data?',
    a: 'Default is 90 days. Configurable up to 365 days on Enterprise plan. Longer lookback improves MTTR calculations but increases API calls. Most teams find 90 days sufficient for compliance evidence.',
  },
  {
    q: 'Can I exclude specific Sentry projects from indexing?',
    a: 'Yes — add project slugs to the exclude list in Settings → Integrations → Sentry → Excludes. Useful for excluding staging projects, customer-identifying projects, or internal tools with sensitive data.',
  },
];

const RELATED = [
  { slug: 'datadog', name: 'Datadog', emoji: '📈' },
  { slug: 'github', name: 'GitHub', emoji: '🐙' },
  { slug: 'vercel', name: 'Vercel', emoji: '▲' },
  { slug: 'slack', name: 'Slack', emoji: '💬' },
];

export default function SentryIntegrationPage() {
  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Integrations</p></FadeIn>
          <FadeIn delay={0.1}>
            <div className='text-5xl mb-6'>🐛</div>
            <h1 className='text-5xl md:text-6xl lg:text-[72px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Sentry + SecQA<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-8'>
              Use your Sentry error data, release health, and issue resolution times as cited evidence in questionnaire answers. Real MTTR numbers, real crash-free rates — not marketing copy.
            </p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Connect Sentry <ArrowRight size={14} />
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
              <p className='text-[14px] text-[#999999] mt-3'>Setup takes 10-15 minutes. Requires Sentry org admin or manager access to create an auth token.</p>
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
            <h2 className='text-3xl md:text-5xl font-bold text-white tracking-tight mb-4'>Ready to connect Sentry?</h2>
            <p className='text-lg text-white/50 mb-8'>14-day paid pilot at $499. Connect Sentry in under 15 minutes.</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Start your pilot <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
