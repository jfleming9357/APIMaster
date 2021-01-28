const mongoose = require('mongoose');
const asyncHandler = require('../../middleware/asyncHandler.js');
const Product = require('../models/products.js');

mongoose
  .connect('mongodb://localhost:27017/sdc2', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log(`MongoDB Connected`))
  .catch((err) => console.log(err));

// @desc      Get products
// @route     GET /products
// @access    Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  const count = await Product.countDocuments();

  return res.status(200).json({
    success: true,
    count
  });
});

// @desc      Get products
// @route     GET /products/:id
// @access    Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log('ID: ', id);
  if (req.params) {
    const product = await Product.find({ id });

    return res.status(200).json({
      success: true,
      data: product
    });
  }
});
