const express = require('express');

const Product = require('../models/Product');

const router = express.Router({ mergeParams: true });

router.route('/').get(getProduct);
// router.route('/').get(getProduct).post(addProduct);

module.exports = router;
