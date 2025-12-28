import { MetadataRoute } from 'next';
import { DATA } from '@/data/resume';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: ['GPTBot', 'CCBot', 'Google-Extended'],
        disallow: '/',
      },
    ],
    sitemap: `${DATA.url}/sitemap.xml`,
  };
}
