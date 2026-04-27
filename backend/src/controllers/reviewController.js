'use strict';

const reviewService = require('../services/reviewService');
const { asyncHandler } = require('../utils/asyncHandler');
const { ok, created } = require('../utils/ApiResponse');

exports.list = asyncHandler(async (req, res) => {
  const { items, ...meta } = await reviewService.list(req.query);
  ok(res, items, meta);
});

exports.featured = asyncHandler(async (_req, res) =>
  ok(res, await reviewService.listFeatured())
);

exports.create = asyncHandler(async (req, res) =>
  created(res, await reviewService.create(req.body))
);
