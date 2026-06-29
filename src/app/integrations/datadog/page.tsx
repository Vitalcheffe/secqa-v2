'use client';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem, SectionDivider } from '@/components/ui/motion';
import { ArrowRight, CheckCircle2, AlertCircle, Zap, Activity, Users, FileText, Webhook, Settings, TrendingUp } from 'lucide-react';

const FEATURES = [
  { icon: Activity, title: 'Monitoring metrics as answer source', desc: 'SecQA ingests Datadog uptime, error rate, and alert history. Questionnaire answers cite real monitoring data — not aspirations.' },
  { icon: TrendingUp, title: 'SLA performance cited in answers', desc: 'When a prospect asks "What is your uptime?", SecQA queries Datadog SLA reports and writes an answer citing the actual uptime number for the last 12 months.' },
  { icon: FileText, title: 'Alert policy citations', desc: 'Questionnaire answers about incident detection cite your Datadog alert policies with specific thresholds, notification channels, and escalation rules.' },
  { icon: Users, title: 'Synthetic test results', desc: 'SecQA pulls synthetic test results from Datadog. Answers about service availability cite the actual synthetic test names and last 30-day success rates.' },
  { icon: Webhook, title: 'Incident webhook sync', desc: 'Datadog incident webhooks create SecQA timeline entries. Use incident history as cited evidence for post-mortem questions.' },
  { icon: Settings, title: 'Dashboard embedding for trust center', desc: 'Embed public Datadog dashboards (uptime, response time) on your SecQA Trust Center. Prospects see live operational metrics.' },
];

const STEPS = [
  {
    title: 'Create a Datadog API key and App key',
    desc: 'Go to Datadog → Integrations → APIs → API Keys → New API Key. Name it "SecQA". Then create an Application Key with the same name.',
    code: '# API Key name: SecQA\n# App Key name: SecQA\n# Scopes: read_only (recommended)',
  },
  {
    title: 'Copy both keys',
    desc: 'After creating both keys, copy them. You will paste both into SecQA — API key for authentication, App key for scoped permissions.',
    code: 'API Key:  YOUR_API_KEY\nApp Key:   YOUR_APP_KEY',
  },
  {
    title: 'Connect Datadog in SecQA dashboard',
    desc: 'In SecQA → Settings → Integrations → Datadog, paste the API key and App key. Pick your Datadog site (US1, US3, US5, EU, GOV). Click "Test connection".',
    code: 'POST /api/integrations/datadog\n{\n  "api_key": "YOUR_API_KEY",\n  "app_key": "YOUR_APP_KEY",\n  "site": "datadoghq.com"\n}',
  },
  {
    title: 'Select monitors and dashboards to index',
    desc: 'Pick which Datadog monitors and dashboards SecQA should index. We recommend: uptime monitors, error rate alerts, latency dashboards, and incident history.',
    code: '# Indexed resources\nMonitors:  api-uptime, web-uptime, db-connections\nDashboards: sla-overview, error-budget, incident-history\nSynthetics: login-flow, signup-flow, checkout-flow',
  },
  {
    title: 'Configure incident webhook (optional)',
    desc: 'In Datadog → Monitors → New Monitor → Webhook, add the SecQA webhook URL. When Datadog declares an incident, SecQA logs a timeline entry for compliance use.',
    code: '# Webhook config\nURL: https://api.secqa.com/integrations/datadog/webhook\nPayload: {"title":"$EVENT_TITLE","severity":"$ALERT_STATUS","url":"$EVENT_URL"}',
  },
  {
    title: 'Embed public dashboard on Trust Center (optional)',
    desc: 'In Datadog → Dashboards → Make Public. Copy the embed URL. Add to SecQA → Trust Center → Embeds. Prospects see live uptime and response time metrics.',
  },
];

