import { MetadataRoute } from 'next';

const BASE_URL = 'https://secqa-saas-sprint.vercel.app';

const STATIC_ROUTES = [
  '',
  '/pricing',
  '/about',
  '/contact',
  '/customers',
  '/changelog',
  '/trust-center',
  '/security',
  '/demo',
  '/integrations',
  '/blog',
  '/login',
  '/signup',
  '/legal/terms',
  '/legal/privacy',
  '/legal/security',
  '/legal/dpa',
  '/legal/acceptable-use',
  '/legal/responsible-disclosure',
  '/legal/trademark',
  '/compare/secqa-vs-vanta',
  '/compare/secqa-vs-conveyor',
  '/compare/secqa-vs-drata',
  '/compare/secqa-vs-secureframe',
  '/compare/secqa-vs-loopio',
  '/products/security-questionnaire-automation',
  '/products/trust-center',
  '/products/knowledge-management',
];

const INTEGRATION_SLUGS = [
  'slack', 'notion', 'hubspot', 'salesforce', 'linear', 'jira', 'github',
  'vercel', 'aws', 'okta', 'auth0', 'google-workspace', 'datadog', 'sentry',
  'stripe', 'resend', 'postgres', 'snowflake', 'clerk', 'mailchimp'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'daily' : path === '/changelog' ? 'weekly' : 'monthly',
    priority: path === '' ? 1.0 : path === '/pricing' ? 0.9 : path.startsWith('/compare/') ? 0.8 : 0.6,
  }));

  const integrationEntries: MetadataRoute.Sitemap = INTEGRATION_SLUGS.map((slug) => ({
    url: `${BASE_URL}/integrations/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...integrationEntries];
}
