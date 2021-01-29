var mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review_id: String,
  rating:{
    type: String,
    required: [true, 'Please add a rating to your review']
  },
  summary: String,
  recommend: {
    type: Boolean,
    required: [true, 'Please select an option for product recommendation']
  },
  response: String,
  body: {
    type: String,
    required: [true, 'Please add a body to your review']
  },
  date: String,
  reviewer_name: {
    type: String,
    required: [true, 'Please add a name to your review']
  },
  reviewer_email: {
    type: String,
    required: [true, 'Please add an email to your review']
  },
  helpfulness: Number,
  photos: [{ id: Number, url: String }],
  product_id: String
});

module.exports.reviewsModel = mongoose.model('reviews_and_photos', reviewSchema);

const characteristicSchema = new mongoose.Schema({
  id: String,
  name: String,
  product_id: String,
  char_ratings: [{
    value: String,
    characteristic_id: String
  }]
});

module.exports.charsMetaModel = mongoose.model('chars_and_ratings', characteristicSchema);