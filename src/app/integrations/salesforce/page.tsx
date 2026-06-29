'use client';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem, SectionDivider } from '@/components/ui/motion';
import { ArrowRight, CheckCircle2, AlertCircle, Zap, TrendingUp, Users, FileText, Webhook, Settings, Target } from 'lucide-react';

const FEATURES = [
  { icon: Target, title: 'Opportunity-aware questionnaire routing', desc: 'When a questionnaire arrives, SecQA auto-attaches it to the matching Salesforce opportunity based on account domain or contact email.' },
  { icon: TrendingUp, title: 'Compliance work as opportunity field', desc: 'Push questionnaire status, AI confidence score, and reviewer SLA to custom fields on the Salesforce opportunity object.' },
  { icon: FileText, title: 'Auto-attach approved responses as Files', desc: 'Approved questionnaire responses are uploaded as Files on the opportunity with full Q&A text and source citations.' },
  { icon: Users, title: 'Owner-based reviewer assignment', desc: 'Use Salesforce opportunity owner as the default questionnaire reviewer. Auto-assign to the AE or CSM who owns the relationship.' },
  { icon: Webhook, title: 'Flow and Apex triggers', desc: 'Trigger Salesforce Flows or Apex invocable actions on questionnaire status changes. Build custom automation in your existing Salesforce workflow.' },
  { icon: Settings, title: 'Custom field mapping with CPQ support', desc: 'Map SecQA questionnaire fields to any Salesforce custom field including CPQ quote line items. Two-way sync supported.' },
];

const STEPS = [
  {
    title: 'Create a Connected App in Salesforce Setup',
    desc: 'Go to Setup → App Manager → New Connected App. Name it "SecQA", set the callback URL, and enable OAuth settings.',
    code: '# Connected app name: SecQA\n# API name: SecQA\n# Contact email: founder@secqa.example\n# Callback URL: https://api.secqa.com/integrations/salesforce/callback',
  },
  {
    title: 'Configure OAuth scopes',
    desc: 'Add the OAuth scopes required for CRM object access and API integration.',
    code: 'Access and manage your data (api)\nPerform requests on your behalf at any time (refresh_token, offline_access)\nAccess your basic information (id, profile, email)',
  },
  {
    title: 'Copy Consumer Key and Consumer Secret',
    desc: 'After saving, copy the Consumer Key and Consumer Secret from the connected app details page. You will paste these into SecQA.',
    code: 'Consumer Key:    3MVG9_YOUR_CONSUMER_KEY
  },
  {
    title: 'Connect Salesforce in SecQA dashboard',
    desc: 'In SecQA → Settings → Integrations → Salesforce, click "Connect". You will be redirected to Salesforce login. Authorize SecQA — you will be returned to the dashboard.',
    code: 'OAuth flow:\nGET https://login.salesforce.com/services/oauth2/authorize\n  ?response_type=code\n  &client_id=3MVG9_YOUR_CONSUMER_KEY
  },
  {
    title: 'Map questionnaire fields to Salesforce opportunity fields',
    desc: 'Choose which questionnaire metadata (status, AI confidence, reviewer, SLA) maps to which Salesforce opportunity fields. Create custom fields in Setup if needed.',
    code: '# Field mapping\nquestionnaire_status__c → AI_confidence__c\nreviewer_email__c       → Reviewer_Email__c\nsla_deadline__c         → SLA_Deadline__c',
  },
  {
    title: 'Configure Flow triggers (optional)',
    desc: 'In Salesforce Setup → Flows, create a record-triggered flow on Opportunity update. Trigger when questionnaire_status__c changes — send Slack alert, create task, or fire Apex action.',
  },
];

