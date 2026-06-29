'use client';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem, SectionDivider } from '@/components/ui/motion';
import { ArrowRight, CheckCircle2, AlertCircle, Zap, Shield, Users, FileText, Webhook, Settings, KeyRound } from 'lucide-react';

const FEATURES = [
  { icon: KeyRound, title: 'OIDC SSO login for SecQA', desc: 'Login to SecQA using your Auth0 tenant via OpenID Connect. Supports Authorization Code flow with PKCE and refresh tokens.' },
  { icon: Shield, title: 'MFA enforcement inheritance', desc: 'SecQA inherits your Auth0 MFA rules. If you require MFA for the SecQA app in Auth0, users must complete MFA before accessing SecQA.' },
  { icon: Users, title: 'Role-based access control via Auth0 roles', desc: 'Map Auth0 roles to SecQA roles. Add a user to an Auth0 role, get the matching SecQA permission instantly.' },
  { icon: FileText, title: 'Auth0 configuration as answer source', desc: 'SecQA ingests your Auth0 tenant settings, MFA policies, and breach password detection. Questionnaire answers cite real Auth0 configuration.' },
  { icon: Webhook, title: 'User lifecycle webhooks', desc: 'Auth0 post-user-registration and post-user-deletion webhooks trigger SecQA user lifecycle updates in real time.' },
  { icon: Settings, title: 'Machine-to-machine API access', desc: 'Use Auth0 M2M tokens for SecQA API access. Rotate credentials via Auth0 without service interruption.' },
];

const STEPS = [
  {
    title: 'Create an Auth0 Application',
    desc: 'Go to Auth0 Dashboard → Applications → Applications → Create Application. Name it "SecQA", type "Regular Web Application".',
    code: '# App name: SecQA\n# Type: Regular Web Application\n# Description: SecQA questionnaire automation',
  },
  {
    title: 'Configure callback URLs',
    desc: 'In the application settings, add the SecQA callback URL to "Allowed Callback URLs" and logout URL to "Allowed Logout URLs".',
    code: 'Allowed Callback URLs:  https://api.secqa.com/auth/oidc/callback\nAllowed Logout URLs:    https://app.secqa.com/auth/logout\nAllowed Web Origins:    https://app.secqa.com',
  },
  {
    title: 'Copy Client ID and Client Secret',
    desc: 'From the application settings page, copy the Client ID and Client Secret. You will paste these into SecQA.',
    code: 'Client ID:     YOUR_CLIENT_ID\nClient Secret: YOUR_CLIENT_SECRET',
  },
  {
    title: 'Create an Auth0 Management API M2M client',
    desc: 'Go to Applications → APIs → Auth0 Management API → Authorize another application. Pick or create a Machine-to-Machine application to read tenant configuration.',
    code: 'M2M Client ID:     YOUR_M2M_ID\nM2M Client Secret: YOUR_M2M_SECRET\nScopes: read:users, read:roles, read:tenant_settings',
  },
  {
    title: 'Connect Auth0 in SecQA dashboard',
    desc: 'In SecQA → Settings → Integrations → Auth0, enter your Auth0 domain, OIDC Client ID/Secret, and M2M Client ID/Secret. Click "Test connection".',
    code: 'POST /api/integrations/auth0\n{\n  "domain": "acme.us.auth0.com",\n  "oidc_client_id": "abcdef...",\n  "oidc_client_secret": "YOUR_OIDC_SECRET"
  },
  {
    title: 'Map Auth0 roles to SecQA roles',
    desc: 'Pick which Auth0 roles map to which SecQA roles. We recommend creating dedicated roles: "SecQA Admin", "SecQA Reviewer", "SecQA Viewer".',
    code: '# Role mapping\nrole_xxx (SecQA Admin)    → admin\nrole_yyy (SecQA Reviewer)  → reviewer\nrole_zzz (SecQA Viewer)    → viewer',
  },
];

