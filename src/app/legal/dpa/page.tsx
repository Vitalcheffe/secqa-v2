import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Data Processing Agreement — SecQA',
  description: 'DPA template for SecQA customers. GDPR Article 28 compliant.'
};

export default function LegalPage() {
  return (
    <div className='flex flex-col'>
      <section className='border-b'>
        <div className='container mx-auto max-w-3xl px-4 py-16'>
          <Badge variant='secondary'>Legal</Badge>
          <h1 className='mt-4 text-4xl font-bold tracking-tight'>Data Processing Agreement</h1>
          <p className='mt-2 text-sm text-muted-foreground'>Last updated: June 2026</p>
        </div>
      </section>
      <section>
        <div className='container mx-auto max-w-3xl px-4 py-16'>
        <h2 className='mt-8 text-xl font-semibold'>1. Parties</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>This Data Processing Agreement ("DPA") is entered into between SecQA ("Processor") and the customer signing the Order Form ("Controller"). This DPA supplements the Terms of Service and forms part of the agreement between the parties.</div>
        <h2 className='mt-8 text-xl font-semibold'>2. Definitions</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>Controller: the entity that determines the purposes and means of processing personal data.
Processor: SecQA, the entity that processes personal data on behalf of the Controller.
Customer Data: personal data uploaded by the Controller to the Service.
Sub-processor: any third party engaged by the Processor to process Customer Data.
GDPR: the General Data Protection Regulation (EU) 2016/679.</div>
        <h2 className='mt-8 text-xl font-semibold'>3. Scope and Purpose</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>This DPA applies to the processing of Customer Data by the Processor on behalf of the Controller. The subject matter, duration, nature, and purpose of processing are described in the Terms of Service and the Order Form.

The Processor processes Customer Data only on documented instructions from the Controller, including with regard to transfers of personal data to a third country.</div>
        <h2 className='mt-8 text-xl font-semibold'>4. Processor Obligations</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>The Processor shall: (a) process Customer Data only on the Controller's documented instructions; (b) ensure that personnel authorized to process Customer Data are bound by confidentiality obligations; (c) implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk; (d) notify the Controller without undue delay of any personal data breach; (e) assist the Controller in responding to data subject requests; (f) assist the Controller in meeting GDPR obligations regarding security, breach notification, and impact assessments.

The Processor shall not engage a sub-processor without prior specific or general written authorization from the Controller. We currently use the sub-processors listed in our Trust Center at /trust-center.</div>
        <h2 className='mt-8 text-xl font-semibold'>5. Sub-processors</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>The Processor has engaged the following sub-processors:

Anthropic: AI answer generation. Zero data retention.
AWS: S3 storage and KMS key management.
Supabase: Postgres database hosting.
Stripe: payment processing.
Vercel: application hosting.
Sentry: error monitoring.

The Processor provides 30 days notice before adding or changing sub-processors. The Controller may object to a new sub-processor by notifying the Processor in writing within 30 days.</div>
        <h2 className='mt-8 text-xl font-semibold'>6. Security Measures</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>The Processor implements the technical and organizational measures described in the Security Policy at /legal/security. These include:

Encryption: AES-256 at rest, TLS 1.3 in transit.
Access control: RBAC, MFA, least-privilege.
Audit logging: all access logged, 1-year retention.
Business continuity: daily backups, 4-hour RTO.

These measures are reviewed annually and updated as needed.</div>
        <h2 className='mt-8 text-xl font-semibold'>7. International Data Transfers</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>Customer Data may be processed in the United States. For EU/UK controllers, the parties agree that the Standard Contractual Clauses (SCCs) approved by the European Commission shall apply to any transfer of personal data outside the EEA.

EU data residency is available on the Scale tier. Data hosted in eu-west-1 (Frankfurt).</div>
        <h2 className='mt-8 text-xl font-semibold'>8. Data Subject Rights</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>The Processor shall assist the Controller in fulfilling its obligations to respond to data subject requests (access, rectification, erasure, portability, objection). The Processor shall forward any data subject request received directly to the Controller within 5 business days.

If the Processor receives a government request for Customer Data, the Processor shall notify the Controller (unless legally prohibited) and redirect the request to the Controller.</div>
        <h2 className='mt-8 text-xl font-semibold'>9. Audit Rights</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>The Controller may audit the Processor's compliance with this DPA once per year, with 30 days notice. The audit shall be conducted by an independent third party under NDA.

The Processor shall make available all information necessary to demonstrate compliance, including audit reports (SOC2 Type 2 once available).</div>
        <h2 className='mt-8 text-xl font-semibold'>10. Deletion of Data</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>Upon termination of the Service, the Processor shall delete all Customer Data within 30 days. The Processor shall provide written confirmation of deletion upon request.

Backup snapshots are overwritten within 90 days. The Processor shall not retain Customer Data for any purpose after deletion.</div>
        <h2 className='mt-8 text-xl font-semibold'>11. Contact</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>For DPA questions or to execute a customer-specific DPA, contact founder@secqa.example.</div>
        </div>
      </section>
    </div>
  );
}
