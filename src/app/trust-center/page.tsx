'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem, CountUp, SectionDivider, Card3D } from '@/components/ui/motion';
import {
  Shield,
  Lock,
  FileText,
  Server,
  Key,
  ScrollText,
  Eye,
  Database,
  Clock,
  Trash2,
  Download,
  ChevronDown,
  CheckCircle2,
  Award,
  Globe,
  Mail,
  ArrowRight,
} from 'lucide-react';

const CONTROLS = [
  { icon: Lock, t: 'Encryption at rest', d: 'AES-256 on all customer data. KMS-managed keys with 90-day automatic rotation.', s: 'Active' },
  { icon: Shield, t: 'Encryption in transit', d: 'TLS 1.3 enforced. HSTS enabled. Legacy protocols (TLS 1.0/1.1) disabled.', s: 'Active' },
  { icon: Server, t: 'Single-tenant Postgres', d: 'Per-customer database isolation. No shared schemas. Row-level security on Scale tier.', s: 'Active' },
  { icon: Key, t: 'Key management', d: 'AWS KMS with customer-specific master keys. CMK rotation every 90 days.', s: 'Active' },
  { icon: ScrollText, t: 'Audit logging', d: 'Every database query logged. Logs retained 1 year. Tamper-evident storage.', s: 'Active' },
  { icon: Eye, t: 'Anomaly detection', d: 'Sentry + custom heuristics alert on unusual access patterns within 5 minutes.', s: 'Active' },
  { icon: Database, t: 'Backups', d: 'Daily encrypted snapshots. 35-day retention. Quarterly restore drills.', s: 'Active' },
  { icon: Award, t: 'SOC2 Type 2', d: 'In progress with Vanta. Estimated completion Q1 2027. Live monitoring.', s: 'In Progress' },
];

const SUB_PROCESSORS = [
  { name: 'Anthropic', purpose: 'Claude 3.5 Haiku API', location: 'US', dpa: 'Zero data retention' },
  { name: 'AWS', purpose: 'S3, KMS', location: 'us-east-1', dpa: 'SOC2, ISO 27001, FedRAMP' },
  { name: 'Supabase', purpose: 'Postgres hosting', location: 'us-east-1', dpa: 'SOC2 Type 2' },
  { name: 'Stripe', purpose: 'Payment processing', location: 'US', dpa: 'PCI DSS Level 1' },
  { name: 'Vercel', purpose: 'App hosting + CDN', location: 'Global edge', dpa: 'SOC2 Type 2' },
  { name: 'Sentry', purpose: 'Error monitoring', location: 'US/EU', dpa: 'GDPR compliant' },
  { name: 'Clerk', purpose: 'Authentication, MFA, SSO', location: 'US', dpa: 'SOC2 Type 2' },
  { name: 'Resend', purpose: 'Transactional email', location: 'US', dpa: 'GDPR compliant' },
];

const BADGES = [
  { name: 'SOC2 Type 2', status: 'In Progress', detail: 'Vanta — Q1 2027' },
  { name: 'GDPR', status: 'Active', detail: 'EU data residency option' },
  { name: 'CCPA', status: 'Active', detail: 'Do Not Sell honored' },
  { name: 'PCI DSS', status: 'Delegated', detail: 'Stripe Level 1' },
  { name: 'ISO 27001', status: 'Planned', detail: 'Q3 2027' },
  { name: 'HIPAA', status: 'Planned', detail: 'Q2 2027' },
];

const RETENTION = [
  { icon: Database, t: 'Active subscription', d: 'Customer data retained while subscription is active. Accessible via dashboard anytime.' },
  { icon: Trash2, t: 'Account closure', d: 'Deleted within 30 days of account closure. Deletion certificate provided on request.' },
  { icon: Clock, t: 'Backups', d: 'Encrypted daily snapshots retained 35 days. Quarterly backups overwritten within 90 days.' },
  { icon: Download, t: 'Portability', d: 'Export all data in CSV or JSON format anytime from the dashboard. No support ticket required.' },
];

