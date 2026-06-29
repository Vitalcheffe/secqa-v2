import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Security Policy — SecQA',
  description: 'Security architecture, controls, and practices for SecQA.'
};

export default function LegalPage() {
  return (
    <div className='flex flex-col'>
      <section className='border-b'>
        <div className='container mx-auto max-w-3xl px-4 py-16'>
          <Badge variant='secondary'>Legal</Badge>
          <h1 className='mt-4 text-4xl font-bold tracking-tight'>Security Policy</h1>
          <p className='mt-2 text-sm text-muted-foreground'>Last updated: June 2026</p>
        </div>
      </section>
      <section>
        <div className='container mx-auto max-w-3xl px-4 py-16'>
        <h2 className='mt-8 text-xl font-semibold'>1. Security Architecture</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>SecQA is built on a security-first architecture:

Encryption: AES-256 at rest (KMS-managed keys, 90-day rotation). TLS 1.3 in transit. HSTS enforced.

Isolation: single-tenant Postgres per customer. No shared schemas. Row-level security on Scale tier.

Access: RBAC with least-privilege. MFA enforced for all admin accounts. Access revoked within 4 hours of role change.

Audit: every DB query logged. Every API call logged. Logs retained 1 year. Tamper-evident storage.</div>
        <h2 className='mt-8 text-xl font-semibold'>2. Infrastructure</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>Hosting: Vercel (SOC2 Type 2) for application. Supabase (SOC2 Type 2) for Postgres. AWS for S3 and KMS.

Regions: us-east-1 primary. eu-west-1 available for EU customers on Scale tier.

Network: no public database access. VPC peering between Vercel and Supabase. Firewall rules restrict all non-HTTPS traffic.</div>
        <h2 className='mt-8 text-xl font-semibold'>3. Access Control</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>Founder and any future employees access production via IAM roles. No shared credentials. SSH key-based authentication. MFA required.

Customer access: Clerk-managed authentication. Session tokens (JWT) expire in 1 hour. Refresh tokens expire in 30 days.

We do not access Customer Data without explicit customer request. All access is logged and reviewed monthly.</div>
        <h2 className='mt-8 text-xl font-semibold'>4. Vulnerability Management</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>Continuous vulnerability scanning via Sentry and Dependabot. Critical vulnerabilities patched within 7 days. High within 30 days. Medium within 90 days.

We participate in responsible disclosure — see /legal/responsible-disclosure.

Annual third-party penetration testing. Results available to Scale tier customers under NDA.</div>
        <h2 className='mt-8 text-xl font-semibold'>5. Incident Response</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>Documented IR plan with 4 severity levels. Critical incidents (P0) escalated within 1 hour. Customer notification within 24 hours of confirmed data breach per our DPA.

Post-mortem published within 7 days of incident resolution. Root cause analysis shared with affected customers.</div>
        <h2 className='mt-8 text-xl font-semibold'>6. Compliance</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>SOC2 Type 2: in progress with Vanta, estimated Q1 2027.
GDPR: compliant. EU data residency option available.
CCPA: compliant. Do Not Sell signal honored.
HIPAA: not currently. Roadmap Q2 2027.
ISO 27001: roadmap Q3 2027.</div>
        <h2 className='mt-8 text-xl font-semibold'>7. Sub-processor Security</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>All sub-processors (Anthropic, AWS, Supabase, Stripe, Vercel, Sentry) maintain SOC2 Type 2 or equivalent certifications. We review their security posture annually. We provide 30 days notice before adding new sub-processors.</div>
        <h2 className='mt-8 text-xl font-semibold'>8. Data Handling</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>Customer Data is encrypted at rest and in transit. Decrypted only in memory during active processing. Never written to disk in plaintext. Never logged in error messages (Sentry PII filtering).

AI training: we never use Customer Data to train AI models. Anthropic guarantees zero data retention per their enterprise agreement.</div>
        <h2 className='mt-8 text-xl font-semibold'>9. Business Continuity</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>Database backups: daily snapshots retained 30 days. Weekly snapshots retained 1 year. RPO: 24 hours. RTO: 4 hours.

DR testing: semi-annual failover test. Last successful test: June 2026.

Service availability target: 99.5% monthly. Actual: 99.9% (June 2026).</div>
        <h2 className='mt-8 text-xl font-semibold'>10. Contact</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>For security questions, contact founder@secqa.example. For incident reports, see /legal/responsible-disclosure.</div>
        </div>
      </section>
    </div>
  );
}
