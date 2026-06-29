import Link from 'next/link';
import { ArrowRight, MessageCircle, FileText, BarChart3, Calendar, Database, Cloud, Lock, Bell, Server } from 'lucide-react';

export const metadata = {
  title: 'Integrations — SecQA connects to your existing workflow',
  description: 'Slack, Notion, HubSpot, Salesforce, GitHub, and 45+ more integrations.'
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
  { icon: MessageCircle, name: 'Slack', desc: 'Get notified when a questionnaire draft is ready for review.', status: 'Available' },
  { icon: FileText, name: 'Notion', desc: 'Auto-create a Notion page with Q&A for collaborative review.', status: 'Available' },
  { icon: BarChart3, name: 'HubSpot', desc: 'Auto-attach questionnaire status to HubSpot deals.', status: 'Pro tier+' },
  { icon: BarChart3, name: 'Salesforce', desc: 'Same as HubSpot but for Salesforce.', status: 'Scale tier' }
];

export default function IntegrationsPage() {
  return (
    <div style={{ background: '#EEEEEE', color: '#222831', fontFamily: 'Inter, sans-serif' }}>
      <nav style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1280px', margin: '0 auto' }}>
        <Link href='/' style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div style={{ width: '36px', height: '36px', background: '#00ADB5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EEEEEE', fontWeight: 800, fontSize: '0.9rem' }}>SQ</div>
          <span style={{ color: '#222831', fontWeight: 700, fontSize: '1.15rem' }}>SecQA</span>
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href='/pricing' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Pricing</Link>
          <Link href='/integrations' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Integrations</Link>
          <Link href='/auth/sign-in' style={{ color: '#222831', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Log In</Link>
          <Link href='/pricing' style={{ background: '#00ADB5', color: '#EEEEEE', padding: '0.55rem 1.2rem', borderRadius: '6px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>Request a Demo</Link>
        </div>
      </nav>

      <section style={{ background: '#222831', color: '#EEEEEE', padding: '5rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1rem' }}>Integrations</h1>
        <p style={{ fontSize: '1.15rem', color: 'rgba(238,238,238,0.7)', maxWidth: '600px', margin: '0 auto' }}>Connect SecQA to your existing security and sales stack. 50+ integrations across 10 categories.</p>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '2rem' }}>Featured integrations</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {FEATURED.map((f) => (
            <div key={f.name} style={{ background: '#393E46', color: '#EEEEEE', borderRadius: '12px', padding: '1.8rem' }}>
              <div style={{ width: '44px', height: '44px', background: '#00ADB5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <f.icon size={20} color='#EEEEEE' />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.5rem' }}>{f.name}</h3>
              <p style={{ fontSize: '0.8rem', color: 'rgba(238,238,238,0.7)', lineHeight: 1.5, marginBottom: '0.8rem' }}>{f.desc}</p>
              <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '999px', background: 'rgba(0,173,181,0.2)', color: '#00ADB5', fontWeight: 600 }}>{f.status}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#222831', color: '#EEEEEE', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '2rem' }}>All integrations by category</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {CATEGORIES.map((cat) => (
              <div key={cat.name} style={{ background: '#393E46', borderRadius: '8px', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 0.8rem' }}>{cat.name}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {cat.integrations.map((int) => (
                    <li key={int} style={{ fontSize: '0.85rem', color: 'rgba(238,238,238,0.7)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ADB5' }}></span>{int}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#222831', color: '#EEEEEE', padding: '3rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>Need a custom integration?</h2>
        <p style={{ color: 'rgba(238,238,238,0.7)', marginBottom: '1.5rem' }}>Scale tier includes custom integration building. 2-week SLA.</p>
        <Link href='/contact' style={{ background: '#00ADB5', color: '#EEEEEE', padding: '0.7rem 1.6rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>Talk to us <ArrowRight size={16} /></Link>
      </section>

      <footer style={{ background: '#222831', padding: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(238,238,238,0.4)' }}>
        © 2026 SecQA. Security questionnaires, answered.
      </footer>
    </div>
  );
}
