import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, X } from 'lucide-react';

export const metadata = {
  title: 'SecQA vs Vanta — Pricing and Feature Comparison',
  description: 'Detailed comparison: SecQA ($99/mo) vs Vanta ($5,000/year). Security questionnaire automation, SOC2 compliance, and pricing for SaaS $1M-$20M ARR.'
};

export default function ComparisonPage() {
  return (
    <div className='flex flex-col'>
      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <h1 className='text-4xl font-bold tracking-tight'>SecQA vs Vanta</h1>
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
              <h3 className='font-bold text-lg'>Vanta</h3>
              <div className='mt-2 text-2xl font-bold'>$5,000/year minimum</div>
              <p className='mt-2 text-sm text-muted-foreground'>SOC2 compliance and evidence collection</p>
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
            <li className='flex items-start gap-2'><span className='text-primary mt-1'>✓</span><span>Priced for SaaS $1M-$20M ARR (Vanta requires $50M+ ARR to justify ROI)</span></li>
            <li className='flex items-start gap-2'><span className='text-primary mt-1'>✓</span><span>Built for questionnaire response workflow, not just compliance</span></li>
            <li className='flex items-start gap-2'><span className='text-primary mt-1'>✓</span><span>HubSpot deal integration (Vanta has none — they sell to security teams)</span></li>
            <li className='flex items-start gap-2'><span className='text-primary mt-1'>✓</span><span>90%-complete-first-draft guarantee (Vanta offers no SLA on questionnaire responses)</span></li>
            <li className='flex items-start gap-2'><span className='text-primary mt-1'>✓</span><span>14-day paid pilot at $499 (Vanta requires annual contract upfront)</span></li>
              </ul>
            </div>
            <div>
              <h3 className='font-bold mb-4'>Where Vanta wins</h3>
              <ul className='space-y-2 text-sm text-muted-foreground'>
            <li className='flex items-start gap-2'><span className='text-muted-foreground mt-1'>✓</span><span>More mature SOC2 compliance automation</span></li>
            <li className='flex items-start gap-2'><span className='text-muted-foreground mt-1'>✓</span><span>Larger integration ecosystem (400+ integrations vs our 50+)</span></li>
            <li className='flex items-start gap-2'><span className='text-muted-foreground mt-1'>✓</span><span>Brand recognition and enterprise trust</span></li>
            <li className='flex items-start gap-2'><span className='text-muted-foreground mt-1'>✓</span><span>Dedicated customer success manager on enterprise tier</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <h3 className='font-bold mb-4'>Which is best for you?</h3>
          <p className='text-sm text-muted-foreground leading-relaxed'>Choose Vanta if you are a $50M+ ARR SaaS that needs end-to-end SOC2 compliance automation. Choose SecQA if you are $1M-$20M ARR and need questionnaire response workflow at a price your deal volume justifies.</p>
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
