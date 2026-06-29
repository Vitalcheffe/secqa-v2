import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Terms of Service — SecQA',
  description: 'Terms of Service for SecQA. Last updated June 2026.'
};

export default function LegalPage() {
  return (
    <div className='flex flex-col'>
      <section className='border-b'>
        <div className='container mx-auto max-w-3xl px-4 py-16'>
          <Badge variant='secondary'>Legal</Badge>
          <h1 className='mt-4 text-4xl font-bold tracking-tight'>Terms of Service</h1>
          <p className='mt-2 text-sm text-muted-foreground'>Last updated: June 2026</p>
        </div>
      </section>
      <section>
        <div className='container mx-auto max-w-3xl px-4 py-16'>
        <h2 className='mt-8 text-xl font-semibold'>1. Acceptance of Terms</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>By accessing or using SecQA (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Service. These Terms form a legally binding agreement between you ("Customer", "you", or "your") and SecQA ("Company", "we", "us", or "our").

We may modify these Terms at any time. If we make material changes, we will notify you via email at least 30 days before the changes take effect. Continued use of the Service after the effective date constitutes acceptance of the updated Terms.</div>
        <h2 className='mt-8 text-xl font-semibold'>2. Eligibility and Account</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>You must be at least 18 years old and legally able to enter into contracts to use the Service. You represent that the information you provide during account creation is accurate and complete. You are responsible for maintaining the security of your account credentials and for all activities under your account. Notify us immediately at founder@secqa.example of any unauthorized use.

You may not use the Service if you are a competitor for the purpose of reverse engineering, or if you are located in a country subject to US embargo (Cuba, Iran, North Korea, Syria, Crimea region).</div>
        <h2 className='mt-8 text-xl font-semibold'>3. Subscription and Payment</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>SecQA offers three subscription tiers: Starter ($49/month), Pro ($99/month), and Scale ($299/month). Annual billing is available at a 17% discount. Prices are in USD. We process payments via Stripe.

Subscriptions auto-renew until canceled. You can cancel anytime from the Stripe customer portal. Monthly cancellations take effect at the end of the current billing cycle. Annual cancellations take effect at the end of the prepaid year (no prorated refund, but access continues for the full year).

We may change pricing with 30 days notice. Existing subscribers keep their current rate until the next renewal cycle. Founding customers (first 100 subscribers) lock their rate for life regardless of future price changes.</div>
        <h2 className='mt-8 text-xl font-semibold'>4. Acceptable Use</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>You agree not to: (a) use the Service for any illegal purpose; (b) upload malware, viruses, or malicious code; (c) attempt to reverse engineer, decompile, or disassemble the Service; (d) scrape, crawl, or spider the Service; (e) exceed rate limits or attempt to overload the Service; (f) resell or sublicense access without written permission; (g) upload content that infringes third-party intellectual property.

Violation of these rules may result in immediate account suspension without refund.</div>
        <h2 className='mt-8 text-xl font-semibold'>5. Customer Data</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>You retain all ownership of data you upload to SecQA ("Customer Data"). We process Customer Data only to provide the Service. We do not use Customer Data to train AI models. All Claude API calls use Customer Data only for the immediate generation request, and Anthropic guarantees zero data retention.

You can export your Customer Data in CSV format at any time from the dashboard. Upon account closure, we delete Customer Data within 30 days. Backup snapshots are overwritten within 90 days.

You are responsible for ensuring you have the right to upload Customer Data and that it does not violate any third-party confidentiality agreements.</div>
        <h2 className='mt-8 text-xl font-semibold'>6. Intellectual Property</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>SecQA, including its software, design, text, graphics, and logos, is owned by us and protected by US and international intellectual property laws. These Terms do not grant you any right to use our trademarks, service marks, or trade dress.

We claim no ownership over your Customer Data. Your questionnaire answers, answer library, and uploaded documents remain your property.</div>
        <h2 className='mt-8 text-xl font-semibold'>7. Disclaimers</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

We do not warrant that the Service will be uninterrupted, error-free, or secure. We do not warrant that AI-generated answers will be accurate or suitable for your specific compliance needs. You are responsible for reviewing all generated answers before submission to your customers.</div>
        <h2 className='mt-8 text-xl font-semibold'>8. Limitation of Liability</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITY.

Our total aggregate liability for any claim arising from these Terms or the Service shall not exceed the amount you paid us in the 12 months preceding the claim.</div>
        <h2 className='mt-8 text-xl font-semibold'>9. Indemnification</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>You agree to indemnify and hold us harmless from any claims, damages, losses, or expenses (including attorney fees) arising from: (a) your breach of these Terms; (b) your Customer Data; (c) your violation of third-party rights.

We will defend you against third-party claims that the Service infringes intellectual property, subject to the limitations in Section 8.</div>
        <h2 className='mt-8 text-xl font-semibold'>10. Termination</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>Either party may terminate this agreement at any time. Upon termination: (a) your access to the Service ends; (b) we delete Customer Data within 30 days; (c) annual subscribers retain access until the end of the prepaid year.

We may suspend or terminate your account immediately for violation of Section 4 (Acceptable Use) without prior notice.</div>
        <h2 className='mt-8 text-xl font-semibold'>11. Governing Law</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>These Terms are governed by the laws of the State of Delaware, USA, without regard to conflict of law principles. Any dispute will be resolved in the state or federal courts located in Delaware.

You and we waive any right to a jury trial.</div>
        <h2 className='mt-8 text-xl font-semibold'>12. Contact</h2>
        <div className='mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>For questions about these Terms, contact us at founder@secqa.example or by mail at: SecQA, Attn: Legal, [Delaware address on file].</div>
        </div>
      </section>
    </div>
  );
}
