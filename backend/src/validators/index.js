'use strict';

const { z } = require('zod');

const objectId = z.string().min(1, 'id is required');

const paginationQuery = z.object({
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
  search: z.string().optional(),
});

const carListQuery = paginationQuery.extend({
  category: z.string().optional(),
  brand: z.string().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  transmission: z.enum(['automatic', 'manual']).optional(),
  fuelType: z.enum(['petrol', 'diesel', 'hybrid', 'electric']).optional(),
  year: z.coerce.number().int().optional(),
  sort: z.enum(['price_asc', 'price_desc', 'newest', 'rating']).optional(),
  featured: z
    .union([z.boolean(), z.enum(['true', 'false'])])
    .transform((v) => (typeof v === 'string' ? v === 'true' : v))
    .optional(),
});

const carSpecs = z.object({
  topSpeed: z.number().int().positive(),
  acceleration: z.number().positive(),
  power: z.number().int().positive(),
  seats: z.number().int().min(1).max(9),
  doors: z.number().int().min(2).max(6),
  transmission: z.enum(['automatic', 'manual']),
  fuelType: z.enum(['petrol', 'diesel', 'hybrid', 'electric']),
  engine: z.string().min(1),
  year: z.number().int().min(1950).max(2100),
});

const carBody = z.object({
  slug: z.string().min(1),
  brand: z.string().min(1),
  model: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  categorySlug: z.string().min(1),
  pricePerDay: z.number().min(0),
  currency: z.enum(['USD', 'EUR', 'AZN']).optional(),
  images: z.array(z.string().url()).optional(),
  thumbnail: z.string().url(),
  specs: carSpecs,
  features: z.array(z.string()).optional(),
  description: z.string().optional(),
  available: z.boolean().optional(),
  featured: z.boolean().optional(),
});

const categoryBody = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  icon: z.string().optional(),
  image: z.string().url().optional(),
  order: z.number().int().optional(),
});

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

const bookingStatusBody = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']),
});

const reviewBody = z.object({
  name: z.string().min(2).max(80),
  role: z.string().max(80).optional(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(5).max(1000),
  avatar: z.string().url().optional(),
});

const blogBody = z.object({
  slug: z.string().min(1),
  title: z.string().min(3),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  cover: z.string().url(),
  author: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

const faqBody = z.object({
  question: z.string().min(3),
  answer: z.string().min(3),
  order: z.number().int().optional(),
  category: z.string().optional(),
});

const idParam = z.object({ id: objectId });
const slugParam = z.object({ slug: z.string().min(1) });

module.exports = {
  paginationQuery,
  carListQuery,
  carBody,
  categoryBody,
  bookingBody,
  bookingStatusBody,
  reviewBody,
  blogBody,
  faqBody,
  idParam,
  slugParam,
};
