import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Play, FileText, Brain, Shield, Zap, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Live Demo — Try SecQA without signup',
  description: 'See SecQA process a real 187-question CAIQ questionnaire in 90 seconds. No signup required. Then start your own pilot.'
};

export default function DemoPage() {
  return (
    <div className='flex flex-col'>
      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16 text-center'>
          <Play className='mx-auto h-12 w-12 text-primary' />
          <h1 className='mt-4 text-4xl font-bold tracking-tight'>Live Demo</h1>
          <p className='mt-4 text-lg text-muted-foreground'>Watch SecQA process a real 187-question CAIQ questionnaire in 90 seconds. No signup, no email, no commitment.</p>
        </div>
      </section>

      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <div className='rounded-lg border bg-muted/30 aspect-video flex items-center justify-center'>
            <div className='text-center'>
              <Play className='mx-auto h-16 w-16 text-primary' />
              <p className='mt-4 text-sm text-muted-foreground'>3-minute demo video (Loom embed)</p>
              <p className='text-xs text-muted-foreground'>Shows: upload → parse → generate → cite → export → Slack notify</p>
            </div>
          </div>
        </div>
      </section>

      <section className='border-b bg-muted/30'>
        <div className='container mx-auto max-w-7xl px-4 py-16'>
          <h2 className='text-2xl font-bold mb-12 text-center'>What you see in the demo</h2>
          <div className='grid gap-8 md:grid-cols-5'>
            {[
              { icon: FileText, step: 1, title: 'Upload', desc: 'CAIQ PDF (187 questions) uploaded via drag-drop' },
              { icon: Brain, step: 2, title: 'Generate', desc: 'Claude drafts 90% of answers in 90 seconds' },
              { icon: Shield, step: 3, title: 'Cite', desc: 'Each answer links to source past response' },
              { icon: Zap, step: 4, title: 'Export', desc: 'One-click export to Word with template preserved' },
              { icon: ArrowRight, step: 5, title: 'Integrate', desc: 'Slack notification sent to security lead' }
            ].map((s) => (
              <div key={s.step}>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold'>{s.step}</div>
                <s.icon className='mt-4 h-6 w-6 text-primary' />
                <h3 className='mt-2 font-semibold text-sm'>{s.title}</h3>
                <p className='mt-1 text-xs text-muted-foreground'>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className='container mx-auto max-w-4xl px-4 py-16 text-center'>
          <h2 className='text-2xl font-bold mb-4'>Want to try with YOUR questionnaire?</h2>
          <p className='text-muted-foreground mb-6'>14-day paid pilot at $499. We process your next 2 real questionnaires live.</p>
          <Button asChild size='lg'><Link href='/pricing'>Start your $499 pilot</Link></Button>
        </div>
      </section>
    </div>
  );
}