const CONFIG = [
  { option: 'Auth0 domain', type: 'string', default: '—', desc: 'Auth0 tenant domain (e.g., acme.us.auth0.com).' },
  { option: 'OIDC Client ID', type: 'string', default: '—', desc: 'Auth0 Regular Web Application Client ID for SSO.' },
  { option: 'OIDC Client Secret', type: 'string', default: '—', desc: 'Auth0 Regular Web Application Client Secret.' },
  { option: 'M2M Client ID', type: 'string', default: '—', desc: 'Auth0 Machine-to-Machine Client ID for Management API.' },
  { option: 'Role mapping', type: 'object', default: '{}', desc: 'Map of Auth0 role IDs to SecQA roles (admin, reviewer, viewer).' },
  { option: 'Auto-provision on login', type: 'boolean', default: 'true', desc: 'Create SecQA users on first OIDC login if they do not exist.' },
];

const USE_CASES = [
  {
    title: 'SSO login with Auth0 MFA',
    desc: 'Employee navigates to SecQA, clicks "Login with Auth0", redirected to Auth0. Auth0 enforces MFA per tenant policy. After MFA, user is returned to SecQA with valid session. No separate password to manage.',
  },
  {
    title: 'Questionnaire answers cite Auth0 tenant settings',
    desc: 'A prospect asks "How do you enforce strong passwords?" SecQA queries your Auth0 tenant settings, identifies the breach password detection and minimum length policies, and writes an answer citing the exact configuration values.',
  },
  {
    title: 'Role-based access for cross-functional teams',
    desc: 'A legal counsel needs reviewer access. IT adds them to the "SecQA Reviewer" Auth0 role. Within 60 seconds, the user gains reviewer permissions in SecQA — no admin intervention needed.',
  },
];

const FAQS = [
  {
    q: 'Does SecQA support Auth0 SAML connections?',
    a: 'Yes. Auth0 can act as a SAML Identity Provider for SecQA. Configure a SAML Enterprise Connection in Auth0, then use the SAML ACS URL from SecQA settings. OIDC is recommended for new setups — simpler and more modern.',
  },
  {
    q: 'My Auth0 tenant uses custom domain. Will SecQA still work?',
    a: 'Yes. Configure your custom domain (e.g., login.acme.com) in the integration settings. SecQA uses the custom domain for OIDC redirects and the Auth0 Management API for tenant reads.',
  },
  {
    q: 'How does SecQA handle Auth0 rate limits?',
    a: 'Auth0 Management API rate limits are 10 requests/second for M2M clients on the pro plan. SecQA batches calls and respects 429 responses with exponential backoff. Default is 2 calls/second — well within limits.',
  },
  {
    q: 'Can I use Auth0 actions to customise SecQA login?',
    desc: 'Yes. Use Auth0 post-login actions to inject custom claims (e.g., department, security clearance) into the ID token. SecQA reads these claims for advanced role mapping.',
    a: 'Yes. Use Auth0 post-login actions to inject custom claims (e.g., department, security clearance) into the ID token. SecQA reads these claims for advanced role mapping.',
  },
];

const RELATED = [
  { slug: 'okta', name: 'Okta', emoji: '🔐' },
  { slug: 'clerk', name: 'Clerk', emoji: '👤' },
  { slug: 'google-workspace', name: 'Google Workspace', emoji: '📧' },
  { slug: 'slack', name: 'Slack', emoji: '💬' },
];

export default function Auth0IntegrationPage() {
  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Integrations</p></FadeIn>
          <FadeIn delay={0.1}>
            <div className='text-5xl mb-6'>🔑</div>
            <h1 className='text-5xl md:text-6xl lg:text-[72px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Auth0 + SecQA<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-8'>
              OIDC SSO login, MFA enforcement inheritance, role-based access control, and Auth0 tenant configuration as answer source. Built for modern teams running Auth0 as their identity provider.
            </p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Connect Auth0 <ArrowRight size={14} />
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
              <p className='text-[14px] text-[#999999] mt-3'>Setup takes 20-30 minutes. Requires Auth0 tenant admin access.</p>
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
            <h2 className='text-3xl md:text-5xl font-bold text-white tracking-tight mb-4'>Ready to connect Auth0?</h2>
            <p className='text-lg text-white/50 mb-8'>14-day paid pilot at $499. Connect Auth0 in under 30 minutes.</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Start your pilot <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
