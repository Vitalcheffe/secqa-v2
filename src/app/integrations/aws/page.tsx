'use client';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem, SectionDivider } from '@/components/ui/motion';
import { ArrowRight, CheckCircle2, AlertCircle, Zap, Cloud, Users, FileText, Webhook, Settings, Shield } from 'lucide-react';

const FEATURES = [
  { icon: Cloud, title: 'AWS Config snapshot ingestion', desc: 'SecQA ingests AWS Config snapshots from connected accounts. Use real infrastructure state as retrieval context for questionnaire answers.' },
  { icon: Shield, title: 'IAM policy and role citations', desc: 'When a prospect asks about access controls, SecQA cites the actual IAM policies and roles in your AWS account.' },
  { icon: FileText, title: 'CloudTrail audit log references', desc: 'Questionnaire answers about audit logging cite your CloudTrail configuration with specific trail names and S3 bucket locations.' },
  { icon: Users, title: 'Cross-account IAM role access', desc: 'Connect multiple AWS accounts via cross-account IAM roles. SecQA assumes the role with read-only SecurityAudit permissions.' },
  { icon: Webhook, title: 'Config change notifications', desc: 'AWS Config changes trigger re-indexing. Questionnaire answers always reflect current infrastructure state.' },
  { icon: Settings, title: 'Region and service allowlist', desc: 'Choose which AWS regions and services SecQA can read. Keep sensitive workloads private while exposing compliance-relevant config.' },
];

const STEPS = [
  {
    title: 'Create an IAM policy for SecQA',
    desc: 'In your AWS account, create a customer-managed policy with SecurityAudit + read-only Config permissions. Use the AWS-managed SecurityAudit policy as the base.',
    code: '# Policy name: SecQAReadOnly\n# Description: Read-only access for SecQA integration\n{\n  "Version": "2012-10-17",\n  "Statement": [\n    {"Effect": "Allow",\n     "Action": ["securityhub:*", "config:*", "iam:Get*", "iam:List*"],\n     "Resource": "*"}\n  ]\n}',
  },
  {
    title: 'Create an IAM role with external trust',
    desc: 'Create an IAM role that trusts the SecQA AWS account (account ID 123456789012) with the policy from step 1 attached. Use STS:AssumeRole with external ID.',
    code: '# Trust policy\n{\n  "Version": "2012-10-17",\n  "Statement": [{\n    "Effect": "Allow",\n    "Principal": {"AWS": "arn:aws:iam::123456789012:root"},\n    "Action": "sts:AssumeRole",\n    "Condition": {"StringEquals": {\n      "sts:ExternalId": "secqa-external-id-here"\n    }}\n  }]\n}',
  },
  {
    title: 'Copy the role ARN and external ID',
    desc: 'After creating the role, copy the role ARN (arn:aws:iam::YOUR-ACCOUNT:role/SecQAReadOnly) and the external ID. You will paste these into SecQA.',
    code: 'Role ARN:    arn:aws:iam::123456789012:role/SecQAReadOnly\nExternal ID: secqa-external-id-here',
  },
  {
    title: 'Connect AWS in SecQA dashboard',
    desc: 'In SecQA → Settings → Integrations → AWS, paste the role ARN and external ID. Click "Test connection" — SecQA will assume the role and verify permissions.',
    code: 'POST /api/integrations/aws\n{\n  "role_arn": "arn:aws:iam::123456789012:role/SecQAReadOnly",\n  "external_id": "secqa-external-id-here",\n  "regions": ["us-east-1", "us-west-2", "eu-west-1"]\n}',
  },
  {
    title: 'Configure region and service allowlist',
    desc: 'Pick which AWS regions and services SecQA should index. We recommend: IAM, Config, SecurityHub, CloudTrail, S3, KMS, and RDS across your production regions.',
    code: '# Allowlist\nRegions: us-east-1, us-west-2, eu-west-1\nServices: iam, config, securityhub, cloudtrail, s3, kms, rds',
  },
  {
    title: 'Trigger initial snapshot and verify citations',
    desc: 'Click "Snapshot now" to trigger an immediate sync. Then run a sample questionnaire. AWS-related answers should cite specific IAM roles, Config rules, and CloudTrail trails.',
  },
];

const CONFIG = [
  { option: 'Role ARN', type: 'string', default: '—', desc: 'AWS IAM role ARN that SecQA assumes via STS.' },
  { option: 'External ID', type: 'string', default: '—', desc: 'STS external ID used in the role trust policy.' },
  { option: 'Allowed regions', type: 'string[]', default: '["us-east-1"]', desc: 'AWS regions SecQA is allowed to query.' },
  { option: 'Allowed services', type: 'string[]', default: '["iam","config"]', desc: 'AWS services SecQA is allowed to read.' },
  { option: 'Snapshot frequency', type: 'enum', default: 'daily', desc: 'How often SecQA snapshots AWS state: hourly, daily, weekly, webhook.' },
  { option: 'Config change webhook', type: 'string', default: '—', desc: 'AWS SNS topic ARN that fires on Config changes for real-time re-indexing.' },
];

