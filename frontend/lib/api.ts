import axios, { AxiosError, AxiosInstance } from 'axios';
import { API_BASE } from './constants';
import type {
  ApiSuccess,
  Booking,
  BlogPost,
  Car,
  CarsQuery,
  Category,
  ContactMessage,
  Faq,
  PaginationMeta,
  Review,
} from '@/types';

/**
 * Single axios instance. All endpoints go through here so swapping the
 * backend host or adding auth becomes a one-line change.
 */
const client: AxiosInstance = axios.create({
  baseURL: `${API_BASE}/api`,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

client.interceptors.response.use(
  (res) => res,
  (err: AxiosError<{ message?: string }>) => {
    const message =
      err.response?.data?.message ||
      err.message ||
      'Network error, please try again.';
    return Promise.reject(new Error(message));
  }
);

async function unwrap<T>(
  promise: Promise<{ data: ApiSuccess<T> }>
): Promise<{ data: T; meta?: PaginationMeta }> {
  const res = await promise;
  return { data: res.data.data, meta: res.data.meta };
}

// ─── Cars ──────────────────────────────────────────────
export const carsApi = {
  list: (query: CarsQuery = {}) =>
    unwrap<Car[]>(client.get('/cars', { params: query })),
  featured: () => unwrap<Car[]>(client.get('/cars/featured')),
  byCategory: (slug: string, query: CarsQuery = {}) =>
    unwrap<Car[]>(client.get(`/cars/category/${slug}`, { params: query })),
  bySlug: (slug: string) => unwrap<Car>(client.get(`/cars/slug/${slug}`)),
  byId: (id: string) => unwrap<Car>(client.get(`/cars/${id}`)),
};

// ─── Categories ────────────────────────────────────────
export const categoriesApi = {
  list: () => unwrap<Category[]>(client.get('/categories')),
  bySlug: (slug: string) => unwrap<Category>(client.get(`/categories/${slug}`)),
};

// ─── Bookings ──────────────────────────────────────────
export const bookingsApi = {
  create: (payload: Omit<Booking, '_id' | 'status' | 'createdAt'>) =>
    unwrap<Booking>(client.post('/bookings', payload)),
  byId: (id: string) => unwrap<Booking>(client.get(`/bookings/${id}`)),
};

// ─── Reviews ───────────────────────────────────────────
export const reviewsApi = {
  list: () => unwrap<Review[]>(client.get('/reviews')),
  featured: () => unwrap<Review[]>(client.get('/reviews/featured')),
  create: (payload: Pick<Review, 'name' | 'role' | 'rating' | 'comment'>) =>
    unwrap<Review>(client.post('/reviews', payload)),
};

// ─── Blog ──────────────────────────────────────────────
export const blogApi = {
  list: (params: { page?: number; limit?: number } = {}) =>
    unwrap<BlogPost[]>(client.get('/blogs', { params })),
  bySlug: (slug: string) => unwrap<BlogPost>(client.get(`/blogs/${slug}`)),
};

// ─── FAQs ──────────────────────────────────────────────
export const faqsApi = {
  list: () => unwrap<Faq[]>(client.get('/faqs')),
};

// ─── Contact ───────────────────────────────────────────
export const contactApi = {
  send: (payload: ContactMessage) =>
    unwrap<{ delivered: true }>(client.post('/contact', payload)),
};

export { client as apiClient };
