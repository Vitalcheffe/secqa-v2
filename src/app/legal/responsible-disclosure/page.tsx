import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Responsible Disclosure Policy — SecQA',
  description: 'Report security vulnerabilities in SecQA responsibly.'
};

export default function LegalPage() {
  return (
    <div className='flex flex-col'>
      <section className='border-b'>
        <div className='container mx-auto max-w-3xl px-4 py-16'>
          <Badge variant='secondary'>Legal</Badge>
          <h1 className='mt-4 text-4xl font-bold tracking-tight'>Responsible Disclosure Policy</h1>
          <p className='mt-2 text-sm text-muted-foreground'>Last updated: June 2026</p>
        </div>
      </section>
      <section>
        <div className='container mx-auto max-w-3xl px-4 py-16'>
        <h2 className='mt-8 text-xl font-semibold'>1. Scope</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>This policy applies to vulnerabilities found in SecQA's production systems, including our web application, API, and infrastructure. It does not apply to third-party services we use (report those to the respective vendors).</div>
        <h2 className='mt-8 text-xl font-semibold'>2. Reporting</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>If you discover a security vulnerability, please report it to founder@secqa.example with the subject "Responsible Disclosure". Include: (a) description of the vulnerability; (b) steps to reproduce; (c) potential impact; (d) suggested remediation if you have one.

Please do not: (a) access or modify other customers' data; (b) perform DoS attacks; (c) use automated scanners that generate noise; (d) publicly disclose the vulnerability before we have 90 days to remediate.</div>
        <h2 className='mt-8 text-xl font-semibold'>3. Response Timeline</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>We acknowledge receipt within 48 hours. We provide an initial assessment within 5 business days. We remediate critical vulnerabilities within 30 days, high within 60 days, medium within 90 days. We keep you informed of progress throughout.</div>
        <h2 className='mt-8 text-xl font-semibold'>4. Recognition</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>With your permission, we recognize responsible disclosure contributors on our Trust Center page. We do not offer monetary bounties (we are a solo-founder startup), but we will send SecQA swag and a personal thank-you note.

We commit to not taking legal action against researchers who follow this policy in good faith.</div>
        <h2 className='mt-8 text-xl font-semibold'>5. Safe Harbor</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>We consider research conducted in accordance with this policy to be authorized. We will not pursue legal action against you, provided you: (a) follow the rules in Section 2; (b) do not access or exfiltrate customer data; (c) give us reasonable time to remediate before public disclosure.</div>
        <h2 className='mt-8 text-xl font-semibold'>6. Contact</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>Email founder@secqa.example for any questions about this policy.</div>
        </div>
      </section>
    </div>
  );
}
