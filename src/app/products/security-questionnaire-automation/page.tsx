import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Security Questionnaire Automation — SecQA',
  description: 'AI-powered security questionnaire automation. Upload, generate, cite, export, integrate. 90 minutes instead of 14 hours.'
};

const FEATURES = [
  { title: 'Multi-format parsing', desc: 'Upload PDF, DOCX, or CSV. We extract every question in 8 seconds, even from 200-question CAIQ spreadsheets with merged cells and embedded images.' },
  { title: 'AI answer drafting', desc: 'Claude 3.5 Haiku drafts answers grounded in your past approved responses and SOC2 evidence pack. 90% complete in 90 seconds. No hallucinations — every answer is sourced.' },
  { title: 'Source citations', desc: 'Every drafted answer links back to the past response it was sourced from. Your security lead can verify provenance in one click, with similarity scores for transparency.' },
  { title: 'One-click export', desc: 'Export to Word, PDF, or CSV with your customer\'s exact template formatting preserved. No more manual reformatting at 11pm before a deadline.' },
  { title: 'Slack + Notion integration', desc: 'Send completion alerts to Slack. Create a Notion page with Q&A for collaborative review. Sync answers back to your knowledge base.' },
  { title: 'HubSpot deal integration', desc: 'Questionnaire status auto-syncs to your HubSpot deal record. Sales managers see response time as a deal-stage gate, not a black box.' }
];

export default function ProductPage() {
  return (
    <div className='flex flex-col'>
      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <h1 className='text-4xl font-bold tracking-tight'>Security Questionnaire Automation</h1>
          <p className='mt-4 text-lg text-muted-foreground'>Upload any questionnaire. Get a 90%-complete first draft in 90 minutes. Export to your customer&apos;s format. Done.</p>
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
