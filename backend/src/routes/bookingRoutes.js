'use strict';

const router = require('express').Router();
const ctrl = require('../controllers/bookingController');
const { validate } = require('../middleware/validate');
const v = require('../validators');

router.post('/', validate({ body: v.bookingBody }), ctrl.create);
router.get('/', ctrl.list);
router.get('/:id', validate({ params: v.idParam }), ctrl.byId);
router.put('/:id/status', validate({ params: v.idParam, body: v.bookingStatusBody }), ctrl.updateStatus);

module.exports = router;
