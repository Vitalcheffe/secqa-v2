'use client';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem, SectionDivider } from '@/components/ui/motion';
import { ArrowRight, CheckCircle2, AlertCircle, Zap, Rocket, Users, FileText, Webhook, Settings, Globe } from 'lucide-react';

const FEATURES = [
  { icon: Rocket, title: 'Deployment-aware questionnaire context', desc: 'Connect SecQA to your Vercel projects. The AI uses deployment metadata, environment variables (names only), and project settings as retrieval context.' },
  { icon: Globe, title: 'Per-environment answers', desc: 'SecQA distinguishes between production, preview, and development environments. Questionnaire answers cite the right environment context.' },
  { icon: FileText, title: 'Citation links to deployment URLs', desc: 'Every AI-generated answer cites the exact Vercel deployment URL and timestamp. Reviewers can verify by clicking through.' },
  { icon: Users, title: 'Project-level access control', desc: 'Install the SecQA Vercel integration on specific projects. Granular permissions — SecQA only sees what you grant.' },
  { icon: Webhook, title: 'Deployment webhook triggers', desc: 'New production deployments trigger re-indexing. Questionnaire answers always reflect the current production state.' },
  { icon: Settings, title: 'Custom environment include list', desc: 'Choose which environment variables to expose (names only, never values). Keep secrets private while exposing configuration.' },
];

const STEPS = [
  {
    title: 'Create a Vercel access token',
    desc: 'Go to vercel.com → Account Settings → Tokens → Create. Name it "SecQA" and grant full access scope.',
    code: '# Token name: SecQA\n# Scope: Full access\n# Expires: 1 year (recommended)',
  },
  {
    title: 'Copy the access token',
    desc: 'After creating the token, copy it. Vercel only shows the token once — store it securely.',
    code: 'vercel_token_YOUR_TOKEN
  },
  {
    title: 'Connect Vercel in SecQA dashboard',
    desc: 'In SecQA → Settings → Integrations → Vercel, paste the access token. Click "Test connection" — you should see your Vercel team name and project list.',
    code: 'POST /api/integrations/vercel\n{\n  "access_token": "vercel_token_YOUR_TOKEN
  },
  {
    title: 'Select projects to index',
    desc: 'Pick which Vercel projects SecQA should index. We recommend starting with your main production application and any internal admin tools.',
    code: '# Indexed projects\nacme-web (production)\nacme-admin (production)\nacme-api-docs (production)',
  },
  {
    title: 'Configure environment variable include list',
    desc: 'Choose which environment variable names to expose to SecQA as context. SecQA only sees variable names — never values.',
    code: '# Included env var names\nNEXT_PUBLIC_APP_URL\nNEXT_PUBLIC_SENTRY_DSN\nNEXT_PUBLIC_POSTHOG_KEY\nDATABASE_URL  (name only)\nSTRIPE_PUBLIC_KEY',
  },
  {
    title: 'Verify deployment webhooks',
    desc: 'After connection, trigger a new deployment. Within 60 seconds of "Ready" state, SecQA should re-index the project. Check the integration log for confirmation.',
  },
];

const CONFIG = [
  { option: 'Access token', type: 'string', default: '—', desc: 'Vercel personal access token used for REST API authentication.' },
  { option: 'Team ID', type: 'string', default: '—', desc: 'Vercel team ID found in your team settings.' },
  { option: 'Indexed projects', type: 'string[]', default: '[]', desc: 'List of Vercel project IDs/names that SecQA is allowed to index.' },
  { option: 'Environment variable allowlist', type: 'string[]', default: '[]', desc: 'List of env var names to expose (names only, never values).' },
  { option: 'Webhook URL', type: 'string', default: '—', desc: 'SecQA webhook URL to register in Vercel for deployment events.' },
  { option: 'Re-index on production deploy', type: 'boolean', default: 'true', desc: 'Auto re-index when a production deployment completes.' },
];

const USE_CASES = [
  {
    title: 'Deployment URL in compliance answers',
    desc: 'A prospect asks "How often do you deploy to production?" SecQA queries your Vercel deployment history, calculates median deploy frequency, and writes an answer citing the last 10 production deployment URLs.',
  },
  {
    title: 'Environment isolation confirmed',
    desc: 'A question about environment isolation gets answered with a citation to your Vercel project settings showing separate preview and production environments, each with isolated env vars and DNS.',
  },
  {
    title: 'CDN and edge configuration cited',
    desc: 'A question about caching and CDN gets answered with a citation to your vercel.json configuration. The answer explains your edge function caching strategy with specific cache-control headers.',
  },
];

const FAQS = [
  {
    q: 'Does SecQA see my environment variable values?',
    a: 'No. Vercel API returns environment variable names only when listing project env vars. SecQA never sees values — we explicitly filter them out. You can further restrict access with the allowlist in settings.',
  },
  {
    q: 'My project uses Vercel Edge Functions. Will SecQA still work?',
    a: 'Yes. SecQA reads deployment metadata, project configuration (vercel.json), and project settings. Edge function code is not directly indexed — connect your GitHub repo for code-level citation.',
  },
  {
    q: 'How do deployment webhooks work?',
    a: 'SecQA registers a webhook URL in your Vercel team settings. When a production deployment reaches "Ready" state, Vercel fires the webhook. SecQA re-indexes the project within 60 seconds. No polling required.',
  },
  {
    q: 'Can I connect multiple Vercel teams?',
    a: 'Yes — connect multiple Vercel teams in Settings → Integrations → Vercel. Each team requires its own access token. Use project prefixes to distinguish deployments from different teams.',
  },
];

const RELATED = [
  { slug: 'github', name: 'GitHub', emoji: '🐙' },
  { slug: 'sentry', name: 'Sentry', emoji: '🐛' },
  { slug: 'datadog', name: 'Datadog', emoji: '📈' },
  { slug: 'postgres', name: 'Postgres', emoji: '🐘' },
];

export default function VercelIntegrationPage() {
  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Integrations</p></FadeIn>
          <FadeIn delay={0.1}>
            <div className='text-5xl mb-6'>▲</div>
            <h1 className='text-5xl md:text-6xl lg:text-[72px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Vercel + SecQA<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-8'>
              Use your Vercel deployment metadata as retrieval context for questionnaire answers. Per-environment answers, deployment URL citations, and auto-re-indexing on every production deploy.
            </p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Connect Vercel <ArrowRight size={14} />
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
              <p className='text-[14px] text-[#999999] mt-3'>Setup takes 10-15 minutes. Requires Vercel team owner access to generate an access token.</p>
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
            <h2 className='text-3xl md:text-5xl font-bold text-white tracking-tight mb-4'>Ready to connect Vercel?</h2>
            <p className='text-lg text-white/50 mb-8'>14-day paid pilot at $499. Connect Vercel in under 15 minutes.</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Start your pilot <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
