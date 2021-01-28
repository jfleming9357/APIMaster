const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review_id: Number,
  rating: Number,
  summary: String,
  recommend: Boolean,
  response: String,
  body: String,
  date: String,
  reviewer_name: String,
  helpfulness: Number,
  photos: [{ id: Number, url: String }],
});

module.exports.reviewsModel = mongoose.model('reviews_and_photos', reviewSchema);