const USE_CASES = [
  {
    title: 'IAM policy cited for access control question',
    desc: 'A prospect asks "How do you enforce least-privilege access in production?" SecQA queries your IAM policies, identifies the engineer role with read-only S3 and KMS permissions, and writes an answer citing the exact policy document.',
  },
  {
    title: 'CloudTrail configuration cited for audit logging',
    desc: 'A question about audit logging gets answered with a citation to your CloudTrail trail configuration: trail name, S3 bucket, KMS key ID, log file validation enabled, and 90-day retention.',
  },
  {
    title: 'Multi-account posture summary for enterprise prospects',
    desc: 'For an enterprise prospect, SecQA generates a posture summary across all your connected AWS accounts: number of accounts, regions active, IAM users, MFA coverage, and Config rule compliance. All cited to specific accounts.',
  },
];

const FAQS = [
  {
    q: 'Does SecQA need write access to my AWS account?',
    a: 'No. The recommended IAM policy grants read-only access to SecurityAudit, Config, and IAM Get/List actions. SecQA never modifies resources, creates users, or assumes roles in other accounts. You can verify this in CloudTrail after setup.',
  },
  {
    q: 'My AWS account is in AWS Organizations. Can I connect all accounts at once?',
    desc: 'Yes — create a single IAM role in your master account with sts:AssumeRole permission to all member accounts. SecQA will iterate accounts automatically. Contact us for the CloudFormation stack set template.',
    a: 'Yes — create a single IAM role in your master account with sts:AssumeRole permission to all member accounts. SecQA will iterate accounts automatically. Contact us for the CloudFormation stack set template.',
  },
  {
    q: 'How does SecQA handle AWS API rate limits?',
    a: 'SecQA uses AWS SDK retry with exponential backoff and respects Service Quotas. Default is 5 API calls per second per region — well within AWS limits. For large accounts (1000+ IAM users), we batch calls and use Config aggregators.',
  },
  {
    q: 'Can I exclude specific resources from indexing?',
    a: 'Yes — add resource ARN patterns to the exclude list in Settings → Integrations → AWS → Excludes. Useful for excluding test/staging accounts, sandbox environments, or specific sensitive resources.',
  },
];

const RELATED = [
  { slug: 'github', name: 'GitHub', emoji: '🐙' },
  { slug: 'datadog', name: 'Datadog', emoji: '📈' },
  { slug: 'sentry', name: 'Sentry', emoji: '🐛' },
  { slug: 'vercel', name: 'Vercel', emoji: '▲' },
];

