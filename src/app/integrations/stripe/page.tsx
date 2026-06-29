'use client';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem, SectionDivider } from '@/components/ui/motion';
import { ArrowRight, CheckCircle2, AlertCircle, Zap, CreditCard, Users, FileText, Webhook, Settings, Shield } from 'lucide-react';

const FEATURES = [
  { icon: CreditCard, title: 'Payment data as answer source', desc: 'SecQA ingests Stripe account configuration, payment methods, and PCI compliance status. Questionnaire answers cite real Stripe configuration.' },
  { icon: Shield, title: 'PCI DSS scope cited automatically', desc: 'When a prospect asks about PCI compliance, SecQA cites your Stripe usage: Stripe.js + Stripe Elements for card capture, no card data on your servers.' },
  { icon: FileText, title: 'Webhook signature verification cited', desc: 'Questionnaire answers about webhook security cite your Stripe webhook signature verification configuration with specific endpoint URLs.' },
  { icon: Users, title: 'Customer portal and subscription data', desc: 'SecQA ingests Stripe customer portal configuration. Answers about subscription management cite actual portal settings.' },
  { icon: Webhook, title: 'Subscription lifecycle sync', desc: 'Stripe subscription events (created, updated, canceled) sync to SecQA in real time. Map questionnaire work to subscription status.' },
  { icon: Settings, title: 'Per-account access control', desc: 'Connect Stripe in test mode first, then production. Restrict SecQA to specific product IDs and price IDs.' },
];

const STEPS = [
  {
    title: 'Create a Stripe restricted API key',
    desc: 'Go to Stripe Dashboard → Developers → API Keys → Create restricted key. Name it "SecQA". Grant read-only scopes.',
    code: '# Key name: SecQA\n# Permissions (read-only):\n#   - Charges: Read\n#   - Customers: Read\n#   - Subscriptions: Read\n#   - Webhook endpoints: Read\n#   - Products: Read\n#   - Prices: Read',
  },
  {
    title: 'Copy the restricted API key',
    desc: 'After creating the key, copy it. Stripe only shows the key once — store it securely.',
    code: 'rk_test_YOUR_RESTRICTED_KEY
  },
  {
    title: 'Connect Stripe in SecQA dashboard',
    desc: 'In SecQA → Settings → Integrations → Stripe, paste the API key. Choose mode: Test or Live. Click "Test connection".',
    code: 'POST /api/integrations/stripe\n{\n  "api_key": "rk_test_YOUR_RESTRICTED_KEY
  },
  {
    title: 'Configure webhook endpoint (optional)',
    desc: 'In Stripe Dashboard → Developers → Webhooks → Add endpoint. Add the SecQA webhook URL. Select events: customer.subscription.created, updated, deleted.',
    code: '# Webhook config\nURL: https://api.secqa.com/integrations/stripe/webhook\nEvents:\n  - customer.subscription.created\n  - customer.subscription.updated\n  - customer.subscription.deleted\n  - invoice.payment_succeeded',
  },
  {
    title: 'Map subscription tiers to questionnaire SLAs',
    desc: 'Map Stripe price IDs to SecQA questionnaire tiers. Free tier gets 7-day SLA, Pro tier gets 48-hour SLA, Enterprise tier gets 24-hour SLA.',
    code: '# Mapping\nprice_free       → tier_free    (7d SLA)\nprice_pro         → tier_pro      (48h SLA)\nprice_enterprise  → tier_enterprise (24h SLA)',
  },
  {
    title: 'Verify with a sample questionnaire',
    desc: 'Run a sample questionnaire. PCI-related questions should cite your Stripe configuration: Stripe.js, Elements, no card data storage, webhook signature verification.',
  },
];

