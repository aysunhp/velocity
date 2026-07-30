import { cars } from '@/lib/server/data';
import { notFound, ok } from '@/lib/server/response';
import { findOne } from '@/lib/server/store';

export function GET(_request: Request, { params }: { params: { slug: string } }) {
  const car = findOne(cars, { slug: params.slug });
  return car ? ok(car) : notFound('Car not found');
}

/** Pre-renders every car detail page's data at build time. */
export function generateStaticParams() {
  return cars.map((car) => ({ slug: car.slug }));
}
