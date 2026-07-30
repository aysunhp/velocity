import { categories } from '@/lib/server/data';
import { ok } from '@/lib/server/response';
import { listCars } from '@/lib/server/store';

export function GET(request: Request, { params }: { params: { slug: string } }) {
  const { searchParams } = new URL(request.url);
  searchParams.set('category', params.slug);
  const { items, ...meta } = listCars(searchParams);
  return ok(items, meta);
}

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}
