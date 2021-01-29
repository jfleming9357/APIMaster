const mongoose = require('mongoose');
const {
  reviewsModel,
  charsMetaModel,
  allRatingsModel
} = require('./models.js');

module.exports.addHelpful = function (review_id, callback) {
  reviewsModel.update({ review_id: review_id.toString()}, { $inc : { helpfulness : 1 }}, (err, res) => {
    if (err) {
      console.log(err);
      callback(true)
    } else {
      console.log(res);
      callback(false);
    }
  });
}

module.exports.addReport = function (review_id, callback) {
  reviewsModel.update({ review_id: review_id.toString()}, { $inc : { reported: 1 }}, (err, res) => {
    if (err) {
      callback(true)
    } else {
      console.log(res);
      callback(false);
    }
  });
}