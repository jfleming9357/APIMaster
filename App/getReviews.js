const mongoose = require('mongoose');
const connectDB = require('../config/db');
const { modifyReviews } = require('./modifyReviews.js');
const {
  reviewsModel,
  charsMetaModel,
  allRatingsModel
} = require('./models.js');

connectDB('sdc_merged');

module.exports.getReviews = async ({ product_id, page = 1, count = 5, sort = 'relevance'}, callback) => {
  reviewsModel.find({ product_id: product_id }).select().lean()
    .then((arr) => {
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
   })
   .catch((err) => {
      callback(err, null);
   })
};

module.exports.getMeta = function (product_id = '12027', callback) {
  let chars;
  let returnObject;
  Promise.all([
  charsMetaModel.find({ product_id: product_id }).select().lean().exec()
  .then((arr) => {
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
    return chars;
  })
    .catch((err) => {
      return err;
    }), reviewsModel.find({ product_id: product_id }).select().lean().exec()
      .then((arr) => {
        if (arr) {
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
          returnObject = {
            product_id: product_id,
            ratings: ratings,
            recommend: recommend,
            characteristics: chars
          };
          return returnObject;
        }
      })
      .catch((err) => {
        throw err;
      })])
    .then((data) => {
      callback(null, returnObject);
    })
};