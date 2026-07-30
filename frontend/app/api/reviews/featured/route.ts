import { reviews } from '@/lib/server/data';
import { ok } from '@/lib/server/response';
import { findAll } from '@/lib/server/store';

export function GET() {
  const { items } = findAll(reviews, {
    filter: { featured: true },
    sort: { createdAt: -1 },
    limit: 12,
  });
  return ok(items);
}
