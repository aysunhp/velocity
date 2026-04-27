import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';
import { carsApi } from '@/lib/api';

const STATIC_PATHS: { path: string; priority: number; changeFrequency: 'monthly' | 'weekly' | 'daily' }[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/cars', priority: 0.9, changeFrequency: 'daily' },
  { path: '/services', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url.replace(/\/$/, '');
  const now = new Date();

  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((s) => ({
    url: `${base}${s.path}`,
    lastModified: now,
    changeFrequency: s.changeFrequency,
    priority: s.priority,
  }));

  // Best-effort dynamic entries — never crash the build if API is offline.
  try {
    const cars = await carsApi.list({ limit: 100 });
    for (const car of cars.data) {
      entries.push({
        url: `${base}/cars/${car.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  } catch (err) {
    console.warn('[sitemap] cars fetch failed:', (err as Error).message);
  }

  return entries;
}
