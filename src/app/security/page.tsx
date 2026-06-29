import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Server, Key, ScrollText, FileText, Eye, Zap } from 'lucide-react';

export const metadata = {
  title: 'Security — How SecQA protects your compliance data',
  description: 'Detailed security architecture: encryption, access controls, audit logging, infrastructure, and incident response.'
};

const PILLARS = [
  { icon: Lock, title: 'Encryption', desc: 'AES-256 at rest (KMS-managed, 90-day rotation). TLS 1.3 in transit. HSTS enforced. No plaintext storage of sensitive data.' },
  { icon: Server, title: 'Infrastructure', desc: 'Single-tenant Postgres on Supabase (SOC2 Type 2). S3 with KMS-managed keys. Vercel for app hosting (SOC2 Type 2). All in us-east-1.' },
  { icon: Key, title: 'Access control', desc: 'RBAC with least-privilege. MFA enforced for all admin accounts. No shared credentials. Access revoked within 4 hours of role change.' },
  { icon: ScrollText, title: 'Audit logging', desc: 'Every DB query logged. Every API call logged. Every admin action logged. Logs retained 1 year. Tamper-evident storage.' },
  { icon: Eye, title: 'Monitoring', desc: 'Sentry for error monitoring. Anomaly detection on access patterns. Alerting on unusual query volumes or off-hours access.' },
  { icon: Zap, title: 'Incident response', desc: 'Documented IR plan. 1-hour escalation for critical incidents. 24-hour customer notification for confirmed breaches. Post-mortem within 7 days.' }
];

export default function SecurityPage() {
  return (
    <div className='flex flex-col'>
      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <Shield className='h-12 w-12 text-primary' />
          <h1 className='mt-4 text-4xl font-bold tracking-tight'>Security</h1>
          <p className='mt-4 text-lg text-muted-foreground'>We handle your most sensitive compliance answers. Security is not a feature — it is the foundation.</p>
        </div>
      </section>

      <section className='border-b'>
        <div className='container mx-auto max-w-7xl px-4 py-16'>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {PILLARS.map((p) => (
              <div key={p.title} className='rounded-lg border p-6'>
                <p.icon className='h-8 w-8 text-primary' />
                <h3 className='mt-4 font-semibold'>{p.title}</h3>
                <p className='mt-2 text-sm text-muted-foreground'>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='border-b bg-muted/30'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <h2 className='text-2xl font-bold mb-6'>Architecture diagram (text)</h2>
          <pre className='rounded border bg-background p-4 text-xs overflow-x-auto'>
{`Customer Browser
    │
    ▼ (TLS 1.3)
Vercel Edge Network
    │
    ▼ (VPC peering)
Next.js 16 App (serverless functions)
    │
    ├──► Supabase Postgres (single-tenant, AES-256, KMS)
    │        │
    │        └──► S3 (questionnaire PDFs, KMS-managed keys)
    │
    ├──► Anthropic Claude API (zero data retention)
    │
    ├──► Stripe API (PCI DSS Level 1)
    │
    └──► Sentry (error monitoring, PII filtered)`}
          </pre>
        </div>
      </section>

      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <h2 className='text-2xl font-bold mb-6'>Compliance status</h2>
          <div className='space-y-3'>
            <div className='flex items-center justify-between border rounded p-4'><div><div className='font-medium'>SOC2 Type 2</div><div className='text-sm text-muted-foreground'>In progress with Vanta</div></div><span className='text-yellow-600 text-sm font-medium'>Q1 2027</span></div>
            <div className='flex items-center justify-between border rounded p-4'><div><div className='font-medium'>GDPR</div><div className='text-sm text-muted-foreground'>Compliant. EU data residency option available.</div></div><span className='text-primary text-sm font-medium'>Active</span></div>
            <div className='flex items-center justify-between border rounded p-4'><div><div className='font-medium'>CCPA</div><div className='text-sm text-muted-foreground'>Compliant. Do Not Sell signal honored.</div></div><span className='text-primary text-sm font-medium'>Active</span></div>
            <div className='flex items-center justify-between border rounded p-4'><div><div className='font-medium'>HIPAA</div><div className='text-sm text-muted-foreground'>Not currently. Roadmap for Q2 2027.</div></div><span className='text-muted-foreground text-sm'>Not yet</span></div>
            <div className='flex items-center justify-between border rounded p-4'><div><div className='font-medium'>ISO 27001</div><div className='text-sm text-muted-foreground'>Roadmap for Q3 2027.</div></div><span className='text-muted-foreground text-sm'>Planned</span></div>
          </div>
        </div>
      </section>

      <section>
        <div className='container mx-auto max-w-4xl px-4 py-16 text-center'>
          <FileText className='mx-auto h-12 w-12 text-primary' />
          <h2 className='mt-4 text-2xl font-bold'>Security documentation</h2>
          <p className='mt-2 text-muted-foreground'>For procurement teams: security whitepaper, DPA template, and architecture review available under NDA.</p>
          <Button asChild className='mt-6'><Link href='/contact'>Request documentation</Link></Button>
        </div>
      </section>
    </div>
  );
}
