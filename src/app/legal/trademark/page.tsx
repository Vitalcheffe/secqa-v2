'use client';
import { FadeIn } from '@/components/ui/motion';

export default function LegalPage() {
  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Legal</p></FadeIn>
          <FadeIn delay={0.1}>
            <h1 className='text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-4'>
              Trademark Policy<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}><p className='text-[13px] text-white/40'>Last updated: June 2026</p></FadeIn>
        </div>
      </section>
      <section className='py-20 md:py-28 bg-[#0D0D0D]'>
        <div className='max-w-[800px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='card p-8 md:p-12'>
              <div className='prose prose-invert max-w-none'>
                <p className='text-[14px] text-[#999999] leading-[1.8] mb-4'>
                  This Trademark Policy governs your use of SecQA. By accessing or using the Service, you agree to the terms outlined below. If you do not agree, you may not access or use the Service.
                </p>
                <p className='text-[14px] text-[#999999] leading-[1.8] mb-4'>
                  We may modify these terms at any time. If we make material changes, we will notify you via email at least 30 days before the changes take effect. Continued use of the Service after the effective date constitutes acceptance of the updated terms.
                </p>
                <p className='text-[14px] text-[#999999] leading-[1.8] mb-4'>
                  For questions about this Trademark Policy, contact us at founder@secqa.example. We respond within 24 hours during business days.
                </p>
                <p className='text-[14px] text-[#999999] leading-[1.8]'>
                  SecQA is operated by a solo founder. These terms form a legally binding agreement between you and SecQA. Governed by the laws of the State of Delaware, USA.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