const FAQ = [
  { q: 'Do you use customer data to train AI models?', a: 'Never. Claude API calls use data only for immediate generation. Anthropic guarantees zero data retention — your questionnaires and answers are not stored on their servers or used for training.' },
  { q: 'Where is my data physically stored?', a: 'Primary storage is single-tenant Postgres on Supabase in us-east-1 (Virginia, USA). Object storage is AWS S3 in us-east-1. EU data residency is available on the Scale tier for customers with GDPR residency requirements.' },
  { q: 'How do you handle data deletion requests?', a: 'Delete anytime via the admin UI. Permanent deletion completes within 30 days. A signed deletion certificate is available on request. Backups containing the data are overwritten within 90 days of deletion.' },
  { q: 'What happens during a security incident?', a: 'Critical incidents are escalated within 1 hour. Customers are notified within 24 hours of confirmed breach per DPA. A blameless post-mortem is published within 7 days. Subscribe to status.secqa.example for real-time updates.' },
  { q: 'Can I get a copy of your SOC2 report?', a: 'Our SOC2 Type 2 audit is in progress with Vanta, estimated completion Q1 2027. Until then, we provide our security whitepaper, DPA template, and architecture review under NDA. Request via the contact form.' },
  { q: 'How do you handle sub-processor changes?', a: 'We notify customers 30 days before adding or changing any sub-processor. You can subscribe to sub-processor updates via RSS or email. Customers can object to a new sub-processor and terminate without penalty.' },
];

