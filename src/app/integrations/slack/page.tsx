'use client';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem, SectionDivider } from '@/components/ui/motion';
import { ArrowRight, CheckCircle2, AlertCircle, Zap, Bell, FileText, Users, Webhook, Settings } from 'lucide-react';

const FEATURES = [
  { icon: Bell, title: 'Real-time notifications', desc: 'Get instant Slack alerts when a new questionnaire arrives, an answer needs review, or a response is approved and ready to send.' },
  { icon: Webhook, title: 'Bi-directional webhook sync', desc: 'Trigger SecQA workflows from Slack commands. Approve answers, escalate blockers, and assign reviewers without leaving the channel.' },
  { icon: Users, title: 'Channel-based routing', desc: 'Route security questionnaires to #security-review, legal questionnaires to #legal-review, and infrastructure questions to #eng-review automatically.' },
  { icon: FileText, title: 'Document sharing', desc: 'Push approved responses, trust documents, and SOC 2 reports to shared Slack channels for prospect-facing teams.' },
  { icon: Zap, title: 'Slash commands', desc: 'Use /secqa-lookup, /secqa-status, /secqa-assign, and /secqa-approve to manage questionnaire workflow directly in Slack.' },
  { icon: Settings, title: 'Custom notification rules', desc: 'Per-questionnaire-tier SLA alerts, escalation chains, and quiet hours. Only get pinged when it matters.' },
];

const STEPS = [
  {
    title: 'Create a Slack app in your workspace',
    desc: 'Go to api.slack.com/apps → Create New App → From scratch. Name it "SecQA" and pick your workspace.',
    code: '# App name: SecQA\n# Short description: SecQA questionnaire automation\n# Workspace: Your workspace',
  },
  {
    title: 'Configure OAuth scopes',
    desc: 'Add the bot token scopes required for notifications, slash commands, and channel routing.',
    code: 'chat:write\nchannels:read\ngroups:read\ncommands\nfiles:write\nusers:read.email',
  },
  {
    title: 'Install the app and copy credentials',
    desc: 'Install to workspace, then copy the Bot User OAuth Token (xoxb-) and Signing Secret from the Basic Information page.',
    code: 'Bot token:  xoxb-1234567890-abcdef...\nSigning:    8f7e6d5c4b3a2918070605...',
  },
  {
    title: 'Add credentials to SecQA dashboard',
    desc: 'In SecQA → Settings → Integrations → Slack, paste the bot token and signing secret. Click "Test connection" — you should see a confirmation message in your #general channel.',
    code: 'POST /api/integrations/slack\n{\n  "bot_token": "xoxb-...",\n  "signing_secret": "8f7e6d5c..."\n}',
  },
  {
    title: 'Map Slack channels to questionnaire categories',
    desc: 'Configure routing rules so inbound questionnaires land in the right channel. Set SLA reminders and escalation chains.',
    code: '# Routing rules\nsecurity  → #security-review  (24h SLA)\nlegal     → #legal-review     (48h SLA)\ninfra     → #eng-review       (72h SLA)\nproduct   → #product-review   (48h SLA)',
  },
  {
    title: 'Invite @SecQA to your channels',
    desc: 'Mention @SecQA in any channel and type "/secqa-help" to see all available commands. You are live.',
  },
];

const CONFIG = [
  { option: 'Webhook signing secret', type: 'string', default: '—', desc: 'Slack signing secret used to verify inbound webhook payloads.' },
  { option: 'Default notification channel', type: 'channel', default: '#secqa-alerts', desc: 'Fallback channel for unmatched questionnaire categories.' },
  { option: 'Quiet hours', type: 'time range', default: '22:00-08:00 UTC', desc: 'Suppress non-urgent notifications during specified hours.' },
  { option: 'SLA escalation chain', type: 'user list', default: '@security-lead', desc: 'Slack users to ping when a questionnaire SLA is at risk.' },
  { option: 'Auto-approve threshold', type: 'integer', default: '95', desc: 'Confidence threshold above which AI answers are auto-approved and posted to the channel.' },
  { option: 'Slash command prefix', type: 'string', default: '/secqa', desc: 'Custom prefix for SecQA slash commands. Useful if /secqa conflicts with another integration.' },
];

const USE_CASES = [
  {
    title: 'Prospect questionnaire arrives in #sales-ops',
    desc: 'A 187-question security questionnaire lands in HubSpot. SecQA detects it, posts a card to #sales-ops with the questionnaire summary, AI confidence score, and a "Generate draft" button. The rep clicks, gets a 90%-complete draft in 90 minutes.',
  },
  {
    title: 'Engineering reviewer paged for infra questions',
    desc: 'SecQA routes all AWS/VPC/KMS-tagged questions to #eng-review with @here ping. Engineer answers in a Slack thread. SecQA ingests the thread, formats the answer, and updates the questionnaire draft automatically.',
  },
  {
    title: 'Legal escalation on data-processing clause',
    desc: 'Question 42 asks about DPA terms. SecQA flags it as legal-sensitive and pings #legal-review with the question text and 3 historical answers. Legal picks one, edits inline in Slack, SecQA confirms and ships to prospect.',
  },
];

const FAQS = [
  {
    q: 'My Slack workspace requires SSO. Will the integration still work?',
    a: 'Yes. The SecQA Slack app uses OAuth bot tokens that are independent of your SSO login. Once an admin installs the app, it works for all workspace members regardless of SSO configuration.',
  },
  {
    q: 'Can I have multiple SecQA workspaces in one Slack workspace?',
    a: 'Yes — install the app once and configure multiple SecQA workspace connections in Settings → Integrations → Slack. Use channel prefixes (e.g., #acme-secqa, #beta-secqa) to route notifications to the right workspace.',
  },
  {
    q: 'I am not seeing slash commands after install.',
    a: 'Slash commands require the commands OAuth scope and a Request URL configured in your Slack app settings. Re-check both — the Request URL should point to https://api.secqa.com/integrations/slack/commands. Allow up to 5 minutes for Slack to propagate command changes.',
  },
  {
    q: 'How do I mute notifications during on-call shifts?',
    a: 'In Settings → Integrations → Slack → Quiet hours, set a per-user schedule. You can also use /secqa-mute for temporary silences (default 4 hours) and /secqa-unmute to resume.',
  },
];

const RELATED = [
  { slug: 'hubspot', name: 'HubSpot', emoji: '📊' },
  { slug: 'linear', name: 'Linear', emoji: '📋' },
  { slug: 'notion', name: 'Notion', emoji: '📝' },
  { slug: 'github', name: 'GitHub', emoji: '🐙' },
];

export default function SlackIntegrationPage() {
  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Integrations</p></FadeIn>
          <FadeIn delay={0.1}>
            <div className='text-5xl mb-6'>💬</div>
            <h1 className='text-5xl md:text-6xl lg:text-[72px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Slack + SecQA<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-8'>
              Get instant Slack alerts when a questionnaire arrives, route questions to the right reviewer, and approve answers without leaving the channel. The fastest way to ship questionnaire responses without email threads.
            </p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Connect Slack <ArrowRight size={14} />
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
              <p className='text-[14px] text-[#999999] mt-3'>Most teams complete setup in under 30 minutes. No engineering required — workspace admin permissions only.</p>
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
            <h2 className='text-3xl md:text-5xl font-bold text-white tracking-tight mb-4'>Ready to connect Slack?</h2>
            <p className='text-lg text-white/50 mb-8'>14-day paid pilot at $499. Connect Slack in under 30 minutes.</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Start your pilot <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