const CONFIG = [
  { option: 'API key', type: 'string', default: '—', desc: 'Stripe restricted API key with read-only scopes.' },
  { option: 'Mode', type: 'enum', default: 'test', desc: 'Stripe mode: test or live.' },
  { option: 'Account ID', type: 'string', default: '—', desc: 'Stripe account ID (acct_xxx).' },
  { option: 'Webhook signing secret', type: 'string', default: '—', desc: 'Stripe webhook endpoint signing secret for signature verification.' },
  { option: 'Subscription tier mapping', type: 'object', default: '{}', desc: 'Map of Stripe price IDs to SecQA questionnaire tiers.' },
  { option: 'Indexed products', type: 'string[]', default: '[]', desc: 'List of Stripe product IDs to index. Empty = all products.' },
];

const USE_CASES = [
  {
    title: 'PCI DSS scope cited from Stripe configuration',
    desc: 'A prospect asks "Are you PCI DSS compliant?" SecQA queries your Stripe configuration, identifies Stripe.js + Elements usage, and writes an answer: "We use Stripe for all card processing. We never touch card data — SAQ A scope."',
  },
  {
    title: 'Subscription tier drives questionnaire SLA',
    desc: 'A prospect on the Enterprise plan submits a questionnaire. SecQA looks up their Stripe subscription, identifies them as Enterprise tier, and assigns a 24-hour SLA instead of the default 48-hour.',
  },
  {
    title: 'Webhook signature verification cited',
    desc: 'A question about webhook security gets answered with a citation to your Stripe webhook configuration: signature verification enabled, 5-minute tolerance, idempotency keys for retry handling.',
  },
];

const FAQS = [
  {
    q: 'Does SecQA need write access to my Stripe account?',
    a: 'No. The recommended restricted API key has read-only scopes: charges, customers, subscriptions, webhook endpoints, products, prices. SecQA never issues refunds, creates charges, or modifies subscriptions.',
  },
  {
    q: 'Should I connect Stripe in test mode or live mode?',
    a: 'Start with test mode during the 14-day pilot. Once you have validated the integration and want to use real subscription data for SLA mapping, switch to live mode. Both modes can coexist if you connect two integrations.',
  },
  {
    q: 'My Stripe account has multiple sub-accounts (Connect). Can I connect all?',
    desc: 'Yes — use the Stripe Connect API to enumerate connected accounts. Contact us for the Connect setup guide. Each connected account requires its own restricted key.',
    a: 'Yes — use the Stripe Connect API to enumerate connected accounts. Contact us for the Connect setup guide. Each connected account requires its own restricted key.',
  },
  {
    q: 'How does SecQA handle customer PII from Stripe?',
    a: 'SecQA only ingests account configuration, products, prices, and subscription status. We do not ingest customer names, emails, or card data (which Stripe does not return via API anyway). PII is never stored in SecQA.',
  },
];

const RELATED = [
  { slug: 'resend', name: 'Resend', emoji: '✉️' },
  { slug: 'hubspot', name: 'HubSpot', emoji: '📊' },
  { slug: 'postgres', name: 'Postgres', emoji: '🐘' },
  { slug: 'slack', name: 'Slack', emoji: '💬' },
];

export default function StripeIntegrationPage() {
  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Integrations</p></FadeIn>
          <FadeIn delay={0.1}>
            <div className='text-5xl mb-6'>💳</div>
            <h1 className='text-5xl md:text-6xl lg:text-[72px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Stripe + SecQA<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-8'>
              Use your Stripe configuration as cited evidence for PCI compliance answers. Map subscription tiers to questionnaire SLAs. Sync subscription lifecycle in real time.
            </p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Connect Stripe <ArrowRight size={14} />
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
              <p className='text-[14px] text-[#999999] mt-3'>Setup takes 15-20 minutes. Requires Stripe admin access to create a restricted API key.</p>
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
            <h2 className='text-3xl md:text-5xl font-bold text-white tracking-tight mb-4'>Ready to connect Stripe?</h2>
            <p className='text-lg text-white/50 mb-8'>14-day paid pilot at $499. Connect Stripe in under 20 minutes.</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Start your pilot <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