export default function TrustCenterPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className='bg-[#0D0D0D] text-white'>
      {/* ═══ HERO ═══ */}
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='absolute top-0 left-1/3 w-[700px] h-[500px] rounded-full blur-[120px] pointer-events-none bg-[#8B9DAF]/[0.04]' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-6'>Trust Center</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className='text-5xl md:text-7xl lg:text-[88px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Security and compliance,<br />updated continuously<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-4'>
              Public trust center for SecQA. Security architecture, compliance status, data handling policies, and incident response procedures.
            </p>
            <p className='text-[15px] text-[#999999] max-w-xl leading-[1.7]'>
              Last reviewed: June 2026. Subscribe to updates via the trust center RSS feed.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ COMPLIANCE BADGES ═══ */}
      <section className='py-20 md:py-24 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Compliance Badges</p>
            <h2 className='text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white tracking-tight mb-10'>
              Certifications and frameworks<span className='text-[#8B9DAF]'>.</span>
            </h2>
          </FadeIn>
          <StaggerContainer className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4'>
            {BADGES.map((b) => (
              <StaggerItem key={b.name}>
                <div className='card text-center h-full'>
                  <div className='w-12 h-12 rounded-full bg-[#8B9DAF]/10 flex items-center justify-center mx-auto mb-3'>
                    <Award size={22} className='text-[#8B9DAF]' />
                  </div>
                  <h3 className='text-sm font-semibold text-white mb-1'>{b.name}</h3>
                  <span
                    className={`inline-block text-[10px] uppercase tracking-[0.15em] mb-1.5 ${
                      b.status === 'Active' ? 'text-[#8B9DAF]' : 'text-[#666666]'
                    }`}
                  >
                    {b.status}
                  </span>
                  <p className='text-[11px] text-[#999999] leading-snug'>{b.detail}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ SECURITY CONTROLS GRID ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Security Controls</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
              Eight controls protecting your data<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <div className='accent-line mb-12' />
          </FadeIn>
          <StaggerContainer className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
            {CONTROLS.map((c) => (
              <StaggerItem key={c.t}>
                <Card3D className='h-full group'>
                  <div className='flex items-center justify-between mb-4'>
                    <div className='w-10 h-10 rounded-full bg-[#8B9DAF]/10 flex items-center justify-center transition-colors group-hover:bg-[#8B9DAF]/20'>
                      <c.icon size={18} className='text-[#8B9DAF]' />
                    </div>
                    <span
                      className={`status-badge ${
                        c.s === 'Active' ? 'status-badge-active' : 'status-badge-engineering'
                      }`}
                    >
                      {c.s === 'Active' && (
                        <span className='w-1.5 h-1.5 rounded-full bg-[#8B9DAF] animate-pulse' />
                      )}
                      {c.s}
                    </span>
                  </div>
                  <h3 className='text-base font-semibold text-white mb-2'>{c.t}</h3>
                  <p className='text-xs text-[#999999] leading-[1.7]'>{c.d}</p>
                </Card3D>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ SUB-PROCESSORS TABLE ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Sub-processors</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
              Vendors with data access<span className='text-[#8B9DAF]'>.</span>
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
              30-day advance notice required before adding or changing sub-processors. Customers may object and terminate without penalty.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ DATA RETENTION POLICY ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Data Retention Policy</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
              How long we keep your data<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <div className='accent-line mb-12' />
          </FadeIn>
          <StaggerContainer className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
            {RETENTION.map((r) => (
              <StaggerItem key={r.t}>
                <div className='card h-full flex items-start gap-4'>
                  <div className='w-11 h-11 rounded-full bg-[#8B9DAF]/10 flex items-center justify-center flex-shrink-0'>
                    <r.icon size={18} className='text-[#8B9DAF]' />
                  </div>
                  <div>
                    <h3 className='text-base font-semibold text-white mb-2'>{r.t}</h3>
                    <p className='text-sm text-[#999999] leading-[1.7]'>{r.d}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ INCIDENT RESPONSE POLICY ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Incident Response Policy</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
              Documented. Rehearsed. Signed off<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <div className='accent-line mb-12' />
          </FadeIn>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6'>
            <FadeIn>
              <div className='card h-full'>
                <div className='flex items-center gap-3 mb-5'>
                  <div className='w-10 h-10 rounded-full bg-[#8B9DAF]/10 flex items-center justify-center'>
                    <Clock size={18} className='text-[#8B9DAF]' />
                  </div>
                  <h3 className='text-base font-semibold text-white'>Response SLAs</h3>
                </div>
                <ul className='space-y-3 text-sm text-[#999999]'>
                  <li className='flex items-start gap-3'>
                    <CheckCircle2 size={14} className='text-[#8B9DAF] mt-1 flex-shrink-0' />
                    <span><span className='text-white font-medium'>Critical incidents</span> — escalated within 1 hour, customers notified within 24 hours</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle2 size={14} className='text-[#8B9DAF] mt-1 flex-shrink-0' />
                    <span><span className='text-white font-medium'>High severity</span> — escalated within 4 hours, customers notified within 48 hours</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle2 size={14} className='text-[#8B9DAF] mt-1 flex-shrink-0' />
                    <span><span className='text-white font-medium'>Post-mortem</span> — published internally within 7 days, blameless format</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle2 size={14} className='text-[#8B9DAF] mt-1 flex-shrink-0' />
                    <span><span className='text-white font-medium'>Quarterly drills</span> — tabletop exercises with full engineering team</span>
                  </li>
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className='card h-full'>
                <div className='flex items-center gap-3 mb-5'>
                  <div className='w-10 h-10 rounded-full bg-[#8B9DAF]/10 flex items-center justify-center'>
                    <Globe size={18} className='text-[#8B9DAF]' />
                  </div>
                  <h3 className='text-base font-semibold text-white'>Notification channels</h3>
                </div>
                <ul className='space-y-3 text-sm text-[#999999]'>
                  <li className='flex items-start gap-3'>
                    <CheckCircle2 size={14} className='text-[#8B9DAF] mt-1 flex-shrink-0' />
                    <span><span className='text-white font-medium'>Status page</span> — status.secqa.example updated within 15 minutes of detection</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle2 size={14} className='text-[#8B9DAF] mt-1 flex-shrink-0' />
                    <span><span className='text-white font-medium'>Email</span> — direct email to affected customers per DPA terms</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle2 size={14} className='text-[#8B9DAF] mt-1 flex-shrink-0' />
                    <span><span className='text-white font-medium'>Slack</span> — Scale tier customers notified in dedicated Slack channel</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle2 size={14} className='text-[#8B9DAF] mt-1 flex-shrink-0' />
                    <span><span className='text-white font-medium'>RSS</span> — subscribe to trust center feed for all updates</span>
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ DATA HANDLING FAQ ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[900px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Data Handling FAQ</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
              Common questions, answered<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <div className='accent-line mb-12' />
          </FadeIn>
          <StaggerContainer className='space-y-3' staggerDelay={0.08}>
            {FAQ.map((f, i) => (
              <StaggerItem key={f.q}>
                <div className='card overflow-hidden p-0'>
                  <button
                    type='button'
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className='w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left hover:bg-white/[0.02] transition-colors'
                    aria-expanded={openFaq === i}
                  >
                    <span className='text-sm md:text-base font-semibold text-white'>{f.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-[#8B9DAF] flex-shrink-0 transition-transform duration-300 ${
                        openFaq === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className='px-5 md:px-6 pb-5 md:pb-6 -mt-1'>
                      <p className='text-sm text-[#999999] leading-[1.8]'>{f.a}</p>
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ CTA ═══ */}
      <section className='py-24 md:py-28 bg-[#111111]'>
        <div className='max-w-[900px] mx-auto px-6 md:px-12 text-center'>
          <FadeIn>
            <Mail size={36} className='text-[#8B9DAF] mx-auto mb-5' />
            <h2 className='text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white tracking-tight mb-3'>
              Need something specific?<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <p className='text-[15px] text-[#999999] leading-[1.7] mb-8 max-w-xl mx-auto'>
              Security whitepaper, DPA template, custom clauses, or a call with the founder — we respond within 4 business hours.
            </p>
            <Link
              href='/contact'
              className='inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md text-sm font-semibold hover:bg-white/90 transition-colors'
            >
              Contact the security team
              <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
