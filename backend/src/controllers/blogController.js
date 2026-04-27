'use strict';

const blogService = require('../services/blogService');
const { asyncHandler } = require('../utils/asyncHandler');
const { ok, created } = require('../utils/ApiResponse');

exports.list = asyncHandler(async (req, res) => {
  const { items, ...meta } = await blogService.list(req.query);
  ok(res, items, meta);
});

exports.bySlug = asyncHandler(async (req, res) =>
  ok(res, await blogService.getBySlug(req.params.slug))
);

exports.create = asyncHandler(async (req, res) =>
  created(res, await blogService.create(req.body))
);
