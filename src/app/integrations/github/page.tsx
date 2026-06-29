'use client';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem, SectionDivider } from '@/components/ui/motion';
import { ArrowRight, CheckCircle2, AlertCircle, Zap, GitBranch, Users, FileText, Webhook, Settings, Shield } from 'lucide-react';

const FEATURES = [
  { icon: GitBranch, title: 'Repository-aware questionnaire context', desc: 'Connect SecQA to your GitHub repos. The AI uses README files, security docs, and code comments as retrieval context for questionnaire answers.' },
  { icon: Shield, title: 'Auto-pull SECURITY.md and policies', desc: 'SecQA ingests SECURITY.md, CODE_OF_CONDUCT.md, and LICENSE files from every connected repo. Compliance answers always match your source of truth.' },
  { icon: FileText, title: 'Citation links to source files', desc: 'Every AI-generated answer cites the exact GitHub file and line range used. Reviewers click through to verify in seconds.' },
  { icon: Users, title: 'Per-repo access control', desc: 'Install the SecQA GitHub app on specific repos only. Granular permissions — SecQA only sees what you grant.' },
  { icon: Webhook, title: 'Webhook-driven re-indexing', desc: 'Code changes trigger re-indexing within 60 seconds. No stale answers — your security posture is always current.' },
  { icon: Settings, title: 'Custom exclude patterns', desc: 'Exclude test fixtures, generated code, and secrets directories from indexing. Keep retrieval focused on signal, not noise.' },
];

const STEPS = [
  {
    title: 'Install the SecQA GitHub App',
    desc: 'Go to github.com/apps/secqa → Install. Choose to install on your personal account or organisation. Pick specific repos or all repos.',
    code: '# App: SecQA\n# Permissions needed: metadata (read), contents (read)\n# Repository access: Selected repos or all repos',
  },
  {
    title: 'Authorize SecQA in your GitHub org',
    desc: 'If installing on an organisation, an org owner must approve. The app requests metadata:read and contents:read permissions only — no write access to your code.',
  },
  {
    title: 'Connect GitHub in SecQA dashboard',
    desc: 'After authorisation, you will be redirected back to SecQA. The dashboard should show your GitHub username/org and a list of accessible repos.',
    code: 'POST /api/integrations/github/install\n{\n  "installation_id": 12345678,\n  "org_login": "acme"\n}',
  },
  {
    title: 'Select repos to index',
    desc: 'Pick which repos SecQA should index. We recommend starting with your main application, infra-as-code, and security policy repos. Add more later as needed.',
    code: '# Indexed repos\nacme/api-server\nacme/infrastructure\nacme/security-policies\nacme/frontend-app',
  },
  {
    title: 'Configure exclude patterns (optional)',
    desc: 'Add glob patterns for paths to exclude from indexing. Useful for test fixtures, generated code, vendored dependencies, and secrets directories.',
    code: '# Exclude patterns\n**/test/**\n**/fixtures/**\n**/vendor/**\n**/*.generated.*\n**/secrets/**',
  },
  {
    title: 'Trigger initial index and verify citations',
    desc: 'Click "Re-index now" to trigger an immediate sync. Then run a sample questionnaire. AI answers should cite specific GitHub files and line ranges.',
  },
];

const CONFIG = [
  { option: 'Installation ID', type: 'integer', default: '—', desc: 'GitHub App installation ID from the OAuth callback.' },
  { option: 'Org login', type: 'string', default: '—', desc: 'GitHub organisation or user login where the app is installed.' },
  { option: 'Indexed repos', type: 'string[]', default: '[]', desc: 'List of full repo names (org/repo) that SecQA is allowed to index.' },
  { option: 'Exclude patterns', type: 'string[]', default: '["**/test/**"]', desc: 'Glob patterns for paths to exclude from indexing.' },
  { option: 'Re-index frequency', type: 'enum', default: 'webhook', desc: 'How often SecQA re-indexes: webhook (real-time), hourly, daily, manual.' },
  { option: 'Max file size (KB)', type: 'integer', default: '500', desc: 'Files larger than this are skipped to control index size.' },
];

const USE_CASES = [
  {
    title: 'Code-backed answers for engineering questions',
    desc: 'A prospect asks "How do you handle secrets in your CI/CD pipeline?" SecQA retrieves your .github/workflows/ files, identifies the GitHub Actions secrets usage, and writes an answer citing the exact workflow file and lines.',
  },
  {
    title: 'Security policy auto-sync',
    desc: 'Your SECURITY.md is updated to reflect a new vulnerability disclosure process. Within 60 seconds, SecQA re-indexes the file. Future questionnaire answers about vulnerability disclosure cite the new policy automatically.',
  },
  {
    title: 'Multi-repo context for complex architectures',
    desc: 'A question about your microservices architecture pulls context from 4 repos: api-gateway, auth-service, billing-service, and shared-libs. SecQA synthesises a coherent answer with citations across all four repos.',
  },
];

const FAQS = [
  {
    q: 'Does SecQA need write access to my repos?',
    a: 'No. The SecQA GitHub App requests metadata:read and contents:read permissions only. We never push commits, open PRs, or modify any file in your repos. You can verify this in your GitHub App settings after install.',
  },
  {
    q: 'My repos are private. Will SecQA still work?',
    a: 'Yes. The GitHub App installation grants SecQA read access to whichever private repos you select. We never index repos you have not explicitly granted.',
  },
  {
    q: 'How does SecQA handle large monorepos?',
    a: 'SecQA chunks large files (default 500KB max), uses semantic search to retrieve relevant chunks, and respects .gitignore patterns. For monorepos over 5GB, contact us to configure batched indexing to keep initial sync under 30 minutes.',
  },
  {
    q: 'Can I exclude specific branches?',
    a: 'Yes — SecQA indexes the default branch only by default. Configure additional branches (e.g., release/v2) in Settings → Integrations → GitHub → Branches. We do not index feature branches or PR branches.',
  },
];

const RELATED = [
  { slug: 'vercel', name: 'Vercel', emoji: '▲' },
  { slug: 'linear', name: 'Linear', emoji: '📋' },
  { slug: 'slack', name: 'Slack', emoji: '💬' },
  { slug: 'aws', name: 'AWS', emoji: '☁️' },
];

export default function GithubIntegrationPage() {
  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Integrations</p></FadeIn>
          <FadeIn delay={0.1}>
            <div className='text-5xl mb-6'>🐙</div>
            <h1 className='text-5xl md:text-6xl lg:text-[72px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              GitHub + SecQA<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-8'>
              Use your repos as retrieval context for questionnaire answers. SecQA ingests READMEs, security policies, and code comments — every AI answer cites the exact file and lines used.
            </p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Connect GitHub <ArrowRight size={14} />
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
              <p className='text-[14px] text-[#999999] mt-3'>Setup takes 10-15 minutes. Requires GitHub org owner or repo admin access to install the app.</p>
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
            <h2 className='text-3xl md:text-5xl font-bold text-white tracking-tight mb-4'>Ready to connect GitHub?</h2>
            <p className='text-lg text-white/50 mb-8'>14-day paid pilot at $499. Connect GitHub in under 15 minutes.</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Start your pilot <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
