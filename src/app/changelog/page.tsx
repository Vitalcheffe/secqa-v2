import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Changelog — SecQA product updates',
  description: 'What we shipped, when we shipped it.'
};

const UPDATES = [
  { date: '2026-06-29', version: 'v2.0.0', type: 'major', title: 'SecQA v2.0 — full redesign', items: ['New 4-color palette (#EEEEEE/#222831/#393E46/#00ADB5)', 'Rebuilt on Next.js 16 + React 19 + Tailwind 4', '74 pages, 25 API routes, 30 test files, 265 tests', 'All marketing pages redesigned from reference'] },
  { date: '2026-06-28', version: 'v1.3.0', type: 'fix', title: 'Vercel build stability', items: ['Fixed Sentry v8 API: tracesPropagationTargets typo', 'Removed non-existent Sentry integrations', 'Lazy-load pdf-parse to avoid test-file side effect', 'Added postinstall: prisma generate'] },
  { date: '2026-06-28', version: 'v1.2.0', type: 'feature', title: 'Launch infrastructure', items: ['Stripe billing: checkout, webhook, customer portal', 'Sentry monitoring: client, server, edge configs', 'Vercel deployment config', 'Pricing tiers: Starter $49, Pro $99, Scale $299'] },
  { date: '2026-06-28', version: 'v1.1.0', type: 'feature', title: 'MVP core', items: ['5 API routes: parse, generate, cite, export, integrate', 'Claude 3.5 Haiku integration', 'RAG module with hash-based embedding', 'Prisma schema with 7 models', '26 passing tests'] },
  { date: '2026-06-27', version: 'v1.0.0', type: 'major', title: 'Initial MVP', items: ['Next.js 14 + TypeScript + Tailwind + Prisma', '5 frontend pages', 'Slack + Notion webhook integrations', 'Demo mode (works without Anthropic API key)'] }
];

const TYPE_COLORS: Record<string, 'default' | 'secondary' | 'outline'> = { major: 'default', feature: 'secondary', fix: 'outline' };

export default function ChangelogPage() {
  return (
    <div style={{ background: '#EEEEEE', color: '#222831', fontFamily: 'Inter, sans-serif' }}>
      <section style={{ background: '#222831', color: '#EEEEEE', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1rem' }}>Changelog</h1>
        <p style={{ fontSize: '1.15rem', color: 'rgba(238,238,238,0.7)' }}>What we shipped, when we shipped it.</p>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {UPDATES.map((u, i) => (
            <div key={i} style={{ borderLeft: '2px solid #00ADB5', paddingLeft: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                <Badge variant={TYPE_COLORS[u.type]}>{u.type}</Badge>
                <span style={{ fontSize: '0.8rem', color: 'rgba(34,40,49,0.6)' }}>{u.date}</span>
                <span style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: '#00ADB5' }}>{u.version}</span>
              </div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.8rem' }}>{u.title}</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {u.items.map((item, j) => (
                  <li key={j} style={{ fontSize: '0.85rem', color: 'rgba(34,40,49,0.7)', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: '#00ADB5' }}>•</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ background: '#222831', padding: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(238,238,238,0.4)' }}>
        © 2026 SecQA. Security questionnaires, answered.
      </footer>
    </div>
  );
}
