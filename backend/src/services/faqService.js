'use strict';

const repos = require('../repositories');

async function list() {
  const r = await repos.faqs.findAll({ sort: { order: 1 }, limit: 100 });
  return r.items;
}

async function create(data) {
  return repos.faqs.create(data);
}

module.exports = { list, create };
