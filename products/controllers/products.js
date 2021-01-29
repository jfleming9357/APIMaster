const mongoose = require('mongoose');
const connectDB = require('../../config/db');
const db = mongoose.connection;
const asyncHandler = require('../../middleware/asyncHandler.js');
const Product = require('../models/products.js');

// connectDB('sdc2');

// @desc      Get products
// @route     GET /products
// @access    Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const count = parseInt(req.query.count, 10) || 5;
  const startIndex = (page - 1) * count;
  const endIndex = page * count;
  const total = await Product.countDocuments();

  const products = await Product.find({ id: { $gte: startIndex } }).limit(
    count
  );

  products.forEach(
    (product) =>
      (product.related = product.related.map((related_id) =>
        Number(related_id)
      ))
  );

  return res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

// @desc      Get products
// @route     GET /products/:product_id
// @access    Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (req.params) {
    const product = await Product.find({ id });

    return res.status(200).json({
      success: true,
      data: product
    });
  }
});

// @desc      Get product styles
// @route     GET /products/:product_id/styles
// @access    Public
exports.getProductStyles = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (req.params) {
    const product = await Product.find({ id });

    return res.status(200).json({
      success: true,
      data: product[0].styles
    });
  }
});

// @desc      Get product related items
// @route     GET /products/:product_id/related
// @access    Public
exports.getProductRelated = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (req.params) {
    let product = await db
      .collection('products')
      .find({ id })
      .project({ related: 1 })
      .toArray();

    product[0].related = product[0].related.map((related_id) =>
      Number(related_id)
    );

    return res.status(200).json({
      success: true,
      data: product
    });
  }
});
