'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Search, Tag, Clock, TrendingUp } from 'lucide-react';

const ANSWERS = [
  { id: 'a_001', question: 'Do you encrypt data at rest?', answer: 'Yes, AES-256 with KMS-managed keys rotated every 90 days.', tags: ['encryption', 'soc2', 'storage'], framework: 'SOC2', usageCount: 47, lastUsed: '2026-06-28', confidence: 0.98 },
  { id: 'a_002', question: 'Do you enforce multi-factor authentication?', answer: 'Yes, MFA is enforced for all administrative accounts via TOTP or WebAuthn.', tags: ['access-control', 'mfa', 'authentication'], framework: 'SOC2', usageCount: 42, lastUsed: '2026-06-27', confidence: 0.95 },
  { id: 'a_003', question: 'What is your data retention policy?', answer: 'Customer data is retained for the active subscription. Deleted within 30 days of account closure.', tags: ['data-retention', 'privacy'], framework: 'GDPR', usageCount: 38, lastUsed: '2026-06-26', confidence: 0.97 },
  { id: 'a_004', question: 'Do you have SOC2 Type 2 certification?', answer: 'Yes, completed Q1 2024. Report available under NDA via security portal.', tags: ['soc2', 'compliance', 'audit'], framework: 'SOC2', usageCount: 51, lastUsed: '2026-06-28', confidence: 0.99 },
  { id: 'a_005', question: 'How do you handle security incidents?', answer: 'Documented IR plan. Critical incidents escalated within 1 hour. Customers notified within 24 hours of confirmed breach.', tags: ['incident-response', 'soc2'], framework: 'SOC2', usageCount: 29, lastUsed: '2026-06-25', confidence: 0.94 },
  { id: 'a_006', question: 'Do you conduct background checks?', answer: 'Yes, all employees undergo criminal background checks prior to employment.', tags: ['hr', 'background-check'], framework: 'SOC2', usageCount: 24, lastUsed: '2026-06-24', confidence: 0.92 },
  { id: 'a_007', question: 'How often do you conduct security training?', answer: 'Annual security awareness training at onboarding and annually. Quarterly phishing simulations.', tags: ['training', 'hr'], framework: 'SOC2', usageCount: 31, lastUsed: '2026-06-26', confidence: 0.96 },
  { id: 'a_008', question: 'Do you have a vulnerability management program?', answer: 'Continuous vulnerability scanning. Critical remediated within 7 days, high within 30 days.', tags: ['vulnerability', 'patching'], framework: 'SOC2', usageCount: 35, lastUsed: '2026-06-27', confidence: 0.95 },
  { id: 'a_009', question: 'What cloud provider do you use?', answer: 'AWS in us-east-1 and eu-west-1. SOC2, ISO 27001, FedRAMP certified.', tags: ['infrastructure', 'aws'], framework: 'SOC2', usageCount: 44, lastUsed: '2026-06-28', confidence: 0.98 },
  { id: 'a_010', question: 'Do you log and monitor access to customer data?', answer: 'All access logged. Logs retained 1 year. Monitored via automated alerts for anomalous patterns.', tags: ['logging', 'monitoring'], framework: 'SOC2', usageCount: 33, lastUsed: '2026-06-26', confidence: 0.96 }
];

export default function AnswersLibraryPage() {
  const [search, setSearch] = useState('');
  const [frameworkFilter, setFrameworkFilter] = useState<'all' | 'SOC2' | 'GDPR' | 'CAIQ' | 'NIST'>('all');

  const filtered = ANSWERS.filter((a) => {
    if (frameworkFilter !== 'all' && a.framework !== frameworkFilter) return false;
    if (search && !a.question.toLowerCase().includes(search.toLowerCase()) && !a.answer.toLowerCase().includes(search.toLowerCase()) && !a.tags.some(t => t.includes(search.toLowerCase()))) return false;
    return true;
  });

  return (
    <div className='flex flex-col p-6'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>Answer Library</h1>
          <p className='text-sm text-muted-foreground'>{filtered.length} of {ANSWERS.length} answers · {ANSWERS.reduce((s, a) => s + a.usageCount, 0)} total uses</p>
        </div>
        <Button><Plus className='mr-2 h-4 w-4' />Add Answer</Button>
      </div>

      <div className='flex gap-4 mb-6'>
        <div className='flex-1 relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search questions, answers, or tags...'
            className='w-full pl-10 pr-4 py-2 border rounded-md text-sm'
          />
        </div>
        <div className='flex gap-2'>
          {(['all', 'SOC2', 'GDPR', 'CAIQ', 'NIST'] as const).map((f) => (
            <Button key={f} variant={frameworkFilter === f ? 'default' : 'outline'} size='sm' onClick={() => setFrameworkFilter(f)}>
              {f === 'all' ? 'All' : f}
            </Button>
          ))}
        </div>
      </div>

      <div className='grid gap-4'>
        {filtered.map((a) => (
          <Card key={a.id} className='p-5'>
            <div className='flex items-start justify-between gap-4'>
              <div className='flex-1'>
                <div className='flex items-center gap-2 mb-2'>
                  <Badge variant='secondary'>{a.framework}</Badge>
                  <span className='text-xs text-muted-foreground flex items-center gap-1'>
                    <Tag className='h-3 w-3' />
                    {a.tags.join(' · ')}
                  </span>
                </div>
                <h3 className='font-semibold text-sm mb-1'>{a.question}</h3>
                <p className='text-sm text-muted-foreground'>{a.answer}</p>
              </div>
              <div className='text-right text-xs text-muted-foreground space-y-1'>
                <div className='flex items-center gap-1 justify-end'>
                  <TrendingUp className='h-3 w-3' />
                  <span className='font-medium'>{a.usageCount} uses</span>
                </div>
                <div className='flex items-center gap-1 justify-end'>
                  <Clock className='h-3 w-3' />
                  {a.lastUsed}
                </div>
                <div className='text-primary font-medium'>{Math.round(a.confidence * 100)}% confidence</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
