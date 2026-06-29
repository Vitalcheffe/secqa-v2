import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Trust Center — SecQA Product',
  description: 'Public trust center for your SaaS. Reduce questionnaire volume by 60% with a self-serve trust portal.'
};

const FEATURES = [
  { title: 'Public security page', desc: 'Host your SOC2 report, security policies, and sub-processor list on a branded subdomain. Prospects self-serve before sending questionnaires.' },
  { title: 'Document request flow', desc: 'Prospects request access to sensitive documents (pen test reports, DPAs). You approve in one click. All access is logged.' },
  { title: 'Sub-processor registry', desc: 'Maintain a public list of sub-processors with 30-day change notification. Auto-generate the registry from your actual vendor list.' },
  { title: 'Compliance badges', desc: 'Display SOC2, GDPR, CCPA, ISO 27001 badges dynamically. Badges auto-update when certifications lapse.' },
  { title: 'FAQ section', desc: 'Pre-answer the 50 most common security questions. Prospects get answers without sending a questionnaire.' },
  { title: 'Analytics', desc: 'See which prospects visit your trust center, which documents they download, which FAQ they read. Route high-intent prospects to sales.' }
];

export default function ProductPage() {
  return (
    <div className='flex flex-col'>
      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <h1 className='text-4xl font-bold tracking-tight'>Trust Center</h1>
          <p className='mt-4 text-lg text-muted-foreground'>Reduce inbound questionnaires by 60%. Give prospects a self-serve trust portal before they send the 200-question CAIQ.</p>
          <Button asChild className='mt-6'><Link href='/pricing'>Get started <ArrowRight className='ml-2 h-4 w-4' /></Link></Button>
        </div>
      </section>

      <section className='border-b'>
        <div className='container mx-auto max-w-7xl px-4 py-16'>
          <h2 className='text-2xl font-bold mb-12 text-center'>Features</h2>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {FEATURES.map((f, i) => (
              <div key={`f-${i}`} className='rounded-lg border p-6'>
                <h3 className='font-semibold'>{f.title}</h3>
                <p className='mt-2 text-sm text-muted-foreground'>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className='container mx-auto max-w-4xl px-4 py-16 text-center'>
          <h2 className='text-2xl font-bold mb-4'>Ready to try?</h2>
          <p className='text-muted-foreground mb-6'>14-day paid pilot at $499. Money-back if we don&apos;t hit 90-minute first draft.</p>
          <Button asChild><Link href='/pricing'>Start your pilot</Link></Button>
        </div>
      </section>
    </div>
  );
}
