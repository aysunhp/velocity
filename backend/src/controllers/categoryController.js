'use strict';

const categoryService = require('../services/categoryService');
const { asyncHandler } = require('../utils/asyncHandler');
const { ok, created, noContent } = require('../utils/ApiResponse');

exports.list = asyncHandler(async (_req, res) => ok(res, await categoryService.list()));

exports.bySlug = asyncHandler(async (req, res) =>
  ok(res, await categoryService.getBySlug(req.params.slug))
);

exports.create = asyncHandler(async (req, res) =>
  created(res, await categoryService.create(req.body))
);

exports.update = asyncHandler(async (req, res) =>
  ok(res, await categoryService.update(req.params.id, req.body))
);

exports.remove = asyncHandler(async (req, res) => {
  await categoryService.remove(req.params.id);
  noContent(res);
});
