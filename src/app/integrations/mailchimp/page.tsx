'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem, SectionDivider } from '@/components/ui/motion';
import { ArrowRight, CheckCircle2, ChevronDown, Mail, Users, Tag, BarChart3, Webhook, RefreshCw, Zap } from 'lucide-react';

const FEATURES = [
  { icon: Users, title: 'Audience sync from SecQA workspace', desc: 'Push your SecQA reviewers, customers, and prospects into Mailchimp audiences. Tagged by role, region, and questionnaire volume — ready for segmented campaigns.' },
  { icon: Mail, title: 'Trust Center update campaigns', desc: 'When you publish a new SOC 2 report or update your security policy, SecQA triggers a Mailchimp campaign to all subscribers of your Trust Center. Branded templates, automated sends.' },
  { icon: Tag, title: 'Tag-based segmentation', desc: 'Mailchimp tags auto-applied based on questionnaire activity: "high-volume", "enterprise", "regulated-industry", "open-RFP". Build targeted nurture campaigns without manual list management.' },
  { icon: BarChart3, title: 'Email engagement in SecQA dashboard', desc: 'See open rates, click rates, and unsubscribe rates for Trust Center update emails directly in SecQA. No need to log into Mailchimp separately. Per-segment and per-template breakdowns.' },
  { icon: Webhook, title: 'Inbound webhook parsing', desc: 'When a prospect subscribes to your Trust Center via Mailchimp form, SecQA picks up the webhook in under 5 seconds and creates a prospect record. Auto-tag, auto-route to the right account owner.' },
  { icon: RefreshCw, title: 'Bi-directional sync', desc: 'Mailchimp unsubscribes flow back to SecQA (prospect opted out of Trust Center emails). SecQA reviewer changes flow out to Mailchimp (new reviewer added to security-team segment). Always in sync.' },
];

const STEPS = [
  {
    title: 'Generate a Mailchimp API key',
    desc: 'Log into Mailchimp → Account → Extras → API keys → Create A Key. Name it "SecQA production". Copy the key — it is shown in full only once.',
    code: '# Mailchimp API key format\n<uuid>-us12   e.g. abc123def456-us12\n\n# Datacenter suffix is part of the key\n# All API requests go to https://us12.api.mailchimp.com/3.0/',
  },
  {
    title: 'Add API key to SecQA dashboard',
    desc: 'In SecQA → Settings → Integrations → Mailchimp, paste the API key. Click "Test connection" — SecQA lists your Mailchimp audiences and confirms the datacenter.',
    code: 'POST /api/integrations/mailchimp\n{\n  "api_key": "abc123def456-us12",\n  "default_audience_id": "a1b2c3d4e5"\n}',
  },
  {
    title: 'Map SecQA roles to Mailchimp audiences',
    desc: 'Pick which Mailchimp audience each SecQA role syncs to. Default mapping: reviewers → "Security Team", customers → "Active Customers", prospects → "Trust Center Subscribers".',
    code: '# Mapping\nreviewers   → a1b2c3d4e5  (Security Team)\ncustomers   → f6g7h8i9j0  (Active Customers)\nprospects   → k1l2m3n4o5  (Trust Center Subscribers)\nadmins      → p6q7r8s9t0  (Internal Stakeholders)',
  },
  {
    title: 'Configure auto-tagging rules',
    desc: 'Define rules that auto-tag Mailchimp subscribers based on SecQA activity. Tags drive segmentation in Mailchimp campaigns — no manual list management.',
    code: '# Auto-tag rules\nquestionnaire_count > 5     → "high-volume"\nARR > 100000                → "enterprise"\nindustry == "Healthcare"     → "regulated"\nopen_questionnaires > 0      → "open-rfp"\nlast_active > 30 days ago    → "dormant"',
  },
  {
    title: 'Configure Trust Center campaign template',
    desc: 'Pick a Mailchimp template for Trust Center update emails. Default template uses merge fields: |FNAME|, |UPDATE_TITLE|, |UPDATE_SUMMARY|, |UPDATE_LINK|. Customize the template in Mailchimp.',
    code: '# Default merge fields\n|FNAME|          → recipient first name\n|UPDATE_TITLE|   → "New SOC 2 Type II report available"\n|UPDATE_SUMMARY| → 2-sentence summary of the update\n|UPDATE_LINK|    → signed URL to Trust Center doc',
  },
  {
    title: 'Trigger a test campaign',
    desc: 'In SecQA → Trust Center → Updates → New Update → "Notify subscribers". Mailchimp fires the campaign to your test audience (10 recipients max for test). Verify open rates in Mailchimp → Campaigns → Reports.',
    code: '# Expected campaign metrics\nRecipients: 10\nOpen rate:   70%+ (typical for B2B internal test)\nClick rate:  50%+ (typical for B2B internal test)\nUnsubscribes: 0',
  },
];

