'use client';
import Link from 'next/link';
import { FadeIn } from '@/components/ui/motion';
import { ArrowRight } from 'lucide-react';

const FEATURES = [
  'Real-time sync and notifications',
  'Automated workflow triggers',
  'Custom field mapping',
  'Audit trail and logging',
];

const STEPS = [
  'Create an account on the provider platform',
  'Generate API credentials or webhook URL',
  'Add credentials to SecQA dashboard',
  'Configure sync preferences and test',
];

export default function VercelIntegrationPage() {
  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Integrations</p></FadeIn>
          <FadeIn delay={0.1}>
            <div className='text-4xl mb-4'>▲</div>
            <h1 className='text-5xl md:text-6xl lg:text-[72px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Vercel + SecQA<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-8'>Deploy</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Get started <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className='py-20 md:py-28 bg-[#0D0D0D]'>
        <div className='max-w-[800px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <h2 className='text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight'>Features</h2>
            <ul className='space-y-3'>
              {FEATURES.map((f) => (
                <li key={f} className='flex items-start gap-3'>
                  <span className='text-[#8B9DAF] mt-1 shrink-0'>✓</span>
                  <span className='text-[14px] text-[#CCCCCC]'>{f}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      <section className='py-20 md:py-28 bg-[#111111]'>
        <div className='max-w-[800px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <h2 className='text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight'>Setup</h2>
            <ol className='space-y-4'>
              {STEPS.map((s, i) => (
                <li key={i} className='flex items-start gap-4'>
                  <span className='w-7 h-7 flex items-center justify-center rounded-full bg-[rgba(139,157,175,0.1)] border border-[rgba(139,157,175,0.15)] text-[#8B9DAF] text-[12px] font-bold shrink-0'>{i + 1}</span>
                  <span className='text-[14px] text-[#CCCCCC] pt-0.5'>{s}</span>
                </li>
              ))}
            </ol>
          </FadeIn>
        </div>
      </section>

      <section className='py-20 md:py-28 bg-[#0D0D0D]'>
        <div className='max-w-[800px] mx-auto px-6 md:px-12 text-center'>
          <FadeIn>
            <h2 className='text-2xl md:text-3xl font-bold text-white tracking-tight mb-4'>Ready to connect Vercel?</h2>
            <p className='text-lg text-white/50 mb-8'>Start your 14-day pilot at $499.</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Start your pilot <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
