'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Bell, Shield, CreditCard, Globe, LogOut } from 'lucide-react';

const SETTINGS_SECTIONS = [
  {
    icon: User,
    title: 'Profile',
    desc: 'Your name, email, and avatar',
    fields: [
      { label: 'Name', value: 'Amine Harchel Korane', editable: true },
      { label: 'Email', value: 'founder@secqa.example', editable: true },
      { label: 'Role', value: 'Owner', editable: false }
    ]
  },
  {
    icon: Bell,
    title: 'Notifications',
    desc: 'Email and Slack notification preferences',
    fields: [
      { label: 'Questionnaire draft ready', value: 'Email + Slack', editable: true },
      { label: 'Weekly summary', value: 'Email only', editable: true },
      { label: 'Security alerts', value: 'Email + Slack', editable: true }
    ]
  },
  {
    icon: Shield,
    title: 'Security',
    desc: 'Two-factor authentication and sessions',
    fields: [
      { label: 'Two-factor auth', value: 'Enabled (TOTP)', editable: true },
      { label: 'Active sessions', value: '2 sessions', editable: true },
      { label: 'Last login', value: '2026-06-29 01:23 UTC', editable: false }
    ]
  },
  {
    icon: CreditCard,
    title: 'Billing',
    desc: 'Plan, payment method, and invoices',
    fields: [
      { label: 'Current plan', value: 'Pro ($99/mo, founding)', editable: false },
      { label: 'Payment method', value: 'Visa ending 4242', editable: true },
      { label: 'Next invoice', value: '2026-07-29 — $99.00', editable: false }
    ]
  },
  {
    icon: Globe,
    title: 'API & Integrations',
    desc: 'API keys and connected services',
    fields: [
      { label: 'API key', value: 'sk-secqa-••••••••', editable: true },
      { label: 'Slack', value: 'Connected', editable: true },
      { label: 'HubSpot', value: 'Connected', editable: true },
      { label: 'Notion', value: 'Not connected', editable: true }
    ]
  }
];

export default function SettingsPage() {
  return (
    <div className='flex flex-col p-6'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold'>Settings</h1>
        <p className='text-sm text-muted-foreground'>Manage your account, notifications, and integrations</p>
      </div>

      <div className='grid gap-6'>
        {SETTINGS_SECTIONS.map((section) => (
          <Card key={section.title} className='p-6'>
            <div className='flex items-start gap-4'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10'>
                <section.icon className='h-5 w-5 text-primary' />
              </div>
              <div className='flex-1'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-lg font-semibold'>{section.title}</h2>
                  <Button variant='outline' size='sm'>Edit</Button>
                </div>
                <p className='text-sm text-muted-foreground mb-4'>{section.desc}</p>
                <div className='space-y-2'>
                  {section.fields.map((field) => (
                    <div key={field.label} className='flex items-center justify-between py-2 border-b last:border-0'>
                      <span className='text-sm text-muted-foreground'>{field.label}</span>
                      <div className='flex items-center gap-2'>
                        <span className='text-sm font-medium'>{field.value}</span>
                        {field.editable && <Badge variant='outline' className='text-xs'>editable</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}

        <Card className='p-6 border-destructive'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10'>
                <LogOut className='h-5 w-5 text-destructive' />
              </div>
              <div>
                <h2 className='text-lg font-semibold text-destructive'>Sign out</h2>
                <p className='text-sm text-muted-foreground'>Sign out of your SecQA account</p>
              </div>
            </div>
            <Button variant='destructive' size='sm'>Sign out</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
