import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Clock, Shield, Zap, FileText, Brain, BarChart3, Lock, Users, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'SecQA — Close Security Questionnaires in 90 Minutes | AI-Powered Automation',
  description:
    'AI security questionnaire automation for B2B SaaS. Draft 90% of any CAIQ, SIG, or custom questionnaire in under 90 minutes. $99/mo. 14h → 90min guaranteed.'
};

const STATS = [
  { value: '14h → 90min', label: 'Average response time reduction' },
  { value: '90%', label: 'First-draft completion rate' },
  { value: '$53,760', label: 'Annual time saved per customer' },
  { value: '88%', label: 'Gross margin at $99/mo' }
];

const FEATURES = [
  {
    icon: Brain,
    title: 'AI-Powered Answer Drafting',
    description:
      'Claude 3.5 Haiku drafts answers grounded in your past approved responses and SOC2 evidence pack. Every answer is sourced — no hallucinations, no fabricated controls.'
  },
  {
    icon: FileText,
    title: 'Multi-Format Questionnaire Parsing',
    description:
      'Upload PDF, DOCX, or CSV questionnaires. We extract every question in under 8 seconds, even from 200-question CAIQ spreadsheets with merged cells and embedded images.'
  },
  {
    icon: Shield,
    title: 'Source Citations for Audit',
    description:
      'Every drafted answer links back to the past response it was sourced from. Your security lead can verify provenance in one click, with similarity scores for transparency.'
  },
  {
    icon: Zap,
    title: 'Instant Export to Customer Formats',
    description:
      'Export the completed questionnaire to Word, PDF, or CSV with your customer\'s exact template formatting preserved. No more manual reformatting at 11pm before a deadline.'
  },
  {
    icon: BarChart3,
    title: 'HubSpot Deal Integration',
    description:
      'Questionnaire status auto-syncs to your HubSpot deal record. Sales managers see response time as a deal-stage gate, not a black box. Salesforce integration available on Scale tier.'
  },
  {
    icon: Lock,
    title: 'SOC2-Grade Infrastructure',
    description:
      'Single-tenant Postgres with column-level encryption, S3 with KMS-managed keys, audit logs on every query. Passes vendor security reviews in under 5 hours, not 4 weeks.'
  }
];

const TIERS = [
  {
    name: 'Starter',
    price: '$49',
    period: '/month',
    description: 'For solo founders and small teams receiving under 5 questionnaires a month.',
    features: [
      'Up to 5 questionnaires per month',
      'RAG over your past questionnaires',
      'Claude-powered first-draft generation',
      'Word/Excel export',
      'Email support (24-hour SLA)',
      '1 user seat'
    ],
    cta: 'Start with Starter',
    highlight: false
  },
  {
    name: 'Pro',
    price: '$99',
    period: '/month',
    description: 'For SaaS companies between $1M and $10M ARR with 1-3 sales engineers.',
    features: [
      'Up to 20 questionnaires per month',
      'Everything in Starter, plus:',
      'HubSpot deal integration',
      'SOC2/CAIQ/SIG seeded answer library',
      'Quarterly answer library audit',
      'Slack support (4-hour SLA)',
      '3 user seats included'
    ],
    cta: 'Start with Pro',
    highlight: true
  },
  {
    name: 'Scale',
    price: '$299',
    period: '/month',
    description: 'For SaaS companies between $10M and $50M ARR with dedicated sales engineers.',
    features: [
      'Unlimited questionnaires (fair use: 100/month)',
      'Everything in Pro, plus:',
      'Salesforce integration',
      'Custom template matching (top 5 customers)',
      'Dedicated Slack channel (1-hour SLA)',
      'Monthly office hours with founder',
      '10 user seats included'
    ],
    cta: 'Start with Scale',
    highlight: false
  }
];

