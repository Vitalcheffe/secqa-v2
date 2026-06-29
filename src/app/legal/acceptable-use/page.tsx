import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Acceptable Use Policy — SecQA',
  description: 'Acceptable Use Policy for SecQA.'
};

export default function LegalPage() {
  return (
    <div className='flex flex-col'>
      <section className='border-b'>
        <div className='container mx-auto max-w-3xl px-4 py-16'>
          <Badge variant='secondary'>Legal</Badge>
          <h1 className='mt-4 text-4xl font-bold tracking-tight'>Acceptable Use Policy</h1>
          <p className='mt-2 text-sm text-muted-foreground'>Last updated: June 2026</p>
        </div>
      </section>
      <section>
        <div className='container mx-auto max-w-3xl px-4 py-16'>
        <h2 className='mt-8 text-xl font-semibold'>1. Permitted Use</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>SecQA is provided for the purpose of automating security questionnaire responses for B2B SaaS companies. You may use the Service only for your internal business operations and only in accordance with these Terms and this Acceptable Use Policy.</div>
        <h2 className='mt-8 text-xl font-semibold'>2. Prohibited Uses</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>You may not use the Service to: (a) upload content that is illegal, harmful, or infringes third-party rights; (b) upload malware, viruses, or any malicious code; (c) attempt to gain unauthorized access to other customers' data; (d) use the Service to process data for competitors of SecQA without our written consent; (e) reverse engineer, decompile, or disassemble the Service; (f) scrape, crawl, or spider the Service; (g) exceed rate limits or attempt to overload the Service; (h) resell or sublicense access without written permission; (i) use the Service in violation of US export controls.</div>
        <h2 className='mt-8 text-xl font-semibold'>3. Rate Limits</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>We impose rate limits to ensure Service availability for all customers. Limits are: 100 API requests per minute per customer, 10 questionnaire uploads per hour, 5 concurrent generation jobs. Exceeding rate limits may result in temporary throttling. Persistent abuse may result in account suspension.</div>
        <h2 className='mt-8 text-xl font-semibold'>4. Customer Data Restrictions</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>You may not upload to the Service: (a) content that contains personally identifiable information of third parties without their consent; (b) content that is subject to HIPAA, ITAR, or other specialized regulatory requirements (we are not HIPAA-compliant); (c) content that exceeds 10MB per file; (d) content that is encrypted with keys you do not control.</div>
        <h2 className='mt-8 text-xl font-semibold'>5. Enforcement</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>Violation of this policy may result in: (a) warning and request to remediate; (b) temporary account suspension; (c) permanent account termination without refund for serious violations. We will notify you via email before suspending your account, except in cases of imminent harm.</div>
        <h2 className='mt-8 text-xl font-semibold'>6. Contact</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>Report violations to founder@secqa.example. We investigate all reports within 48 hours.</div>
        </div>
      </section>
    </div>
  );
}
