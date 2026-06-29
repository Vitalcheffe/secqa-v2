'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem, SectionDivider } from '@/components/ui/motion';
import { ArrowRight, CheckCircle2, ChevronDown, Mail, Zap, Webhook, BarChart3, FileText, Code, RefreshCw } from 'lucide-react';

const FEATURES = [
  { icon: Zap, title: 'Transactional email at scale', desc: 'Send questionnaire notifications, trust-doc NDA requests, and approved-response confirmations via Resend. Sub-second send, 99.99% delivery SLA.' },
  { icon: Webhook, title: 'Inbound webhook parsing', desc: 'Forward replies from prospects to a SecQA-managed inbound address. Resend parses the reply and attaches it to the questionnaire thread automatically.' },
  { icon: Mail, title: 'Pre-built email templates', desc: 'Five production-tested templates: questionnaire received, draft ready for review, draft approved, response sent, follow-up reminder. All MJML, fully responsive.' },
  { icon: BarChart3, title: 'Delivery analytics in SecQA dashboard', desc: 'See open rates, click rates, bounce rates, and spam complaints directly in SecQA — no need to log into Resend separately. Per-template and per-recipient breakdowns.' },
  { icon: Code, title: 'React Email integration', desc: 'Edit templates with React Email components. Hot-reload preview, version control in Git, deploy via SecQA dashboard. No more template-in-a-string spaghetti.' },
  { icon: RefreshCw, title: 'Automatic retry on soft bounces', desc: 'Resend soft bounces are retried 3× with exponential backoff (1m, 5m, 30m). Hard bounces are auto-suppressed for 90 days to protect sender reputation.' },
];

const STEPS = [
  {
    title: 'Create a Resend account and verify your domain',
    desc: 'Sign up at resend.com → Domains → Add domain. Add the 3 DNS records (MX, SPF, DKIM) Resend provides. Verification takes 5-30 minutes depending on DNS propagation.',
    code: '# DNS records to add\nType  Name                Value\nTXT   @                   v=spf1 include:amazonses.com ~all\nTXT   resend._domainkey   v=DKIM1; k=rsa; p=MIIBIjANBg...\nMX    bounce.yourdomain   feedback-smtp.us-east-1.amazonses.com',
  },
  {
    title: 'Generate an API key',
    desc: 'In Resend → API Keys → Create API Key. Pick "Sending access" scope. Name it "SecQA production" and copy the key (re_xxx) — it is shown only once.',
    code: 'API key:  re_YOUR_API_KEY
  },
  {
    title: 'Add API key to SecQA dashboard',
    desc: 'In SecQA → Settings → Integrations → Resend, paste the API key and your verified sending domain. Click "Test connection" — SecQA sends a test email to your account email.',
    code: 'POST /api/integrations/resend\n{\n  "api_key": "re_YOUR_API_KEY
  },
  {
    title: 'Pick a template set (default or custom)',
    desc: 'Default templates cover the 5 most-common email types. Custom templates let you override each with React Email components — useful for branded headers, multi-language, or per-tenant styling.',
    code: '# Default templates (5)\nquestionnaire-received.mjml\ndraft-ready-for-review.mjml\ndraft-approved.mjml\nresponse-sent.mjml\nfollow-up-reminder.mjml',
  },
  {
    title: 'Configure inbound email forwarding',
    desc: 'In Resend → Webhooks → Add webhook, point the inbound URL to SecQA (provided in your dashboard). Set events to "email.bounced" and "email.delivered". For inbound replies, configure a forward rule on your support@ address.',
    code: '# Webhook URL\nPOST https://api.secqa.com/integrations/resend/webhook\n\n# Events to subscribe\nemail.delivered\nemail.bounced\nemail.complained\nemail.opened',
  },
  {
    title: 'Send a test questionnaire notification',
    desc: 'In SecQA → Questionnaires → any draft → click "Send test notification". You should receive a branded email within 5 seconds. Check Resend → Logs to confirm delivery and open events.',
    code: '# Expected events in Resend Logs\n2026-06-15 14:23:01  email.delivered   to=reviewer@yourdomain.com\n2026-06-15 14:23:48  email.opened      to=reviewer@yourdomain.com',
  },
];

