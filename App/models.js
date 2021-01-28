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

const allRatingsSchema = new mongoose.Schema({
  rating: Number,
  recommend: Boolean,
});

const characteristicSchema = new mongoose.Schema({
  id: Number,
  name: String,
  char_ratings: [{
    value: Number,
    characteristic_id: Number
  }]
});

module.exports.charsMetaModel = mongoose.model('chars_and_ratings', characteristicSchema);

// module.exports.allRatingsModel = mongoose.model('reviews_and_photos', allRatingsSchema);