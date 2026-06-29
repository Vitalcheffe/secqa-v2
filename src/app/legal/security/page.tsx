'use client';
import { FadeIn, SectionDivider } from '@/components/ui/motion';

const SECTIONS = [
  {
    title: '1. Security Architecture',
    paragraphs: [
      'SecQA is built on a zero-trust security architecture. Every service-to-service call is authenticated and authorized. We use mutual TLS (mTLS) for internal service communication, and all external API calls require signed requests with short-lived tokens. Our architecture follows the principle of least privilege — every component has access only to the resources it needs.',
      'Our application is split into separate services for parsing, AI inference, storage, and analytics. Each service runs in an isolated container with no shared filesystem. Customer Data is processed in ephemeral containers that are destroyed after each request — no data persists between requests except in designated, encrypted storage.',
      'We use defense-in-depth: a Web Application Firewall (Cloudflare WAF), network-level rate limiting, application-level authorization, and database-level row security policies. All layers are monitored independently and alert on anomalies.',
    ],
  },
  {
    title: '2. Infrastructure and Hosting',
    paragraphs: [
      'SecQA is hosted on Amazon Web Services (AWS) in the us-east-1 region (Northern Virginia). We use AWS VPC with private subnets for all databases and internal services — only public-facing load balancers and CDN edge nodes are reachable from the internet. Security groups are configured to deny all traffic by default and allow only explicitly whitelisted ports and IPs.',
      'All data at rest is encrypted with AES-256 using AWS KMS-managed keys. All data in transit is encrypted with TLS 1.2 or higher (TLS 1.3 preferred). We use AWS Certificate Manager for SSL/TLS certificate issuance and rotation. Database backups are encrypted with separate KMS keys and stored in a different AWS region for disaster recovery.',
      'We do not operate physical data centers. AWS is responsible for the physical security of the underlying infrastructure (AWS Shared Responsibility Model). Our responsibility starts at the operating system layer — we patch all servers weekly, scan for vulnerabilities monthly, and conduct penetration tests quarterly.',
    ],
  },
  {
    title: '3. Access Control',
    paragraphs: [
      'Access to production systems is restricted to the SecQA founder and a small number of vetted contractors. All access requires multi-factor authentication (WebAuthn/passkeys preferred). We use AWS IAM with role-based access control (RBAC) — every role has the minimum permissions required to perform its function.',
      'Access to Customer Data is logged in an immutable audit log retained for 1 year. Every read, write, and delete operation is recorded with timestamp, user, IP address, and resource identifier. Customers can export their audit log from the dashboard at any time.',
      'We use just-in-time (JIT) access for production — engineers request time-bound access for specific tasks and access is automatically revoked after the time window expires. No standing production access for any role except the founder. SSH access to production servers is replaced by AWS Systems Manager Session Manager with full session logging.',
    ],
  },
  {
    title: '4. Vulnerability Management',
    paragraphs: [
      'We run a continuous vulnerability management program. Production dependencies are scanned daily with Snyk for known CVEs. Critical vulnerabilities are patched within 24 hours, high-severity within 7 days, and medium/low within 30 days. We maintain a Software Bill of Materials (SBOM) and update it on every release.',
      'We conduct external penetration tests on a quarterly basis with a third-party security firm. Findings are tracked in our issue tracker with severity ratings and remediation deadlines. We also operate a responsible disclosure program — see secqa.example/legal/responsible-disclosure for details and bug bounty rewards.',
      'Code changes are reviewed by at least one engineer before merging to main. We use static application security testing (SAST) with Semgrep on every pull request, dynamic application security testing (DAST) with OWASP ZAP nightly, and software composition analysis (SCA) on every release. Findings block deployment until remediated or formally accepted.',
    ],
  },
  {
    title: '5. Incident Response',
    paragraphs: [
      'We maintain a written incident response plan that defines roles, responsibilities, and procedures for security incidents. The plan covers detection, containment, eradication, recovery, and post-incident review. We test the plan with tabletop exercises at least twice per year.',
      'In the event of a confirmed security incident affecting Customer Data, we will notify affected customers without undue delay, and in any case within 72 hours of confirmation, as required by GDPR Article 33. Notifications will include the nature of the incident, the categories of data affected, the likely consequences, and the measures we are taking to address it.',
      'Post-incident, we conduct a blameless retrospective within 5 business days. The retrospective produces a written report including root cause analysis, timeline, and corrective and preventive actions (CAPA). CAPA items are tracked to completion and reported to affected customers on request.',
    ],
  },
  {
    title: '6. Compliance and Certifications',
    paragraphs: [
      'SecQA is SOC 2 Type II certified. The audit covers Security, Availability, and Confidentiality trust service criteria. The latest audit report is available under NDA at request — contact founder@secqa.example. Our SOC 2 audit is conducted annually by an independent CPA firm.',
      'We are GDPR-compliant and have signed Standard Contractual Clauses (SCCs) with our EU customers. We are CCPA/CPRA-compliant for California residents. We are not currently HIPAA-compliant and do not accept Protected Health Information (PHI). We are not currently FedRAMP-authorized.',
      'We track our compliance evidence in SecQA itself — our own platform dogfoods our SOC 2 evidence collection. Customers can request access to our Trust Center at trust.secqa.example for the latest compliance documents, policies, and audit reports under NDA.',
    ],
  },
  {
    title: '7. Sub-Processors',
    paragraphs: [
      'We use the following sub-processors to provide the Service: (a) AWS for infrastructure hosting, storage, and compute; (b) Stripe for payment processing; (c) OpenAI and Anthropic for AI model inference (under zero-retention agreements — neither provider retains Customer Data after inference); (d) Resend for transactional email; (e) Cloudflare for CDN, DNS, and DDoS protection.',
      'We have signed Data Processing Agreements (DPAs) with each sub-processor that meet GDPR Article 28 requirements. Sub-processors are reviewed quarterly for security posture, compliance status, and continued necessity. We notify customers 30 days before adding or replacing any sub-processor.',
      'A current list of sub-processors with their locations, security certifications, and DPA status is maintained at secqa.example/legal/subprocessors. Customers can subscribe to sub-processor change notifications via email.',
    ],
  },
  {
    title: '8. Data Handling and Encryption',
    paragraphs: [
      'All Customer Data is encrypted at rest with AES-256 using AWS KMS-managed customer master keys (CMKs). Each customer has a dedicated data encryption key (DEK) wrapped by the CMK. DEKs are rotated annually. Database backups are encrypted with separate KMS keys.',
      'All data in transit is encrypted with TLS 1.2 or higher. We support TLS 1.3 and prefer it where the client supports it. We use HSTS with a max-age of 1 year and include subdomains. Certificate transparency is enforced. We use modern cipher suites only — weak ciphers (3DES, RC4, SHA-1) are disabled.',
      'AI model inference is performed via API calls to OpenAI and Anthropic. We have zero-retention agreements with both providers — Customer Data sent for inference is not stored, not logged, and not used for model training. Inference requests are stateless and ephemeral. We do not train AI models on Customer Data.',
    ],
  },
  {
    title: '9. Personnel Security',
    paragraphs: [
      'All SecQA personnel (the founder and contractors) undergo background checks before being granted access to production systems. Background checks include identity verification, criminal history (where legally permitted), and employment verification. Background check results are reviewed by the founder before access is granted.',
      'All personnel complete security awareness training upon onboarding and annually thereafter. Training covers phishing, social engineering, password hygiene, data handling, and incident reporting. Personnel with access to Customer Data complete additional training on GDPR, CCPA, and HIPAA basics. Training completion is tracked and reported in our SOC 2 evidence library.',
      'Personnel access is revoked immediately upon termination. We maintain a documented offboarding checklist that includes revoking access to all systems, recovering hardware, and reviewing recent activity. Offboarding is completed within 24 hours of termination. Contractors are subject to the same offboarding process.',
    ],
  },
  {
    title: '10. Secure Software Development',
    paragraphs: [
      'We follow a secure software development lifecycle (SSDLC). All code changes are reviewed by at least one engineer before merging to the main branch. We require peer review for any change touching authentication, authorization, encryption, or Customer Data handling. Code reviews are tracked in our issue tracker and auditable.',
      'We use static application security testing (SAST) with Semgrep on every pull request. Findings are categorized by severity and block deployment until remediated or formally accepted by the founder. We use dynamic application security testing (DAST) with OWASP ZAP nightly against staging. Software composition analysis (SCA) runs on every release to detect vulnerable dependencies.',
      'We maintain a Software Bill of Materials (SBOM) for the SecQA Service, updated on every release. The SBOM lists all third-party dependencies with versions and licenses. We review the SBOM weekly for known vulnerabilities (via Snyk and OSV) and update dependencies monthly. Critical CVEs are patched within 24 hours of disclosure.',
    ],
  },
  {
    title: '11. Business Continuity',
    paragraphs: [
      'We maintain a business continuity plan (BCP) and disaster recovery plan (DRP). Database backups are taken every 6 hours and retained for 30 days. Cross-region backups are replicated to us-west-2 (Oregon) for disaster recovery. We test full database restoration quarterly.',
      'Our Recovery Time Objective (RTO) is 4 hours and our Recovery Point Objective (RPO) is 6 hours. In the event of a regional AWS outage, we can fail over to us-west-2 within 4 hours. Status updates will be posted on our status page at status.secqa.example and via email to all customers.',
      'We maintain a high-availability architecture with multi-AZ deployment for all critical services. Application load balancers distribute traffic across at least 2 availability zones. Database failover is automatic within 60 seconds. We target 99.9% uptime per month — service credits are available for downtime below this target.',
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
              Security<span className='text-[#8B9DAF]'>.</span>
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
                This Security Policy describes the technical, organizational, and operational measures SecQA takes to protect Customer Data. It forms part of our Terms of Service and Data Processing Agreement.
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
                For security questions, vulnerability reports, or to request our latest SOC 2 Type II report, contact us at:
              </p>
              <div className='space-y-2 text-[14px] text-[#CCCCCC]'>
                <p>SecQA (sole proprietorship)</p>
                <p>Security contact: security@secqa.example</p>
                <p>PGP key: available at secqa.example/.well-known/pgp</p>
                <p>Response time: within 24 hours for security inquiries</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
