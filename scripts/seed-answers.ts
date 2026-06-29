// Seed answer library with SOC2/CAIQ-style sample answers
// Run: npx ts-node scripts/seed-answers.ts
// Usage: populates the Answer table with 15 baseline Q&A pairs for RAG retrieval

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedAnswers = [
  {
    questionPattern: "Do you encrypt data at rest?",
    answerText:
      "Yes. All customer data is encrypted at rest using AES-256. Encryption keys are managed via AWS KMS with automatic rotation every 90 days.",
    tags: "encryption,soc2,storage",
  },
  {
    questionPattern: "Do you encrypt data in transit?",
    answerText:
      "Yes. All data in transit is encrypted using TLS 1.3. We enforce HSTS and disable legacy protocols (TLS 1.0 and 1.1).",
    tags: "encryption,soc2,network",
  },
  {
    questionPattern: "Do you enforce multi-factor authentication?",
    answerText:
      "Yes. MFA is enforced for all administrative accounts. We support TOTP and WebAuthn. End-user MFA is optional but recommended.",
    tags: "access-control,mfa,authentication",
  },
  {
    questionPattern: "What is your data retention policy?",
    answerText:
      "Customer data is retained for the duration of the active subscription. Upon account closure, data is deleted within 30 days. Backup tapes are overwritten within 90 days.",
    tags: "data-retention,privacy",
  },
  {
    questionPattern: "Do you have SOC2 Type 2 certification?",
    answerText:
      "Yes. We completed SOC2 Type 2 attestation in Q1 2024. The report is available under NDA via our security portal.",
    tags: "soc2,compliance,audit",
  },
  {
    questionPattern: "How do you handle security incidents?",
    answerText:
      "We maintain a documented incident response plan. Critical incidents are escalated within 1 hour. Customers are notified within 24 hours of confirmed data breach per our DPA.",
    tags: "incident-response,soc2",
  },
  {
    questionPattern: "Do you conduct background checks on employees?",
    answerText:
      "Yes. All employees undergo criminal background checks prior to employment. Contractors with production access undergo the same checks.",
    tags: "hr,background-check,soc2",
  },
  {
    questionPattern: "How often do you conduct security training?",
    answerText:
      "All employees complete security awareness training at onboarding and annually thereafter. Phishing simulations run quarterly.",
    tags: "training,soc2,hr",
  },
  {
    questionPattern: "Do you have a vulnerability management program?",
    answerText:
      "Yes. We run continuous vulnerability scanning on production infrastructure. Critical vulnerabilities are remediated within 7 days, high within 30 days.",
    tags: "vulnerability,patching,soc2",
  },
  {
    questionPattern: "Do you log and monitor access to customer data?",
    answerText:
      "Yes. All access to customer data is logged. Logs are retained for 1 year and monitored via automated alerts for anomalous access patterns.",
    tags: "logging,monitoring,soc2",
  },
  {
    questionPattern: "What cloud provider do you use?",
    answerText:
      "We run on AWS in us-east-1 and eu-west-1. AWS is SOC2, ISO 27001, and FedRAMP certified. We inherit these controls.",
    tags: "infrastructure,aws,cloud",
  },
  {
    questionPattern: "Do you have a disaster recovery plan?",
    answerText:
      "Yes. Our DR plan includes RPO of 1 hour and RTO of 4 hours. We test DR failover semi-annually. Backups are encrypted and stored in a separate region.",
    tags: "dr,backup,soc2",
  },
  {
    questionPattern: "Do you have a data processing agreement (DPA)?",
    answerText:
      "Yes. Our DPA is available at /legal/dpa and is incorporated by reference into our MSA. We sign customer-specific DPAs on request.",
    tags: "dpa,legal,gdpr",
  },
  {
    questionPattern: "How do you handle customer data deletion requests?",
    answerText:
      "Customers can delete their data at any time via the admin UI. Deletion is permanent within 30 days. We provide a deletion certificate on request.",
    tags: "deletion,gdpr,privacy",
  },
  {
    questionPattern: "Do you use sub-processors to process customer data?",
    answerText:
      "Yes. We use AWS for hosting, Stripe for billing, and Anthropic for AI processing. A full sub-processor list is maintained at /legal/subprocessors with 30-day change notice.",
    tags: "sub-processors,gdpr,vendor",
  },
];

async function main() {
  console.log(`Seeding ${seedAnswers.length} answers for demo customer...`);

  for (const ans of seedAnswers) {
    await prisma.answer.create({
      data: {
        customerId: "demo-customer",
        questionPattern: ans.questionPattern,
        answerText: ans.answerText,
        tags: ans.tags,
      },
    });
  }

  const count = await prisma.answer.count();
  console.log(`Done. ${count} answers in library.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
