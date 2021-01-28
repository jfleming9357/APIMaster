const asyncHandler = require('../middleware/async');
const Product = require('../products/models/product');

const db = async () => {
  const conn = await mongoose.connect('mongodb://localhost:27017/sdc2', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

// @desc      Get products
// @route     GET /products
// @route     GET /products/:product_id
// @access    Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  if (req.params.productId) {
    const products = await Product.find({ productId: req.params.productId });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } else {
    const products = await Product.find();

    res
      .status(200)
      .json({ success: true, count: products.length, data: products });
  }
});
