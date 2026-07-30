import { cars } from '@/lib/server/data';
import { ok } from '@/lib/server/response';
import { findAll } from '@/lib/server/store';

export function GET() {
  const { items } = findAll(cars, {
    filter: { featured: true, available: true },
    sort: { rating: -1 },
    limit: 8,
  });
  return ok(items);
}
