import { Card } from '@/components/ui/card';
import { TrendingUp, Clock, CheckCircle2, FileText } from 'lucide-react';

export const metadata = {
  title: 'Analytics — SecQA Dashboard'
};

const METRICS = [
  { label: 'Time Saved (cumulative)', value: '168 hours', trend: '+42h this month', icon: Clock },
  { label: 'Avg Confidence Score', value: '92%', trend: '+5% vs last month', icon: CheckCircle2 },
  { label: 'Questionnaires Processed', value: '12', trend: '+3 this month', icon: FileText },
  { label: 'Engineering $ Saved', value: '$20,160', trend: '+$5,040 this month', icon: TrendingUp }
];

const MONTHLY_DATA = [
  { month: 'Jan', questionnaires: 4, hoursSaved: 56 },
  { month: 'Feb', questionnaires: 6, hoursSaved: 84 },
  { month: 'Mar', questionnaires: 8, hoursSaved: 112 },
  { month: 'Apr', questionnaires: 9, hoursSaved: 126 },
  { month: 'May', questionnaires: 11, hoursSaved: 154 },
  { month: 'Jun', questionnaires: 12, hoursSaved: 168 }
];

const FRAMEWORK_BREAKDOWN = [
  { framework: 'CAIQ', count: 28, percentage: 35 },
  { framework: 'SIG', count: 18, percentage: 22 },
  { framework: 'SOC2', count: 15, percentage: 19 },
  { framework: 'NIST 800-53', count: 12, percentage: 15 },
  { framework: 'Custom', count: 8, percentage: 10 }
];

export default function AnalyticsPage() {
  const maxHours = Math.max(...MONTHLY_DATA.map(d => d.hoursSaved));

  return (
    <div className='flex flex-col p-6'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold'>Analytics</h1>
        <p className='text-sm text-muted-foreground'>Last 6 months performance</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
        {METRICS.map((m) => (
          <Card key={m.label} className='p-5'>
            <m.icon className='h-5 w-5 text-primary mb-2' />
            <div className='text-2xl font-bold'>{m.value}</div>
            <div className='text-xs text-muted-foreground mt-1'>{m.label}</div>
            <div className='text-xs text-primary mt-2'>{m.trend}</div>
          </Card>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card className='p-6'>
          <h2 className='text-lg font-semibold mb-4'>Monthly Questionnaire Volume</h2>
          <div className='space-y-3'>
            {MONTHLY_DATA.map((d) => (
              <div key={d.month} className='flex items-center gap-4'>
                <div className='w-10 text-sm text-muted-foreground'>{d.month}</div>
                <div className='flex-1'>
                  <div className='flex items-center gap-2'>
                    <div className='flex-1 bg-muted rounded h-6 relative overflow-hidden'>
                      <div
                        className='absolute inset-y-0 left-0 bg-primary rounded'
                        style={{ width: `${(d.hoursSaved / maxHours) * 100}%` }}
                      />
                    </div>
                    <span className='text-sm font-medium w-20 text-right'>{d.hoursSaved}h</span>
                  </div>
                  <div className='text-xs text-muted-foreground mt-1'>{d.questionnaires} questionnaires</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className='p-6'>
          <h2 className='text-lg font-semibold mb-4'>Questionnaires by Framework</h2>
          <div className='space-y-4'>
            {FRAMEWORK_BREAKDOWN.map((f) => (
              <div key={f.framework}>
                <div className='flex justify-between text-sm mb-1'>
                  <span className='font-medium'>{f.framework}</span>
                  <span className='text-muted-foreground'>{f.count} ({f.percentage}%)</span>
                </div>
                <div className='bg-muted rounded h-2 overflow-hidden'>
                  <div className='h-full bg-primary rounded' style={{ width: `${f.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className='mt-6 pt-6 border-t'>
            <div className='text-sm text-muted-foreground'>Total questionnaires (6 months)</div>
            <div className='text-2xl font-bold'>81</div>
          </div>
        </Card>
      </div>

      <Card className='p-6 mt-6'>
        <h2 className='text-lg font-semibold mb-4'>ROI Summary</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div>
            <div className='text-sm text-muted-foreground'>Engineering time saved</div>
            <div className='text-2xl font-bold text-primary'>168 hours</div>
            <div className="text-xs text-muted-foreground mt-1">At $120/hr = $20,160</div>
          </div>
          <div>
            <div className='text-sm text-muted-foreground'>SecQA cost (6 months)</div>
            <div className='text-2xl font-bold'>$594</div>
            <div className='text-xs text-muted-foreground mt-1'>$99/mo × 6</div>
          </div>
          <div>
            <div className='text-sm text-muted-foreground'>Net ROI</div>
            <div className='text-2xl font-bold text-primary'>33x</div>
            <div className="text-xs text-muted-foreground mt-1">$19,566 net savings</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
