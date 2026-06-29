import { Shield, Lock, FileText, Server, Key, ScrollText } from 'lucide-react';

export const metadata = {
  title: 'Trust Center — SecQA security and compliance',
  description: 'Public trust center for SecQA. Security architecture, compliance status, data handling, and sub-processors.'
};

const SECURITY_CONTROLS = [
  { icon: Lock, title: 'Encryption at rest', desc: 'AES-256 on all customer data. KMS-managed keys with 90-day automatic rotation.', status: 'Active' },
  { icon: Shield, title: 'Encryption in transit', desc: 'TLS 1.3 enforced. HSTS enabled. Legacy protocols (TLS 1.0/1.1) disabled.', status: 'Active' },
  { icon: Server, title: 'Single-tenant Postgres', desc: 'Per-customer database isolation. No shared schemas. Row-level security available on Scale tier.', status: 'Active' },
  { icon: Key, title: 'Key management', desc: 'AWS KMS with customer-specific master keys. CMK rotation every 90 days. No plaintext key storage.', status: 'Active' },
  { icon: ScrollText, title: 'Audit logging', desc: 'Every database query logged. Every API call logged. Logs retained 1 year. Available to customers on request.', status: 'Active' },
  { icon: FileText, title: 'SOC2 Type 2', desc: 'In progress with Vanta. Estimated completion Q1 2027. Current evidence pack available under NDA.', status: 'In Progress' }
];

const SUB_PROCESSORS = [
  { name: 'Anthropic', purpose: 'Claude 3.5 Haiku API for answer generation', location: 'US', dpa: 'Signed — zero data retention' },
  { name: 'AWS', purpose: 'Hosting infrastructure (S3, KMS)', location: 'us-east-1', dpa: 'Inherited SOC2, ISO 27001, FedRAMP' },
  { name: 'Supabase', purpose: 'Postgres database hosting', location: 'us-east-1', dpa: 'Signed — SOC2 Type 2 attested' },
  { name: 'Stripe', purpose: 'Payment processing', location: 'US', dpa: 'Inherited PCI DSS Level 1' },
  { name: 'Vercel', purpose: 'Application hosting and CDN', location: 'Global edge', dpa: 'Signed — SOC2 Type 2' },
  { name: 'Sentry', purpose: 'Error monitoring', location: 'US/EU', dpa: 'Signed — GDPR compliant' }
];

export default function TrustCenterPage() {
  return (
    <div className='flex flex-col'>
      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <Shield className='h-12 w-12 text-primary' />
          <h1 className='mt-4 text-4xl font-bold tracking-tight'>Trust Center</h1>
          <p className='mt-4 text-lg text-muted-foreground'>Security and compliance information for SecQA. Updated continuously. Last reviewed: June 2026.</p>
        </div>
      </section>

      <section className='border-b'>
        <div className='container mx-auto max-w-7xl px-4 py-16'>
          <h2 className='text-2xl font-bold mb-12'>Security controls</h2>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {SECURITY_CONTROLS.map((c) => (
              <div key={c.title} className='rounded-lg border p-6'>
                <div className='flex items-start justify-between'>
                  <c.icon className='h-8 w-8 text-primary' />
                  <span className={`text-xs px-2 py-1 rounded-full ${c.status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-yellow-100 text-yellow-700'}`}>{c.status}</span>
                </div>
                <h3 className='mt-4 font-semibold'>{c.title}</h3>
                <p className='mt-2 text-sm text-muted-foreground'>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='border-b bg-muted/30'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <h2 className='text-2xl font-bold mb-8'>Sub-processors</h2>
          <p className='text-sm text-muted-foreground mb-6'>We use the following sub-processors to deliver SecQA. We provide 30 days notice before adding or changing sub-processors.</p>
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse'>
              <thead><tr className='border-b'><th className='text-left p-3'>Provider</th><th className='text-left p-3'>Purpose</th><th className='text-left p-3'>Location</th><th className='text-left p-3'>DPA status</th></tr></thead>
              <tbody>
                {SUB_PROCESSORS.map((s) => (
                  <tr key={s.name} className='border-b'><td className='p-3 font-medium'>{s.name}</td><td className='p-3 text-sm text-muted-foreground'>{s.purpose}</td><td className='p-3 text-sm'>{s.location}</td><td className='p-3 text-sm text-muted-foreground'>{s.dpa}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <h2 className='text-2xl font-bold mb-6'>Data handling</h2>
          <div className='space-y-4 text-sm text-muted-foreground'>
            <p><strong className='text-foreground'>Data retention:</strong> Customer data is retained for the duration of the active subscription. Upon account closure, data is deleted within 30 days. Backup snapshots are overwritten within 90 days.</p>
            <p><strong className='text-foreground'>Data deletion:</strong> Customers can delete their data at any time via the admin UI. Deletion is permanent within 30 days. We provide a deletion certificate on request.</p>
            <p><strong className='text-foreground'>Data portability:</strong> Customers can export all their data (questionnaires, answers, answer library) in CSV format at any time from the dashboard.</p>
            <p><strong className='text-foreground'>AI training:</strong> We never use customer data to train any AI model. All Claude API calls use customer data only for the immediate generation request. Anthropic guarantees zero data retention per their enterprise agreement.</p>
            <p><strong className='text-foreground'>Incident response:</strong> We maintain a documented incident response plan. Critical incidents are escalated within 1 hour. Customers are notified within 24 hours of confirmed data breach per our DPA.</p>
          </div>
        </div>
      </section>

      <section>
        <div className='container mx-auto max-w-4xl px-4 py-16 text-center'>
          <h2 className='text-2xl font-bold mb-4'>Need more details?</h2>
          <p className='text-muted-foreground mb-6'>For security reviews, DPAs, or pen test reports, contact us.</p>
          <a href='mailto:founder@secqa.example?subject=Security%20Review' className='inline-block text-primary hover:underline'>founder@secqa.example</a>
        </div>
      </section>
    </div>
  );
}
