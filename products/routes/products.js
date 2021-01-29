const express = require('express');
const Product = require('../models/products.js');
const {
  getProducts,
  getProduct,
  getProductStyles,
  getProductRelated
} = require('../controllers/products.js');

const router = express.Router({ mergeParams: true });

router.route('/').get(getProducts);
router.route('/:id').get(getProduct);
router.route('/:id/styles').get(getProductStyles);
router.route('/:id/related').get(getProductRelated);

module.exports = router;
