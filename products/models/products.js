const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    trim: true,
    required: [true, 'Please add a name for the product'],
    maxlength: 60
  },
  slogan: {
    type: String,
    required: [true, 'Please add a slogan for the product'],
    maxlength: 60
  },
  description: {
    type: String,
    required: [true, 'Please add a description for the product']
  },
  category: {
    type: String,
    required: [true, 'Please add a category for the product'],
    maxlength: 60
  },
  default_price: {
    type: String,
    default: '1'
  },
  features: [
    {
      id: String,
      productId: String,
      feature: String,
      value: String
    }
  ],
  related: [],
  styles: [
    {
      id: String,
      productId: String,
      name: String,
      sale_price: String,
      original_price: String,
      default_style: String,
      photos: [
        {
          id: String,
          styleId: String,
          url: String,
          thumbnail_url: String
        }
      ],
      skus: [
        {
          id: String,
          styleId: String,
          size: String,
          quantity: String
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Product', ProductSchema);
