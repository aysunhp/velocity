import { faqs } from '@/lib/server/data';
import { ok } from '@/lib/server/response';
import { findAll } from '@/lib/server/store';

export function GET() {
  const { items } = findAll(faqs, { sort: { order: 1 }, limit: 100 });
  return ok(items);
}
