const mongoose = require('mongoose');
const { reviewsModel } = require('./models.js');

mongoose.connect(
  'mongodb://localhost:27017/sdc_merged',
  { useNewUrlParser: true, useUnifiedTopology: true}
)
.then(() => console.log('connected to db'))
.catch((err) => console.log(err));



module.exports.getReviews = function (product_id, page, count, sort,callback) {
  reviewsModel.find({"product_id": product_id}, (err, arr) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, arr);
    }
  });
}