const CONFIG = [
  { option: 'API key', type: 'secret', default: '—', desc: 'Mailchimp API key with full access scope. Encrypted at rest with AES-256-GCM.' },
  { option: 'Default audience ID', type: 'string', default: '—', desc: 'Mailchimp audience ID used when no role-to-audience mapping is configured.' },
  { option: 'Role-to-audience mapping', type: 'object', default: '{}', desc: 'Map of SecQA roles to Mailchimp audience IDs.' },
  { option: 'Sync trigger', type: 'enum', default: 'realtime', desc: 'When to push audience updates to Mailchimp. Options: realtime, hourly-batch, nightly-batch.' },
  { option: 'Trust Center campaign template', type: 'string', default: '—', desc: 'Mailchimp template ID used for Trust Center update emails.' },
  { option: 'Auto-tag rules', type: 'object', default: '{}', desc: 'Array of { condition, tag } rules. Evaluated on every audience sync.' },
];

const USE_CASES = [
  {
    title: 'New SOC 2 report publishes → automated Trust Center campaign',
    desc: 'Your annual SOC 2 Type II audit completes. You upload the new report to SecQA Trust Center, write a 2-sentence summary, and click "Notify subscribers". Within 5 minutes, 1,200 subscribers get a branded Mailchimp email. Open rate: 48%. Click rate: 22%. No manual list exports.',
  },
  {
    title: 'High-volume prospects get targeted nurture campaign',
    desc: 'SecQA auto-tags any prospect with >5 questionnaires in the last 90 days as "high-volume". Mailchimp automatically adds them to your "Trust Center power users" segment. They get a monthly digest of new policies, new certifications, and FAQ updates — keeping them engaged between formal RFPs.',
  },
  {
    title: 'Unsubscribes flow back to SecQA',
    desc: 'A prospect unsubscribes from your Trust Center emails via Mailchimp. The webhook fires into SecQA within 5 seconds. The prospect record is marked "opted-out — do not email". Future Trust Center campaigns exclude them automatically. Compliance with CAN-SPAM and GDPR is enforced.',
  },
];

const FAQS = [
  {
    q: 'Does the integration work with Mailchimp Standard, Essentials, or Free?',
    a: 'The integration works with all Mailchimp plans including Free. However, Free is limited to 500 contacts and 1 audience — sufficient for a pilot but not production. Standard (6,000 contacts, multi-audience) is the recommended minimum for production use. Marketing API access is available on all plans.',
  },
  {
    q: 'How does SecQA handle GDPR consent?',
    a: 'SecQA only syncs subscribers with explicit marketing consent. Consent state is captured at Trust Center signup and stored as a Mailchimp merge field. Unsubscribes flow back from Mailchimp to SecQA in under 5 seconds. You can export a consent audit log from SecQA → Compliance → GDPR.',
  },
  {
    q: 'Can I use multiple Mailchimp accounts with one SecQA workspace?',
    a: 'Yes — connect multiple Mailchimp accounts in Settings → Integrations → Mailchimp. Each account requires its own API key. Use account labels (e.g., "Marketing", "Trust Center") to distinguish them. Useful for separating internal vs prospect-facing communications.',
  },
  {
    q: 'How are audience updates batched?',
    a: 'Realtime mode pushes updates within 5 seconds of any change in SecQA. Hourly batch mode groups updates into 60-minute windows (recommended for high-volume workspaces to stay under Mailchimp API rate limits). Nightly batch runs at 3 AM local time. Choose based on volume and how time-sensitive your campaigns are.',
  },
];

const RELATED = [
  { slug: 'resend', name: 'Resend', emoji: '📧' },
  { slug: 'hubspot', name: 'HubSpot', emoji: '📊' },
  { slug: 'salesforce', name: 'Salesforce', emoji: '☁️' },
  { slug: 'slack', name: 'Slack', emoji: '💬' },
];

export default function MailchimpIntegrationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Integrations</p></FadeIn>
          <FadeIn delay={0.1}>
            <div className='text-5xl mb-6'>🐵</div>
            <h1 className='text-5xl md:text-6xl lg:text-[72px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Mailchimp + SecQA<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-8'>
              Sync your SecQA audience to Mailchimp. Auto-tag subscribers based on questionnaire activity, trigger branded campaigns when your Trust Center updates, and keep unsubscribe state in sync for CAN-SPAM and GDPR compliance.
            </p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Connect Mailchimp <ArrowRight size={14} />
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
              <p className='text-[14px] text-[#999999] mt-3'>Setup takes 15-20 minutes. Requires Mailchimp account admin access to generate the API key.</p>
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
            <h2 className='text-3xl md:text-5xl font-bold text-white tracking-tight mb-4'>Ready to connect Mailchimp?</h2>
            <p className='text-lg text-white/50 mb-8'>14-day paid pilot at $499. Connect Mailchimp in under 20 minutes.</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Start your pilot <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
