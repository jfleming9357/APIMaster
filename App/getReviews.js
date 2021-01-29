const mongoose = require('mongoose');
const { reviewsModel, charsMetaModel, allRatingsModel } = require('./models.js');

mongoose.connect(
  'mongodb://localhost:27017/sdc_merged',
  { useNewUrlParser: true, useUnifiedTopology: true}
)
.then(() => console.log('connected to db'))
.catch((err) => console.log(err));

module.exports.getReviews = function (query, callback) {
  reviewsModel.find({ product_id: query.product_id }, (err, arr) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, arr);
    }
  });
};

module.exports.getMeta = function (product_id, callback) {
  let chars;
  charsMetaModel.find({ product_id: product_id }, (err, arr) => {
    if (err) {
      callback(err, null);
      return;
    } else {
      let char_obj = {};
      for (let x = 0; x < arr.length; x++) {
        let total = 0;
        let numberRatings = 0;
        for (let y = 0; y < arr[x].char_ratings.length; y++) {
          total += arr[x].char_ratings[y].value;
          numberRatings++;
        }
        let average = (total / numberRatings).toFixed(1);
        char_obj[arr[x].name] = {
          id: arr[x].char_ratings[0].characteristic_id,
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
