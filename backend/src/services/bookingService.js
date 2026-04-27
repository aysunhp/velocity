'use strict';

const repos = require('../repositories');
const { ApiError } = require('../utils/ApiError');
const { sendEmail, bookingEmailTemplate } = require('../utils/sendEmail');

function diffDays(start, end) {
  const ms = new Date(end).getTime() - new Date(start).getTime();
  return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

async function create(data) {
  const car = await repos.cars.findById(data.carId);
  if (!car) throw ApiError.badRequest('Selected car does not exist');
  if (!car.available) throw ApiError.conflict('Selected car is not available');

  const days = diffDays(data.pickupAt, data.returnAt);
  const totalPrice = days * car.pricePerDay;

  const booking = await repos.bookings.create({
    ...data,
    pickupAt: new Date(data.pickupAt).toISOString(),
    returnAt: new Date(data.returnAt).toISOString(),
    status: 'pending',
    totalPrice,
  });

  // Fire-and-forget email; never block the request on transport errors.
  sendEmail(bookingEmailTemplate(booking, car)).catch((err) => {
    // eslint-disable-next-line no-console
    console.error('booking email failed:', err.message);
  });

  return booking;
}

async function list(query) {
  return repos.bookings.findAll({
    filter: query.status ? { status: query.status } : {},
    sort: { createdAt: -1 },
    page: query.page || 1,
    limit: query.limit || 20,
  });
}

async function getById(id) {
  const b = await repos.bookings.findById(id);
  if (!b) throw ApiError.notFound('Booking not found');
  return b;
}

async function updateStatus(id, status) {
  const updated = await repos.bookings.update(id, { status });
  if (!updated) throw ApiError.notFound('Booking not found');
  return updated;
}

module.exports = { create, list, getById, updateStatus };
