'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem, SectionDivider } from '@/components/ui/motion';
import { ArrowRight, CheckCircle2, ChevronDown, Database, Snowflake, BarChart3, Lock, RefreshCw, FileText, Webhook } from 'lucide-react';

const FEATURES = [
  { icon: Database, title: 'Native Snowflake connector', desc: 'Connect SecQA to your Snowflake account with key-pair authentication. No ODBC drivers, no middleware — just paste the account identifier and private key.' },
  { icon: BarChart3, title: 'Answer analytics warehouse', desc: 'Every approved questionnaire answer is synced to a Snowflake table you own. Run Looker, Tableau, or dbt queries to track answer coverage, reviewer workload, and time-to-respond.' },
  { icon: Lock, title: 'Key-pair auth (no passwords)', desc: 'Use Snowflake key-pair authentication with RSA-2048 keys. Private keys are encrypted at rest with AES-256 and never leave your SecQA workspace.' },
  { icon: RefreshCw, title: 'Bi-directional sync', desc: 'Approved answers flow into Snowflake in under 60 seconds. Inverse sync pulls reference data from Snowflake views into your SecQA knowledge base for AI retrieval.' },
  { icon: FileText, title: 'Schema-aware exports', desc: 'Map SecQA answer fields to your existing Snowflake schema. Custom columns (region, business_unit, fiscal_year) are populated automatically from questionnaire metadata.' },
  { icon: Webhook, title: 'Event-driven webhooks', desc: 'Snowflake tasks and streams can trigger SecQA workflows. New row in your questionnaire queue table? SecQA picks it up, drafts answers, and writes the response back.' },
];

const STEPS = [
  {
    title: 'Generate an RSA key pair for Snowflake authentication',
    desc: 'Snowflake requires key-pair auth for service accounts. Generate a 2048-bit RSA private key and derive the public key. We never store passwords.',
    code: '# Generate private key (do not encrypt for service account)\nopenssl genrsa 2048 -out snowflake_key.p8\n\n# Derive public key\nopenssl rsa -in snowflake_key.p8 -pubout -out snowflake_key.pub',
  },
  {
    title: 'Create a SecQA service role in Snowflake',
    desc: 'In Snowsight → Worksheets, run DDL to create a dedicated role, user, and grants. The role only gets access to the schema SecQA writes to — never ACCOUNTADMIN.',
    code: "CREATE ROLE secqa_role;\nCREATE USER secqa_user DEFAULT_ROLE = secqa_role;\nGRANT ROLE secqa_role TO USER secqa_user;\nALTER USER secqa_user SET RSA_PUBLIC_KEY='MIIBIjANBgkqhkiG9w0B...';\nGRANT USAGE ON WAREHOUSE secqa_wh TO ROLE secqa_role;\nGRANT USAGE ON DATABASE secqa_db TO ROLE secqa_role;\nGRANT USAGE ON SCHEMA secqa_db.answers TO ROLE secqa_role;\nGRANT INSERT, SELECT ON secqa_db.answers.approved TO ROLE secqa_role;",
  },
  {
    title: 'Create the target table (or use auto-DDL)',
    desc: 'Either pre-create the answers table or let SecQA auto-generate the DDL on first sync. Auto-DDL creates question, answer, category, reviewer, citations, and approved_at columns.',
    code: "CREATE TABLE secqa_db.answers.approved (\n  id STRING PRIMARY KEY,\n  question TEXT NOT NULL,\n  answer TEXT NOT NULL,\n  category STRING,\n  reviewer STRING,\n  citations ARRAY,\n  confidence NUMBER(5,2),\n  approved_at TIMESTAMP_TZ DEFAULT CURRENT_TIMESTAMP()\n);",
  },
  {
    title: 'Add credentials to SecQA dashboard',
    desc: 'In SecQA → Settings → Integrations → Snowflake, paste the account identifier, username, role, warehouse, database, schema, and the RSA private key (PEM format). Click "Test connection" — SecQA runs a SELECT 1 against your warehouse.',
    code: 'POST /api/integrations/snowflake\n{\n  "account": "xy12345.us-east-1.aws",\n  "user": "secqa_user",\n  "role": "secqa_role",\n  "warehouse": "secqa_wh",\n  "database": "secqa_db",\n  "schema": "answers",\n  "private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBg..." \n}',
  },
  {
    title: 'Map SecQA fields to Snowflake columns',
    desc: 'For each SecQA answer field (question, answer, category, reviewer, citations, confidence), map it to a Snowflake column. Default mapping is one-to-one but you can rename or skip columns.',
    code: '# Field mapping\nquestion      → question\nanswer        → answer\ncategory      → category\nreviewer      → reviewer\ncitations     → citations\nconfidence    → confidence\napproved_at   → approved_at (auto)',
  },
  {
    title: 'Trigger first sync and verify row count',
    desc: 'Click "Sync now" in SecQA. Within 60 seconds, run SELECT COUNT(*) in Snowsight — you should see all historically-approved answers as rows. Set up a Snowflake task to materialize rollups nightly.',
    code: "SELECT COUNT(*) FROM secqa_db.answers.approved;\n-- Expected: matches SecQA dashboard total\n\nSELECT category, COUNT(*)\nFROM secqa_db.answers.approved\nGROUP BY 1 ORDER BY 2 DESC;",
  },
];

