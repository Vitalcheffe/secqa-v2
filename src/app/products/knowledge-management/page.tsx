import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Knowledge Management — SecQA Product',
  description: 'Centralized answer library for all your compliance and security content. RAG-powered retrieval.'
};

const FEATURES = [
  { title: 'Answer library', desc: 'Store past approved answers from every questionnaire, RFP, and security review. Tag by framework (SOC2, CAIQ, SIG, NIST), by topic (encryption, access control, incident response), and by customer.' },
  { title: 'AI-powered retrieval', desc: 'When a new question arrives, RAG retrieves the top 5 most similar past answers. Claude drafts a new answer grounded in those sources. No more copy-pasting from 5-year-old Google Docs.' },
  { title: 'Version control', desc: 'Every answer has a version history. When SOC2 renews, update the answer once and every future questionnaire uses the new version. Old questionnaires keep their original answer for audit.' },
  { title: 'Approval workflow', desc: 'Drafts route to your security lead for approval. Approved answers become the new source of truth. Rejected answers are flagged for revision.' },
  { title: 'Usage analytics', desc: 'See which answers are used most, which are stale, which need updating. Prioritize your compliance team\'s time.' },
  { title: 'Bulk import', desc: 'Import 1000+ past answers from CSV, Google Docs, or Confluence. We parse and tag automatically using Claude.' }
];

export default function ProductPage() {
  return (
    <div className='flex flex-col'>
      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <h1 className='text-4xl font-bold tracking-tight'>Knowledge Management</h1>
          <p className='mt-4 text-lg text-muted-foreground'>One source of truth for every compliance answer. AI retrieves the right answer for every question, every time.</p>
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
