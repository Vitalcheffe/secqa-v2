'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem, CountUp, SectionDivider, Card3D } from '@/components/ui/motion';
import {
  Play,
  FileText,
  Brain,
  Shield,
  Zap,
  ArrowRight,
  Upload,
  Sparkles,
  CheckCircle2,
  Clock,
  X,
  Pause,
  Volume2,
  Maximize,
  Code2,
  Copy,
  Download,
} from 'lucide-react';

const WALKTHROUGH = [
  { icon: Upload, n: '01', t: 'Upload questionnaire', d: 'Drag a CAIQ PDF, SIG spreadsheet, or custom Word doc. Parser detects format and extracts questions in under 5 seconds.' },
  { icon: Brain, n: '02', t: 'RAG retrieval', d: 'We match each question against your answer library using hash-based embeddings plus Claude-powered semantic search.' },
  { icon: Sparkles, n: '03', t: 'Claude generates draft', d: 'Claude 3.5 Haiku drafts answers grounded in your library. 90% complete on first pass — humans review the 10% that needs judgment.' },
  { icon: Shield, n: '04', t: 'Cite sources', d: 'Every answer includes a citation to the library entry, security doc, or policy it came from. No hallucinations.' },
  { icon: Download, n: '05', t: 'Export', d: 'Export to Word, Excel, or CSV. Format matches the original questionnaire template — ready to send back to the prospect.' },
  { icon: Zap, n: '06', t: 'Notify', d: 'Slack notification fires to the deal owner when the draft is ready for review. HubSpot deal stage auto-updates.' },
];

const SAMPLE_QA = [
  {
    q: 'Describe your encryption at rest implementation.',
    a: 'All customer data is encrypted at rest using AES-256 with AWS KMS-managed customer master keys. Keys are automatically rotated every 90 days. Encryption is enforced at the storage layer (Postgres TDE for databases, S3 server-side encryption for objects) and cannot be disabled by any user, including SecQA administrators.',
    source: 'security_whitepaper.pdf §3.2',
    confidence: 96,
  },
  {
    q: 'How do you handle data deletion requests?',
    a: 'Customers can initiate deletion from the admin UI at any time. Permanent deletion completes within 30 days. A signed deletion certificate is provided on request. Backups containing the data are overwritten within 90 days of the deletion request.',
    source: 'dpa_template.docx §7.4',
    confidence: 98,
  },
  {
    q: 'What is your incident response time for critical issues?',
    a: 'Critical incidents are escalated to the on-call engineer within 1 hour of detection. Affected customers are notified within 24 hours per our DPA. A blameless post-mortem is published within 7 days. Quarterly tabletop exercises validate the runbook.',
    source: 'incident_response_policy.md §2.1',
    confidence: 94,
  },
];

const COMPARISON = [
  { metric: 'Time to first draft', manual: '14 hours', secqa: '90 minutes', improvement: '90% faster' },
  { metric: 'Answer consistency', manual: 'Variable', secqa: '95% library-grounded', improvement: 'Auditable' },
  { metric: 'Source citations', manual: 'Manual lookup', secqa: 'Auto-cited', improvement: 'Zero-hallucination' },
  { metric: 'Revision rounds', manual: '3-5 rounds', secqa: '1 round', improvement: '80% fewer' },
  { metric: 'Review bottleneck', manual: 'Sales engineer', secqa: 'Distributed', improvement: 'Parallelizable' },
  { metric: 'Cost per questionnaire', manual: '~$700 (SE time)', secqa: '~$5 (Claude + RAG)', improvement: '99% cheaper' },
];

const CODE_SAMPLE = `// SecQA generation API — production code
import { Anthropic } from '@anthropic-ai/sdk';
import { rag } from '@/lib/rag';

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function generateAnswer(question: string, library: Answer[]) {
  // 1. Retrieve relevant context from answer library
  const context = await rag.retrieve(question, library, { topK: 5 });

  // 2. Claude generates grounded answer (zero data retention)
  const response = await claude.messages.create({
    model: 'claude-3-5-haiku-20241022',
    max_tokens: 800,
    system: \`Answer using only the provided context.
              Cite sources. If unsure, say so.\`,
    messages: [{
      role: 'user',
      content: \`Question: \${question}\\n\\nContext: \${context}\`,
    }],
  });

  return { answer: response.content[0].text, sources: context };
}`;

