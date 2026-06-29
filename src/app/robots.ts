import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/auth/'],
      },
    ],
    sitemap: 'https://secqa-saas-sprint.vercel.app/sitemap.xml',
    host: 'https://secqa-saas-sprint.vercel.app',
  };
}