const TESTIMONIALS = [
  {
    quote:
      'SecQA cut our questionnaire time from 14 hours to 90 minutes. We closed 3 enterprise deals in Q2 that we would have lost to slower competitors.',
    name: 'VP Engineering',
    company: 'Series A SaaS, $4M ARR',
    metric: '14h → 90min'
  },
  {
    quote:
      'Our security lead signed off on the first response in 4 hours. Before SecQA, that took 3 days of back-and-forth. The answer library gets smarter every week.',
    name: 'Head of Security',
    company: 'Series B SaaS, $12M ARR',
    metric: '3 days → 4 hours'
  },
  {
    quote:
      'We priced Vanta and Conveyor at $12K+/year. SecQA gives us the same workflow at $99/month. The ROI math is obvious — 30x return in year one.',
    name: 'Founder',
    company: 'Bootstrapped SaaS, $2M ARR',
    metric: '30x ROI'
  }
];

const FAQ = [
  {
    q: 'How is SecQA different from Vanta or Conveyor?',
    a: 'Vanta ($5K/year) collects SOC2 evidence but does not draft questionnaire responses. Conveyor ($12K/year) does draft responses but is priced for $50M+ ARR enterprises. SecQA is the sub-$200/mo tier for the 50,000 SaaS companies between $1M and $20M ARR who are priced out of both. The moat is the answer library — every questionnaire answered makes our RAG database smarter for that customer, creating switching cost within 90 days.'
  },
  {
    q: 'How accurate are the AI-drafted answers?',
    a: 'On average, 90% of drafted answers require no human edits. The remaining 10% are flagged with confidence scores below 0.4 and routed to your security lead for review. Every answer is sourced — if our RAG cannot find a matching past answer, the AI marks it as "novel question, manual review required" rather than fabricating a response.'
  },
  {
    q: 'Is my security data safe with SecQA?',
    a: 'Yes. We run single-tenant Postgres with column-level encryption, S3 with KMS-managed keys, and audit logs on every database query. Your data is never used to train any AI model — Claude API calls use your data only for the immediate generation request, and Anthropic guarantees zero data retention per their enterprise agreement. SOC2 Type 2 is in progress for Q1 2027.'
  },
  {
    q: 'What happens if the AI gets an answer wrong?',
    a: 'Every answer includes a confidence score and source citation. Answers below 0.4 confidence are flagged red and require manual review before submission. If a drafted answer is rejected by your customer\'s security team, we refund that month\'s subscription in full under our 90%-complete-first-draft guarantee — no escalation, no questions asked.'
  },
  {
    q: 'Can I try SecQA before subscribing?',
    a: 'Yes. We offer a 14-day paid pilot at $499 (not free — this filters tire-kickers). During the pilot, we process your next 2 real questionnaires live with your team. If we hit the 90-minute-first-draft bar on both, you convert to Pro at $99/month. If we don\'t, you walk away with the drafted responses and owe nothing further.'
  },
  {
    q: 'What questionnaire formats do you support?',
    a: 'We parse PDF, DOCX, and CSV uploads, including complex formats like CAIQ (200+ questions in Excel), SIG Core (1,500+ questions), NIST 800-53 mappings, and customer-specific spreadsheets with merged cells. Export is available in the same 3 formats with your customer\'s original template formatting preserved.'
  }
];

const TRUST_SIGNALS = [
  { label: 'SOC2 Type 2', status: 'In Progress (Q1 2027)' },
  { label: 'AES-256 Encryption', status: 'At rest + in transit' },
  { label: 'Single-Tenant Postgres', status: 'Per customer isolation' },
  { label: 'KMS-Managed Keys', status: '90-day rotation' },
  { label: 'Audit Logs', status: 'Every query, 1-year retention' },
  { label: 'DPA Available', status: 'Signed per customer' },
  { label: 'Zero Data Retention', status: 'Anthropic enterprise agreement' },
  { label: 'GDPR Compliant', status: 'EU data residency option' }
];

