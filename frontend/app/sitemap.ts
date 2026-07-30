import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';
import { cars } from '@/lib/server/data';

const STATIC_PATHS: { path: string; priority: number; changeFrequency: 'monthly' | 'weekly' | 'daily' }[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/cars', priority: 0.9, changeFrequency: 'daily' },
  { path: '/services', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, '');
  const now = new Date();

  return [
    ...STATIC_PATHS.map((s) => ({
      url: `${base}${s.path}`,
      lastModified: now,
      changeFrequency: s.changeFrequency,
      priority: s.priority,
    })),
    // Read straight from the data module — no HTTP hop, so car URLs are always
    // in the sitemap rather than silently dropped when a fetch fails.
    ...cars.map((car) => ({
      url: `${base}/cars/${car.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
