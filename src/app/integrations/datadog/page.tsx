import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Datadog Integration — SecQA',
  description: 'Send SecQA metrics to Datadog. Correlate questionnaire volume with your app performance.'
};

export default function DatadogIntegrationPage() {
  return (
    <div className='flex flex-col'>
      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <div className='flex items-center gap-4 mb-6'>
            <div className='text-4xl'>📊</div>
            <div>
              <h1 className='text-3xl font-bold'>Datadog + SecQA</h1>
              <Badge variant='secondary' className='mt-1'>Monitoring</Badge>
            </div>
          </div>
          <p className='text-lg text-muted-foreground max-w-2xl'>Send SecQA metrics to Datadog. Correlate questionnaire volume with your app performance.</p>
          <div className='mt-6 flex gap-3'>
            <Button asChild><Link href='/pricing'>Get started <ArrowRight className='ml-2 h-4 w-4' /></Link></Button>
            <Button asChild variant='outline'><Link href='/contact'>Talk to us</Link></Button>
          </div>
        </div>
      </section>

      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <h2 className='text-2xl font-bold mb-6'>Features</h2>
          <ul className='space-y-3'>
            <li className='flex items-start gap-2'><span className='text-primary mt-1'>✓</span><span>Custom metrics: questionnaires, hours saved</span></li>
            <li className='flex items-start gap-2'><span className='text-primary mt-1'>✓</span><span>Dashboards in your existing Datadog</span></li>
            <li className='flex items-start gap-2'><span className='text-primary mt-1'>✓</span><span>Alerts on anomaly detection</span></li>
            <li className='flex items-start gap-2'><span className='text-primary mt-1'>✓</span><span>Log correlation</span></li>
          </ul>
        </div>
      </section>

      <section className='border-b bg-muted/30'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <h2 className='text-2xl font-bold mb-6'>Setup</h2>
          <ol className='space-y-4'>
            <li className='flex items-start gap-3'><span className='flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold flex-shrink-0'>1</span><span className='text-sm pt-0.5'>Get your Datadog API key at app.datadoghq.com</span></li>
            <li className='flex items-start gap-3'><span className='flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold flex-shrink-0'>2</span><span className='text-sm pt-0.5'>Add API key to SecQA dashboard, Integrations, Datadog</span></li>
            <li className='flex items-start gap-3'><span className='flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold flex-shrink-0'>3</span><span className='text-sm pt-0.5'>Select which metrics to send</span></li>
          </ol>
        </div>
      </section>

      <section>
        <div className='container mx-auto max-w-4xl px-4 py-16 text-center'>
          <h2 className='text-2xl font-bold mb-4'>Ready to connect Datadog?</h2>
          <p className='text-muted-foreground mb-6'>Start your 14-day pilot at $499. We process your next 2 questionnaires live.</p>
          <Button asChild><Link href='/pricing'>Start your pilot</Link></Button>
        </div>
      </section>
    </div>
  );
}
