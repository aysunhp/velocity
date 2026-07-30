import { ok } from '@/lib/server/response';

export function GET() {
  return ok({ status: 'ok', dataSource: 'static' });
}