export default function AwsIntegrationPage() {
  return (
    <div className='bg-[#0D0D0D]'>
      <section className='relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden'>
        <div className='absolute inset-0 dot-pattern opacity-20' />
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12'>
          <FadeIn><p className='section-label mb-6'>Integrations</p></FadeIn>
          <FadeIn delay={0.1}>
            <div className='text-5xl mb-6'>☁️</div>
            <h1 className='text-5xl md:text-6xl lg:text-[72px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] mb-6'>
              AWS + SecQA<span className='text-[#8B9DAF]'>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className='text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-8'>
              Use your AWS Config snapshots as retrieval context for questionnaire answers. IAM policies, CloudTrail configuration, and SecurityHub findings — every answer cites the actual infrastructure state.
            </p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Connect AWS <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>

      <SectionDivider className='max-w-[1400px]' />

      <section className='py-16 md:py-24 bg-[#0D0D0D]'>
        <div className='max-w-[1200px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Capabilities</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>What you get</h2>
            </div>
          </FadeIn>
          <StaggerContainer className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' staggerDelay={0.07}>
            {FEATURES.map((f) => (
              <StaggerItem key={f.title}>
                <div className='card p-6 h-full'>
                  <div className='w-10 h-10 rounded-lg bg-[rgba(139,157,175,0.1)] border border-[rgba(139,157,175,0.15)] flex items-center justify-center mb-4'>
                    <f.icon size={18} className='text-[#8B9DAF]' />
                  </div>
                  <h3 className='text-[15px] font-bold text-white mb-2'>{f.title}</h3>
                  <p className='text-[13px] text-[#999999] leading-relaxed'>{f.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className='py-16 md:py-24 bg-[#111111]'>
        <div className='max-w-[1000px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Setup</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Detailed setup guide</h2>
              <p className='text-[14px] text-[#999999] mt-3'>Setup takes 30-45 minutes. Requires AWS IAM admin access to create the cross-account role.</p>
            </div>
          </FadeIn>
          <div className='space-y-4'>
            {STEPS.map((step, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className='card p-6'>
                  <div className='flex items-start gap-4 mb-3'>
                    <span className='w-9 h-9 flex items-center justify-center rounded-full bg-[#8B9DAF] text-black text-[14px] font-extrabold shrink-0'>{i + 1}</span>
                    <h3 className='text-[16px] font-bold text-white pt-1'>{step.title}</h3>
                  </div>
                  <p className='text-[13px] text-[#999999] leading-[1.7] mb-4 pl-13'>{step.desc}</p>
                  {step.code && (
                    <pre className='bg-[#0A0A0A] border border-[rgba(255,255,255,0.06)] rounded-lg p-4 ml-13 overflow-x-auto no-scrollbar'><code className='text-[12px] text-[#8B9DAF] font-mono leading-relaxed whitespace-pre'>{step.code}</code></pre>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className='py-16 md:py-24 bg-[#0D0D0D]'>
        <div className='max-w-[1200px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Configuration</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Configuration options</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className='card overflow-hidden'>
              <div className='overflow-x-auto no-scrollbar'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b border-[rgba(255,255,255,0.06)]'>
                      <th className='text-left text-[12px] uppercase tracking-wider text-[#999999] font-semibold px-6 py-4'>Option</th>
                      <th className='text-left text-[12px] uppercase tracking-wider text-[#999999] font-semibold px-6 py-4'>Type</th>
                      <th className='text-left text-[12px] uppercase tracking-wider text-[#999999] font-semibold px-6 py-4'>Default</th>
                      <th className='text-left text-[12px] uppercase tracking-wider text-[#999999] font-semibold px-6 py-4'>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CONFIG.map((row) => (
                      <tr key={row.option} className='border-b border-[rgba(255,255,255,0.04)] last:border-0'>
                        <td className='px-6 py-4 text-[13px] text-white font-medium font-mono'>{row.option}</td>
                        <td className='px-6 py-4 text-[12px] text-[#999999] font-mono'>{row.type}</td>
                        <td className='px-6 py-4 text-[12px] text-[#CCCCCC] font-mono'>{row.default}</td>
                        <td className='px-6 py-4 text-[13px] text-[#999999]'>{row.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className='py-16 md:py-24 bg-[#111111]'>
        <div className='max-w-[1200px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Use cases</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>How teams use it</h2>
            </div>
          </FadeIn>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {USE_CASES.map((uc, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className='card p-6 h-full'>
                  <div className='text-[11px] uppercase tracking-wider text-[#8B9DAF] mb-3 font-semibold'>Scenario {i + 1}</div>
                  <h3 className='text-[15px] font-bold text-white mb-3'>{uc.title}</h3>
                  <p className='text-[13px] text-[#999999] leading-relaxed'>{uc.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className='py-16 md:py-24 bg-[#0D0D0D]'>
        <div className='max-w-[900px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Troubleshooting</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>FAQ & troubleshooting</h2>
            </div>
          </FadeIn>
          <div className='space-y-4'>
            {FAQS.map((f, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className='card p-6'>
                  <div className='flex items-start gap-3 mb-3'>
                    <AlertCircle size={18} className='text-[#8B9DAF] mt-0.5 shrink-0' />
                    <h3 className='text-[15px] font-bold text-white'>{f.q}</h3>
                  </div>
                  <p className='text-[13px] text-[#999999] leading-[1.7] pl-7'>{f.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className='py-16 md:py-24 bg-[#111111]'>
        <div className='max-w-[1200px] mx-auto px-6 md:px-12'>
          <FadeIn>
            <div className='mb-12'>
              <p className='section-label mb-4'>Related</p>
              <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Related integrations</h2>
            </div>
          </FadeIn>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {RELATED.map((r, i) => (
              <FadeIn key={r.slug} delay={i * 0.06}>
                <Link href={`/integrations/${r.slug}`} className='card p-5 flex items-center gap-3 hover:bg-[rgba(255,255,255,0.02)] transition-colors group'>
                  <span className='text-2xl'>{r.emoji}</span>
                  <div>
                    <p className='text-[14px] font-bold text-white group-hover:text-[#8B9DAF] transition-colors'>{r.name}</p>
                    <p className='text-[11px] text-[#666666]'>View integration</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className='py-20 md:py-28 bg-[#0D0D0D]'>
        <div className='max-w-[900px] mx-auto px-6 md:px-12 text-center'>
          <FadeIn>
            <h2 className='text-3xl md:text-5xl font-bold text-white tracking-tight mb-4'>Ready to connect AWS?</h2>
            <p className='text-lg text-white/50 mb-8'>14-day paid pilot at $499. Connect AWS in under 45 minutes.</p>
            <Link href='/pricing' className='inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors'>
              Start your pilot <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
