import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, X } from 'lucide-react';

export const metadata = {
  title: 'SecQA vs Conveyor — Pricing and Feature Comparison',
  description: 'Detailed comparison: SecQA ($99/mo) vs Conveyor ($12,000/year). Security questionnaire automation, trust center, and pricing.'
};

export default function ComparisonPage() {
  return (
    <div className='flex flex-col'>
      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <h1 className='text-4xl font-bold tracking-tight'>SecQA vs Conveyor</h1>
          <p className='mt-4 text-lg text-muted-foreground'>A factual comparison for B2B SaaS founders evaluating security questionnaire automation tools.</p>
        </div>
      </section>

      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <div className='grid gap-8 md:grid-cols-2'>
            <div className='rounded-lg border border-primary p-6 bg-primary/5'>
              <h3 className='font-bold text-lg'>SecQA</h3>
              <div className='mt-2 text-2xl font-bold text-primary'>$99<span className='text-sm font-normal text-muted-foreground'>/month</span></div>
              <p className='mt-2 text-sm text-muted-foreground'>Built for SaaS $1M-$20M ARR</p>
            </div>
            <div className='rounded-lg border p-6'>
              <h3 className='font-bold text-lg'>Conveyor</h3>
              <div className='mt-2 text-2xl font-bold'>$12,000/year</div>
              <p className='mt-2 text-sm text-muted-foreground'>Enterprise security questionnaire automation and trust center</p>
            </div>
          </div>
        </div>
      </section>

      <section className='border-b bg-muted/30'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <div className='grid gap-8 md:grid-cols-2'>
            <div>
              <h3 className='font-bold mb-4'>Where SecQA wins</h3>
              <ul className='space-y-2 text-sm'>
            <li className='flex items-start gap-2'><span className='text-primary mt-1'>✓</span><span>1/100th the price for the same core workflow</span></li>
            <li className='flex items-start gap-2'><span className='text-primary mt-1'>✓</span><span>No enterprise sales cycle — self-serve checkout</span></li>
            <li className='flex items-start gap-2'><span className='text-primary mt-1'>✓</span><span>HubSpot deal integration (Conveyor does not have — they sell to security teams)</span></li>
            <li className='flex items-start gap-2'><span className='text-primary mt-1'>✓</span><span>14-day paid pilot instead of 12-month annual contract</span></li>
            <li className='flex items-start gap-2'><span className='text-primary mt-1'>✓</span><span>Founding customer lifetime pricing lock</span></li>
              </ul>
            </div>
            <div>
              <h3 className='font-bold mb-4'>Where Conveyor wins</h3>
              <ul className='space-y-2 text-sm text-muted-foreground'>
            <li className='flex items-start gap-2'><span className='text-muted-foreground mt-1'>✓</span><span>More mature AI (they have been training on customer data for 3+ years)</span></li>
            <li className='flex items-start gap-2'><span className='text-muted-foreground mt-1'>✓</span><span>Built-in trust center product (we have a basic version)</span></li>
            <li className='flex items-start gap-2'><span className='text-muted-foreground mt-1'>✓</span><span>Larger customer base (more training data, more integrations)</span></li>
            <li className='flex items-start gap-2'><span className='text-muted-foreground mt-1'>✓</span><span>Enterprise procurement team experienced with their product</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <h3 className='font-bold mb-4'>Which is best for you?</h3>
          <p className='text-sm text-muted-foreground leading-relaxed'>Choose Conveyor if you are $50M+ ARR with a dedicated security team and budget for $12K/year. Choose SecQA if you are $1M-$20M ARR and need the same workflow at a price that makes sense for your deal volume.</p>
        </div>
      </section>

      <section>
        <div className='container mx-auto max-w-4xl px-4 py-16 text-center'>
          <h2 className='text-2xl font-bold mb-4'>Try SecQA with your own questionnaire</h2>
          <p className='text-muted-foreground mb-6'>14-day paid pilot at $499. Money-back if we don't hit 90-minute first draft.</p>
          <Button asChild><Link href='/pricing'>Start your pilot</Link></Button>
        </div>
      </section>
    </div>
  );
}
