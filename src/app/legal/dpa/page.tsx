'use client';
import { FadeIn, SectionDivider } from '@/components/ui/motion';

const SECTIONS = [
  {
    title: '1. Parties',
    paragraphs: [
      'This Data Processing Agreement ("DPA") is entered into between SecQA, a sole proprietorship organized under the laws of the State of Delaware, United States ("Processor", "SecQA", "we", "us", or "our"), and the customer entity that has executed the SecQA Terms of Service ("Controller", "Customer", "you", or "your").',
      'This DPA forms part of and is incorporated by reference into the SecQA Terms of Service available at secqa.example/legal/terms. In the event of a conflict between this DPA and the Terms of Service, this DPA shall prevail with respect to the processing of Personal Data. Capitalized terms not defined in this DPA have the meanings given to them in the Terms of Service.',
      'By executing the Terms of Service or by using the Service to process Personal Data, Customer agrees to be bound by this DPA on its own behalf and on behalf of any entity on whose behalf it acts. If Customer acts as a processor for a third-party controller, Customer warrants that it has the authority to bind that controller to this DPA.',
    ],
  },
  {
    title: '2. Definitions',
    paragraphs: [
      '"Personal Data" means any information relating to an identified or identifiable natural person, as defined by GDPR Article 4(1), CCPA, and other applicable data protection laws. "Processing" means any operation performed on Personal Data, including collection, recording, organization, storage, adaptation, retrieval, use, disclosure, transmission, and erasure.',
      '"Controller" means the entity that determines the purposes and means of Processing of Personal Data. "Processor" means the entity that Processes Personal Data on behalf of the Controller. "Sub-processor" means a third party engaged by the Processor to Process Personal Data on its behalf.',
      '"GDPR" means the General Data Protection Regulation (EU) 2016/679. "CCPA" means the California Consumer Privacy Act as amended by the CPRA. "Standard Contractual Clauses" or "SCCs" means the standard contractual clauses approved by the European Commission for the transfer of personal data to third countries (Decision 2021/914/EU).',
    ],
  },
  {
    title: '3. Scope and Roles',
    paragraphs: [
      'Customer is the Controller (or, if applicable, acts as a processor on behalf of a third-party controller) of Personal Data uploaded to or processed through the Service. SecQA acts as a Processor on behalf of Customer. The scope of Processing, duration, nature, and purpose of Processing, types of Personal Data, and categories of data subjects are described in Annex 1 below.',
      'SecQA will Process Personal Data only on documented instructions from Customer, including with regard to transfers of Personal Data to a third country, unless required by applicable law. If SecQA is required by law to Process Personal Data for reasons other than providing the Service, SecQA will notify Customer of the legal requirement before Processing, unless prohibited by law.',
      'Customer warrants that it has all necessary rights, consents, and legal bases to upload Personal Data to the Service and to instruct SecQA to Process it. Customer is responsible for compliance with its obligations as a Controller under applicable data protection laws, including providing privacy notices and obtaining valid consents from data subjects.',
    ],
  },
  {
    title: '4. Processor Obligations',
    paragraphs: [
      'SecQA will Process Personal Data only for the purpose of providing the Service to Customer, as described in the Terms of Service and this DPA. SecQA will not Process Personal Data for any other purpose, including for its own marketing, analytics, or AI model training. SecQA will not sell Personal Data to any third party.',
      'SecQA will ensure that personnel authorized to Process Personal Data are subject to confidentiality obligations, have completed data protection training, and process Personal Data only on documented instructions from Customer. SecQA limits access to Personal Data to personnel with a legitimate business need.',
      'SecQA will notify Customer without undue delay, and in any case within 72 hours, after becoming aware of a Personal Data breach affecting Customer data. The notification will describe the nature of the breach, the categories and approximate number of data subjects and records affected, the likely consequences, and the measures taken or proposed. SecQA will provide reasonable assistance to Customer in complying with its breach notification obligations under applicable law.',
    ],
  },
  {
    title: '5. Sub-Processors',
    paragraphs: [
      'Customer provides general authorization for SecQA to engage sub-processors to Process Personal Data. A current list of sub-processors is maintained at secqa.example/legal/subprocessors and includes: AWS (hosting), Stripe (payment processing), OpenAI and Anthropic (AI inference, under zero-retention agreements), Resend (transactional email), and Cloudflare (CDN and security).',
      'SecQA will notify Customer of any addition or replacement of a sub-processor at least 30 days in advance, giving Customer the opportunity to object. If Customer objects to a new sub-processor and the objection cannot be resolved, Customer may terminate the affected portion of the Service with a pro-rated refund.',
      'SecQA imposes data protection terms on each sub-processor that are no less protective than those in this DPA. SecQA remains fully liable to Customer for the performance of each sub-processor\u2019s obligations to the extent SecQA would be liable if performing the services directly.',
    ],
  },
  {
    title: '6. Security Measures',
    paragraphs: [
      'SecQA implements appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including: (a) encryption of Personal Data at rest with AES-256 and in transit with TLS 1.2+; (b) ongoing confidentiality, integrity, availability, and resilience of processing systems; (c) regular testing and evaluation of the effectiveness of security measures; (d) pseudonymization where appropriate.',
      'Detailed security measures are described in our Security Policy at secqa.example/legal/security, which is incorporated into this DPA by reference. The Security Policy may be updated from time to time; material changes will be communicated to Customer at least 30 days in advance.',
      'SecQA conducts annual SOC 2 Type II audits. The latest audit report is available under NDA on request. SecQA will provide Customer with a summary of audit findings relevant to Personal Data Processing on request, not more than once per calendar year.',
    ],
  },
  {
    title: '7. International Data Transfers',
    paragraphs: [
      'SecQA hosts Customer Data on AWS in the United States (us-east-1 region). For Customers subject to GDPR, UK GDPR, or Swiss FDPA, SecQA relies on the Standard Contractual Clauses (SCCs) approved by the European Commission as the legal mechanism for transferring Personal Data to the United States. The SCCs are incorporated into this DPA by reference and apply to all transfers out of the EEA, UK, or Switzerland.',
      'For transfers to sub-processors located outside the EEA, UK, or Switzerland, SecQA has signed SCCs with each sub-processor or ensures the sub-processor is located in a country with an adequacy decision. SecQA monitors changes to EU-U.S. data transfer law, including the EU-U.S. Data Privacy Framework, and will adopt additional mechanisms as they become available.',
      'SecQA will notify Customer if SecQA becomes aware that a sub-processor is no longer in compliance with applicable data transfer laws and will take reasonable steps to remediate. If compliance cannot be restored, SecQA will terminate the affected sub-processor relationship.',
    ],
  },
  {
    title: '8. Data Subject Rights',
    paragraphs: [
      'SecQA will provide reasonable assistance to Customer in responding to data subject requests exercising their rights under applicable data protection laws, including access, rectification, erasure, restriction, portability, and objection. Customer is responsible for verifying the identity of the data subject and for the substantive response.',
      'If SecQA receives a data subject request directly, SecQA will notify Customer and forward the request to Customer for response, unless prohibited by law. SecQA will not respond to data subject requests directly except to confirm that the request has been forwarded to Customer.',
      'SecQA will provide assistance through its standard support channels (founder@secqa.example) at no additional charge for routine data subject requests. For requests requiring significant engineering effort (e.g., manual data extraction from backups), SecQA may charge a reasonable fee based on actual time and materials.',
    ],
  },
  {
    title: '9. Audit Rights',
    paragraphs: [
      'Customer may audit SecQA\u2019s compliance with this DPA no more than once per calendar year, upon at least 30 days\u2019 written notice, during normal business hours, and in a manner that does not disrupt SecQA\u2019s business operations. Audits must be conducted by Customer\u2019s own personnel or a third-party auditor bound by confidentiality.',
      'In lieu of an on-site audit, Customer may accept SecQA\u2019s SOC 2 Type II audit report, which is conducted annually by an independent CPA firm. The SOC 2 report addresses the security, availability, and confidentiality trust service criteria and is generally sufficient to demonstrate compliance with this DPA.',
      'If Customer identifies a non-compliance during an audit, SecQA will remediate the non-compliance within a reasonable time, not to exceed 60 days for material findings. SecQA will provide Customer with a written remediation plan within 15 days of the audit. Customer will treat all audit findings as Confidential Information.',
    ],
  },
  {
    title: '10. Data Deletion and Return',
    paragraphs: [
      'Upon termination of the Service or upon Customer\u2019s written request, SecQA will delete all Personal Data Processed on behalf of Customer within 30 days, except where retention is required by applicable law. SecQA will provide Customer with written confirmation of deletion upon request.',
      'Backup copies of Personal Data may persist for up to 90 days after termination for disaster recovery purposes, after which they are overwritten. SecQA will not Process backup Personal Data during the retention period except for disaster recovery.',
      'Customer may export all Customer Data at any time during the term of the Service using the export feature in the dashboard. Export format is JSON for structured data and original file format for uploaded documents. After termination, export is available for 30 days.',
    ],
  },
  {
    title: '11. Changes to This DPA',
    paragraphs: [
      'SecQA may update this DPA from time to time to reflect changes in applicable law, subprocessor changes, or changes to the Service. We will notify Customer of material changes by email at least 30 days before the changes take effect.',
      'Material changes include modifications to sub-processor lists, security measures, data transfer mechanisms, or data subject rights procedures. Continued use of the Service after the effective date of any change constitutes acceptance of the updated DPA.',
      'An archive of prior versions of this DPA is maintained at secqa.example/legal/dpa/archive. The "Last updated" date at the top of this DPA indicates when it was last revised.',
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
              Data Processing Agreement<span className='text-[#8B9DAF]'>.</span>
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
                This Data Processing Agreement (DPA) governs the processing of Personal Data by SecQA on behalf of Customer. It forms part of the SecQA Terms of Service and applies to all Customers who process Personal Data through the Service.
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
                For questions about this DPA, to execute a countersigned copy, or to request our latest sub-processor list, contact us at:
              </p>
              <div className='space-y-2 text-[14px] text-[#CCCCCC]'>
                <p>SecQA (sole proprietorship)</p>
                <p>DPA contact: dpa@secqa.example</p>
                <p>EU representative: contact us for EU representative details</p>
                <p>Response time: within 5 business days</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
