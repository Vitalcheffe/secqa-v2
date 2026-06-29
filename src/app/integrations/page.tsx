import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageCircle, FileText, BarChart3, Calendar, Mail, Database, Cloud, Lock, Bell, Server } from 'lucide-react';

export const metadata = {
  title: 'Integrations — SecQA connects to your existing workflow',
  description: 'Slack, Notion, HubSpot, Salesforce, GitHub, and 45+ more integrations. Connect SecQA to your existing security and sales stack.'
};

const CATEGORIES = [
  { name: 'Communication', integrations: ['Slack', 'Microsoft Teams', 'Discord', 'Zoom'] },
  { name: 'Documentation', integrations: ['Notion', 'Confluence', 'Google Docs', 'GitHub Wiki'] },
  { name: 'CRM', integrations: ['HubSpot', 'Salesforce', 'Pipedrive', 'Attio'] },
  { name: 'Project Management', integrations: ['Linear', 'Jira', 'Asana', 'ClickUp'] },
  { name: 'Code', integrations: ['GitHub', 'GitLab', 'Bitbucket', 'Vercel'] },
  { name: 'Cloud', integrations: ['AWS', 'GCP', 'Azure', 'Cloudflare'] },
  { name: 'Auth', integrations: ['Okta', 'Auth0', 'Azure AD', 'Google Workspace'] },
  { name: 'Monitoring', integrations: ['Datadog', 'Sentry', 'PagerDuty', 'Grafana'] },
  { name: 'Data', integrations: ['Snowflake', 'BigQuery', 'Postgres', 'Redshift'] },
  { name: 'Email', integrations: ['Resend', 'SendGrid', 'Mailchimp', 'Postmark'] }
];

const FEATURED = [
  { icon: MessageCircle, name: 'Slack', desc: 'Get notified when a questionnaire draft is ready for review. Approve or request changes directly from Slack.', status: 'Available' },
  { icon: FileText, name: 'Notion', desc: 'Auto-create a Notion page with Q&A for collaborative review. Sync answers back to your knowledge base.', status: 'Available' },
  { icon: BarChart3, name: 'HubSpot', desc: 'Auto-attach questionnaire status to HubSpot deals. Sales managers see response time as a deal-stage gate.', status: 'Pro tier+' },
  { icon: BarChart3, name: 'Salesforce', desc: 'Same as HubSpot but for Salesforce. Available on Scale tier only.', status: 'Scale tier' }
];

export default function IntegrationsPage() {
  return (
    <div className='flex flex-col'>
      <section className='border-b'>
        <div className='container mx-auto max-w-7xl px-4 py-16 text-center'>
          <h1 className='text-4xl font-bold tracking-tight'>Integrations</h1>
          <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>Connect SecQA to your existing security and sales stack. 50+ integrations across 10 categories.</p>
        </div>
      </section>

      <section className='border-b'>
        <div className='container mx-auto max-w-7xl px-4 py-16'>
          <h2 className='text-2xl font-bold mb-8'>Featured integrations</h2>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {FEATURED.map((f) => (
              <div key={f.name} className='rounded-lg border p-6'>
                <f.icon className='h-8 w-8 text-primary' />
                <h3 className='mt-4 font-semibold'>{f.name}</h3>
                <p className='mt-2 text-sm text-muted-foreground'>{f.desc}</p>
                <div className='mt-3'><span className='text-xs px-2 py-1 rounded-full bg-primary/10 text-primary'>{f.status}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='border-b bg-muted/30'>
        <div className='container mx-auto max-w-7xl px-4 py-16'>
          <h2 className='text-2xl font-bold mb-8'>All integrations by category</h2>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {CATEGORIES.map((cat) => (
              <div key={cat.name} className='rounded-lg border bg-background p-6'>
                <h3 className='font-semibold mb-3'>{cat.name}</h3>
                <ul className='space-y-2'>
                  {cat.integrations.map((int) => (
                    <li key={int} className='text-sm text-muted-foreground flex items-center gap-2'><span className='h-1.5 w-1.5 rounded-full bg-primary' />{int}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className='container mx-auto max-w-4xl px-4 py-16 text-center'>
          <h2 className='text-2xl font-bold mb-4'>Need a custom integration?</h2>
          <p className='text-muted-foreground mb-6'>Scale tier includes custom integration building for your stack. 2-week SLA.</p>
          <Button asChild><Link href='/contact'>Talk to us</Link></Button>
        </div>
      </section>
    </div>
  );
}
