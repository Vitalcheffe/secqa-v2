'use client';
import { FadeIn, SectionDivider } from '@/components/ui/motion';

const SECTIONS = [
  {
    title: '1. Information We Collect',
    paragraphs: [
      'We collect information you provide directly to us when you create an account, including your name, email address, company name, job title, and billing information. We also collect Customer Data that you upload to the Service, which may include questionnaire documents, answer drafts, source citations, and reviewer comments. The categories of personal data we process are: account contact data, billing data, usage data, and Customer Data (to the extent it contains personal information).',
      'We automatically collect certain technical information when you use the Service, including your IP address, browser type, device identifiers, operating system, referring URLs, and pages viewed. We use cookies and similar tracking technologies as described in our Cookie Policy. Server logs are retained for 90 days for security and abuse-prevention purposes.',
      'We do not collect sensitive personal data such as Social Security numbers, government-issued ID numbers, health information, or racial/ethnic origin data. If you inadvertently upload such data to the Service, please contact us immediately at founder@secqa.example to arrange deletion.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    paragraphs: [
      'We use your account information to provide the Service, including authenticating your access, processing payments, sending service-related notifications, and providing customer support. We use usage data to monitor service performance, detect fraud and abuse, troubleshoot technical issues, and improve the Service.',
      'We use Customer Data solely as necessary to provide the Service to you, including parsing uploaded questionnaires, retrieving relevant answer passages from your connected source documents, generating AI-drafted answers, and storing approved answers in your answer library. We do not use Customer Data to train AI models. We do not share Customer Data with third parties for advertising purposes.',
      'We may use your contact information to send you product updates, security advisories, and administrative notices. You may opt out of marketing communications at any time by clicking the unsubscribe link in any email or by contacting us. Service-related notices (e.g., security advisories, billing receipts) cannot be opted out of.',
    ],
  },
  {
    title: '3. Legal Basis for Processing (GDPR)',
    paragraphs: [
      'For users in the European Economic Area, United Kingdom, or Switzerland, we process personal data under the following legal bases: (a) performance of a contract (Article 6(1)(b) GDPR) for processing necessary to provide the Service, including account creation and Customer Data processing; (b) legitimate interests (Article 6(1)(f) GDPR) for fraud detection, security monitoring, and service improvement; (c) consent (Article 6(1)(a) GDPR) for marketing communications and non-essential cookies; and (d) legal obligation (Article 6(1)(c) GDPR) for tax record-keeping and law enforcement responses.',
      'When we process Customer Data containing personal information on your behalf, we do so as a processor under your instructions. The legal basis for that processing is your responsibility as the controller. We will process such data only as documented in our Data Processing Agreement at secqa.example/legal/dpa.',
      'You have the right to object to processing based on legitimate interests, withdraw consent at any time, and request that we restrict or stop processing your personal data. To exercise any of these rights, contact us at founder@secqa.example.',
    ],
  },
  {
    title: '4. Data Retention',
    paragraphs: [
      'We retain your personal data for as long as your account is active. After account termination, we retain account data for 30 days to allow data export, after which we permanently delete it from production systems. Backups may persist for up to 90 days for disaster recovery, after which they are overwritten.',
      'Customer Data is retained for the life of your account. You can delete specific Customer Data at any time through the Service. Deleted Customer Data is removed from production within 30 days and from backups within 90 days. We do not retain Customer Data after account termination except as required by law or to comply with legal hold.',
      'Server logs (IP address, request metadata) are retained for 90 days. Billing records (invoices, tax receipts) are retained for 7 years as required by U.S. tax law. Audit logs of access to Customer Data are retained for 1 year. We will extend retention only if required by law, regulation, or pending legal process.',
    ],
  },
  {
    title: '5. Sharing and Disclosure',
    paragraphs: [
      'We do not sell your personal data. We share personal data with subprocessors who provide services on our behalf, including: (a) Stripe for payment processing; (b) AWS for infrastructure hosting; (c) OpenAI and Anthropic for AI model inference (under zero-retention agreements); (d) Resend for transactional email; (e) Cloudflare for CDN and DDoS protection. A full list of subprocessors is maintained at secqa.example/legal/subprocessors.',
      'We may disclose personal data if required by law, court order, or government regulation, or if we believe in good faith that disclosure is necessary to protect the rights, property, or safety of SecQA, our users, or others. We will notify you of any law enforcement request for your personal data unless we are legally prohibited from doing so.',
      'In the event of a merger, acquisition, or sale of all or a portion of our assets, personal data may be transferred to the acquiring entity. We will notify you via email before any such transfer and you may close your account before the transfer if you do not wish your data to be transferred.',
    ],
  },
  {
    title: '6. International Data Transfers',
    paragraphs: [
      'SecQA is hosted on AWS in the United States (us-east-1 region). If you access the Service from outside the United States, your personal data will be transferred to the United States for processing. By using the Service, you consent to this transfer.',
      'For users in the European Economic Area, United Kingdom, or Switzerland, we rely on Standard Contractual Clauses (SCCs) approved by the European Commission as the legal mechanism for transferring personal data to the United States. We have signed SCCs with our subprocessors and require them to do the same with their subprocessors.',
      'We monitor developments in EU-U.S. data transfer law, including the EU-U.S. Data Privacy Framework. If we adopt the DPF as an additional transfer mechanism, we will update this Privacy Policy accordingly. We may also adopt supplementary measures (e.g., enhanced encryption) where appropriate.',
    ],
  },
  {
    title: '7. Your Privacy Rights',
    paragraphs: [
      'Depending on your jurisdiction, you may have the following rights regarding your personal data: (a) access — request a copy of your personal data; (b) rectification — request correction of inaccurate data; (c) erasure — request deletion of your personal data ("right to be forgotten"); (d) restriction — request that we limit processing; (e) portability — request your data in a structured, machine-readable format; (f) objection — object to processing based on legitimate interests; (g) withdrawal of consent.',
      'California residents have additional rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), including the right to know what personal information we collect, the right to opt out of the sale of personal information (we do not sell personal information), and the right not to be discriminated against for exercising privacy rights.',
      'To exercise any of these rights, contact us at founder@secqa.example. We will respond within 30 days (or as required by applicable law). We may need to verify your identity before responding. If we deny your request, we will provide a reason and inform you of any right to appeal.',
    ],
  },
  {
    title: '8. Cookies and Tracking Technologies',
    paragraphs: [
      'We use cookies and similar tracking technologies (collectively, "cookies") to operate the Service, authenticate users, remember preferences, analyze usage, and detect fraud. We categorize cookies as: (a) strictly necessary (required for the Service to function); (b) functional (enable enhanced functionality); (c) analytics (help us understand usage); and (d) marketing (used to display relevant ads — we do not currently use these).',
      'You can control cookies through your browser settings. Disabling strictly necessary cookies will prevent you from using the Service. We display a cookie consent banner on first visit for users in jurisdictions that require it (EU, UK, California). You can change your cookie preferences at any time in account settings.',
      'We use Cloudflare for CDN and bot detection. Cloudflare may set cookies for security purposes. We do not use third-party advertising cookies or tracking pixels. Our analytics cookies are configured with cross-site tracking disabled where possible.',
    ],
  },
  {
    title: '9. Children\u2019s Privacy',
    paragraphs: [
      'The Service is not directed to children under 16 (under 13 in the United States under COPPA). We do not knowingly collect personal data from children. If we learn that a child has provided us with personal data, we will delete that data and terminate the account.',
      'If you are a parent or guardian and believe your child has provided us with personal data, please contact us at founder@secqa.example. We will promptly investigate and take appropriate action, including deleting the data and terminating the account.',
      'By using the Service, you represent that you are at least 16 years old (or 13 in the U.S.) and have the legal capacity to consent to data processing. If we determine that you do not meet this age requirement, we will terminate your account.',
    ],
  },
  {
    title: '10. Breach Notification',
    paragraphs: [
      'In the event of a personal data breach that is likely to result in a risk to your rights and freedoms, we will notify you and the relevant supervisory authority without undue delay, and in any case within 72 hours of becoming aware of the breach, as required by Article 33 of the GDPR.',
      'Our notification will describe the nature of the breach, the categories and approximate number of data subjects and records affected, the likely consequences, and the measures we are taking to address the breach and mitigate its effects. We will provide a point of contact (founder@secqa.example) for obtaining more information.',
      'We maintain an incident response plan that includes breach detection, containment, eradication, recovery, and notification procedures. We test the plan at least annually. We will not be liable for any breach that results from your failure to secure your account credentials or your misconfiguration of the Service.',
    ],
  },
  {
    title: '11. Changes to This Policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time. We will notify you of material changes by email at least 30 days before the changes take effect. Material changes include modifications to the categories of data collected, the purposes of processing, retention periods, or your privacy rights.',
      'Non-material changes (e.g., clarifications, formatting, or changes that do not affect your rights) take effect upon posting. Your continued use of the Service after the effective date of any change constitutes acceptance of the updated policy.',
      'We maintain an archive of prior versions of this Privacy Policy at secqa.example/legal/privacy/archive. The "Last updated" date at the top of this policy indicates when it was last revised.',
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
              Privacy Policy<span className='text-[#8B9DAF]'>.</span>
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
                This Privacy Policy explains how SecQA collects, uses, and protects your personal data. By using the Service, you consent to the practices described below.
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
                For questions about this Privacy Policy, to exercise your privacy rights, or to report a privacy concern, contact us at:
              </p>
              <div className='space-y-2 text-[14px] text-[#CCCCCC]'>
                <p>SecQA (sole proprietorship)</p>
                <p>Privacy contact: founder@secqa.example</p>
                <p>EU representative: contact us for EU representative details</p>
                <p>Response time: within 30 days (or as required by applicable law)</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
