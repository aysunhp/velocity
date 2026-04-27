'use strict';

const repos = require('../repositories');
const { ApiError } = require('../utils/ApiError');

const SORT_MAP = {
  price_asc: { pricePerDay: 1 },
  price_desc: { pricePerDay: -1 },
  newest: { createdAt: -1 },
  rating: { rating: -1 },
};

function buildQuery(query = {}) {
  const filter = {};
  if (query.category) filter.categorySlug = query.category;
  if (query.brand) filter.brand = query.brand;
  if (query.transmission) filter['specs.transmission'] = query.transmission;
  if (query.fuelType) filter['specs.fuelType'] = query.fuelType;
  if (query.year) filter['specs.year'] = Number(query.year);
  if (typeof query.featured === 'boolean') filter.featured = query.featured;

  if (query.minPrice !== undefined && query.minPrice !== '') {
    filter.pricePerDay = filter.pricePerDay || {};
    filter.pricePerDay.$gte = Number(query.minPrice);
  }
  if (query.maxPrice !== undefined && query.maxPrice !== '') {
    filter.pricePerDay = filter.pricePerDay || {};
    filter.pricePerDay.$lte = Number(query.maxPrice);
  }

  return {
    filter,
    sort: SORT_MAP[query.sort] || { createdAt: -1 },
    page: query.page || 1,
    limit: query.limit || 12,
    search: query.search,
    searchFields: ['name', 'brand', 'model', 'description'],
  };
}

async function list(query) {
  return repos.cars.findAll(buildQuery(query));
}

async function listFeatured() {
  const r = await repos.cars.findAll({
    filter: { featured: true, available: true },
    sort: { rating: -1 },
    limit: 8,
  });
  return r.items;
}

async function listByCategory(slug, query = {}) {
  return repos.cars.findAll(buildQuery({ ...query, category: slug }));
}

async function getBySlug(slug) {
  const car = await repos.cars.findOne({ slug });
  if (!car) throw ApiError.notFound('Car not found');
  return car;
}

async function getById(id) {
  const car = await repos.cars.findById(id);
  if (!car) throw ApiError.notFound('Car not found');
  return car;
}

async function create(data) {
  const exists = await repos.cars.findOne({ slug: data.slug });
  if (exists) throw ApiError.conflict('Car slug already exists');
  return repos.cars.create(data);
}

async function update(id, patch) {
  const updated = await repos.cars.update(id, patch);
  if (!updated) throw ApiError.notFound('Car not found');
  return updated;
}

async function remove(id) {
  const ok = await repos.cars.remove(id);
  if (!ok) throw ApiError.notFound('Car not found');
}

module.exports = { list, listFeatured, listByCategory, getBySlug, getById, create, update, remove };
