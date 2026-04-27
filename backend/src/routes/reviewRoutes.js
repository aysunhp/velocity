'use strict';

const router = require('express').Router();
const ctrl = require('../controllers/reviewController');
const { validate } = require('../middleware/validate');
const v = require('../validators');

router.get('/', ctrl.list);
router.get('/featured', ctrl.featured);
router.post('/', validate({ body: v.reviewBody }), ctrl.create);

module.exports = router;
