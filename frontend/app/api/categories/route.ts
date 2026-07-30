import { cars, categories } from '@/lib/server/data';
import { ok } from '@/lib/server/response';
import { findAll } from '@/lib/server/store';

export function GET() {
  const counts = cars.reduce<Record<string, number>>((acc, car) => {
    acc[car.categorySlug] = (acc[car.categorySlug] || 0) + 1;
    return acc;
  }, {});

  const { items } = findAll(categories, { sort: { order: 1 }, limit: 100 });
  return ok(items.map((c) => ({ ...c, carCount: counts[c.slug] || 0 })));
}