const CONFIG = [
  { option: 'Consumer Key', type: 'string', default: '—', desc: 'Salesforce Connected App Consumer Key for OAuth authentication.' },
  { option: 'Consumer Secret', type: 'string', default: '—', desc: 'Salesforce Connected App Consumer Secret for OAuth authentication.' },
  { option: 'Refresh token', type: 'string', default: '—', desc: 'OAuth refresh token issued by Salesforce. Auto-rotated by SecQA.' },
  { option: 'Instance URL', type: 'string', default: '—', desc: 'Salesforce instance URL (e.g., https://acme.my.salesforce.com).' },
  { option: 'Auto-attach strategy', type: 'enum', default: 'domain', desc: 'How SecQA matches inbound questionnaires to Salesforce opportunities: domain, contact_email, or account_name.' },
  { option: 'Field mapping', type: 'object', default: '{}', desc: 'Map of SecQA questionnaire fields to Salesforce opportunity custom fields.' },
];

const USE_CASES = [
  {
    title: 'AE sees questionnaire status in opportunity layout',
    desc: 'A prospect sends a 187-question security questionnaire. SecQA auto-attaches it to the matching Salesforce opportunity. The AE sees questionnaire status, AI confidence, and reviewer assignment in the opportunity layout — no context switch.',
  },
  {
    title: 'Flow triggers CSM ping when SLA at risk',
    desc: 'A questionnaire is 24 hours from SLA breach. SecQA updates the SLA_Deadline__c field on the opportunity. A Salesforce Flow fires, creating a task for the CSM and pinging them in Slack: "Follow up with security on opportunity X."',
  },
  {
    title: 'CPQ quote requires approved questionnaire',
    desc: 'Before a CPQ quote can be sent, an approval step checks that all compliance questionnaires on the opportunity are in "approved" state. Configured via Salesforce Flow — no SecQA custom code needed.',
  },
];

const FAQS = [
  {
    q: 'Does this integration work with Salesforce Professional edition?',
    a: 'No. Salesforce API access requires Enterprise edition or higher (Developer, Enterprise, Unlimited, Performance). Professional edition does not include API access and cannot connect to SecQA.',
  },
  {
    q: 'Can I use a Salesforce Sandbox for testing?',
    a: 'Yes. Use the sandbox login URL (test.salesforce.com) when authorizing SecQA. All questionnaire data flows to sandbox only. When ready to go live, disconnect sandbox and connect production — no re-configuration needed.',
  },
  {
    q: 'How does SecQA handle Salesforce API rate limits?',
    a: 'SecQA batches API calls and respects Salesforce per-hour API limits. Default is 100 calls per hour per integration — well within Enterprise edition limits. You can adjust the rate limit in settings if your org is shared with other integrations.',
  },
  {
    q: 'My org uses CPQ. Will the integration conflict?',
    a: 'No. SecQA reads and writes standard opportunity fields plus your custom fields. CPQ quote line items are never modified. If you map questionnaire_status to a CPQ custom field, ensure the field is included in your CPQ quote template.',
  },
];

const RELATED = [
  { slug: 'hubspot', name: 'HubSpot', emoji: '📊' },
  { slug: 'slack', name: 'Slack', emoji: '💬' },
  { slug: 'jira', name: 'Jira', emoji: '🎫' },
  { slug: 'okta', name: 'Okta', emoji: '🔐' },
];

export default function SalesforceIntegrationPage() {
  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Integrations</p></FadeIn>
          <FadeIn delay={0.1}>
            <div className='text-5xl mb-6'>☁️</div>
            <h1 className='text-5xl md:text-6xl lg:text-[72px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Salesforce + SecQA<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-8'>
              Auto-attach questionnaire responses to Salesforce opportunities, push compliance status to custom fields, and trigger Flows when SLAs are at risk. Built for revenue teams running SFDC as their CRM of record.
            </p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Connect Salesforce <ArrowRight size={14} />
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
              <p className='text-[14px] text-[#999999] mt-3'>Setup takes 30-45 minutes. Requires Salesforce System Administrator profile to create the Connected App.</p>
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
            <h2 className='text-3xl md:text-5xl font-bold text-white tracking-tight mb-4'>Ready to connect Salesforce?</h2>
            <p className='text-lg text-white/50 mb-8'>14-day paid pilot at $499. Connect Salesforce in under 45 minutes.</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Start your pilot <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
