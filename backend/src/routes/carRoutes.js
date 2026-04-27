'use strict';

const router = require('express').Router();
const ctrl = require('../controllers/carController');
const { validate } = require('../middleware/validate');
const v = require('../validators');

router.get('/', validate({ query: v.carListQuery }), ctrl.list);
router.get('/featured', ctrl.featured);
router.get('/category/:slug', validate({ params: v.slugParam, query: v.carListQuery }), ctrl.byCategory);
router.get('/slug/:slug', validate({ params: v.slugParam }), ctrl.bySlug);
router.get('/:id', validate({ params: v.idParam }), ctrl.byId);
router.post('/', validate({ body: v.carBody }), ctrl.create);
router.put('/:id', validate({ params: v.idParam, body: v.carBody.partial() }), ctrl.update);
router.delete('/:id', validate({ params: v.idParam }), ctrl.remove);

module.exports = router;
