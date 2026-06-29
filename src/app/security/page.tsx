'use client';

import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem, CountUp, SectionDivider, TextReveal, Card3D } from '@/components/ui/motion';
import {
  Shield,
  Lock,
  Server,
  Key,
  ScrollText,
  FileText,
  Eye,
  Zap,
  ArrowRight,
  CheckCircle2,
  Bug,
  Activity,
  Network,
  AlertTriangle,
  Download,
} from 'lucide-react';

const PILLARS = [
  { icon: Lock, t: 'Encryption', d: 'AES-256 at rest (KMS-managed, 90-day rotation). TLS 1.3 in transit. HSTS enforced. No plaintext storage.' },
  { icon: Server, t: 'Infrastructure', d: 'Single-tenant Postgres on Supabase (SOC2 Type 2). S3 with KMS-managed keys. Vercel (SOC2 Type 2). All in us-east-1.' },
  { icon: Key, t: 'Access control', d: 'RBAC with least-privilege. MFA enforced for all admin accounts. Access revoked within 4 hours of role change.' },
  { icon: ScrollText, t: 'Audit logging', d: 'Every DB query logged. Every API call logged. Logs retained 1 year. Tamper-evident storage.' },
  { icon: Eye, t: 'Monitoring', d: 'Sentry for error monitoring. Anomaly detection on access patterns. Alerting on unusual query volumes.' },
  { icon: Zap, t: 'Incident response', d: 'Documented IR plan. 1-hour escalation for critical incidents. 24-hour customer notification. Post-mortem within 7 days.' },
];

const COMPLIANCE = [
  { t: 'SOC2 Type 2', s: 'In progress with Vanta. Estimated completion Q1 2027.', v: 'In Progress', active: false },
  { t: 'GDPR', s: 'Compliant. EU data residency option available on Scale tier.', v: 'Active', active: true },
  { t: 'CCPA', s: 'Compliant. Do Not Sell signal honored. Consumer rights workflow live.', v: 'Active', active: true },
  { t: 'HIPAA', s: 'Not currently in scope. Roadmap Q2 2027 for healthcare ICP.', v: 'Planned', active: false },
  { t: 'ISO 27001', s: 'Roadmap Q3 2027. Gap analysis scheduled for January.', v: 'Planned', active: false },
  { t: 'PCI DSS', s: 'Payment handling fully delegated to Stripe (PCI DSS Level 1).', v: 'Delegated', active: true },
];

const SUB_PROCESSORS = [
  { name: 'Anthropic', purpose: 'Claude 3.5 Haiku LLM API', location: 'US', dpa: 'Zero data retention agreement' },
  { name: 'AWS', purpose: 'S3 storage + KMS key management', location: 'us-east-1', dpa: 'SOC2, ISO 27001, FedRAMP' },
  { name: 'Supabase', purpose: 'Single-tenant Postgres hosting', location: 'us-east-1', dpa: 'SOC2 Type 2, GDPR' },
  { name: 'Stripe', purpose: 'Payment processing + billing', location: 'US', dpa: 'PCI DSS Level 1' },
  { name: 'Vercel', purpose: 'App hosting + edge CDN', location: 'Global edge', dpa: 'SOC2 Type 2' },
  { name: 'Sentry', purpose: 'Error monitoring + tracing', location: 'US/EU', dpa: 'GDPR compliant, PII filtered' },
  { name: 'Clerk', purpose: 'Authentication + MFA + SSO', location: 'US', dpa: 'SOC2 Type 2' },
  { name: 'Resend', purpose: 'Transactional email delivery', location: 'US', dpa: 'GDPR compliant' },
];

