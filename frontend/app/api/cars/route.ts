import { ok } from '@/lib/server/response';
import { listCars } from '@/lib/server/store';

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { items, ...meta } = listCars(searchParams);
  return ok(items, meta);
}
