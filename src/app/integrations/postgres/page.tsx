'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem, SectionDivider } from '@/components/ui/motion';
import { ArrowRight, CheckCircle2, ChevronDown, Database, Lock, RefreshCw, FileText, Server, Webhook, Zap } from 'lucide-react';

const FEATURES = [
  { icon: Database, title: 'Direct Postgres connection', desc: 'Connect SecQA to your Postgres database (AWS RDS, Aurora, GCP Cloud SQL, Supabase, Neon, or self-hosted). Standard libpq wire protocol, no drivers to install.' },
  { icon: Lock, title: 'SSL + IAM auth', desc: 'Require SSL/TLS for all connections. AWS RDS IAM auth supported — no static passwords. Connection credentials encrypted at rest with AES-256-GCM.' },
  { icon: RefreshCw, title: 'Bi-directional sync', desc: 'Approved answers flow into Postgres in under 5 seconds. Inverse sync pulls reference data from Postgres views into your SecQA knowledge base for AI retrieval.' },
  { icon: FileText, title: 'Schema-aware exports', desc: 'Map SecQA answer fields to your existing Postgres schema. Custom columns (region, business_unit, fiscal_year) populated from questionnaire metadata. JSONB columns supported for citations.' },
  { icon: Server, title: 'Read replica support', desc: 'Send write traffic to your primary and read traffic to a replica. Keeps SecQA analytics queries off your primary — zero impact on production database performance.' },
  { icon: Webhook, title: 'LISTEN/NOTIFY integration', desc: 'SecQA listens on Postgres NOTIFY channels for inbound events. New row in your questionnaire_queue table? SecQA picks it up in under 100ms via LISTEN, no polling required.' },
];

const STEPS = [
  {
    title: 'Create a dedicated SecQA role in Postgres',
    desc: 'Run SQL in psql or your preferred client to create a role with the minimum privileges SecQA needs. Never use the postgres superuser.',
    code: "CREATE ROLE secqa_role WITH LOGIN PASSWORD 'use-ssl-instead' CONNECTION LIMIT 5;\nCREATE DATABASE secqa;\n\\c secqa\nCREATE SCHEMA IF NOT EXISTS answers AUTHORIZATION secqa_role;\nGRANT USAGE ON SCHEMA answers TO secqa_role;\nGRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA answers TO secqa_role;\nALTER DEFAULT PRIVILEGES IN SCHEMA answers GRANT SELECT, INSERT, UPDATE ON TABLES TO secqa_role;",
  },
  {
    title: 'Configure SSL/TLS (required)',
    desc: 'Generate or download the CA certificate for your Postgres instance. For AWS RDS, download the rds-combined-ca-bundle.pem. For self-hosted, use your own CA.',
    code: '# AWS RDS CA bundle\nwget https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem\n\n# Verify cert is in PEM format\nopenssl x509 -in rds-combined-ca-bundle.pem -text -noout | head',
  },
  {
    title: 'Create the target table (or use auto-DDL)',
    desc: 'Either pre-create the answers table or let SecQA auto-generate the DDL on first sync. Auto-DDL creates question, answer, category, reviewer, citations (JSONB), confidence, and approved_at columns.',
    code: "CREATE TABLE answers.approved (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  question TEXT NOT NULL,\n  answer TEXT NOT NULL,\n  category TEXT,\n  reviewer TEXT,\n  citations JSONB DEFAULT '[]'::jsonb,\n  confidence NUMERIC(5,2),\n  approved_at TIMESTAMPTZ DEFAULT NOW()\n);\n\nCREATE INDEX idx_approved_category ON answers.approved(category);\nCREATE INDEX idx_approved_reviewer ON answers.approved(reviewer);\nCREATE INDEX idx_approved_approved_at ON answers.approved(approved_at DESC);",
  },
  {
    title: 'Add credentials to SecQA dashboard',
    desc: 'In SecQA → Settings → Integrations → Postgres, paste the host, port (5432 default), database, username, password, and SSL CA certificate. Click "Test connection" — SecQA runs SELECT 1 against your database.',
    code: 'POST /api/integrations/postgres\n{\n  "host": "db.yourdomain.us-east-1.rds.amazonaws.com",\n  "port": 5432,\n  "database": "secqa",\n  "user": "secqa_role",\n  "password": "********",\n  "ssl_mode": "verify-full",\n  "ssl_ca": "-----BEGIN CERTIFICATE-----\\nMIIDQTCCAimgAwIBA..."\n}',
  },
  {
    title: 'Map SecQA fields to Postgres columns',
    desc: 'For each SecQA answer field, map to a Postgres column. Default mapping is one-to-one. Unmapped fields are skipped. JSONB columns accept arrays and objects.',
    code: '# Field mapping\nquestion      → question\nanswer        → answer\ncategory      → category\nreviewer      → reviewer\ncitations     → citations (JSONB)\nconfidence    → confidence\napproved_at   → approved_at (auto)',
  },
  {
    title: 'Configure LISTEN/NOTIFY (optional)',
    desc: 'For real-time inbound sync, create a Postgres trigger that NOTIFYs a SecQA-listening channel on insert. SecQA picks up new rows in under 100ms — no polling, no cron.',
    code: "CREATE OR REPLACE FUNCTION notify_secqa()\nRETURNS TRIGGER AS $$\nBEGIN\n  PERFORM pg_notify('secqa_queue', json_build_object('id', NEW.id, 'source', NEW.source)::text);\n  RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql;\n\nCREATE TRIGGER secqa_queue_trigger\nAFTER INSERT ON questionnaire_queue\nFOR EACH ROW EXECUTE FUNCTION notify_secqa();",
  },
];

