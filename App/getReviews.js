const mongoose = require('mongoose');
const connectDB = require('../config/db');
const { modifyReviews } = require('./modifyReviews.js');
const {
  reviewsModel,
  charsMetaModel,
  allRatingsModel
} = require('./models.js');

connectDB('sdc_merged');

module.exports.getReviews = function ({ product_id, page = 1, count = 5, sort = 'relevance'}, callback) {
  reviewsModel.find({ product_id: product_id }, (err, arr) => {
    if (err) {
      callback(true, null);
    } else {
      arr = modifyReviews(arr, page, count, sort);
      let nonreported = [];
      for (let x = 0; x < arr.length; x++) {
        if (!arr[x].reported) {
          nonreported.push(arr[x]);
        }
      }
      let obj = {
        product: product_id,
        page: page,
        count: count,
        results: nonreported
      };
      callback(null, obj);
    }
  });
};

module.exports.getMeta = function (product_id, callback) {
  let chars;
  charsMetaModel.find({ product_id: product_id }, (err, arr) => {
    if (err || arr.length === 0) {
      callback(true, null);
      return;
    } else {
      let char_obj = {};
      for (let x = 0; x < arr.length; x++) {
        let total = 0;
        let numberRatings = 0;
        for (let y = 0; y < arr[x].char_ratings.length; y++) {
          total += parseInt(arr[x].char_ratings[y].value);
          numberRatings++;
        }
        if (numberRatings === 0) {
          numberRatings = 1;
        }
        let average = (total / numberRatings).toFixed(1);
        let id;
        if (arr[x].char_ratings.length) {
          id = arr[x].char_ratings[0].characteristic_id
        } else {
          id = '';
        }
        char_obj[arr[x].name] = {
          id: id,
          value: average
        };
      }
      chars = char_obj;
      reviewsModel.find({ product_id: product_id }, (err, arr) => {
        if (err) {
          callback(err);
          return;
        } else {
          let ratings = {};
          let recommend = {
            0: 0,
            1: 0
          };
          for (let x = 0; x < arr.length; x++) {
            let currRating = arr[x].rating;
            ratings[currRating]
              ? ratings[currRating]++
              : (ratings[currRating] = 1);
            arr[x].recommend ? recommend[1]++ : recommend[0]++;
          }
          let returnObject = {
            product_id: product_id,
            ratings: ratings,
            recommend: recommend,
            characteristics: chars
          };
          callback(null, returnObject);
        }
      });
    }
  });
};