export default function DemoPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  return (
    <div className='bg-[#0D0D0D] text-white'>
      {/* ═══ HERO ═══ */}
      <section className='relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='absolute top-0 right-1/4 w-[800px] h-[600px] rounded-full blur-[120px] pointer-events-none bg-[#8B9DAF]/[0.04]' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-6'>Live Demo</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className='text-5xl md:text-7xl lg:text-[88px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Watch 14 hours<br />become 90 minutes<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-4'>
              See SecQA process a real 187-question CAIQ questionnaire in 90 seconds. No signup. No email. No commitment.
            </p>
            <p className='text-[15px] text-[#999999] max-w-xl leading-[1.7]'>
              The full demo covers: upload, parse, RAG retrieval, Claude generation, source citation, Word export, and Slack notification.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ INTERACTIVE DEMO PREVIEW ═══ */}
      <section className='py-20 md:py-28 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Demo Preview</p>
            <h2 className='text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white tracking-tight mb-3'>
              3-minute walkthrough<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <p className='text-sm text-[#999999] mb-8'>Click play to see the full workflow end-to-end.</p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className='card overflow-hidden p-0'>
              {/* Video player chrome */}
              <div className='relative aspect-video bg-[#0A0A0A] flex items-center justify-center group'>
                <div className='absolute inset-0 dot-pattern opacity-30' />
                <button
                  type='button'
                  onClick={() => setPlaying(!playing)}
                  className='relative z-10 w-20 h-20 rounded-full bg-[#8B9DAF] flex items-center justify-center hover:scale-105 transition-transform'
                  aria-label={playing ? 'Pause demo' : 'Play demo'}
                >
                  {playing ? (
                    <Pause size={32} className='text-black' fill='currentColor' />
                  ) : (
                    <Play size={32} className='text-black ml-1' fill='currentColor' />
                  )}
                </button>
                <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent'>
                  <div className='flex items-center gap-3 text-white'>
                    <span className='text-xs font-mono'>00:42 / 03:14</span>
                    <div className='flex-1 h-1 bg-white/20 rounded-full overflow-hidden'>
                      <div className='h-full bg-[#8B9DAF] rounded-full w-[22%]' />
                    </div>
                    <Volume2 size={16} />
                    <Maximize size={16} />
                  </div>
                </div>
              </div>
              {/* Step selector */}
              <div className='p-6 md:p-8 border-t border-white/6'>
                <div className='flex flex-wrap gap-2 mb-4'>
                  {WALKTHROUGH.map((s, i) => (
                    <button
                      key={s.n}
                      type='button'
                      onClick={() => setActiveStep(i)}
                      className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                        activeStep === i
                          ? 'bg-[#8B9DAF] text-black'
                          : 'border border-white/10 text-[#999999] hover:border-white/25 hover:text-white'
                      }`}
                    >
                      {s.n} {s.t}
                    </button>
                  ))}
                </div>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 rounded-full bg-[#8B9DAF]/10 flex items-center justify-center flex-shrink-0'>
                    {(() => {
                      const Icon = WALKTHROUGH[activeStep].icon;
                      return <Icon size={22} className='text-[#8B9DAF]' />;
                    })()}
                  </div>
                  <div>
                    <h3 className='text-base font-semibold text-white mb-1'>
                      {WALKTHROUGH[activeStep].n} — {WALKTHROUGH[activeStep].t}
                    </h3>
                    <p className='text-sm text-[#999999] leading-[1.7]'>{WALKTHROUGH[activeStep].d}</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ FEATURE WALKTHROUGH WITH CODE ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Feature Walkthrough</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
              Six steps from upload to Slack<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <div className='accent-line mb-12' />
          </FadeIn>
          <StaggerContainer className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
            {WALKTHROUGH.map((s) => (
              <StaggerItem key={s.n}>
                <Card3D className='h-full group'>
                  <div className='flex items-center justify-between mb-4'>
                    <div className='w-10 h-10 rounded-full bg-[#8B9DAF]/10 flex items-center justify-center transition-colors group-hover:bg-[#8B9DAF]/20'>
                      <s.icon size={18} className='text-[#8B9DAF]' />
                    </div>
                    <span className='version-tag'>{s.n}</span>
                  </div>
                  <h3 className='text-base font-semibold text-white mb-2'>{s.t}</h3>
                  <p className='text-sm text-[#999999] leading-[1.7]'>{s.d}</p>
                </Card3D>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.2}>
            <div className='mt-12 card overflow-hidden p-0'>
              <div className='flex items-center justify-between px-5 py-3 border-b border-white/6 bg-white/[0.02]'>
                <div className='flex items-center gap-2'>
                  <Code2 size={16} className='text-[#8B9DAF]' />
                  <span className='text-xs font-mono text-[#999999]'>src/lib/generate.ts</span>
                </div>
                <button
                  type='button'
                  className='text-[#666666] hover:text-white transition-colors'
                  aria-label='Copy code'
                >
                  <Copy size={14} />
                </button>
              </div>
              <pre className='p-5 md:p-6 overflow-x-auto no-scrollbar text-xs leading-[1.7] text-[#CCCCCC] font-mono'>
                <code>{CODE_SAMPLE}</code>
              </pre>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ SAMPLE QUESTIONNAIRE OUTPUT ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Sample Output</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
              Real answers from a real questionnaire<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <div className='accent-line mb-12' />
          </FadeIn>
          <StaggerContainer className='space-y-4' staggerDelay={0.1}>
            {SAMPLE_QA.map((qa) => (
              <StaggerItem key={qa.q}>
                <div className='card'>
                  <div className='flex items-start gap-4 mb-4'>
                    <FileText size={18} className='text-[#8B9DAF] mt-0.5 flex-shrink-0' />
                    <p className='text-sm font-semibold text-white leading-relaxed flex-1'>{qa.q}</p>
                  </div>
                  <p className='text-sm text-[#999999] leading-[1.8] mb-4 pl-9'>{qa.a}</p>
                  <div className='flex flex-wrap items-center gap-3 pl-9'>
                    <span className='inline-flex items-center gap-1.5 text-xs text-[#8B9DAF]'>
                      <CheckCircle2 size={12} />
                      Source: <span className='font-mono'>{qa.source}</span>
                    </span>
                    <span className='text-[#666666]'>·</span>
                    <span className='inline-flex items-center gap-1.5 text-xs text-[#999999]'>
                      <Sparkles size={12} className='text-[#8B9DAF]' />
                      {qa.confidence}% confidence
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ BEFORE / AFTER COMPARISON ═══ */}
      <section className='py-28 md:py-36 bg-[#0D0D0D]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <p className='section-label mb-4'>Before / After</p>
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-6'>
              The math is the pitch<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <div className='accent-line mb-12' />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className='card overflow-x-auto no-scrollbar p-0'>
              <table className='data-table'>
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Manual process</th>
                    <th>With SecQA</th>
                    <th>Improvement</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((c) => (
                    <tr key={c.metric}>
                      <td>{c.metric}</td>
                      <td className='text-[#666666]'>
                        <span className='inline-flex items-center gap-1.5'>
                          <X size={12} className='text-[#666666]' />
                          {c.manual}
                        </span>
                      </td>
                      <td className='text-white'>
                        <span className='inline-flex items-center gap-1.5'>
                          <CheckCircle2 size={12} className='text-[#8B9DAF]' />
                          {c.secqa}
                        </span>
                      </td>
                      <td className='text-[#8B9DAF] font-medium'>{c.improvement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8'>
              <div className='card text-center'>
                <div className='text-3xl md:text-4xl font-bold text-white mb-1'>
                  <CountUp to={14} suffix='h' />
                </div>
                <p className='text-xs text-[#999999]'>Manual baseline</p>
              </div>
              <div className='card text-center'>
                <div className='text-3xl md:text-4xl font-bold text-[#8B9DAF] mb-1'>
                  <CountUp to={90} suffix='min' />
                </div>
                <p className='text-xs text-[#999999]'>With SecQA</p>
              </div>
              <div className='card text-center'>
                <div className='text-3xl md:text-4xl font-bold text-white mb-1'>
                  <CountUp to={90} suffix='%' />
                </div>
                <p className='text-xs text-[#999999]'>Faster first draft</p>
              </div>
              <div className='card text-center'>
                <div className='text-3xl md:text-4xl font-bold text-white mb-1'>
                  <CountUp to={95} suffix='%' />
                </div>
                <p className='text-xs text-[#999999]'>Library-grounded</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ CTA ═══ */}
      <section className='py-28 md:py-36 bg-[#111111]'>
        <div className='max-w-[900px] mx-auto px-6 md:px-12 text-center'>
          <FadeIn>
            <Clock size={36} className='text-[#8B9DAF] mx-auto mb-5' />
            <h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight mb-4'>
              Try with YOUR questionnaire<span className='text-[#8B9DAF]'>.</span>
            </h2>
            <p className='text-[15px] text-[#999999] leading-[1.7] mb-8 max-w-xl mx-auto'>
              14-day paid pilot at $499. We process your next 2 real questionnaires live. If we don&apos;t hit 90% first-draft completion, you get a full refund.
            </p>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-3'>
              <Link
                href='/pricing'
                className='inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md text-sm font-semibold hover:bg-white/90 transition-colors'
              >
                Start your $499 pilot
                <ArrowRight size={16} />
              </Link>
              <Link
                href='/contact'
                className='inline-flex items-center gap-2 border border-white/12 text-white px-6 py-3 rounded-md text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-colors'
              >
                Talk to the founder
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
