'use strict';

const repos = require('../repositories');
const { ApiError } = require('../utils/ApiError');

async function list() {
  const r = await repos.categories.findAll({ sort: { order: 1 }, limit: 100 });
  // Decorate with car counts (cheap on mock; for mongo this could become an aggregate)
  const cars = await repos.cars.findAll({ limit: 1000 });
  const counts = cars.items.reduce((acc, c) => {
    acc[c.categorySlug] = (acc[c.categorySlug] || 0) + 1;
    return acc;
  }, {});
  return r.items.map((c) => ({ ...c, carCount: counts[c.slug] || 0 }));
}

async function getBySlug(slug) {
  const cat = await repos.categories.findOne({ slug });
  if (!cat) throw ApiError.notFound('Category not found');
  return cat;
}

async function create(data) {
  const exists = await repos.categories.findOne({ slug: data.slug });
  if (exists) throw ApiError.conflict('Category slug already exists');
  return repos.categories.create(data);
}

async function update(id, patch) {
  const updated = await repos.categories.update(id, patch);
  if (!updated) throw ApiError.notFound('Category not found');
  return updated;
}

async function remove(id) {
  const ok = await repos.categories.remove(id);
  if (!ok) throw ApiError.notFound('Category not found');
}

module.exports = { list, getBySlug, create, update, remove };
