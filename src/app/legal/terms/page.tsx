'use client';
import { FadeIn, SectionDivider } from '@/components/ui/motion';

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    paragraphs: [
      'These Terms of Service ("Terms") govern your access to and use of the SecQA platform, including all web interfaces, APIs, dashboards, documentation, and related services (collectively, the "Service"). The Service is operated by SecQA, a sole proprietorship organized under the laws of the State of Delaware, United States ("SecQA", "we", "us", or "our").',
      'By creating an account, accessing the Service, or clicking "I agree" to these Terms, you ("Customer", "you", or "your") acknowledge that you have read, understood, and agree to be bound by these Terms on behalf of yourself and any entity on whose behalf you act. If you do not agree to these Terms, you may not access or use the Service.',
      'If you are entering into these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind that entity to these Terms. In that case, "you" and "your" refer to that entity, and you agree to be personally liable for any breach of these Terms by that entity.',
    ],
  },
  {
    title: '2. Eligibility',
    paragraphs: [
      'You must be at least 18 years of age to use the Service. By using the Service, you represent and warrant that you are at least 18 years old, that you have the legal capacity to enter into a binding contract, and that your use of the Service does not violate any law or regulation applicable to you.',
      'The Service is not intended for use by minors. If we learn that anyone under 18 has registered an account or provided personal information to us, we will delete that information and terminate the account. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at founder@secqa.example.',
      'You represent that you are not located in a country subject to a U.S. government embargo, designated as a "State Sponsor of Terrorism," or on any U.S. government list of prohibited or restricted parties. We may suspend or terminate access if we determine you are located in or are a national of any such jurisdiction.',
    ],
  },
  {
    title: '3. Subscription and Payment',
    paragraphs: [
      'SecQA offers subscription plans with pricing published at secqa.com/pricing. By selecting a paid plan, you agree to pay all fees associated with that plan, including the monthly base fee and any per-questionnaire fees that accrue based on your usage. Fees are billed in advance on a recurring basis (monthly or annually, depending on your plan selection).',
      'All fees are non-refundable except as explicitly stated in these Terms or as required by applicable law. The 14-day paid pilot fee of $499 is non-refundable but includes 3 questionnaire drafts that may be used during the pilot period. If you cancel your subscription, cancellation takes effect at the end of the current billing cycle and you will not receive a prorated refund for the unused portion of the billing period.',
      'We may change our fees upon at least 30 days\u2019 written notice. Fee changes take effect at the start of the next billing cycle following the notice period. If you do not agree with the fee change, you may cancel your subscription before the change takes effect. Continued use of the Service after the effective date of any fee change constitutes acceptance of the new fees.',
      'You are responsible for providing accurate billing information and for all taxes associated with your use of the Service. We use Stripe as our payment processor; your payment method is subject to Stripe\u2019s terms and conditions.',
    ],
  },
  {
    title: '4. Acceptable Use',
    paragraphs: [
      'You agree to use the Service only for lawful purposes and in accordance with these Terms. You may not use the Service to upload, store, transmit, or process any content that is unlawful, infringing, defamatory, harassing, fraudulent, or otherwise objectionable. You may not use the Service to send unsolicited commercial email, distribute malware, or conduct any activity that interferes with the Service or its users.',
      'You may not (a) reverse engineer, decompile, or disassemble any part of the Service; (b) access or attempt to access any non-public portion of the Service without authorization; (c) use the Service to build a competing product; or (d) remove, alter, or obscure any proprietary notices on the Service. A more detailed list of prohibited uses is set out in our Acceptable Use Policy at secqa.example/legal/acceptable-use.',
      'We reserve the right to suspend or terminate access for any violation of this section. We may also report violations to law enforcement if we believe, in good faith, that such reporting is required by law or to protect the rights, property, or safety of SecQA, our users, or others.',
    ],
  },
  {
    title: '5. Customer Data',
    paragraphs: [
      'You retain all right, title, and interest in and to any data, content, documents, or information you upload to or process through the Service ("Customer Data"). SecQA does not claim ownership of Customer Data. You grant SecQA a non-exclusive, worldwide, royalty-free license to use, copy, transmit, and process Customer Data solely as necessary to provide the Service to you.',
      'You are solely responsible for the accuracy, completeness, and legality of Customer Data. You represent that you have all necessary rights and consents to upload and process Customer Data through the Service, including any personal data subject to GDPR, CCPA, or other privacy laws. Our processing of personal data on your behalf is governed by our Data Processing Agreement at secqa.example/legal/dpa.',
      'We implement industry-standard technical and organizational measures to protect Customer Data, including AES-256 encryption at rest, TLS 1.2+ in transit, and role-based access control. We will not access Customer Data except as necessary to provide the Service, comply with law, or prevent fraud and abuse. We will never sell Customer Data to third parties.',
    ],
  },
  {
    title: '6. Intellectual Property',
    paragraphs: [
      'The Service, including all software, documentation, designs, trademarks, and content made available through the Service (excluding Customer Data), is owned by SecQA and its licensors and is protected by United States and international intellectual property laws. No title or interest in or to the Service is transferred to you under these Terms.',
      'We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Service during the term of your subscription, solely for your internal business purposes. You may not sublicense, resell, or distribute the Service without our prior written consent. Any feedback you provide about the Service may be used by us without restriction or compensation.',
      'SecQA, the SecQA logo, and other marks used in connection with the Service are trademarks of SecQA. You may not use these marks without our prior written consent. For more information about permitted trademark use, see our Trademark Policy at secqa.example/legal/trademark.',
    ],
  },
  {
    title: '7. Disclaimers',
    paragraphs: [
      'THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. SECQA DISCLAIMS ALL WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.',
      'SecQA uses artificial intelligence to draft questionnaire responses. AI-generated answers may contain errors, omissions, or outdated information. You are solely responsible for reviewing and approving any AI-generated content before sharing it with third parties. SecQA does not warrant that AI-generated answers will be accurate, complete, or suitable for your use case.',
      'Any content accessed through integrations with third-party services (e.g., Notion, Slack, Snowflake) is governed by the terms of those third-party services. SecQA is not responsible for the accuracy, availability, or legality of third-party content.',
    ],
  },
  {
    title: '8. Limitation of Liability',
    paragraphs: [
      'TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WILL SECQA BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITY, ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICE, WHETHER IN CONTRACT, TORT, OR ANY OTHER LEGAL THEORY.',
      'SECQA\u2019S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICE WILL NOT EXCEED THE AMOUNT YOU PAID TO SECQA IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE LIABILITY. THIS LIMITATION APPLIES EVEN IF SECQA HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.',
      'The limitations and exclusions in this section apply to the maximum extent permitted by applicable law. Some jurisdictions do not allow the exclusion or limitation of certain damages, so some of the above limitations may not apply to you.',
    ],
  },
  {
    title: '9. Indemnification',
    paragraphs: [
      'You agree to indemnify, defend, and hold harmless SecQA and its sole proprietor, employees, contractors, and licensors from and against any third-party claims, damages, liabilities, costs, and expenses (including reasonable attorneys\u2019 fees) arising out of or related to: (a) your Customer Data; (b) your violation of these Terms; (c) your violation of any law or third-party right; or (d) your use of the Service.',
      'We will provide you with written notice of any claim for which we seek indemnification. You will use counsel reasonably acceptable to us to defend the claim, and you will not settle any claim without our prior written consent. We may participate in the defense of any claim with counsel of our choosing at our own expense.',
      'We may, at our option and expense, assume the defense of any claim for which you are required to indemnify us. If we assume the defense, you will cooperate with us in the defense of the claim.',
    ],
  },
  {
    title: '10. Termination',
    paragraphs: [
      'You may cancel your subscription at any time by contacting us at founder@secqa.example or through the billing settings in your account. Cancellation takes effect at the end of your current billing cycle. You will not receive a refund for any prepaid fees for the remainder of the billing cycle.',
      'We may suspend or terminate your access to the Service immediately, without notice, if: (a) you breach these Terms and fail to cure the breach within 7 days of written notice; (b) we are required to do so by law; or (c) we determine, in good faith, that your use of the Service poses a risk to us, our users, or third parties.',
      'Upon termination, we will retain your Customer Data for 30 days to allow you to export it. After 30 days, we will permanently delete your Customer Data from our production systems. Backups may persist for up to 90 days for disaster recovery purposes, after which they are overwritten. Provisions of these Terms that by their nature should survive termination (including IP, disclaimers, liability, indemnification, and governing law) will survive.',
    ],
  },
  {
    title: '11. Governing Law and Dispute Resolution',
    paragraphs: [
      'These Terms are governed by the laws of the State of Delaware, United States, without regard to its conflict of law provisions. You and SecQA submit to the exclusive jurisdiction of the state and federal courts located in Delaware for any dispute arising out of or related to these Terms or the Service.',
      'Before filing a claim in court, you and SecQA agree to attempt to resolve any dispute through good-faith negotiation. If the dispute is not resolved within 30 days of written notice, either party may initiate formal proceedings. This negotiation period does not apply to claims for injunctive relief to protect intellectual property or confidential information.',
      'YOU AND SECQA AGREE THAT ANY CLAIM ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICE WILL BE BROUGHT INDIVIDUALLY, NOT AS A CLASS ACTION OR OTHER REPRESENTATIVE PROCEEDING. YOU WAIVE THE RIGHT TO PARTICIPATE IN A CLASS ACTION.',
    ],
  },
  {
    title: '12. Changes to These Terms',
    paragraphs: [
      'We may modify these Terms at any time. If we make material changes, we will notify you by email at least 30 days before the changes take effect. Material changes include modifications to fees, liability, IP ownership, data handling, or governing law.',
      'Non-material changes (e.g., clarifications, formatting, or changes to features that do not affect your rights) take effect upon posting. Your continued use of the Service after the effective date of any change constitutes acceptance of the updated Terms.',
      'If you do not agree to a change, you may cancel your subscription before the change takes effect. We will maintain an archive of prior versions of these Terms at secqa.example/legal/terms/archive.',
    ],
  },
];

