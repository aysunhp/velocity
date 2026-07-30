import { categories } from '@/lib/server/data';
import { notFound, ok } from '@/lib/server/response';
import { findOne } from '@/lib/server/store';

export function GET(_request: Request, { params }: { params: { slug: string } }) {
  const category = findOne(categories, { slug: params.slug });
  return category ? ok(category) : notFound('Category not found');
}

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}