const CONFIG = [
  { option: 'Connection string', type: 'secret', default: '—', desc: 'Full libpq connection string or individual host/port/db/user/password fields.' },
  { option: 'SSL mode', type: 'enum', default: 'verify-full', desc: 'Options: disable, allow, prefer, require, verify-ca, verify-full. verify-full is strongly recommended.' },
  { option: 'SSL CA certificate', type: 'secret', default: '—', desc: 'PEM-encoded CA certificate for verifying the Postgres server. Required for verify-ca and verify-full.' },
  { option: 'Read replica host', type: 'string', default: '—', desc: 'Optional read-only host for analytics queries. Keeps SecQA reads off your primary.' },
  { option: 'Sync trigger', type: 'enum', default: 'on-approval', desc: 'When to push answers to Postgres. Options: on-approval, hourly-batch, nightly-batch, manual.' },
  { option: 'LISTEN channel', type: 'string', default: 'secqa_queue', desc: 'Postgres NOTIFY channel SecQA listens on for inbound events. Set to empty to disable.' },
];

const USE_CASES = [
  {
    title: 'Approved answers land in Postgres for GRC reporting',
    desc: 'A 200-question CAIQ questionnaire is approved. Within 5 seconds, 200 rows land in your answers.approved table. Your GRC analyst runs a SQL query: "show me all answers where confidence < 80%". Results in 50ms — no UI clicks, no exports.',
  },
  {
    title: 'Inbound LISTEN/NOTIFY triggers SecQA on new vendor questionnaires',
    desc: 'Your vendor-risk team drops new vendor security questionnaires into a Postgres queue table. A trigger fires NOTIFY on the secqa_queue channel. SecQA picks up the row in under 100ms, parses the questionnaire, drafts answers, and writes the response back — fully automated.',
  },
  {
    title: 'Reverse ETL: customer master data feeds answer drafts',
    desc: 'Your customer master table in Postgres (containing ARR, region, business unit) is synced into SecQA as a reference source. When a questionnaire arrives for that customer, AI drafts use the master data to personalize answers (e.g., "Acme uses 3 AWS regions: us-east-1, eu-west-1, ap-southeast-2").',
  },
];

