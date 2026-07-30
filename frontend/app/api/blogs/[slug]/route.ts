import { blogs } from '@/lib/server/data';
import { notFound, ok } from '@/lib/server/response';
import { findOne } from '@/lib/server/store';

export function GET(_request: Request, { params }: { params: { slug: string } }) {
  const post = findOne(blogs, { slug: params.slug });
  return post ? ok(post) : notFound('Blog post not found');
}

export function generateStaticParams() {
  return blogs.map((post) => ({ slug: post.slug }));
}
