const express = require('express');
const Product = require('../models/products.js');
const { getProducts } = require('../controllers/products.js');

const router = express.Router({ mergeParams: true });

router.route('/').get(getProducts);
// router.route('/').get(getProduct).post(addProduct);

module.exports = router;
