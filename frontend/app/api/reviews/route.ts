import { reviews } from '@/lib/server/data';
import { ok } from '@/lib/server/response';
import { findAll } from '@/lib/server/store';

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { items, ...meta } = findAll(reviews, {
    sort: { createdAt: -1 },
    page: searchParams.get('page') ?? undefined,
    limit: searchParams.get('limit') ?? 20,
  });
  return ok(items, meta);
}