export default function LegalPage() {
  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Legal</p></FadeIn>
          <FadeIn delay={0.1}>
            <h1 className='text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-4'>
              Terms of Service<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}><p className='text-[13px] text-white/40'>Last updated: June 2026</p></FadeIn>
        </div>
      </section>

      <SectionDivider className='max-w-[800px]' />

      <section className='py-20 md:py-28 bg-[#0D0D0D]'>
        <div className='max-w-[800px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='card p-8 md:p-12'>
              <p className='text-[14px] text-[#999999] leading-[1.8] mb-8'>
                These Terms of Service govern your use of SecQA. By accessing or using the Service, you agree to the terms outlined below. If you do not agree, you may not access or use the Service.
              </p>
              <div className='space-y-12'>
                {SECTIONS.map((section) => (
                  <div key={section.title}>
                    <h2 className='text-[20px] font-bold text-white mb-4 tracking-tight'>{section.title}</h2>
                    {section.paragraphs.map((p, i) => (
                      <p key={i} className='text-[14px] text-[#999999] leading-[1.8] mb-4 last:mb-0'>{p}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className='py-16 md:py-20 bg-[#111111]'>
        <div className='max-w-[800px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='card p-8'>
              <h2 className='text-[20px] font-bold text-white mb-4 tracking-tight'>Contact</h2>
              <p className='text-[14px] text-[#999999] leading-[1.8] mb-4'>
                For questions about these Terms of Service, contact us at:
              </p>
              <div className='space-y-2 text-[14px] text-[#CCCCCC]'>
                <p>SecQA (sole proprietorship)</p>
                <p>Email: founder@secqa.example</p>
                <p>Response time: within 24 hours during business days</p>
                <p>Governing jurisdiction: State of Delaware, United States</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
