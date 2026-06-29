'use client';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem, SectionDivider } from '@/components/ui/motion';
import { ArrowRight, CheckCircle2, AlertCircle, Zap, TrendingUp, Users, FileText, Webhook, Settings, Target } from 'lucide-react';

const FEATURES = [
  { icon: Target, title: 'Deal-aware questionnaire routing', desc: 'When a questionnaire arrives, SecQA auto-attaches it to the matching HubSpot opportunity based on customer email or domain.' },
  { icon: TrendingUp, title: 'Forecast compliance work as deal risk', desc: 'See which deals have open questionnaires, AI confidence score, and reviewer SLA status directly in the HubSpot deal pipeline.' },
  { icon: FileText, title: 'Auto-attach approved responses', desc: 'Approved questionnaire responses are pushed as a note on the HubSpot opportunity with full Q&A text and citation links.' },
  { icon: Users, title: 'Owner-based reviewer assignment', desc: 'Use HubSpot deal owner as the default questionnaire reviewer. Auto-assign to the AE or CSM who owns the relationship.' },
  { icon: Webhook, title: 'Workflow triggers', desc: 'Trigger HubSpot workflows on questionnaire status changes: send Slack alert, create task, move deal stage, ping deal owner.' },
  { icon: Settings, title: 'Custom field mapping', desc: 'Map SecQA questionnaire fields to any HubSpot custom property. Two-way sync keeps both systems in lock-step.' },
];

const STEPS = [
  {
    title: 'Create a HubSpot private app',
    desc: 'Go to HubSpot → Settings → Integrations → Private Apps → Create a private app. Name it "SecQA".',
    code: '# App name: SecQA\n# Description: Questionnaire automation integration',
  },
  {
    title: 'Configure OAuth scopes',
    desc: 'Add the scopes required for deal, contact, company, and activity access.',
    code: 'crm.objects.companies.read\ncrm.objects.companies.write\ncrm.objects.deals.read\ncrm.objects.deals.write\ncrm.objects.contacts.read\ncrm.schemas.deals.read\ncrm.schemas.companies.read',
  },
  {
    title: 'Copy the access token',
    desc: 'After saving, copy the access token from the private app details page. Store it securely — HubSpot only shows it once.',
    code: 'Access token: pat-na1-YOUR_PAT
  },
  {
    title: 'Connect HubSpot in SecQA dashboard',
    desc: 'In SecQA → Settings → Integrations → HubSpot, paste the access token. Click "Test connection" — you should see your HubSpot account name and portal ID.',
    code: 'POST /api/integrations/hubspot\n{\n  "access_token": "pat-na1-...",\n  "portal_id": "12345678"\n}',
  },
  {
    title: 'Map questionnaire fields to HubSpot deal properties',
    desc: 'Choose which questionnaire metadata (status, AI confidence, reviewer, SLA) maps to which HubSpot deal properties. Create custom properties if needed.',
    code: '# Field mapping\nquestionnaire_status → dealstage (custom)\nai_confidence       → hs_questionnaire_confidence\nreviewer_email      → hs_questionnaire_reviewer\nsla_deadline        → hs_questionnaire_sla',
  },
  {
    title: 'Configure workflow triggers (optional)',
    desc: 'In HubSpot Workflows, create triggers based on SecQA questionnaire events. Example: when questionnaire_status = "blocked", notify deal owner in Slack.',
  },
];

const CONFIG = [
  { option: 'Private app access token', type: 'string', default: '—', desc: 'HubSpot private app token used for CRM API authentication.' },
  { option: 'Portal ID', type: 'integer', default: '—', desc: 'HubSpot account portal ID. Found in your HubSpot URL.' },
  { option: 'Default deal stage', type: 'string', default: '—', desc: 'HubSpot deal stage applied when a questionnaire is auto-attached to a new opportunity.' },
  { option: 'Auto-attach strategy', type: 'enum', default: 'domain', desc: 'How SecQA matches inbound questionnaires to HubSpot deals: domain, contact_email, or company_name.' },
  { option: 'SLA reminder workflow', type: 'boolean', default: 'true', desc: 'Trigger a HubSpot workflow when a questionnaire SLA is at risk (24h before deadline).' },
  { option: 'Field mapping', type: 'object', default: '{}', desc: 'Map of SecQA questionnaire fields to HubSpot deal custom properties.' },
];

const USE_CASES = [
  {
    title: 'AE sees questionnaire status in deal pipeline',
    desc: 'A prospect sends a 200-question security questionnaire. SecQA auto-attaches it to the matching HubSpot deal. The AE sees questionnaire status, AI confidence, and reviewer assignment in their pipeline view — no context switch.',
  },
  {
    title: 'SLA at risk triggers deal owner ping',
    desc: 'A questionnaire is 24 hours from SLA breach and still in "review" state. SecQA fires a HubSpot workflow that pings the deal owner in Slack and creates a task: "Follow up with security team on questionnaire X."',
  },
  {
    title: 'Closed-won deal logs compliance work for renewal',
    desc: 'When a deal closes won, SecQA logs all questionnaire work as notes on the deal. At renewal time, the CSM sees exactly which answers were approved and can pre-empt the next questionnaire with the same responses.',
  },
];

const FAQS = [
  {
    q: 'Do I need a HubSpot Marketing Hub or Sales Hub seat for this integration?',
    a: 'You need at least one Sales Hub Professional seat to use deal-based routing and workflow triggers. Marketing Hub-only accounts can use contact-based routing but cannot attach questionnaires to deal records.',
  },
  {
    q: 'How does SecQA match inbound questionnaires to HubSpot deals?',
    a: 'Default strategy is domain match: the prospect email domain is matched against HubSpot companies, then deals associated with that company. You can switch to contact_email or company_name matching in settings.',
  },
  {
    q: 'My HubSpot uses custom deal stages. Will SecQA break them?',
    a: 'No. SecQA never overwrites deal stage unless you explicitly map questionnaire_status → dealstage. By default we create a custom property hs_questionnaire_status and leave your pipeline stages untouched.',
  },
  {
    q: 'Can I use HubSpot Sandbox for testing?',
    a: 'Yes. Connect your sandbox portal ID and access token. All questionnaire data flows to sandbox only. When ready to go live, swap to production credentials — no re-configuration needed.',
  },
];

const RELATED = [
  { slug: 'salesforce', name: 'Salesforce', emoji: '☁️' },
  { slug: 'slack', name: 'Slack', emoji: '💬' },
  { slug: 'linear', name: 'Linear', emoji: '📋' },
  { slug: 'notion', name: 'Notion', emoji: '📝' },
];

export default function HubspotIntegrationPage() {
  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Integrations</p></FadeIn>
          <FadeIn delay={0.1}>
            <div className='text-5xl mb-6'>📊</div>
            <h1 className='text-5xl md:text-6xl lg:text-[72px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              HubSpot + SecQA<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-8'>
              Auto-attach questionnaire responses to HubSpot deals, forecast compliance work as deal risk, and trigger workflows when SLAs are at risk. The CRM integration SaaS teams actually use.
            </p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Connect HubSpot <ArrowRight size={14} />
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
              <p className='text-[14px] text-[#999999] mt-3'>Setup takes 20-30 minutes. Requires HubSpot Super Admin access to create a private app.</p>
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
            <h2 className='text-3xl md:text-5xl font-bold text-white tracking-tight mb-4'>Ready to connect HubSpot?</h2>
            <p className='text-lg text-white/50 mb-8'>14-day paid pilot at $499. Connect HubSpot in under 30 minutes.</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Start your pilot <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
