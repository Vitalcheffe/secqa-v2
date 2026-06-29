'use client';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';

const secqaWins = [
  'Priced for SaaS $1M-$20M ARR',
  'Self-serve checkout, no sales calls',
  '14-day paid pilot at $499',
  'HubSpot deal integration',
  '90%-complete-first-draft guarantee',
];

const competitorWins = [
  'More mature product',
  'Larger integration ecosystem',
  'Brand recognition in enterprise',
  'Dedicated implementation team',
];

export default function ComparisonPage() {
  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Compare</p></FadeIn>
          <FadeIn delay={0.1}>
            <h1 className='text-5xl md:text-7xl lg:text-[88px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              SecQA vs<br />Conveyor<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed'>A factual comparison for B2B SaaS founders.</p>
          </FadeIn>
        </div>
      </section>

      <section className='py-12 md:py-20 bg-[#0D0D0D]'>
        <div className='max-w-[1000px] mx-auto px-6 md:px-12'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <FadeIn direction='right'>
              <div className='card p-8 ring-1 ring-[rgba(139,157,175,0.2)]'>
                <h3 className='text-lg font-bold text-white mb-2'>SecQA</h3>
                <div className='flex items-baseline gap-1 mb-2'>
                  <span className='text-4xl font-extrabold text-[#8B9DAF]'>$99</span>
                  <span className='text-[14px] text-[#999999]'>/month</span>
                </div>
                <p className='text-[13px] text-[#666666]'>Built for SaaS $1M-$20M ARR</p>
              </div>
            </FadeIn>
            <FadeIn direction='left' delay={0.1}>
              <div className='card p-8'>
                <h3 className='text-lg font-bold text-white mb-2'>Conveyor</h3>
                <div className='flex items-baseline gap-1 mb-2'>
                  <span className='text-4xl font-extrabold text-white'>$12,000/year</span>
                </div>
                <p className='text-[13px] text-[#666666]'>Enterprise security questionnaire automation</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className='py-12 md:py-20 bg-[#111111]'>
        <div className='max-w-[1000px] mx-auto px-6 md:px-12'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <FadeIn direction='right'>
              <div>
                <h3 className='text-[16px] font-bold text-white mb-4'>Where SecQA wins</h3>
                <ul className='space-y-3'>
                  {secqaWins.map((w) => (
                    <li key={w} className='flex items-start gap-3'>
                      <CheckCircle2 size={16} className='text-[#8B9DAF] mt-0.5 shrink-0' />
                      <span className='text-[13px] text-[#CCCCCC]'>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn direction='left' delay={0.1}>
              <div>
                <h3 className='text-[16px] font-bold text-white/60 mb-4'>Where Conveyor wins</h3>
                <ul className='space-y-3'>
                  {competitorWins.map((w) => (
                    <li key={w} className='flex items-start gap-3'>
                      <CheckCircle2 size={16} className='text-white/30 mt-0.5 shrink-0' />
                      <span className='text-[13px] text-white/50'>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className='py-12 md:py-20 bg-[#0D0D0D]'>
        <div className='max-w-[800px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <h3 className='text-[18px] font-bold text-white mb-3'>Which is best for you?</h3>
            <p className='text-[14px] text-[#999999] leading-[1.7]'>
              Choose Conveyor if you are $50M+ ARR with dedicated security team and budget for enterprise tools.
              Choose SecQA if you are $1M-$20M ARR and need questionnaire response workflow at a price
              that makes sense for your deal volume.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className='py-20 md:py-28 bg-[#111111]'>
        <div className='max-w-[800px] mx-auto px-6 md:px-12 text-center'>
          <FadeIn>
            <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight mb-4'>Try SecQA</h2>
            <p className='text-lg text-white/50 mb-8'>14-day paid pilot at $499.</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Start your pilot <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