const DATA_FLOW = [
  { node: 'Customer Browser', layer: 'Edge', detail: 'TLS 1.3, HSTS, CSP' },
  { node: 'Vercel Edge Network', layer: 'Edge', detail: 'DDoS mitigation, WAF' },
  { node: 'Next.js 16 App (serverless)', layer: 'Application', detail: 'RBAC, rate limiting' },
  { node: 'Supabase Postgres (single-tenant)', layer: 'Data', detail: 'AES-256, row-level security' },
  { node: 'Anthropic Claude API', layer: 'AI', detail: 'Zero data retention' },
  { node: 'AWS S3 (KMS-managed)', layer: 'Storage', detail: 'Object encryption, versioning' },
];

const INCIDENT_PHASES = [
  { phase: '01 Detect', time: 'T+0', desc: 'Sentry anomaly detection or customer report triggers automated PagerDuty alert to on-call engineer.' },
  { phase: '02 Triage', time: 'T+15min', desc: 'On-call engineer confirms severity, opens incident channel in Slack, assigns incident commander.' },
  { phase: '03 Contain', time: 'T+1hr', desc: 'Affected systems isolated. Compromised credentials rotated. Access logs pulled for forensic review.' },
  { phase: '04 Notify', time: 'T+24hr', desc: 'Affected customers notified per DPA. Regulatory notification assessed if personal data involved.' },
  { phase: '05 Remediate', time: 'T+72hr', desc: 'Root cause patch deployed. Regression tests added. Post-deployment verification signed off.' },
  { phase: '06 Post-mortem', time: 'T+7d', desc: 'Blameless post-mortem published internally. Action items tracked to completion in Linear.' },
];

const VULN_STATS = [
  { value: 4, suffix: 'h', label: 'Critical patch SLA', desc: 'Critical vulnerabilities patched within 4 hours of disclosure.' },
  { value: 72, suffix: 'h', label: 'High severity SLA', desc: 'High-severity issues patched within 72 hours of disclosure.' },
  { value: 30, suffix: 'd', label: 'Medium severity SLA', desc: 'Medium-severity issues patched within 30 days of disclosure.' },
  { value: 100, suffix: '%', label: 'Dependencies scanned', desc: 'All dependencies scanned daily via Dependabot + Snyk.' },
];

const PEN_TEST_RESULTS = [
  { scope: 'Web application (auth + dashboard)', vendor: 'Cobalt.io', date: 'May 2026', result: 'No critical findings', severity: 'pass' },
  { scope: 'API surface (25 endpoints)', vendor: 'Cobalt.io', date: 'May 2026', result: '2 low-severity issues, fixed', severity: 'pass' },
  { scope: 'Cloud infrastructure (AWS + Vercel)', vendor: 'Internal', date: 'Apr 2026', result: 'No findings', severity: 'pass' },
  { scope: 'Sub-processor integration review', vendor: 'Internal', date: 'Apr 2026', result: '1 medium finding, fixed', severity: 'pass' },
];

