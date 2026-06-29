'use client';
import { FadeIn, SectionDivider } from '@/components/ui/motion';

const SECTIONS = [
  {
    title: '1. Permitted Use',
    paragraphs: [
      'You may use the SecQA Service only for lawful business purposes in accordance with our Terms of Service at secqa.example/legal/terms. Permitted uses include uploading security questionnaires, generating AI-drafted answers, reviewing and approving answers, exporting approved responses to your customers\u2019 templates, and using integrations with third-party services that you have lawfully connected.',
      'You may use the Service for processing Customer Data that you have the right and authority to process, including questionnaire documents, internal compliance evidence, and approved answer libraries. You may use the Service to communicate with your customers, prospects, and reviewers about questionnaire responses and trust documentation.',
      'You may connect the Service to your authorized accounts on third-party platforms including Notion, Confluence, Slack, Snowflake, Postgres, HubSpot, Salesforce, and others. You are responsible for ensuring that your use of integrations complies with the terms of service of those third-party platforms.',
    ],
  },
  {
    title: '2. Prohibited Uses',
    paragraphs: [
      'You may not use the Service to: (a) upload, store, or process content that is unlawful, infringing, defamatory, harassing, fraudulent, or otherwise objectionable; (b) send unsolicited commercial email or other spam; (c) distribute malware, ransomware, or other malicious code; (d) conduct any activity that interferes with or disrupts the Service or its users; (e) attempt to gain unauthorized access to any part of the Service, other accounts, or computer systems or networks connected to the Service.',
      'You may not: (a) reverse engineer, decompile, or disassemble any part of the Service; (b) access or attempt to access any non-public portion of the Service without authorization, including through penetration testing, vulnerability scanning, or other security testing without our prior written consent; (c) use the Service to build a competing product or service; (d) remove, alter, or obscure any proprietary notices on the Service; (e) use the Service to train competing AI models.',
      'You may not use the Service to process special categories of personal data under GDPR Article 9 (health data, racial/ethnic origin, religious beliefs, biometric data, etc.) or Protected Health Information (PHI) under HIPAA. We are not currently HIPAA-compliant and do not accept PHI. If you inadvertently upload such data, contact us immediately at founder@secqa.example.',
    ],
  },
  {
    title: '3. Rate Limits and Fair Use',
    paragraphs: [
      'We impose rate limits on the Service to ensure fair availability for all users. API rate limits: 100 requests per minute per workspace, 1,000 requests per hour per workspace. AI inference rate limits: 10 questionnaire drafts per hour, 50 questionnaire drafts per day. Exceeding rate limits results in HTTP 429 (Too Many Requests) responses with a Retry-After header.',
      'You may not circumvent rate limits by creating multiple accounts, sharing credentials across users, or using automated scripts to bypass throttling. We monitor for rate-limit circumvention and may suspend accounts that engage in such behavior without notice.',
      'The Service is offered on a fair-use basis. While we do not impose hard limits on the number of users per workspace, the number of questionnaires uploaded, or the volume of Customer Data stored, we reserve the right to throttle or suspend accounts that exhibit abnormal usage patterns (e.g., bulk scraping, automated mass questionnaires from a single source) that suggest abuse.',
    ],
  },
  {
    title: '4. Customer Data Restrictions',
    paragraphs: [
      'You are solely responsible for the accuracy, completeness, and legality of Customer Data uploaded to or processed through the Service. You represent that you have all necessary rights, consents, and legal bases to upload and process Customer Data, including any personal data subject to GDPR, CCPA, or other privacy laws.',
      'You may not upload Customer Data that contains: (a) payment card numbers, bank account numbers, or other financial credentials (we use Stripe for payment processing and never need access to raw card numbers); (b) passwords, API keys, or other authentication credentials for systems you do not own; (c) source code or proprietary algorithms that you do not have the right to share; (d) any data subject to a confidentiality obligation that prohibits processing by a third-party service provider.',
      'You may upload Customer Data that contains personal information of your employees, customers, or prospects, provided that you have obtained the necessary consents and provided the required privacy notices. We process such data as a processor on your behalf under our Data Processing Agreement at secqa.example/legal/dpa. You are responsible for responding to data subject requests.',
    ],
  },
  {
    title: '5. Account Security',
    paragraphs: [
      'You are responsible for safeguarding your account credentials, including passwords, API keys, OAuth tokens, and any other authentication factors. You must not share your account credentials with any third party, including coworkers, contractors, or vendors. Each user must have their own individual account; shared credentials are strictly prohibited.',
      'You must enable multi-factor authentication (MFA) on your account if your plan supports it. We strongly recommend WebAuthn/passkeys over TOTP, and TOTP over SMS. If you suspect that your credentials have been compromised, you must notify us immediately at security@secqa.example and rotate all credentials.',
      'You are responsible for all activity that occurs under your account, including activity by users you invite to your workspace. You must promptly deactivate users who no longer require access (e.g., departed employees, contractors whose engagement has ended). We are not liable for any unauthorized access resulting from your failure to secure your account.',
    ],
  },
  {
    title: '6. Communication Restrictions',
    paragraphs: [
      'You may use the Service to send emails and notifications to your customers, prospects, and reviewers regarding questionnaire responses and trust documentation. You must comply with all applicable email marketing laws, including CAN-SPAM (U.S.), GDPR (EU/UK), and CASL (Canada). All commercial emails must include a valid physical postal address and a one-click unsubscribe mechanism.',
      'You may not use the Service to send unsolicited commercial email (spam), email to recipients who have not consented to receive communications from you, or email to purchased or rented lists. We monitor outbound email for spam patterns (high bounce rates, spam complaints) and may suspend sending privileges for accounts that exceed our abuse thresholds.',
      'You may not use the Service to communicate with SecQA staff in a manner that is threatening, harassing, defamatory, or otherwise abusive. We reserve the right to terminate support engagements with users who engage in such behavior. Crisis communications and security reports should be directed to security@secqa.example.',
    ],
  },
  {
    title: '7. Third-Party Integrations',
    paragraphs: [
      'The Service integrates with third-party platforms including Notion, Slack, Snowflake, HubSpot, Salesforce, and others. When you connect an integration, you authorize SecQA to access your account on that platform according to the scopes you grant. You are responsible for reviewing and approving each scope before granting access.',
      'You must ensure that your use of integrations complies with the terms of service of each third-party platform. For example, if your Notion workspace prohibits sharing content with third-party services, you must not connect SecQA to that workspace. We are not responsible for violations of third-party terms resulting from your use of integrations.',
      'You may revoke integration access at any time from your account settings or from the third-party platform. Revocation takes effect within 60 seconds. After revocation, we will not access your account on that platform, but cached data may persist for up to 30 days before being deleted. You can request immediate deletion by contacting founder@secqa.example.',
    ],
  },
  {
    title: '8. Service Monitoring',
    paragraphs: [
      'We monitor the Service for security, abuse-prevention, and quality-improvement purposes. Monitoring includes server logs, application logs, API request metadata, and aggregated usage analytics. We do not monitor or review individual Customer Data except as necessary to provide the Service, prevent fraud, or comply with legal obligations.',
      'You consent to our monitoring activities as described in our Privacy Policy at secqa.example/legal/privacy. We may use monitoring data to enforce this Acceptable Use Policy, investigate suspected violations, and improve the Service. Monitoring data is retained for 90 days unless flagged for longer retention as part of an active investigation.',
      'We may share aggregated, anonymized monitoring data with third parties for industry benchmarking or research purposes. Such data will not identify individual customers, users, or Customer Data. We will not share your personally identifiable monitoring data with third parties except as required by law or as described in our Privacy Policy.',
    ],
  },
  {
    title: '9. Enforcement',
    paragraphs: [
      'We reserve the right to investigate suspected violations of this Acceptable Use Policy. We may suspend or terminate access to the Service immediately, without notice, for violations involving: (a) unlawful activity; (b) distribution of malware or spam; (c) attempts to gain unauthorized access; (d) circumvention of rate limits; or (e) any activity that poses a risk to the Service, our users, or third parties.',
      'For non-critical violations, we will provide written notice and a 7-day cure period. If the violation is not cured within the cure period, we may suspend or terminate access. We will provide a reason for any suspension or termination, except where prohibited by law or where providing a reason would compromise an ongoing investigation.',
      'We may report violations to law enforcement if we believe, in good faith, that such reporting is required by law or to protect the rights, property, or safety of SecQA, our users, or others. We will cooperate with law enforcement investigations to the extent required by law.',
    ],
  },
  {
    title: '10. Government and Regulated Use',
    paragraphs: [
      'The Service is not designed, intended, or licensed for use in regulated environments requiring specific certifications or compliance attestations, including but not limited to: HIPAA-protected health information, FedRAMP-authorized government data, ITAR-controlled defense data, or PCI-DSS in-scope cardholder data. You must not upload any data subject to these regimes to the Service.',
      'If you are a U.S. federal, state, or local government entity, your use of the Service is subject to the restrictions of our Terms of Service and applicable procurement regulations. The Service is offered with commercial license terms only; we do not offer GSA Schedule pricing or FedRAMP authorization. Government users should evaluate whether the Service meets their compliance requirements before subscribing.',
      'If you are located in a country subject to U.S. government sanctions (Cuba, Iran, North Korea, Syria, Crimea, Donetsk, Luhansk), or if you are listed on any U.S. government restricted-party list, you may not access or use the Service. We screen new accounts against restricted-party lists and may suspend accounts that appear on such lists.',
    ],
  },
  {
    title: '11. Changes to This Policy',
    paragraphs: [
      'We may update this Acceptable Use Policy from time to time. We will notify you of material changes by email at least 14 days before the changes take effect. Material changes include additions to the prohibited uses list, modifications to rate limits, or new restrictions on Customer Data.',
      'Non-material changes (e.g., clarifications, formatting) take effect upon posting. Your continued use of the Service after the effective date of any change constitutes acceptance of the updated policy.',
      'An archive of prior versions of this Acceptable Use Policy is maintained at secqa.example/legal/acceptable-use/archive. The "Last updated" date at the top of this policy indicates when it was last revised.',
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
              Acceptable Use Policy<span className='text-[#8B9DAF]'>.</span>
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
                This Acceptable Use Policy describes the permitted and prohibited uses of the SecQA Service. It forms part of our Terms of Service.
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
                To report violations of this Acceptable Use Policy or to request clarification on permitted uses, contact us at:
              </p>
              <div className='space-y-2 text-[14px] text-[#CCCCCC]'>
                <p>SecQA (sole proprietorship)</p>
                <p>Abuse contact: abuse@secqa.example</p>
                <p>Response time: within 24 hours during business days</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
