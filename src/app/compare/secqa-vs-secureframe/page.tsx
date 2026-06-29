import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, X } from 'lucide-react';

export const metadata = {
  title: 'SecQA vs Secureframe — Pricing and Feature Comparison',
  description: 'Detailed comparison: SecQA ($99/mo) vs Secureframe. Security questionnaire automation vs compliance automation.'
};

export default function ComparisonPage() {
  return (
    <div className='flex flex-col'>
      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <h1 className='text-4xl font-bold tracking-tight'>SecQA vs Secureframe</h1>
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
              <h3 className='font-bold text-lg'>Secureframe</h3>
              <div className='mt-2 text-2xl font-bold'>$8,000+/year (enterprise pricing)</div>
              <p className='mt-2 text-sm text-muted-foreground'>SOC2, HIPAA, GDPR compliance automation</p>
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
            <li className='flex items-start gap-2'><span className='text-primary mt-1'>✓</span><span>Priced for SaaS $1M-$20M ARR</span></li>
            <li className='flex items-start gap-2'><span className='text-primary mt-1'>✓</span><span>Questionnaire response workflow (Secureframe is compliance-focused)</span></li>
            <li className='flex items-start gap-2'><span className='text-primary mt-1'>✓</span><span>HubSpot deal integration</span></li>
            <li className='flex items-start gap-2'><span className='text-primary mt-1'>✓</span><span>Self-serve checkout (no sales call required)</span></li>
              </ul>
            </div>
            <div>
              <h3 className='font-bold mb-4'>Where Secureframe wins</h3>
              <ul className='space-y-2 text-sm text-muted-foreground'>
            <li className='flex items-start gap-2'><span className='text-muted-foreground mt-1'>✓</span><span>Multi-framework compliance (SOC2, HIPAA, GDPR, ISO)</span></li>
            <li className='flex items-start gap-2'><span className='text-muted-foreground mt-1'>✓</span><span>Larger integration ecosystem</span></li>
            <li className='flex items-start gap-2'><span className='text-muted-foreground mt-1'>✓</span><span>Stronger enterprise sales motion</span></li>
            <li className='flex items-start gap-2'><span className='text-muted-foreground mt-1'>✓</span><span>More mature product (founded 2020)</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <h3 className='font-bold mb-4'>Which is best for you?</h3>
          <p className='text-sm text-muted-foreground leading-relaxed'>Choose Secureframe if you need multi-framework compliance automation. Choose SecQA if your primary pain is questionnaire response and your ARR does not justify $8K+ compliance tools.</p>
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