export default function SecurityPage() {
  return (
    <div className='bg-[#0D0D0D] text-white'>
      {/* ═══ HERO ═══ */}
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='absolute top-0 right-1/4 w-[800px] h-[600px] rounded-full blur-[120px] pointer-events-none bg-[#8B9DAF]/[0.04]' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-6'>Security</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className='text-5xl md:text-7xl lg:text-[88px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Security is the<br />foundation<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-4'>
              We handle your most sensitive compliance answers. Every architectural decision starts with the question: would this pass our own security review?
            </p>
            <p className='text-[15px] text-[#999999] max-w-xl leading-[1.7]'>
              Single-tenant Postgres. KMS-managed keys with 90-day rotation. Audit logs on every query. Zero data retention with Anthropic.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ PILLARS ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Security Pillars</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
              Six pillars that protect your data<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <div className='accent-line mb-12' />
          </FadeIn>
          <StaggerContainer className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
            {PILLARS.map((p) => (
              <StaggerItem key={p.t}>
                <Card3D className='h-full group'>
                  <div className='w-11 h-11 rounded-full bg-[#8B9DAF]/10 flex items-center justify-center mb-5 transition-colors group-hover:bg-[#8B9DAF]/20'>
                    <p.icon size={20} className='text-[#8B9DAF]' />
                  </div>
                  <h3 className='text-lg font-semibold text-white mb-2'>{p.t}</h3>
                  <p className='text-sm text-[#999999] leading-[1.7]'>{p.d}</p>
                </Card3D>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ COMPLIANCE STATUS ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Compliance Status</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
              Where we stand today<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <div className='accent-line mb-12' />
          </FadeIn>
          <StaggerContainer className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
            {COMPLIANCE.map((c) => (
              <StaggerItem key={c.t}>
                <div className='card h-full flex flex-col justify-between'>
                  <div>
                    <div className='flex items-center justify-between mb-4'>
                      <h3 className='text-lg font-semibold text-white'>{c.t}</h3>
                      <span
                        className={`status-badge ${
                          c.active ? 'status-badge-active' : 'status-badge-engineering'
                        }`}
                      >
                        {c.active && (
                          <span className='w-1.5 h-1.5 rounded-full bg-[#8B9DAF] animate-pulse' />
                        )}
                        {c.v}
                      </span>
                    </div>
                    <p className='text-sm text-[#999999] leading-[1.7]'>{c.s}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ DATA FLOW ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Data Flow</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
              How data moves through SecQA<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <div className='accent-line mb-12' />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className='card overflow-hidden p-0'>
              <div className='grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-0'>
                <div className='p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-white/6'>
                  <Network size={28} className='text-[#8B9DAF] mb-3' />
                  <p className='text-xs text-[#666666] uppercase tracking-[0.2em] mb-1'>Architecture</p>
                  <p className='text-sm text-white font-medium leading-snug'>Six trust zones, every hop encrypted</p>
                </div>
                <div className='p-6 md:p-8'>
                  <StaggerContainer className='space-y-3' staggerDelay={0.08}>
                    {DATA_FLOW.map((d, i) => (
                      <StaggerItem key={d.node}>
                        <div className='flex items-start gap-4 p-4 rounded-lg border border-white/4 hover:border-white/10 transition-colors'>
                          <div className='flex flex-col items-center'>
                            <div className='w-8 h-8 rounded-full bg-[#8B9DAF]/10 flex items-center justify-center text-[#8B9DAF] font-mono text-xs font-semibold'>
                              {i + 1}
                            </div>
                            {i < DATA_FLOW.length - 1 && (
                              <div className='w-[1px] h-6 bg-white/10 mt-1' />
                            )}
                          </div>
                          <div className='flex-1 min-w-0'>
                            <div className='flex flex-wrap items-center gap-2 mb-1'>
                              <span className='text-sm font-semibold text-white'>{d.node}</span>
                              <span className='version-tag'>{d.layer}</span>
                            </div>
                            <p className='text-xs text-[#999999]'>{d.detail}</p>
                          </div>
                          <ArrowRight size={14} className='text-[#666666] mt-2 hidden sm:block' />
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ SUB-PROCESSORS ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Sub-processors</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
              Vendors with access to customer data<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <div className='accent-line mb-12' />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className='card overflow-x-auto no-scrollbar p-0'>
              <table className='data-table'>
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>Purpose</th>
                    <th>Location</th>
                    <th>DPA / Certifications</th>
                  </tr>
                </thead>
                <tbody>
                  {SUB_PROCESSORS.map((s) => (
                    <tr key={s.name}>
                      <td>{s.name}</td>
                      <td className='text-[#999999]'>{s.purpose}</td>
                      <td className='text-[#999999] font-mono text-xs'>{s.location}</td>
                      <td className='text-[#8B9DAF]'>{s.dpa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-xs text-[#666666] mt-4'>
              We notify customers 30 days before adding or changing a sub-processor. Subscribe to updates via the trust center RSS feed.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ INCIDENT RESPONSE ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Incident Response</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
              Six phases, from detection to post-mortem<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <div className='accent-line mb-12' />
          </FadeIn>
          <StaggerContainer className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
            {INCIDENT_PHASES.map((p) => (
              <StaggerItem key={p.phase}>
                <div className='card h-full'>
                  <div className='flex items-center justify-between mb-4'>
                    <span className='text-xs font-mono text-[#8B9DAF] tracking-wider'>{p.phase}</span>
                    <span className='version-tag'>{p.time}</span>
                  </div>
                  <p className='text-sm text-[#999999] leading-[1.7]'>{p.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ VULNERABILITY MANAGEMENT ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Vulnerability Management</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
              Patch SLAs and scanning cadence<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <div className='accent-line mb-12' />
          </FadeIn>
          <StaggerContainer className='grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12'>
            {VULN_STATS.map((s) => (
              <StaggerItem key={s.label}>
                <div className='card h-full'>
                  <div className='flex items-center gap-2 mb-3'>
                    <Bug size={16} className='text-[#8B9DAF]' />
                    <span className='text-xs text-[#666666] uppercase tracking-[0.15em]'>{s.label}</span>
                  </div>
                  <div className='text-3xl md:text-4xl font-bold text-white mb-2'>
                    <CountUp to={s.value} suffix={s.suffix} />
                  </div>
                  <p className='text-xs text-[#999999] leading-[1.6]'>{s.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeIn delay={0.1}>
            <div className='card'>
              <div className='flex items-start gap-4'>
                <div className='w-10 h-10 rounded-full bg-[#8B9DAF]/10 flex items-center justify-center flex-shrink-0'>
                  <Activity size={18} className='text-[#8B9DAF]' />
                </div>
                <div>
                  <h3 className='text-base font-semibold text-white mb-2'>Continuous scanning</h3>
                  <p className='text-sm text-[#999999] leading-[1.7]'>
                    Dependencies scanned daily via Dependabot and Snyk. Container images scanned on every push via Trivy.
                    Infrastructure drift detected weekly via CloudSploit. Findings triaged within 24 hours and assigned
                    to engineering owners with severity-based SLAs.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ PEN TEST RESULTS ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Penetration Testing</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
              Independent third-party results<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <div className='accent-line mb-12' />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className='card overflow-x-auto no-scrollbar p-0'>
              <table className='data-table'>
                <thead>
                  <tr>
                    <th>Scope</th>
                    <th>Vendor</th>
                    <th>Date</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {PEN_TEST_RESULTS.map((r) => (
                    <tr key={r.scope}>
                      <td>{r.scope}</td>
                      <td className='text-[#999999]'>{r.vendor}</td>
                      <td className='text-[#999999] font-mono text-xs'>{r.date}</td>
                      <td>
                        <span className='inline-flex items-center gap-1.5 text-[#8B9DAF]'>
                          <CheckCircle2 size={14} />
                          {r.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className='mt-8 p-5 rounded-lg border border-[#8B9DAF]/20 bg-[#8B9DAF]/[0.03] flex items-start gap-4'>
              <AlertTriangle size={20} className='text-[#8B9DAF] flex-shrink-0 mt-0.5' />
              <p className='text-sm text-[#999999] leading-[1.7]'>
                Full penetration test reports and security whitepaper are available under NDA. Request access via the
                contact form — we typically respond within 4 business hours.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ CTA ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[900px] mx-auto px-6 md:px-12 text-center'>
          <FadeIn>
            <FileText size={40} className='text-[#8B9DAF] mx-auto mb-6' />
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-4'>
              Security documentation<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <p className='text-[15px] text-[#999999] leading-[1.7] mb-8 max-w-xl mx-auto'>
              Security whitepaper, DPA template, architecture review, and full pen test reports available under NDA.
            </p>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-3'>
              <Link
                href='/contact'
                className='inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md text-sm font-semibold hover:bg-white/90 transition-colors'
              >
                <Download size={16} />
                Request documentation
              </Link>
              <Link
                href='/trust-center'
                className='inline-flex items-center gap-2 border border-white/12 text-white px-6 py-3 rounded-md text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-colors'
              >
                Visit trust center
                <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