const CONFIG = [
  { option: 'Account identifier', type: 'string', default: '—', desc: 'Snowflake account identifier including region and cloud (e.g., xy12345.us-east-1.aws).' },
  { option: 'Authentication method', type: 'enum', default: 'key-pair', desc: 'Key-pair authentication only. Password auth is not supported for security reasons.' },
  { option: 'RSA private key (PEM)', type: 'secret', default: '—', desc: '2048-bit RSA private key in PEM format. Encrypted at rest with AES-256-GCM.' },
  { option: 'Sync trigger', type: 'enum', default: 'on-approval', desc: 'When to push answers to Snowflake. Options: on-approval, hourly-batch, nightly-batch, manual.' },
  { option: 'Auto-DDL', type: 'boolean', default: 'false', desc: 'If true, SecQA creates the target table on first sync if it does not exist.' },
  { option: 'Field mapping', type: 'object', default: '{}', desc: 'Map of SecQA answer fields to Snowflake column names. Unmapped fields are skipped.' },
];

const USE_CASES = [
  {
    title: 'Security team analyzes questionnaire trends in Looker',
    desc: 'Every approved answer lands in Snowflake within 60 seconds. Your security analyst builds a Looker dashboard on top: top 10 most-asked questions, average confidence by category, reviewer workload heatmap. Quarterly board reports write themselves.',
  },
  {
    title: 'dbt models transform answers into compliance KPIs',
    desc: 'Your data team writes dbt models on the Snowflake answers table: model 1 computes % answers from approved SOC 2 evidence, model 2 flags questions where AI confidence dropped below 80%. The output feeds your GRC tool of record (Drata, Vanta).',
  },
  {
    title: 'Snowflake stream triggers SecQA on new inbound RFPs',
    desc: 'Your RevOps team drops new RFP rows into a Snowflake queue table. A Snowflake stream detects the insert and fires a SecQA webhook. SecQA parses the RFP, drafts answers, and writes the response back to a Snowflake table — fully automated, zero human touch until review.',
  },
];

const FAQS = [
  {
    q: 'Do I need to expose my Snowflake account to the public internet?',
    a: 'No. Snowflake already exposes a public endpoint with TLS 1.2+ and optional network policies. If you have a network policy restricting IPs, add SecQA egress IPs to the allowed list (provided in Settings → Integrations → Snowflake → Network policy). AWS PrivateLink is supported on Enterprise plans — contact us.',
  },
  {
    q: 'Can SecQA read from Snowflake, not just write?',
    a: 'Yes. Configure inverse sync in Settings → Integrations → Snowflake → Reference data. Pick any Snowflake view, and SecQA ingests rows into your knowledge base as a typed answer source. Useful for pulling customer master data, contract metadata, or asset inventories into questionnaire drafts.',
  },
  {
    q: 'What happens if a Snowflake insert fails (warehouse suspended, schema changed)?',
    a: 'SecQA retries the insert with exponential backoff (1s, 5s, 15s, 60s). After 4 failed attempts, the answer is marked "sync-pending" and you get a Slack alert. The answer is never lost — it sits in a sync queue and retried on the next sync window or manual retry.',
  },
  {
    q: 'How are Snowflake compute costs handled?',
    a: 'SecQA uses your warehouse for inserts and SELECTs. Default warehouse size is X-Small. Average cost impact: under $5/month for typical workloads (200 answers/quarter). You can configure a dedicated secqa_wh with auto-suspend at 60 seconds to keep costs minimal.',
  },
];

const RELATED = [
  { slug: 'postgres', name: 'PostgreSQL', emoji: '🐘' },
  { slug: 'aws', name: 'AWS', emoji: '☁️' },
  { slug: 'datadog', name: 'Datadog', emoji: '📊' },
  { slug: 'github', name: 'GitHub', emoji: '🐙' },
];

export default function SnowflakeIntegrationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Integrations</p></FadeIn>
          <FadeIn delay={0.1}>
            <div className='text-5xl mb-6'>❄️</div>
            <h1 className='text-5xl md:text-6xl lg:text-[72px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Snowflake + SecQA<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-8'>
              Sync every approved questionnaire answer to your Snowflake warehouse in under 60 seconds. Key-pair auth, schema-aware exports, and event-driven webhooks. Turn your answers lake into compliance analytics.
            </p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Connect Snowflake <ArrowRight size={14} />
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
              <p className='text-[14px] text-[#999999] mt-3'>Setup takes 30-45 minutes. Requires Snowflake ACCOUNTADMIN or SECURITYADMIN access to create the service role.</p>
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
            <h2 className='text-3xl md:text-5xl font-bold text-white tracking-tight mb-4'>Ready to connect Snowflake?</h2>
            <p className='text-lg text-white/50 mb-8'>14-day paid pilot at $499. Connect Snowflake in under 45 minutes.</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Start your pilot <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