const CONFIG = [
  { option: 'API key', type: 'secret', default: '—', desc: 'Resend API key with sending access scope. Encrypted at rest with AES-256-GCM.' },
  { option: 'From email', type: 'string', default: '—', desc: 'Verified sending domain and from-address. Must match a domain verified in Resend.' },
  { option: 'From name', type: 'string', default: 'SecQA', desc: 'Display name shown in recipient email clients.' },
  { option: 'Reply-to address', type: 'string', default: '—', desc: 'Address used when recipient clicks reply. Set to a SecQA-managed inbound address for auto-parsing.' },
  { option: 'Template set', type: 'enum', default: 'default', desc: 'Which template set to use. Options: default, custom. Custom set overrides per-template via React Email.' },
  { option: 'Bounce suppression window', type: 'integer', default: '90', desc: 'Days to suppress recipients after a hard bounce. Protects sender reputation.' },
];

const USE_CASES = [
  {
    title: 'Reviewer gets pinged the moment a draft is ready',
    desc: 'SecQA drafts a 187-question questionnaire in 90 minutes. The moment the draft is ready, Resend fires a branded email to the assigned reviewer with a deep link to the draft. Reviewer opens it on mobile, approves 80% of answers in 15 minutes during commute.',
  },
  {
    title: 'Prospect receives final response with attachments',
    desc: 'Reviewer approves all answers. SecQA packages the response (PDF + XLSX), uploads to a signed S3 URL, and triggers Resend with a "response-sent" template. Prospect gets a polished branded email with download links expiring in 7 days.',
  },
  {
    title: 'Auto-follow-up on stalled questionnaires',
    desc: 'A prospect has not replied in 5 days. SecQA fires a follow-up-reminder email via Resend with a single "Still need this?" CTA. One click → prospect confirms → SecQA re-opens the questionnaire thread. No manual chase needed.',
  },
];

const FAQS = [
  {
    q: 'Can I use my existing Resend account with multiple SecQA workspaces?',
    a: 'Yes. Connect the same Resend API key to multiple SecQA workspaces. Use distinct from_email subdomains (e.g., secqa-acme@acme.com, secqa-beta@acme.com) to keep analytics separate. Resend usage is billed to one account but analytics are isolated per workspace.',
  },
  {
    q: 'How are bounces and complaints handled?',
    a: 'Resend webhook events (email.bounced, email.complained) update SecQA recipient state. Hard bounces suppress the recipient for 90 days. Spam complaints suppress indefinitely and flag the questionnaire for manual follow-up. Suppression lists are exportable as CSV.',
  },
  {
    q: 'Can I send email from a subdomain (e.g., mail.yourdomain.com)?',
    a: 'Yes — and we recommend it. Subdomain isolation protects your primary domain reputation if questionnaire emails trigger spam complaints. Verify the subdomain in Resend → Domains, then set from_email to secqa@mail.yourdomain.com in SecQA.',
  },
  {
    q: 'What is the difference between Resend and plain SMTP?',
    a: 'Resend gives you a managed API with delivery analytics, bounce handling, DKIM/SPF auto-management, React Email templating, and 99.99% delivery SLA. SMTP requires you to manage all of this. For questionnaire workflows, Resend is strictly better — and cheaper at typical volumes.',
  },
];

const RELATED = [
  { slug: 'mailchimp', name: 'Mailchimp', emoji: '🐵' },
  { slug: 'hubspot', name: 'HubSpot', emoji: '📊' },
  { slug: 'slack', name: 'Slack', emoji: '💬' },
  { slug: 'stripe', name: 'Stripe', emoji: '💳' },
];

export default function ResendIntegrationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Integrations</p></FadeIn>
          <FadeIn delay={0.1}>
            <div className='text-5xl mb-6'>📧</div>
            <h1 className='text-5xl md:text-6xl lg:text-[72px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Resend + SecQA<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-8'>
              Send branded questionnaire notifications, review reminders, and approved-response emails via Resend. React Email templates, delivery analytics in your dashboard, automatic bounce handling. Sub-second sends at scale.
            </p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Connect Resend <ArrowRight size={14} />
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
              <p className='text-[14px] text-[#999999] mt-3'>Setup takes 30-60 minutes — most of it waiting for DNS propagation. Requires DNS admin access to your sending domain.</p>
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
            <h2 className='text-3xl md:text-5xl font-bold text-white tracking-tight mb-4'>Ready to connect Resend?</h2>
            <p className='text-lg text-white/50 mb-8'>14-day paid pilot at $499. Connect Resend in under 30 minutes.</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Start your pilot <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
