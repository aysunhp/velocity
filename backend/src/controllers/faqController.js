'use strict';

const faqService = require('../services/faqService');
const { asyncHandler } = require('../utils/asyncHandler');
const { ok, created } = require('../utils/ApiResponse');

exports.list = asyncHandler(async (_req, res) => ok(res, await faqService.list()));

exports.create = asyncHandler(async (req, res) =>
  created(res, await faqService.create(req.body))
);
