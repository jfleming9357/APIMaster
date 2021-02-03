const mongoose = require('mongoose');
const {
  reviewsModel,
  charsMetaModel,
  allRatingsModel
} = require('./models.js');

module.exports.addHelpful = function (review_id, callback) {
  reviewsModel.updateOne({ review_id: review_id.toString()}, { $inc : { helpfulness : 1 }}, (err, res) => {
    if (err || res.n === 0) {
      callback(true)
    } else {
      callback(false);
    }
  });
}

module.exports.addReport = function (review_id, callback) {
  reviewsModel.updateOne({ review_id: review_id.toString()}, { $inc : { reported: 1 }}, (err, res) => {
    if (err || res.n === 0) {
      callback(true)
    } else {
      callback(false);
    }
  });
}