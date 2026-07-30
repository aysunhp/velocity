import { cars } from '@/lib/server/data';
import { notFound, ok } from '@/lib/server/response';
import { findOne } from '@/lib/server/store';

export function GET(_request: Request, { params }: { params: { id: string } }) {
  const car = findOne(cars, { _id: params.id });
  return car ? ok(car) : notFound('Car not found');
}

export function generateStaticParams() {
  return cars.map((car) => ({ id: car._id }));
}
