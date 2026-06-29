import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Privacy Policy — SecQA',
  description: 'Privacy Policy for SecQA. GDPR and CCPA compliant. Last updated June 2026.'
};

export default function LegalPage() {
  return (
    <div className='flex flex-col'>
      <section className='border-b'>
        <div className='container mx-auto max-w-3xl px-4 py-16'>
          <Badge variant='secondary'>Legal</Badge>
          <h1 className='mt-4 text-4xl font-bold tracking-tight'>Privacy Policy</h1>
          <p className='mt-2 text-sm text-muted-foreground'>Last updated: June 2026</p>
        </div>
      </section>
      <section>
        <div className='container mx-auto max-w-3xl px-4 py-16'>
        <h2 className='mt-8 text-xl font-semibold'>1. Information We Collect</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>We collect three categories of information:

Account Information: name, email, company name, password (hashed). Collected when you sign up.

Customer Data: questionnaires, answers, answer libraries, uploaded documents. Collected when you use the Service.

Usage Data: API calls, feature usage, error logs, IP address, browser type. Collected automatically.

Payment Information: processed by Stripe. We never see or store your credit card number.</div>
        <h2 className='mt-8 text-xl font-semibold'>2. How We Use Your Information</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>We use your information to: (a) provide the Service; (b) process payments; (c) communicate with you about your account; (d) improve the Service (aggregate analytics only, never individual Customer Data); (e) comply with legal obligations.

We do NOT use your information to: train AI models; sell to third parties; send marketing emails without consent; profile you for advertising.</div>
        <h2 className='mt-8 text-xl font-semibold'>3. Legal Basis for Processing (GDPR)</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>Under GDPR, we process your data based on: (a) Contract — to provide the Service you subscribed to; (b) Legal Obligation — to comply with tax, accounting, and regulatory requirements; (c) Legitimate Interest — to improve the Service and prevent fraud; (d) Consent — for optional marketing communications.

You can withdraw consent at any time by emailing founder@secqa.example.</div>
        <h2 className='mt-8 text-xl font-semibold'>4. Data Retention</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>We retain Customer Data for the duration of your active subscription. Upon account closure, we delete Customer Data within 30 days. Backup snapshots are overwritten within 90 days.

We retain account information (name, email) for 7 years for tax and legal compliance. We retain usage logs for 1 year for security monitoring.

You can request earlier deletion of your data at any time by emailing us. We will delete within 30 days and provide written confirmation.</div>
        <h2 className='mt-8 text-xl font-semibold'>5. Data Sharing</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>We share your data with the following sub-processors:

Anthropic: for Claude API calls (zero data retention, EU/US transfer covered by SCCs).
AWS: for S3 storage and KMS key management.
Supabase: for Postgres database hosting.
Stripe: for payment processing.
Vercel: for application hosting.
Sentry: for error monitoring (PII filtered before transmission).

We do not share your data with any other third parties without your explicit consent or legal requirement.</div>
        <h2 className='mt-8 text-xl font-semibold'>6. International Data Transfers</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>Your data may be processed in the United States (our primary infrastructure location). For EU customers, we offer EU data residency on Scale tier (data hosted in eu-west-1).

EU-US data transfers are covered by Standard Contractual Clauses (SCCs) with all sub-processors. We have signed DPAs with all sub-processors that touch Customer Data.</div>
        <h2 className='mt-8 text-xl font-semibold'>7. Your Rights (GDPR/CCPA)</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>You have the following rights:

Access: request a copy of your personal data.
Rectification: correct inaccurate data.
Erasure: request deletion of your data ("right to be forgotten").
Portability: receive your data in a machine-readable format (CSV).
Objection: object to processing based on legitimate interest.
Restriction: request restricted processing during dispute.

To exercise any right, email founder@secqa.example. We respond within 30 days (GDPR) or 45 days (CCPA).</div>
        <h2 className='mt-8 text-xl font-semibold'>8. Cookies</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>We use essential cookies for authentication and session management. We use analytics cookies (anonymized) for product improvement. We do not use advertising cookies.

You can control cookies via your browser settings. Disabling essential cookies will prevent you from logging in.</div>
        <h2 className='mt-8 text-xl font-semibold'>9. Children's Privacy</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>The Service is not intended for children under 16. We do not knowingly collect data from children. If you believe we have collected data from a child, contact us and we will delete it immediately.</div>
        <h2 className='mt-8 text-xl font-semibold'>10. Data Breach Notification</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>In the event of a confirmed data breach affecting your personal data, we will notify you within 72 hours (GDPR requirement) via email. The notification will include: the nature of the breach, the data affected, the measures we are taking, and the steps you can take to protect yourself.</div>
        <h2 className='mt-8 text-xl font-semibold'>11. Contact</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>For privacy questions or to exercise your rights, contact us at founder@secqa.example. For EU residents, our EU representative is available at eu-rep@secqa.example.</div>
        </div>
      </section>
    </div>
  );
}
