'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Search, Filter, MoreHorizontal, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const QUESTIONNAIRES = [
  { id: 'q_001', customer: 'Acme Corp', fileName: 'CAIQ-2026-Q2.pdf', questions: 187, status: 'approved', uploadedAt: '2026-06-28', completedAt: '2026-06-28', timeToComplete: '1h 32min' },
  { id: 'q_002', customer: 'Stripe', fileName: 'SIG-Core.xlsx', questions: 412, status: 'review', uploadedAt: '2026-06-27', completedAt: null, timeToComplete: null },
  { id: 'q_003', customer: 'Snowflake', fileName: 'Security-Review.docx', questions: 95, status: 'approved', uploadedAt: '2026-06-26', completedAt: '2026-06-26', timeToComplete: '52min' },
  { id: 'q_004', customer: 'Datadog', fileName: 'NIST-800-53.csv', questions: 287, status: 'draft', uploadedAt: '2026-06-26', completedAt: null, timeToComplete: null },
  { id: 'q_005', customer: 'HashiCorp', fileName: 'Customer-Questionnaire.pdf', questions: 124, status: 'approved', uploadedAt: '2026-06-25', completedAt: '2026-06-25', timeToComplete: '1h 18min' },
  { id: 'q_006', customer: 'Vercel', fileName: 'Vendor-Security-Review.pdf', questions: 156, status: 'rejected', uploadedAt: '2026-06-24', completedAt: null, timeToComplete: null },
  { id: 'q_007', customer: 'Linear', fileName: 'CAIQ-v4.pdf', questions: 198, status: 'approved', uploadedAt: '2026-06-23', completedAt: '2026-06-23', timeToComplete: '1h 45min' },
  { id: 'q_008', customer: 'Attio', fileName: 'Security-Questionnaire.docx', questions: 78, status: 'review', uploadedAt: '2026-06-22', completedAt: null, timeToComplete: null }
];

const STATUS_CONFIG = {
  draft: { label: 'Draft', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  review: { label: 'In Review', color: 'bg-blue-100 text-blue-700', icon: AlertCircle },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700', icon: AlertCircle }
};

export default function QuestionnairesPage() {
  const [filter, setFilter] = useState<'all' | 'draft' | 'review' | 'approved' | 'rejected'>('all');
  const [search, setSearch] = useState('');

  const filtered = QUESTIONNAIRES.filter((q) => {
    if (filter !== 'all' && q.status !== filter) return false;
    if (search && !q.customer.toLowerCase().includes(search.toLowerCase()) && !q.fileName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className='flex flex-col p-6'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>Questionnaires</h1>
          <p className='text-sm text-muted-foreground'>{filtered.length} of {QUESTIONNAIRES.length} questionnaires</p>
        </div>
        <Button><Plus className='mr-2 h-4 w-4' />Upload New</Button>
      </div>

      <div className='flex gap-4 mb-6'>
        <div className='flex-1 relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search by customer or filename...'
            className='w-full pl-10 pr-4 py-2 border rounded-md text-sm'
          />
        </div>
        <div className='flex gap-2'>
          {(['all', 'draft', 'review', 'approved', 'rejected'] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              size='sm'
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All' : STATUS_CONFIG[f].label}
            </Button>
          ))}
        </div>
      </div>

      <Card className='overflow-hidden'>
        <table className='w-full'>
          <thead className='border-b bg-muted/50'>
            <tr>
              <th className='text-left p-4 text-sm font-medium'>Customer</th>
              <th className='text-left p-4 text-sm font-medium'>File</th>
              <th className='text-center p-4 text-sm font-medium'>Questions</th>
              <th className='text-left p-4 text-sm font-medium'>Status</th>
              <th className='text-left p-4 text-sm font-medium'>Uploaded</th>
              <th className='text-left p-4 text-sm font-medium'>Time</th>
              <th className='p-4'></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((q) => {
              const status = STATUS_CONFIG[q.status as keyof typeof STATUS_CONFIG];
              return (
                <tr key={q.id} className='border-b hover:bg-muted/30'>
                  <td className='p-4 font-medium text-sm'>{q.customer}</td>
                  <td className='p-4 text-sm text-muted-foreground font-mono'>{q.fileName}</td>
                  <td className='p-4 text-center text-sm'>{q.questions}</td>
                  <td className='p-4'>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                      <status.icon className='h-3 w-3' />
                      {status.label}
                    </span>
                  </td>
                  <td className='p-4 text-sm text-muted-foreground'>{q.uploadedAt}</td>
                  <td className='p-4 text-sm text-muted-foreground'>{q.timeToComplete || '—'}</td>
                  <td className='p-4'>
                    <Button variant='ghost' size='sm'><MoreHorizontal className='h-4 w-4' /></Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      <div className='mt-6 grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card className='p-4'>
          <div className='text-sm text-muted-foreground'>Total processed</div>
          <div className='text-2xl font-bold'>8</div>
        </Card>
        <Card className='p-4'>
          <div className='text-sm text-muted-foreground'>Avg time to complete</div>
          <div className='text-2xl font-bold'>1h 27min</div>
        </Card>
        <Card className='p-4'>
          <div className='text-sm text-muted-foreground'>Avg confidence</div>
          <div className='text-2xl font-bold'>92%</div>
        </Card>
        <Card className='p-4'>
          <div className='text-sm text-muted-foreground'>Time saved</div>
          <div className='text-2xl font-bold'>112 hours</div>
        </Card>
      </div>
    </div>
  );
}