const FAQS = [
  {
    q: 'Do I need to expose my Postgres database to the public internet?',
    a: 'No. We strongly recommend using AWS PrivateLink, GCP Private Service Connect, or a VPC peering connection. If you must use a public endpoint, restrict access to SecQA egress IPs (provided in Settings → Integrations → Postgres → Network policy) and require SSL verify-full. Never expose a Postgres instance without SSL.',
  },
  {
    q: 'How does SecQA handle connection pooling?',
    a: 'SecQA uses a per-workspace connection pool with a max of 5 connections. If you use PgBouncer in transaction mode, set pool_size to 1 in SecQA — PgBouncer handles the rest. We never open more than your CONNECTION LIMIT allows.',
  },
  {
    q: 'What happens if a Postgres insert fails (database down, schema changed)?',
    a: 'SecQA retries the insert with exponential backoff (1s, 5s, 15s, 60s). After 4 failed attempts, the answer is marked "sync-pending" and you get a Slack alert. The answer is never lost — it sits in a sync queue and is retried on the next sync window or manual retry.',
  },
  {
    q: 'Can SecQA read from Postgres, not just write?',
    a: 'Yes. Configure inverse sync in Settings → Integrations → Postgres → Reference data. Pick any table or view, and SecQA ingests rows into your knowledge base as a typed answer source. Useful for pulling customer master data, contract metadata, or asset inventories into questionnaire drafts.',
  },
];

const RELATED = [
  { slug: 'snowflake', name: 'Snowflake', emoji: '❄️' },
  { slug: 'aws', name: 'AWS', emoji: '☁️' },
  { slug: 'datadog', name: 'Datadog', emoji: '📊' },
  { slug: 'vercel', name: 'Vercel', emoji: '▲' },
];

