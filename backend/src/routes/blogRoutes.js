'use strict';

const router = require('express').Router();
const ctrl = require('../controllers/blogController');
const { validate } = require('../middleware/validate');
const v = require('../validators');

router.get('/', ctrl.list);
router.get('/:slug', validate({ params: v.slugParam }), ctrl.bySlug);
router.post('/', validate({ body: v.blogBody }), ctrl.create);

module.exports = router;
