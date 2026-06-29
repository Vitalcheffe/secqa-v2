'use client';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { ArrowRight } from 'lucide-react';

const FEATURES = [
  { title: 'Feature One', desc: 'Description of feature one and how it helps your team save time on questionnaire responses.' },
  { title: 'Feature Two', desc: 'Description of feature two with specific details about the workflow and automation.' },
  { title: 'Feature Three', desc: 'Description of feature three explaining the integration and security benefits.' },
  { title: 'Feature Four', desc: 'Description of feature four covering export options and template matching.' },
  { title: 'Feature Five', desc: 'Description of feature five about analytics and ROI tracking.' },
  { title: 'Feature Six', desc: 'Description of feature six about collaboration and approval workflows.' },
];

export default function ProductPage() {
  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Product</p></FadeIn>
          <FadeIn delay={0.1}>
            <h1 className='text-5xl md:text-7xl lg:text-[88px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              Security Questionnaire Automation<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-8'>Upload any questionnaire. Get a 90%-complete first draft in 90 minutes. Export to your customer's format. Done.</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Get started <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className='py-20 md:py-28 bg-[#0D0D0D]'>
        <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><div className='mb-12'><p className='section-label mb-4'>Features</p><h2 className='text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight'>What you get</h2></div></FadeIn>
          <StaggerContainer className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' staggerDelay={0.08}>
            {FEATURES.map((f, i) => (
              <StaggerItem key={i}>
                <div className='card p-6 h-full'>
                  <h3 className='text-[16px] font-bold text-white mb-2'>{f.title}</h3>
                  <p className='text-[13px] text-[#999999] leading-relaxed'>{f.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className='py-20 md:py-28 bg-[#111111]'>
        <div className='max-w-[800px] mx-auto px-6 md:px-12 text-center'>
          <FadeIn>
            <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight mb-4'>Ready to try?</h2>
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