export default function PostgresIntegrationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Integrations</p></FadeIn>
          <FadeIn delay={0.1}>
            <div className='text-5xl mb-6'>🐘</div>
            <h1 className='text-5xl md:text-6xl lg:text-[72px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Postgres + SecQA<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-8'>
              Connect SecQA to your Postgres database — AWS RDS, Aurora, GCP Cloud SQL, Supabase, Neon, or self-hosted. SSL+IAM auth, schema-aware exports, LISTEN/NOTIFY for real-time inbound sync. Answers land in your database in under 5 seconds.
            </p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Connect Postgres <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>

      <SectionDivider className='max-w-[1400px]' />

      <section className='py-16 md:py-24 bg-[#0D0D0D]'>
        <div className='max-w-[1200px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Capabilities</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>What you get</h2>
            </div>
          </FadeIn>
          <StaggerContainer className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' staggerDelay={0.07}>
            {FEATURES.map((f) => (
              <StaggerItem key={f.title}>
                <div className='card p-6 h-full'>
                  <div className='w-10 h-10 rounded-lg bg-[rgba(139,157,175,0.1)] border border-[rgba(139,157,175,0.15)] flex items-center justify-center mb-4'>
                    <f.icon size={18} className='text-[#8B9DAF]' />
                  </div>
                  <h3 className='text-[15px] font-bold text-white mb-2'>{f.title}</h3>
                  <p className='text-[13px] text-[#999999] leading-relaxed'>{f.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className='py-16 md:py-24 bg-[#111111]'>
        <div className='max-w-[1000px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Setup</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Detailed setup guide</h2>
              <p className='text-[14px] text-[#999999] mt-3'>Setup takes 20-30 minutes. Requires Postgres superuser or database owner access to create the role and table.</p>
            </div>
          </FadeIn>
          <div className='space-y-4'>
            {STEPS.map((step, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className='card p-6'>
                  <div className='flex items-start gap-4 mb-3'>
                    <span className='w-9 h-9 flex items-center justify-center rounded-full bg-[#8B9DAF] text-black text-[14px] font-extrabold shrink-0'>{i + 1}</span>
                    <h3 className='text-[16px] font-bold text-white pt-1'>{step.title}</h3>
                  </div>
                  <p className='text-[13px] text-[#999999] leading-[1.7] mb-4 pl-13'>{step.desc}</p>
                  {step.code && (
                    <pre className='bg-[#0A0A0A] border border-[rgba(255,255,255,0.06)] rounded-lg p-4 ml-13 overflow-x-auto no-scrollbar'><code className='text-[12px] text-[#8B9DAF] font-mono leading-relaxed whitespace-pre'>{step.code}</code></pre>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className='py-16 md:py-24 bg-[#0D0D0D]'>
        <div className='max-w-[1200px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Configuration</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Configuration options</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className='card overflow-hidden'>
              <div className='overflow-x-auto no-scrollbar'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b border-[rgba(255,255,255,0.06)]'>
                      <th className='text-left text-[12px] uppercase tracking-wider text-[#999999] font-semibold px-6 py-4'>Option</th>
                      <th className='text-left text-[12px] uppercase tracking-wider text-[#999999] font-semibold px-6 py-4'>Type</th>
                      <th className='text-left text-[12px] uppercase tracking-wider text-[#999999] font-semibold px-6 py-4'>Default</th>
                      <th className='text-left text-[12px] uppercase tracking-wider text-[#999999] font-semibold px-6 py-4'>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CONFIG.map((row) => (
                      <tr key={row.option} className='border-b border-[rgba(255,255,255,0.04)] last:border-0'>
                        <td className='px-6 py-4 text-[13px] text-white font-medium font-mono'>{row.option}</td>
                        <td className='px-6 py-4 text-[12px] text-[#999999] font-mono'>{row.type}</td>
                        <td className='px-6 py-4 text-[12px] text-[#CCCCCC] font-mono'>{row.default}</td>
                        <td className='px-6 py-4 text-[13px] text-[#999999]'>{row.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className='py-16 md:py-24 bg-[#111111]'>
        <div className='max-w-[1200px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Use cases</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>How teams use it</h2>
            </div>
          </FadeIn>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {USE_CASES.map((uc, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className='card p-6 h-full'>
                  <div className='text-[11px] uppercase tracking-wider text-[#8B9DAF] mb-3 font-semibold'>Scenario {i + 1}</div>
                  <h3 className='text-[15px] font-bold text-white mb-3'>{uc.title}</h3>
                  <p className='text-[13px] text-[#999999] leading-relaxed'>{uc.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className='py-16 md:py-24 bg-[#0D0D0D]'>
        <div className='max-w-[900px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Troubleshooting</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>FAQ & troubleshooting</h2>
            </div>
          </FadeIn>
          <div className='space-y-3'>
            {FAQS.map((f, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className='card overflow-hidden'>
                  <button
                    type='button'
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className='w-full flex items-center justify-between gap-3 p-6 text-left hover:bg-[rgba(255,255,255,0.02)] transition-colors'
                    aria-expanded={openFaq === i}
                  >
                    <div className='flex items-start gap-3'>
                      <CheckCircle2 size={18} className='text-[#8B9DAF] mt-0.5 shrink-0' />
                      <h3 className='text-[15px] font-bold text-white'>{f.q}</h3>
                    </div>
                    <ChevronDown size={18} className={`text-[#999999] shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className='px-6 pb-6 pl-13'>
                      <p className='text-[13px] text-[#999999] leading-[1.7] pl-7'>{f.a}</p>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className='py-16 md:py-24 bg-[#111111]'>
        <div className='max-w-[1200px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Related</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Related integrations</h2>
            </div>
          </FadeIn>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {RELATED.map((r, i) => (
              <FadeIn key={r.slug} delay={i * 0.06}>
                <Link href={`/integrations/${r.slug}`} className='card p-5 flex items-center gap-3 hover:bg-[rgba(255,255,255,0.02)] transition-colors group'>
                  <span className='text-2xl'>{r.emoji}</span>
                  <div>
                    <p className='text-[14px] font-bold text-white group-hover:text-[#8B9DAF] transition-colors'>{r.name}</p>
                    <p className='text-[11px] text-[#666666]'>View integration</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className='py-20 md:py-28 bg-[#0D0D0D]'>
        <div className='max-w-[900px] mx-auto px-6 md:px-12 text-center'>
          <FadeIn>
            <h2 className='text-3xl md:text-5xl font-bold text-white tracking-tight mb-4'>Ready to connect Postgres?</h2>
            <p className='text-lg text-white/50 mb-8'>14-day paid pilot at $499. Connect Postgres in under 30 minutes.</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Start your pilot <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
