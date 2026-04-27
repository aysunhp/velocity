'use strict';

const carService = require('../services/carService');
const { asyncHandler } = require('../utils/asyncHandler');
const { ok, created, noContent } = require('../utils/ApiResponse');

exports.list = asyncHandler(async (req, res) => {
  const { items, ...meta } = await carService.list(req.query);
  ok(res, items, meta);
});

exports.featured = asyncHandler(async (_req, res) => {
  ok(res, await carService.listFeatured());
});

exports.byCategory = asyncHandler(async (req, res) => {
  const { items, ...meta } = await carService.listByCategory(req.params.slug, req.query);
  ok(res, items, meta);
});

exports.bySlug = asyncHandler(async (req, res) => {
  ok(res, await carService.getBySlug(req.params.slug));
});

exports.byId = asyncHandler(async (req, res) => {
  ok(res, await carService.getById(req.params.id));
});

exports.create = asyncHandler(async (req, res) => {
  created(res, await carService.create(req.body));
});

exports.update = asyncHandler(async (req, res) => {
  ok(res, await carService.update(req.params.id, req.body));
});

exports.remove = asyncHandler(async (req, res) => {
  await carService.remove(req.params.id);
  noContent(res);
});
