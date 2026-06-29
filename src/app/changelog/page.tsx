import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Changelog — SecQA product updates',
  description: 'What we shipped, when we shipped it. No marketing fluff — just features, fixes, and improvements.'
};

const UPDATES = [
  { date: '2026-06-29', version: 'v2.0.0', type: 'major', title: 'SecQA v2.0 — full rebrand', items: ['New emerald/slate palette for security/trust signaling', 'Rebuilt on Next.js 16 + React 19 + Tailwind 4', '30 dashboard pages from Kiranism template (MIT)', 'New marketing homepage with 8 sections', 'Pricing page with monthly/annual toggle + comparison table', 'About, Contact, Customers, Changelog pages', '7 legal pages (Terms, Privacy, Security, DPA, AUP, Responsible Disclosure, Trademark)', '5 comparison pages vs Vanta, Conveyor, Drata, Secureframe, Loopio'] },
  { date: '2026-06-28', version: 'v1.3.0', type: 'fix', title: 'Vercel build stability', items: ['Fixed Sentry v8 API: tracesPropagationTargets typo', 'Removed non-existent Sentry integrations (vercelEdgeIntegration)', 'Lazy-load pdf-parse to avoid test-file side effect in serverless', 'Added postinstall: prisma generate for Vercel cache compatibility'] },
  { date: '2026-06-28', version: 'v1.2.0', type: 'feature', title: 'Launch infrastructure', items: ['Stripe billing: checkout, webhook with signature verification, customer portal', 'Sentry monitoring: client, server, edge configs with PII filtering', 'Vercel deployment config with function timeouts', 'Pricing tiers: Starter $49, Pro $99, Scale $299', 'Annual billing with 17% discount'] },
  { date: '2026-06-28', version: 'v1.1.0', type: 'feature', title: 'MVP core', items: ['5 API routes: parse, generate, cite, export, integrate', 'Claude 3.5 Haiku integration with real prompt template', 'RAG module with hash-based embedding (256-dim, L2 normalized)', 'Questionnaire parser: PDF, DOCX, CSV, TXT support', 'Prisma schema with 7 models (Questionnaire, Question, Answer, Export, Customer, Subscription, Invoice)', '26 passing tests across 5 test suites'] },
  { date: '2026-06-27', version: 'v1.0.0', type: 'major', title: 'Initial MVP', items: ['Next.js 14 + TypeScript + Tailwind + Prisma + SQLite', '5 frontend pages: upload, generate, cite, export, integrate', 'Slack + Notion webhook integrations', 'Demo mode (works without Anthropic API key)'] }
];

const TYPE_COLORS = { major: 'default', feature: 'secondary', fix: 'outline' };

export default function ChangelogPage() {
  return (
    <div className='flex flex-col'>
      <section className='border-b'>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <h1 className='text-4xl font-bold tracking-tight'>Changelog</h1>
          <p className='mt-4 text-lg text-muted-foreground'>What we shipped, when we shipped it.</p>
        </div>
      </section>

      <section>
        <div className='container mx-auto max-w-4xl px-4 py-16'>
          <div className='space-y-12'>
            {UPDATES.map((u, i) => (
              <div key={i} className='border-l-2 border-primary/20 pl-6'>
                <div className='flex items-center gap-3'>
                  <Badge variant={TYPE_COLORS[u.type as keyof typeof TYPE_COLORS] as 'default' | 'secondary' | 'outline'}>{u.type}</Badge>
                  <span className='text-sm text-muted-foreground'>{u.date}</span>
                  <span className='text-sm font-mono'>{u.version}</span>
                </div>
                <h2 className='mt-3 text-xl font-bold'>{u.title}</h2>
                <ul className='mt-3 space-y-1 text-sm text-muted-foreground'>
                  {u.items.map((item, j) => (<li key={j} className='flex items-start gap-2'><span className='text-primary mt-1'>•</span><span>{item}</span></li>))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
