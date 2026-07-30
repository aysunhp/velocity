/**
 * In-memory query layer — a port of `backend/src/repositories/MockRepository.js`
 * plus the filter/sort building that used to live in the backend services.
 *
 * Keeping the same filter grammar ($in/$gte/$lte/$gt/$lt, dotted paths) means
 * the route handlers under `app/api` stay a thin translation of the Express
 * controllers they replace.
 */

import type { Car, CarsQuery, PaginationMeta } from '@/types';
import { cars } from './data';

type Primitive = string | number | boolean | null | undefined;

type RangeFilter = {
  $in?: Primitive[];
  $gte?: number;
  $lte?: number;
  $gt?: number;
  $lt?: number;
};

export type Filter = Record<string, Primitive | Primitive[] | RangeFilter>;

export type Sort = Record<string, 1 | -1>;

export interface FindAllOptions<T> {
  filter?: Filter;
  sort?: Sort;
  page?: number | string;
  limit?: number | string;
  search?: string;
  searchFields?: (keyof T & string)[];
}

export interface Page<T> extends PaginationMeta {
  items: T[];
}

function readPath(item: unknown, key: string): unknown {
  if (!key.includes('.')) return (item as Record<string, unknown>)?.[key];
  return key
    .split('.')
    .reduce<unknown>((acc, k) => (acc == null ? undefined : (acc as Record<string, unknown>)[k]), item);
}

function isRangeFilter(value: unknown): value is RangeFilter {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function matches(item: unknown, filter: Filter = {}): boolean {
  return Object.entries(filter).every(([key, value]) => {
    if (value === undefined || value === null || value === '') return true;
    const v = readPath(item, key);

    if (Array.isArray(value)) return value.includes(v as Primitive);

    if (isRangeFilter(value)) {
      if (value.$in) return value.$in.includes(v as Primitive);
      const n = v as number;
      if (value.$gte !== undefined && !(n >= value.$gte)) return false;
      if (value.$lte !== undefined && !(n <= value.$lte)) return false;
      if (value.$gt !== undefined && !(n > value.$gt)) return false;
      if (value.$lt !== undefined && !(n < value.$lt)) return false;
      return true;
    }

    return v === value;
  });
}

export function findAll<T>(source: T[], options: FindAllOptions<T> = {}): Page<T> {
  const { filter = {}, sort, search, searchFields = [] } = options;

  let result = source.filter((it) => matches(it, filter));

  if (search && searchFields.length) {
    const q = String(search).toLowerCase();
    result = result.filter((it) =>
      searchFields.some((f) =>
        String((it as Record<string, unknown>)[f] ?? '').toLowerCase().includes(q)
      )
    );
  }

  if (sort) {
    const entries = Object.entries(sort);
    result = [...result].sort((a, b) => {
      for (const [key, dir] of entries) {
        const av = readPath(a, key) as Primitive;
        const bv = readPath(b, key) as Primitive;
        if (av === bv) continue;
        const cmp = (av as number) > (bv as number) ? 1 : -1;
        return dir === -1 ? -cmp : cmp;
      }
      return 0;
    });
  }

  const total = result.length;
  const page = Math.max(1, Number(options.page) || 1);
  const limit = Math.max(1, Math.min(100, Number(options.limit) || 12));
  const start = (page - 1) * limit;

  return {
    items: result.slice(start, start + limit),
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

export function findOne<T>(source: T[], filter: Filter): T | undefined {
  return source.find((it) => matches(it, filter));
}

// ─── Car query building (was backend/src/services/carService.js) ────────────

const SORT_MAP: Record<string, Sort> = {
  price_asc: { pricePerDay: 1 },
  price_desc: { pricePerDay: -1 },
  newest: { createdAt: -1 },
  rating: { rating: -1 },
};

/** Translates a `?category=&minPrice=…` search string into findAll options. */
export function buildCarQuery(params: URLSearchParams): FindAllOptions<Car> {
  const get = (k: keyof CarsQuery) => params.get(k) ?? undefined;

  const filter: Filter = {};
  if (get('category')) filter.categorySlug = get('category');
  if (get('brand')) filter.brand = get('brand');
  if (get('transmission')) filter['specs.transmission'] = get('transmission');
  if (get('fuelType')) filter['specs.fuelType'] = get('fuelType');
  if (get('year')) filter['specs.year'] = Number(get('year'));
  if (get('featured')) filter.featured = get('featured') === 'true';

  const minPrice = get('minPrice');
  const maxPrice = get('maxPrice');
  if (minPrice || maxPrice) {
    const range: RangeFilter = {};
    if (minPrice) range.$gte = Number(minPrice);
    if (maxPrice) range.$lte = Number(maxPrice);
    filter.pricePerDay = range;
  }

  const sortKey = get('sort');

  return {
    filter,
    sort: (sortKey && SORT_MAP[sortKey]) || { createdAt: -1 },
    page: get('page'),
    limit: get('limit'),
    search: get('search'),
    searchFields: ['name', 'brand', 'model', 'description'],
  };
}

export function listCars(params: URLSearchParams): Page<Car> {
  return findAll(cars, buildCarQuery(params));
}