const CONFIG = [
  { option: 'API key', type: 'string', default: '—', desc: 'Datadog API key for authentication.' },
  { option: 'App key', type: 'string', default: '—', desc: 'Datadog Application Key for scoped permissions.' },
  { option: 'Site', type: 'enum', default: 'datadoghq.com', desc: 'Datadog site (US1, US3, US5, EU, GOV).' },
  { option: 'Indexed monitors', type: 'string[]', default: '[]', desc: 'List of Datadog monitor IDs to index as answer sources.' },
  { option: 'Indexed dashboards', type: 'string[]', default: '[]', desc: 'List of Datadog dashboard IDs to index as answer sources.' },
  { option: 'Incident webhook URL', type: 'string', default: '—', desc: 'SecQA webhook URL for Datadog incident notifications.' },
];

const USE_CASES = [
  {
    title: 'SLA uptime cited from Datadog reports',
    desc: 'A prospect asks "What was your uptime over the last 12 months?" SecQA queries Datadog SLA reports, calculates 99.97% uptime, and writes an answer citing the monitor name and time range.',
  },
  {
    title: 'Incident detection cited from alert policies',
    desc: 'A question about incident detection gets answered with a citation to your Datadog alert policies: API error rate > 1% for 5 minutes triggers PagerDuty, with 2-minute escalation to engineering lead.',
  },
  {
    title: 'Live trust center with embedded dashboards',
    desc: 'A prospect visits your Trust Center and sees a live Datadog dashboard showing 99.97% uptime over the last 30 days, current response time percentiles, and recent incident count. No static screenshots — live data.',
  },
];

const FAQS = [
  {
    q: 'Does SecQA need write access to my Datadog account?',
    a: 'No. SecQA uses the API key for authentication and App key for scoped read-only permissions. We never mute monitors, acknowledge alerts, or modify dashboards. Read-only by design.',
  },
  {
    q: 'My Datadog account has multiple orgs. Can I connect all?',
    a: 'Yes — connect multiple Datadog orgs in Settings → Integrations → Datadog. Each org requires its own API key and App key. Use site prefixes to distinguish monitors from different orgs.',
  },
  {
    q: 'How often is Datadog data re-indexed?',
    a: 'Default is hourly. SLA uptime numbers are pulled fresh on every questionnaire generation. Incident history is pulled nightly. Webhook-driven updates run within 60 seconds of any incident state change.',
  },
  {
    q: 'Can I embed private Datadog dashboards on Trust Center?',
    a: 'No. Trust Center embeds require Datadog public dashboards. Private dashboards would require prospects to authenticate, defeating the self-serve purpose. Create a sanitised public dashboard with only the metrics you want to expose.',
  },
];

const RELATED = [
  { slug: 'sentry', name: 'Sentry', emoji: '🐛' },
  { slug: 'vercel', name: 'Vercel', emoji: '▲' },
  { slug: 'aws', name: 'AWS', emoji: '☁️' },
  { slug: 'github', name: 'GitHub', emoji: '🐙' },
];

export default function DatadogIntegrationPage() {
  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Integrations</p></FadeIn>
          <FadeIn delay={0.1}>
            <div className='text-5xl mb-6'>📈</div>
            <h1 className='text-5xl md:text-6xl lg:text-[72px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Datadog + SecQA<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-8'>
              Use your Datadog uptime, SLA, and incident data as cited evidence in questionnaire answers. Embed live dashboards on your Trust Center. Monitoring data, not marketing copy.
            </p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Connect Datadog <ArrowRight size={14} />
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
              <p className='text-[14px] text-[#999999] mt-3'>Setup takes 15-20 minutes. Requires Datadog admin access to generate API and App keys.</p>
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
            <h2 className='text-3xl md:text-5xl font-bold text-white tracking-tight mb-4'>Ready to connect Datadog?</h2>
            <p className='text-lg text-white/50 mb-8'>14-day paid pilot at $499. Connect Datadog in under 20 minutes.</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Start your pilot <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
