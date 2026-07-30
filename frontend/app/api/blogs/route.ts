import { blogs } from '@/lib/server/data';
import { ok } from '@/lib/server/response';
import { findAll } from '@/lib/server/store';

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { items, ...meta } = findAll(blogs, {
    sort: { publishedAt: -1 },
    page: searchParams.get('page') ?? undefined,
    limit: searchParams.get('limit') ?? undefined,
    search: searchParams.get('search') ?? undefined,
    searchFields: ['title', 'excerpt', 'content'],
  });
  return ok(items, meta);
}
