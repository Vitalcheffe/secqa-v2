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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return STATIC_ROUTES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'daily' : path === '/changelog' ? 'weekly' : 'monthly',
    priority: path === '' ? 1.0 : path === '/pricing' ? 0.9 : path.startsWith('/compare/') ? 0.8 : 0.6,
  }));
}
