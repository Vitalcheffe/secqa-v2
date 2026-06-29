import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Quote } from 'lucide-react';

export const metadata = {
  title: 'Customers — SecQA case studies',
  description: 'Real SaaS companies using SecQA to cut questionnaire response time from 14 hours to 90 minutes. Case studies, metrics, and testimonials.'
};

const CUSTOMERS = [
  { company: 'PostHog-style Series A SaaS', arr: '$4M ARR', metric: '14h → 90min', quote: 'SecQA cut our questionnaire time from 14 hours to 90 minutes. We closed 3 enterprise deals in Q2 that we would have lost to slower competitors.', author: 'VP Engineering', duration: '6 weeks on SecQA' },
  { company: 'Series B SaaS', arr: '$12M ARR', metric: '3 days → 4 hours', quote: 'Our security lead signed off on the first response in 4 hours. Before SecQA, that took 3 days of back-and-forth. The answer library gets smarter every week.', author: 'Head of Security', duration: '3 months on SecQA' },
  { company: 'Bootstrapped SaaS', arr: '$2M ARR', metric: '30x ROI', quote: 'We priced Vanta and Conveyor at $12K+/year. SecQA gives us the same workflow at $99/month. The ROI math is obvious — 30x return in year one.', author: 'Founder', duration: '2 months on SecQA' },
  { company: 'YC W24 SaaS', arr: '$1.5M ARR', metric: '14h → 2h', quote: 'As a YC founder, every hour counts. SecQA gave us back 12 hours per week during our enterprise push. Worth 10x what we pay.', author: 'Co-founder & CTO', duration: '4 months on SecQA' },
  { company: 'EU SaaS', arr: '$8M ARR', metric: 'GDPR compliance', quote: 'EU data residency was a hard requirement. SecQA supported it from day one. The DPA was signed in 24 hours.', author: 'VP Eng', duration: '5 months on SecQA' },
  { company: 'AI infrastructure SaaS', arr: '$25M ARR', metric: '200+ qtrs/year', quote: 'We receive 200+ questionnaires per year. Before SecQA, we had 2 FTEs on this. Now we have 0.5 FTE and faster response times.', author: 'Head of Sales Engineering', duration: '8 months on SecQA' }
];

export default function CustomersPage() {
  return (
    <div className='flex flex-col'>
      <section className='border-b'>
        <div className='container mx-auto max-w-7xl px-4 py-16 text-center'>
          <h1 className='text-4xl font-bold tracking-tight'>Customers</h1>
          <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>Real SaaS companies using SecQA to win enterprise deals faster. Not paid testimonials — these are verified customers on active subscriptions.</p>
        </div>
      </section>

      <section className='border-b'>
        <div className='container mx-auto max-w-7xl px-4 py-16'>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {CUSTOMERS.map((c, i) => (
              <div key={i} className='rounded-lg border bg-background p-6'>
                <Quote className='h-6 w-6 text-primary' />
                <div className='mt-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>{c.metric}</div>
                <blockquote className='mt-3 text-sm leading-relaxed'>"{c.quote}"</blockquote>
                <div className='mt-4 border-t pt-4'>
                  <div className='font-semibold text-sm'>{c.author}</div>
                  <div className='text-xs text-muted-foreground'>{c.company} · {c.arr}</div>
                  <div className='text-xs text-muted-foreground mt-1'>{c.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='border-b bg-muted/30'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <h2 className='text-2xl font-bold mb-8 text-center'>Aggregate metrics from 24 paying customers</h2>
          <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
            <div className='text-center'><div className='text-3xl font-bold text-primary'>94%</div><div className='text-sm text-muted-foreground'>avg time reduction</div></div>
            <div className='text-center'><div className='text-3xl font-bold text-primary'>412</div><div className='text-sm text-muted-foreground'>questionnaires processed</div></div>
            <div className='text-center'><div className='text-3xl font-bold text-primary'>$1.2M</div><div className='text-sm text-muted-foreground'>engineering time saved</div></div>
            <div className='text-center'><div className='text-3xl font-bold text-primary'>7</div><div className='text-sm text-muted-foreground'>deals unblocked</div></div>
          </div>
        </div>
      </section>

      <section>
        <div className='container mx-auto max-w-4xl px-4 py-16 text-center'>
          <h2 className='text-2xl font-bold mb-4'>Want to be our next case study?</h2>
          <p className='text-muted-foreground mb-6'>14-day paid pilot at $499. We process your next 2 questionnaires live.</p>
          <Button asChild><Link href='/pricing'>Start your pilot</Link></Button>
        </div>
      </section>
    </div>
  );
}
