'use strict';

const router = require('express').Router();
const ctrl = require('../controllers/categoryController');
const { validate } = require('../middleware/validate');
const v = require('../validators');

router.get('/', ctrl.list);
router.get('/:slug', validate({ params: v.slugParam }), ctrl.bySlug);
router.post('/', validate({ body: v.categoryBody }), ctrl.create);
router.put('/:id', validate({ params: v.idParam, body: v.categoryBody.partial() }), ctrl.update);
router.delete('/:id', validate({ params: v.idParam }), ctrl.remove);

module.exports = router;
