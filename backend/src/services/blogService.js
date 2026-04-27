'use strict';

const repos = require('../repositories');
const { ApiError } = require('../utils/ApiError');

async function list(query = {}) {
  return repos.blogs.findAll({
    sort: { publishedAt: -1 },
    page: query.page || 1,
    limit: query.limit || 12,
    search: query.search,
    searchFields: ['title', 'excerpt', 'content'],
  });
}

async function getBySlug(slug) {
  const post = await repos.blogs.findOne({ slug });
  if (!post) throw ApiError.notFound('Blog post not found');
  return post;
}

async function create(data) {
  const exists = await repos.blogs.findOne({ slug: data.slug });
  if (exists) throw ApiError.conflict('Blog slug already exists');
  return repos.blogs.create({ ...data, publishedAt: new Date().toISOString() });
}

module.exports = { list, getBySlug, create };
