// Domain types — single source of truth for the frontend.
// Mirror the backend payload shape so swapping mock→real changes nothing here.

export type ID = string;

export type Locale = 'az' | 'en' | 'ru';

export interface ApiSuccess<T> {
  success: true;
  data: T;
  meta?: PaginationMeta;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Category {
  _id: ID;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  image?: string;
  order?: number;
  carCount?: number;
}

export type Transmission = 'automatic' | 'manual';
export type FuelType = 'petrol' | 'diesel' | 'hybrid' | 'electric';

export interface CarSpecs {
  topSpeed: number;       // km/h
  acceleration: number;   // 0-100 sec
  power: number;          // hp
  seats: number;
  doors: number;
  transmission: Transmission;
  fuelType: FuelType;
  engine: string;         // e.g. "4.0L V8"
  year: number;
}

export interface Car {
  _id: ID;
  slug: string;
  brand: string;
  model: string;
  name: string;            // "Mercedes-Benz S-Class"
  category: ID;            // category _id
  categorySlug: string;
  pricePerDay: number;
  currency: 'USD' | 'EUR' | 'AZN';
  images: string[];
  thumbnail: string;
  specs: CarSpecs;
  features: string[];
  description: string;
  available: boolean;
  featured: boolean;
  rating: number;
  reviewsCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Booking {
  _id: ID;
  carId: ID;
  fullName: string;
  email: string;
  phone: string;
  pickupLocation: string;
  returnLocation: string;
  pickupAt: string;        // ISO
  returnAt: string;        // ISO
  message?: string;
  status: BookingStatus;
  totalPrice?: number;
  createdAt?: string;
}

export interface Review {
  _id: ID;
  name: string;
  role?: string;
  avatar?: string;
  rating: number;          // 1..5
  comment: string;
  featured?: boolean;
  createdAt?: string;
}

export interface BlogPost {
  _id: ID;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover: string;
  author: string;
  tags: string[];
  publishedAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Faq {
  _id: ID;
  question: string;
  answer: string;
  order?: number;
  category?: string;
}

export interface CarsQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  transmission?: Transmission;
  fuelType?: FuelType;
  year?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'rating';
  featured?: boolean;
}
