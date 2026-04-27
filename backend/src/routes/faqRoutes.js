'use strict';

const router = require('express').Router();
const ctrl = require('../controllers/faqController');
const { validate } = require('../middleware/validate');
const v = require('../validators');

router.get('/', ctrl.list);
router.post('/', validate({ body: v.faqBody }), ctrl.create);

module.exports = router;
