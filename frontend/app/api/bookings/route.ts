import { z } from 'zod';
import { cars } from '@/lib/server/data';
import { created, fail } from '@/lib/server/response';
import { findOne } from '@/lib/server/store';

// Ported from `backend/src/validators/index.js` (bookingBody).
const bookingBody = z
  .object({
    carId: z.string().min(1),
    fullName: z.string().min(2).max(80),
    email: z.string().email(),
    phone: z.string().min(6).max(30),
    pickupLocation: z.string().min(2),
    returnLocation: z.string().min(2),
    pickupAt: z.coerce.date(),
    returnAt: z.coerce.date(),
    message: z.string().max(1000).optional(),
  })
  .refine((d) => d.returnAt > d.pickupAt, {
    message: 'returnAt must be after pickupAt',
    path: ['returnAt'],
  });

function diffDays(start: Date, end: Date) {
  const ms = end.getTime() - start.getTime();
  return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return fail(400, 'Invalid JSON body');
  }

  const parsed = bookingBody.safeParse(payload);
  if (!parsed.success) {
    return fail(422, 'Validation failed', parsed.error.flatten().fieldErrors);
  }

  const data = parsed.data;
  const car = findOne(cars, { _id: data.carId });
  if (!car) return fail(400, 'Selected car does not exist');
  if (!car.available) return fail(409, 'Selected car is not available');

  const booking = {
    _id: crypto.randomUUID(),
    ...data,
    pickupAt: data.pickupAt.toISOString(),
    returnAt: data.returnAt.toISOString(),
    status: 'pending' as const,
    totalPrice: diffDays(data.pickupAt, data.returnAt) * car.pricePerDay,
    createdAt: new Date().toISOString(),
  };

  // No datastore on this deployment — the request is logged so it shows up in
  // the hosting provider's function logs. Wire up a mailer or DB here to
  // persist/notify (see `backend/src/services/bookingService.js`).
  console.log('[booking]', JSON.stringify({ ...booking, car: car.name }));

  return created(booking);
}