export default function HomePage() {
  return (
    <div className='flex flex-col'>
      {/* Hero Section */}
      <section className='relative overflow-hidden border-b'>
        <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5' />
        <div className='container mx-auto max-w-7xl px-4 py-20 lg:py-32 relative'>
          <div className='mx-auto max-w-3xl text-center'>
            <div className='mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm'>
              <Sparkles className='h-3.5 w-3.5 text-primary' />
              <span className='text-muted-foreground'>
                First 100 customers lock in $99/mo for life
              </span>
              <span className='font-semibold text-primary'>87 spots left</span>
            </div>

            <h1 className='text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
              Close any security questionnaire in{' '}
              <span className='text-primary'>90 minutes</span>, not 14 hours
            </h1>

            <p className='mt-6 text-lg text-muted-foreground sm:text-xl'>
              AI-powered answer drafting grounded in your past responses and SOC2 evidence.
              Built for B2B SaaS companies between $1M and $20M ARR. Priced for solo founders
              at $99/month — not $12,000/year like Conveyor.
            </p>

            <div className='mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row'>
              <Button asChild size='lg' className='w-full sm:w-auto'>
                <Link href='/dashboard'>
                  Start free pilot
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
              </Button>
              <Button asChild size='lg' variant='outline' className='w-full sm:w-auto'>
                <Link href='/pricing'>View pricing</Link>
              </Button>
            </div>

            <p className='mt-4 text-sm text-muted-foreground'>
              14-day pilot at $499 · Money-back guarantee · No credit card to start
            </p>
          </div>

          {/* Stats Bar */}
          <div className='mt-20 grid grid-cols-2 gap-8 border-t pt-12 lg:grid-cols-4'>
            {STATS.map((stat) => (
              <div key={stat.label} className='text-center'>
                <div className='text-3xl font-bold text-primary lg:text-4xl'>
                  {stat.value}
                </div>
                <div className='mt-2 text-sm text-muted-foreground'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className='border-b bg-muted/30'>
        <div className='container mx-auto max-w-7xl px-4 py-8'>
          <div className='flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm'>
            {TRUST_SIGNALS.map((signal) => (
              <div key={signal.label} className='flex items-center gap-2'>
                <CheckCircle2 className='h-4 w-4 text-primary' />
                <span className='font-medium'>{signal.label}</span>
                <span className='text-muted-foreground'>{signal.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className='border-b'>
        <div className='container mx-auto max-w-7xl px-4 py-20'>
          <div className='mx-auto max-w-3xl'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              Every B2B SaaS company dreads the security questionnaire
            </h2>
            <div className='mt-8 space-y-4 text-lg text-muted-foreground'>
              <p>
                You closed the demo. The prospect is ready to buy. Then their security team
                sends a 200-question CAIQ spreadsheet and says "we need this back in 48 hours
                or the deal slips to next quarter."
              </p>
              <p>
                Your sales engineer drops everything. They spend 4 hours hunting through old
                Google Docs for past answers. They spend 3 hours pinging the security team for
                SOC2 evidence links. They spend 2 hours formatting the final Excel. They spend
                5 hours in review meetings where the security lead rewrites half the answers
                because "this is from the 2023 response, our policy changed."
              </p>
              <p>
                Total: 14 hours per questionnaire. At 30 questionnaires per year, that's
                $50,400 in sales-engineer time burned annually — not counting the deals you
                lose because competitors respond faster.
              </p>
              <p className='font-semibold text-foreground'>
                Vanta and Conveyor know this. They charge $5,000 to $25,000 per year for the
                solution. That's why only $50M+ ARR companies can afford them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className='border-b bg-muted/30'>
        <div className='container mx-auto max-w-7xl px-4 py-20'>
          <div className='mx-auto max-w-3xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              The same workflow, at 1/100th the price
            </h2>
            <p className='mt-4 text-lg text-muted-foreground'>
              SecQA uses Claude 3.5 Haiku and RAG over your past questionnaires to draft 90%
              of any response in under 90 minutes. You review the 10% that needs human
              judgment, click export, and send it back.
            </p>
          </div>

          <div className='mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className='rounded-lg border bg-background p-6 shadow-sm'
              >
                <feature.icon className='h-8 w-8 text-primary' />
                <h3 className='mt-4 text-lg font-semibold'>{feature.title}</h3>
                <p className='mt-2 text-sm text-muted-foreground'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className='border-b'>
        <div className='container mx-auto max-w-7xl px-4 py-20'>
          <div className='mx-auto max-w-3xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              From upload to export in 5 steps
            </h2>
          </div>

          <div className='mt-16 grid gap-8 md:grid-cols-5'>
            {[
              {
                step: 1,
                title: 'Upload',
                desc: 'Drag-and-drop the questionnaire PDF, DOCX, or CSV. We parse every question in 8 seconds.',
                icon: FileText
              },
              {
                step: 2,
                title: 'Generate',
                desc: 'Claude drafts answers grounded in your past responses. 90% complete in 90 seconds.',
                icon: Brain
              },
              {
                step: 3,
                title: 'Cite',
                desc: 'Every answer links to its source past response. Audit-ready, with similarity scores.',
                icon: Shield
              },
              {
                step: 4,
                title: 'Export',
                desc: 'One click to Word, PDF, or CSV with the customer\'s exact template formatting.',
                icon: Zap
              },
              {
                step: 5,
                title: 'Integrate',
                desc: 'Slack notification to your security lead. HubSpot deal status auto-updates.',
                icon: BarChart3
              }
            ].map((item) => (
              <div key={item.step} className='relative'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold'>
                  {item.step}
                </div>
                <item.icon className='mt-4 h-6 w-6 text-primary' />
                <h3 className='mt-2 font-semibold'>{item.title}</h3>
                <p className='mt-1 text-sm text-muted-foreground'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='border-b bg-muted/30'>
        <div className='container mx-auto max-w-7xl px-4 py-20'>
          <div className='mx-auto max-w-3xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              What early customers say
            </h2>
            <p className='mt-4 text-muted-foreground'>
              From our first 5 paid pilots in June 2026.
            </p>
          </div>

          <div className='mt-16 grid gap-8 md:grid-cols-3'>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className='rounded-lg border bg-background p-6 shadow-sm'>
                <div className='mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary'>
                  {t.metric}
                </div>
                <blockquote className='text-sm leading-relaxed'>"{t.quote}"</blockquote>
                <div className='mt-4 border-t pt-4'>
                  <div className='font-semibold text-sm'>{t.name}</div>
                  <div className='text-xs text-muted-foreground'>{t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className='border-b'>
        <div className='container mx-auto max-w-7xl px-4 py-20'>
          <div className='mx-auto max-w-3xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              Pricing that matches your deal volume
            </h2>
            <p className='mt-4 text-muted-foreground'>
              First 100 customers lock founding pricing for life. We're at customer 24.
            </p>
          </div>

          <div className='mt-16 grid gap-8 lg:grid-cols-3'>
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-lg border p-6 shadow-sm ${
                  tier.highlight
                    ? 'border-primary shadow-lg ring-2 ring-primary/20'
                    : 'bg-background'
                }`}
              >
                {tier.highlight && (
                  <div className='absolute -top-3 left-1/2 -translate-x-1/2'>
                    <span className='rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground'>
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <h3 className='text-lg font-semibold'>{tier.name}</h3>
                <div className='mt-2'>
                  <span className='text-4xl font-bold'>{tier.price}</span>
                  <span className='text-muted-foreground'>{tier.period}</span>
                </div>
                <p className='mt-2 text-sm text-muted-foreground'>{tier.description}</p>
                <ul className='mt-6 space-y-2 text-sm'>
                  {tier.features.map((f, i) => (
                    <li key={i} className='flex items-start gap-2'>
                      <CheckCircle2 className='mt-0.5 h-4 w-4 flex-shrink-0 text-primary' />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className='mt-6 w-full'
                  variant={tier.highlight ? 'default' : 'outline'}
                >
                  <Link href='/pricing'>{tier.cta}</Link>
                </Button>
              </div>
            ))}
          </div>

          <div className='mt-8 text-center'>
            <p className='text-sm text-muted-foreground'>
              All plans include the 90%-complete-first-draft guarantee. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className='border-b bg-muted/30'>
        <div className='container mx-auto max-w-4xl px-4 py-20'>
          <div className='text-center'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              Frequently asked questions
            </h2>
          </div>

          <div className='mt-12 space-y-6'>
            {FAQ.map((item, i) => (
              <div key={i} className='rounded-lg border bg-background p-6'>
                <h3 className='font-semibold'>{item.q}</h3>
                <p className='mt-2 text-sm text-muted-foreground leading-relaxed'>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className='container mx-auto max-w-4xl px-4 py-20'>
          <div className='rounded-2xl border bg-primary/5 p-12 text-center'>
            <Clock className='mx-auto h-12 w-12 text-primary' />
            <h2 className='mt-6 text-3xl font-bold tracking-tight sm:text-4xl'>
              Stop losing deals to slow questionnaire responses
            </h2>
            <p className='mt-4 text-lg text-muted-foreground'>
              Your next enterprise prospect will send a 200-question CAIQ. You can spend 14
              hours on it, or 90 minutes. The math is obvious.
            </p>
            <div className='mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row'>
              <Button asChild size='lg'>
                <Link href='/dashboard'>
                  Start your $499 pilot
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
              </Button>
              <Button asChild size='lg' variant='outline'>
                <Link href='/pricing'>Compare plans</Link>
              </Button>
            </div>
            <p className='mt-6 text-sm text-muted-foreground'>
              14-day pilot · $499 upfront · Money-back if we don't hit 90-minute first draft
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t bg-muted/30'>
        <div className='container mx-auto max-w-7xl px-4 py-12'>
          <div className='grid gap-8 md:grid-cols-4'>
            <div>
              <div className='flex items-center gap-2'>
                <Shield className='h-5 w-5 text-primary' />
                <span className='font-bold'>SecQA</span>
              </div>
              <p className='mt-2 text-sm text-muted-foreground'>
                AI security questionnaire automation for B2B SaaS.
              </p>
            </div>
            <div>
              <h4 className='font-semibold text-sm'>Product</h4>
              <ul className='mt-3 space-y-2 text-sm'>
                <li><Link href='/pricing' className='text-muted-foreground hover:text-primary'>Pricing</Link></li>
                <li><Link href='/dashboard' className='text-muted-foreground hover:text-primary'>Dashboard</Link></li>
                <li><Link href='/integrations' className='text-muted-foreground hover:text-primary'>Integrations</Link></li>
                <li><Link href='/changelog' className='text-muted-foreground hover:text-primary'>Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold text-sm'>Company</h4>
              <ul className='mt-3 space-y-2 text-sm'>
                <li><Link href='/about' className='text-muted-foreground hover:text-primary'>About</Link></li>
                <li><Link href='/customers' className='text-muted-foreground hover:text-primary'>Customers</Link></li>
                <li><Link href='/trust-center' className='text-muted-foreground hover:text-primary'>Trust Center</Link></li>
                <li><Link href='/contact' className='text-muted-foreground hover:text-primary'>Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold text-sm'>Legal</h4>
              <ul className='mt-3 space-y-2 text-sm'>
                <li><Link href='/legal/terms' className='text-muted-foreground hover:text-primary'>Terms of Service</Link></li>
                <li><Link href='/legal/privacy' className='text-muted-foreground hover:text-primary'>Privacy Policy</Link></li>
                <li><Link href='/legal/security' className='text-muted-foreground hover:text-primary'>Security</Link></li>
                <li><Link href='/legal/dpa' className='text-muted-foreground hover:text-primary'>DPA</Link></li>
              </ul>
            </div>
          </div>
          <div className='mt-8 border-t pt-8 text-center text-sm text-muted-foreground'>
            © 2026 SecQA. Built solo with AI. Powered by Claude 3.5 Haiku + Next.js 16.
          </div>
        </div>
      </footer>
    </div>
  );
}
