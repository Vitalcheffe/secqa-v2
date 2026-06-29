'use client';
import { FadeIn, SectionDivider } from '@/components/ui/motion';

const SECTIONS = [
  {
    title: '1. Scope',
    paragraphs: [
      'This Responsible Disclosure Policy applies to security vulnerabilities discovered in SecQA-owned infrastructure, web applications, APIs, and services operated at the secqa.example domain and any subdomains thereof. "SecQA-owned" means infrastructure that we operate directly — it does not include third-party services that we use (e.g., AWS, Stripe, Cloudflare) or infrastructure operated by our customers.',
      'We welcome security research and responsible disclosure of vulnerabilities that could compromise the confidentiality, integrity, or availability of Customer Data or our Service. Researchers who comply with this policy and report a genuine vulnerability will receive acknowledgment and, at our discretion, a reward. We will not pursue legal action against researchers who act in good faith.',
      'Out of scope: vulnerabilities in third-party services (report directly to the vendor); vulnerabilities requiring physical access to our offices (we have no offices); vulnerabilities in customer-configured infrastructure (e.g., a customer\u2019s misconfigured S3 bucket); spam, social engineering, or phishing of SecQA staff; denial-of-service attacks of any magnitude.',
    ],
  },
  {
    title: '2. Reporting a Vulnerability',
    paragraphs: [
      'To report a vulnerability, email security@secqa.example with the following information: (a) a clear description of the vulnerability and its potential impact; (b) the affected URL, endpoint, or component; (c) step-by-step reproduction instructions (proof-of-concept code is appreciated but not required); (d) the researcher\u2019s contact information and preferred acknowledgment name.',
      'If the vulnerability is sensitive or you prefer encrypted communication, use our PGP key (fingerprint and download link at secqa.example/.well-known/pgp). Encrypt your report to our public key and we will respond with an encrypted acknowledgment.',
      'Please do not publicly disclose the vulnerability until we have had a reasonable time to remediate it (typically 90 days, extendable by mutual agreement). We will keep you informed of remediation progress and notify you before any public disclosure on our part.',
    ],
  },
  {
    title: '3. Response Timeline',
    paragraphs: [
      'We will acknowledge receipt of your report within 24 hours (during business days). The acknowledgment will include a unique tracking ID and an estimated timeline for initial assessment. We will provide a substantive response — including a severity assessment and remediation plan — within 5 business days.',
      'Critical and high-severity vulnerabilities are prioritized for remediation. Our internal SLA: critical vulnerabilities are remediated within 7 days, high within 30 days, medium within 60 days, low within 90 days. We will notify you when remediation is complete and invite you to verify the fix.',
      'If we cannot remediate within the agreed timeframe, we will provide a written explanation and a revised timeline. If we determine that a vulnerability is out of scope or a duplicate, we will explain our reasoning. You may appeal by replying to the tracking ID.',
    ],
  },
  {
    title: '4. Recognition and Rewards',
    paragraphs: [
      'Researchers who report a genuine, in-scope vulnerability that we were not already aware of will be acknowledged on our Security Hall of Fame at secqa.example/security/hall-of-fame (with the researcher\u2019s permission). Acknowledgment includes the researcher\u2019s name (or handle) and a brief description of the vulnerability.',
      'At our discretion, we may offer monetary rewards for genuine vulnerabilities based on severity: critical ($500-$2,000), high ($250-$1,000), medium ($100-$500), low ($50-$250). Reward amounts depend on impact, novelty, and quality of the report. We are a small operation and reward budgets are limited — please do not expect bug-bounty-platform-sized payouts.',
      'We may also offer non-monetary recognition: SecQA swag, a public thank-you on our blog, or a referral to other security-conscious companies. Rewards are at our sole discretion and are subject to verification. We will not pay rewards for vulnerabilities that were already known, out of scope, or reported by another researcher first.',
    ],
  },
  {
    title: '5. Testing Guidelines',
    paragraphs: [
      'Researchers must limit testing to the minimum necessary to demonstrate a vulnerability. Do not access, modify, or exfiltrate Customer Data. If you inadvertently access Customer Data, do not download, copy, or share it — report it immediately and delete any local copies. We consider unauthorized access to Customer Data to be a serious violation of this policy.',
      'Acceptable testing methods: manual probing of web applications, automated scanners at low request rates (under 10 requests/second), inspection of client-side JavaScript, analysis of API responses to your own account. Unacceptable methods: brute force attacks, denial-of-service attacks, social engineering of SecQA staff or customers, physical attacks on infrastructure, testing on production Customer Data of other users.',
      'You must use your own test account for testing wherever possible. We may provide a free test environment for researchers upon request — contact security@secqa.example with your research goals and we will provision a sandbox account. Testing against production accounts of other customers is strictly prohibited and may result in legal action.',
    ],
  },
  {
    title: '6. Confidentiality of Reports',
    paragraphs: [
      'We treat all vulnerability reports as confidential. We will not share your report, proof-of-concept code, or identifying information with any third party without your prior written consent, except where required by law. We will not use your report for marketing or public relations purposes without your permission.',
      'We may share the technical details of your report with affected sub-processors (e.g., AWS, Cloudflare) if remediation requires their involvement. We will redact your identifying information before sharing unless you authorize us to include it. We require sub-processors to maintain the same level of confidentiality as we do.',
      'You agree to maintain confidentiality of the vulnerability until we have remediated it or until 90 days have passed since your report (whichever is earlier). You may disclose to your employer or to a coordination body (e.g., CERT/CC) for the purpose of coordinating disclosure, provided they agree to maintain confidentiality.',
    ],
  },
  {
    title: '7. Public Disclosure Coordination',
    paragraphs: [
      'After remediation is complete, we will coordinate with you on public disclosure. We prefer coordinated disclosure — both parties agree on the timing, content, and format of any public statement. We typically publish a security advisory on our blog within 30 days of remediation, with credit to the researcher.',
      'If you wish to publish your own write-up of the vulnerability, we ask that you: (a) wait until at least 30 days after remediation is complete; (b) coordinate the technical details with us to ensure accuracy; (c) respect the confidentiality of any customer data or internal systems that may have been accessible; (d) provide us with a draft of your write-up at least 7 days before publication.',
      'If we cannot remediate within 90 days, you may disclose the vulnerability publicly after notifying us in writing at least 14 days in advance. We will not pursue legal action for good-faith disclosures made in compliance with this section. We prefer to extend the disclosure window by mutual agreement rather than have an uncoordinated disclosure.',
    ],
  },
  {
    title: '8. Safe Harbor',
    paragraphs: [
      'We will not pursue civil or criminal legal action against researchers who: (a) act in good faith and comply with this Responsible Disclosure Policy; (b) do not access, modify, or destroy data that does not belong to them; (c) do not degrade the availability of the Service for our users; (d) do not publicly disclose the vulnerability until we have remediated it or until 90 days have passed since the report.',
      'If a researcher\u2019s activities violate applicable law but comply in good faith with this policy, we will advocate on their behalf with law enforcement. We consider good-faith security research to be in the public interest and will not cooperate with attempts to prosecute such research under computer crime statutes.',
      'This safe harbor does not apply to: (a) activities that go beyond what is necessary to demonstrate the vulnerability (e.g., exfiltrating Customer Data, modifying production systems, pivoting to internal networks); (b) attempts to extort payment in exchange for not disclosing a vulnerability; (c) disclosure of vulnerabilities to third parties before remediation or before the 90-day window has elapsed.',
    ],
  },
  {
    title: '9. Program Exclusions',
    paragraphs: [
      'The following are explicitly out of scope of this Responsible Disclosure Policy and will not be eligible for rewards or safe harbor protection: (a) vulnerabilities in third-party services used by SecQA (e.g., AWS, Stripe, Cloudflare, OpenAI) — report these directly to the vendor; (b) vulnerabilities in customer-configured infrastructure (e.g., a customer\u2019s misconfigured S3 bucket or DNS); (c) vulnerabilities requiring physical access to our offices (we operate fully remote with no corporate offices); (d) spam, social engineering, or phishing of SecQA staff or customers.',
      'The following findings are considered low-impact and are generally not eligible for rewards: (a) missing security headers that do not lead to a demonstrable vulnerability; (b) clickjacking on pages with no sensitive actions; (c) presence of autocomplete attributes on form fields; (d) SSL/TLS configuration issues rated below A by SSL Labs; (e) banner grabbing or version disclosure without an exploitable vulnerability; (f) rate-limiting issues that do not enable account takeover or data exfiltration.',
      'We reserve the right to update the scope and exclusions of this program at any time. Material changes will be announced on our blog and via the security-announce mailing list. Researchers with active reports will be notified by email if a change affects the eligibility of their report.',
    ],
  },
  {
    title: '10. Prior Coordination and Other Programs',
    paragraphs: [
      'If you have reported the same vulnerability to other vendors (e.g., a vulnerability in a shared library or framework used by SecQA), please coordinate disclosure with all affected vendors simultaneously. We prefer that you disclose to all vendors on the same day, and we will work with you and the other vendors to coordinate a joint disclosure if appropriate.',
      'If you are participating in a bug bounty platform (e.g., HackerOne, Bugcrowd, Intigriti) and have a SecQA-specific report, you may submit through the platform or directly to us. If you submit through a platform, the platform\u2019s fee structure and policies may apply in addition to ours. If you submit directly, you forgo any platform-mediated rewards.',
      'We do not currently operate a public bug bounty program. All vulnerability reports should be submitted directly to security@secqa.example. We will consider launching a public program in the future — subscribe to our security-announce mailing list for updates. Until then, this Responsible Disclosure Policy governs all vulnerability reports.',
    ],
  },
  {
    title: '11. Changes to This Policy',
    paragraphs: [
      'We may update this Responsible Disclosure Policy from time to time to reflect changes in our Service, scope, or reward structure. We will notify the security community of material changes by posting an announcement on our blog and updating the "Last updated" date at the top of this policy.',
      'Researchers with active vulnerability reports will be notified by email of any policy change that affects their report. Continued participation in the disclosure process after a change constitutes acceptance of the updated policy.',
      'An archive of prior versions of this policy is maintained at secqa.example/legal/responsible-disclosure/archive.',
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
              Responsible Disclosure<span className='text-[#8B9DAF]'>.</span>
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
                This Responsible Disclosure Policy describes how security researchers can report vulnerabilities in SecQA-owned infrastructure. We welcome responsible disclosure and will not pursue legal action against good-faith researchers.
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
                To report a vulnerability or ask questions about this policy, contact us at:
              </p>
              <div className='space-y-2 text-[14px] text-[#CCCCCC]'>
                <p>SecQA (sole proprietorship)</p>
                <p>Security contact: security@secqa.example</p>
                <p>PGP key: available at secqa.example/.well-known/pgp</p>
                <p>Response time: within 24 hours (acknowledgment), 5 business days (substantive)</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
