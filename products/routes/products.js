const express = require('express');
const Product = require('../models/products.js');
const { getProducts, getProduct } = require('../controllers/products.js');

const router = express.Router({ mergeParams: true });

router.route('/').get(getProducts);
router.route('/:id').get(getProduct);
// router.route('/').get(getProduct).post(addProduct);

module.exports = router;
