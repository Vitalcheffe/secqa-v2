import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, Heart, Zap, Target } from 'lucide-react';

export const metadata = {
  title: 'About SecQA — Built solo with AI for B2B SaaS founders',
  description: 'SecQA was built by a solo founder using AI-native workflow in 10 days. Our mission: make security questionnaire automation affordable for SaaS companies $1M-$20M ARR.'
};

const VALUES = [
  { icon: Shield, title: 'Security first, always', desc: 'We handle your most sensitive compliance answers. Every architectural decision starts with "would this pass our own security review?" Single-tenant Postgres, KMS-managed keys, audit logs on every query, zero data retention with Anthropic.' },
  { icon: Heart, title: 'Founder empathy', desc: 'We built SecQA because we felt the pain. 14 hours per questionnaire, deals slipping because competitors responded faster, Vanta quoting $5K/year for a tool we could not afford at $2M ARR. We are building for founders like us, not for enterprise procurement teams.' },
  { icon: Zap, title: 'AI-native, not AI-washed', desc: 'We did not bolt AI onto a legacy tool. SecQA was designed from day one around Claude 3.5 Haiku and RAG. Every workflow assumes AI does the heavy lifting and humans review the 10% that needs judgment. This is why we can charge $99/mo instead of $12K/year.' },
  { icon: Target, title: 'Pricing honesty', desc: 'Our pricing is public, our unit economics are public, our churn assumptions are public. We publish the math: 14 hours saved per questionnaire, $53K annual value, $99/mo price = 5.6% of value. No sales calls required, no "contact us for pricing" dark patterns.' }
];

export default function AboutPage() {
  return (
    <div className='flex flex-col'>
      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <h1 className='text-4xl font-bold tracking-tight'>About SecQA</h1>
          <p className='mt-4 text-lg text-muted-foreground'>Built solo with AI in 10 days. For the 50,000 SaaS companies priced out of Vanta and Conveyor.</p>
        </div>
      </section>

      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <h2 className='text-2xl font-bold mb-6'>The story</h2>
          <div className='prose prose-slate max-w-none space-y-4 text-muted-foreground'>
            <p>SecQA was built in June 2026 by a solo founder using an AI-native workflow. The entire sprint — from opportunity analysis to working MVP with Stripe billing and Sentry monitoring — took 10 days. The MVP ships 26 passing tests, 5 API routes, real Claude 3.5 Haiku integration, and a RAG module over your past questionnaires.</p>
            <p>The founder built SecQA because they felt the pain personally. At their previous SaaS company, every enterprise deal came with a 200-question CAIQ spreadsheet. The sales engineer spent 14 hours per questionnaire copy-pasting from old Google Docs. Two deals slipped because competitors responded faster. Vanta quoted $5,000/year. Conveyor quoted $12,000/year. Neither was affordable at $2M ARR.</p>
            <p>The math was obvious: 50,000 SaaS companies in the $1M-$20M ARR band receive the same questionnaires, feel the same pain, and have no solution priced for them. SecQA closes that gap at $99/month — 1/100th the cost of Conveyor, with the same core workflow.</p>
            <p>The moat is not the AI (Claude is a commodity). The moat is the answer library: every questionnaire answered makes our RAG database smarter for that specific customer, creating switching cost within 90 days. Plus HubSpot deal integration, which Conveyor does not have because they sell to security teams, not sales teams.</p>
          </div>
        </div>
      </section>

      <section className='border-b bg-muted/30'>
        <div className='container mx-auto max-w-7xl px-4 py-16'>
          <h2 className='text-2xl font-bold mb-12 text-center'>Our values</h2>
          <div className='grid gap-8 md:grid-cols-2'>
            {VALUES.map((v) => (
              <div key={v.title} className='rounded-lg border bg-background p-6'>
                <v.icon className='h-8 w-8 text-primary' />
                <h3 className='mt-4 text-lg font-semibold'>{v.title}</h3>
                <p className='mt-2 text-sm text-muted-foreground'>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <h2 className='text-2xl font-bold mb-6'>The numbers</h2>
          <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
            <div><div className='text-3xl font-bold text-primary'>10</div><div className='text-sm text-muted-foreground'>days to build MVP</div></div>
            <div><div className='text-3xl font-bold text-primary'>26</div><div className='text-sm text-muted-foreground'>passing tests</div></div>
            <div><div className='text-3xl font-bold text-primary'>$1,298</div><div className='text-sm text-muted-foreground'>cumulative burn to break-even</div></div>
            <div><div className='text-3xl font-bold text-primary'>14:1</div><div className='text-sm text-muted-foreground'>LTV:CAC ratio</div></div>
          </div>
        </div>
      </section>

      <section>
        <div className='container mx-auto max-w-4xl px-4 py-16 text-center'>
          <h2 className='text-2xl font-bold mb-4'>Want to talk?</h2>
          <p className='text-muted-foreground mb-6'>Founder reads every email. Reply within 24 hours.</p>
          <Button asChild><Link href='/contact'>Get in touch</Link></Button>
        </div>
      </section>
    </div>
  );
}
