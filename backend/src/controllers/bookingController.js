'use strict';

const bookingService = require('../services/bookingService');
const { asyncHandler } = require('../utils/asyncHandler');
const { ok, created } = require('../utils/ApiResponse');

exports.create = asyncHandler(async (req, res) =>
  created(res, await bookingService.create(req.body))
);

exports.list = asyncHandler(async (req, res) => {
  const { items, ...meta } = await bookingService.list(req.query);
  ok(res, items, meta);
});

exports.byId = asyncHandler(async (req, res) =>
  ok(res, await bookingService.getById(req.params.id))
);

exports.updateStatus = asyncHandler(async (req, res) =>
  ok(res, await bookingService.updateStatus(req.params.id, req.body.status))
);
