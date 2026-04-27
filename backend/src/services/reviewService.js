'use strict';

const repos = require('../repositories');

async function list(query = {}) {
  return repos.reviews.findAll({
    sort: { createdAt: -1 },
    page: query.page || 1,
    limit: query.limit || 20,
  });
}

async function listFeatured() {
  const r = await repos.reviews.findAll({
    filter: { featured: true },
    sort: { createdAt: -1 },
    limit: 12,
  });
  return r.items;
}

async function create(data) {
  return repos.reviews.create({ ...data, featured: false });
}

module.exports = { list, listFeatured, create };
