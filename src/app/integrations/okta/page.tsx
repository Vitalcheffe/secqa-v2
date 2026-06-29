'use client';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem, SectionDivider } from '@/components/ui/motion';
import { ArrowRight, CheckCircle2, AlertCircle, Zap, Shield, Users, FileText, Webhook, Settings, KeyRound } from 'lucide-react';

const FEATURES = [
  { icon: KeyRound, title: 'SSO/SAML integration for SecQA login', desc: 'Login to SecQA using your Okta SSO. Supports SAML 2.0, OIDC, and SCIM provisioning for automated user lifecycle.' },
  { icon: Shield, title: 'SCIM user provisioning', desc: 'Auto-provision SecQA users from Okta groups. Deprovision on group removal. No manual user management required.' },
  { icon: Users, title: 'Group-based role mapping', desc: 'Map Okta groups to SecQA roles: admins, reviewers, viewers. Add a user to an Okta group, get the matching SecQA role instantly.' },
  { icon: FileText, title: 'Okta configuration as answer source', desc: 'SecQA ingests your Okta sign-on policies, MFA enforcement, and password policies. Questionnaire answers cite real Okta configuration.' },
  { icon: Webhook, title: 'User lifecycle events', desc: 'Okta user deactivate, suspend, and password reset events trigger SecQA user lifecycle updates in real time.' },
  { icon: Settings, title: 'Per-app scope control', desc: 'Configure Okta API token scopes to read only what SecQA needs. No admin-level access required.' },
];

const STEPS = [
  {
    title: 'Create an Okta API token',
    desc: 'Go to Okta Admin → Security → API → Tokens → Create Token. Name it "SecQA". Requires Okta admin or API Access Management admin role.',
    code: '# Token name: SecQA\n# Scopes: okta.users.read, okta.groups.read, okta.policies.read',
  },
  {
    title: 'Copy the API token',
    desc: 'After creating the token, copy it. Okta only shows the token once — store it securely.',
    code: '00YOUR_OKTA_KEY',
  },
  {
    title: 'Connect Okta in SecQA dashboard',
    desc: 'In SecQA → Settings → Integrations → Okta, enter your Okta domain (acme.okta.com) and API token. Click "Test connection" — you should see your Okta org name and user count.',
    code: 'POST /api/integrations/okta\n{\n  "domain": "acme.okta.com",\n  "api_token": "00xxx..."\n}',
  },
  {
    title: 'Configure SAML SSO (optional but recommended)',
    desc: 'In Okta, create a SAML 2.0 app for SecQA. Configure ACS URL and Audience URI from the SecQA integration page. Assign to the Okta group that should access SecQA.',
    code: '# SAML config\nACS URL:      https://api.secqa.com/auth/saml/callback\nAudience URI: https://api.secqa.com\nName ID:      Email\nAttributes:   groups, email, first_name, last_name',
  },
  {
    title: 'Map Okta groups to SecQA roles',
    desc: 'Pick which Okta groups map to which SecQA roles. We recommend a dedicated "SecQA Admins" group, "SecQA Reviewers" group, and "SecQA Viewers" group.',
    code: '# Group mapping\nSecQA Admins    → admin\nSecQA Reviewers → reviewer\nSecQA Viewers   → viewer\nEngineering     → reviewer (auto)',
  },
  {
    title: 'Enable SCIM provisioning (optional)',
    desc: 'In Okta, enable SCIM for the SecQA app. This automates user creation, updates, and deactivation. Assigning a user to the app in Okta creates them in SecQA automatically.',
  },
];

const CONFIG = [
  { option: 'Okta domain', type: 'string', default: '—', desc: 'Your Okta org domain (e.g., acme.okta.com).' },
  { option: 'API token', type: 'string', default: '—', desc: 'Okta API token with users.read, groups.read, policies.read scopes.' },
  { option: 'SAML ACS URL', type: 'string', default: '—', desc: 'Assertion Consumer Service URL for SAML SSO.' },
  { option: 'Group mapping', type: 'object', default: '{}', desc: 'Map of Okta group IDs to SecQA roles (admin, reviewer, viewer).' },
  { option: 'SCIM enabled', type: 'boolean', default: 'false', desc: 'Whether SCIM provisioning is enabled for automated user lifecycle.' },
  { option: 'JIT provisioning', type: 'boolean', default: 'true', desc: 'Auto-create SecQA users on first SAML login if they do not exist.' },
];

const USE_CASES = [
  {
    title: 'Employee offboarding deactivates SecQA access',
    desc: 'HR deactivates an employee in Okta. Within 60 seconds, Okta SCIM fires a deactivate event. SecQA suspends the user account. Audit log captures who, when, and why for compliance reporting.',
  },
  {
    title: 'Questionnaire answers cite Okta policies',
    desc: 'A prospect asks "How do you enforce MFA?" SecQA queries your Okta sign-on policies, identifies the MFA requirement for the engineering group, and writes an answer citing the exact policy name and enforcement rules.',
  },
  {
    title: 'Group-based access for new hires',
    desc: 'A new security engineer joins. HR adds them to the "Security" group in Okta. SCIM auto-creates their SecQA account with reviewer role. No IT ticket needed — access is live within 5 minutes.',
  },
];

const FAQS = [
  {
    q: 'Does SecQA support Okta OIDC as well as SAML?',
    a: 'Yes. SecQA supports both SAML 2.0 and OIDC for SSO. SAML is recommended for enterprise setups with existing SAML infrastructure. OIDC is recommended for new setups — simpler configuration and better token handling.',
  },
  {
    q: 'My Okta org uses custom domain. Will SecQA still work?',
    a: 'Yes. Configure your custom domain (e.g., login.acme.com) in the integration settings. SecQA uses the custom domain for SAML/OIDC redirects and the API token for SCIM and config reads.',
  },
  {
    q: 'How does SCIM handle group membership changes?',
    a: 'When a user is added to or removed from an Okta group mapped to a SecQA role, SCIM pushes the change within 60 seconds. The user gains or loses the corresponding SecQA role automatically.',
  },
  {
    q: 'Can I use Okta for SecQA login without SCIM?',
    a: 'Yes. Configure SAML SSO only — JIT (just-in-time) provisioning will create users on first login. SCIM is optional but recommended for automated deactivation when employees leave.',
  },
];

const RELATED = [
  { slug: 'auth0', name: 'Auth0', emoji: '🔑' },
  { slug: 'clerk', name: 'Clerk', emoji: '👤' },
  { slug: 'google-workspace', name: 'Google Workspace', emoji: '📧' },
  { slug: 'slack', name: 'Slack', emoji: '💬' },
];

export default function OktaIntegrationPage() {
  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Integrations</p></FadeIn>
          <FadeIn delay={0.1}>
            <div className='text-5xl mb-6'>🔐</div>
            <h1 className='text-5xl md:text-6xl lg:text-[72px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Okta + SecQA<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-8'>
              SSO/SAML login for SecQA, SCIM user provisioning, group-based role mapping, and Okta policy citations for questionnaire answers. The identity integration enterprise teams expect.
            </p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Connect Okta <ArrowRight size={14} />
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
              <p className='text-[14px] text-[#999999] mt-3'>Setup takes 30-45 minutes. Requires Okta admin access to create API token and SAML app.</p>
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
            <h2 className='text-3xl md:text-5xl font-bold text-white tracking-tight mb-4'>Ready to connect Okta?</h2>
            <p className='text-lg text-white/50 mb-8'>14-day paid pilot at $499. Connect Okta in under 45 minutes.</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Start your pilot <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
