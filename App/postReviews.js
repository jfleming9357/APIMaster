const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { reviewsModel, charsMetaModel } = require('./models.js');

module.exports.postReview = function (query, callback) {
  let count;
  if (!query.product_id || !query.rating || !query.summary || !query.recommend || !query.name || !query.email || !query.characteristics) {
    callback(false);
    return;
  }
  reviewsModel.find().count((err, res) => {
    count = parseInt(res);
  if (!query.photos) {
    query.photos = [];
  }
  let photos = [];
  let photoArray = query.photos;
  // photoArray = photoArray.replace(/'/g, '"');
  // photoArray = JSON.parse(photoArray);
  for (let x = 0; x < photoArray.length; x++) {
    photos.push({
      id: x,
      url: photoArray[x]
    })
  }

  let date = new Date().toISOString();

  reviewsModel.create({
    review_id: (count + 1).toString(),
    product_id: query.product_id.toString(),
    rating: query.rating.toString(),
    summary: query.summary,
    body: query.body,
    recommend: query.recommend,
    reviewer_name: query.name,
    reviewer_email: query.email,
    photos: photos,
    helpfulness: 0,
    reported: 0,
    date: date
  }, (err, res) => {
    if (err) {
      callback(false);
    } else {
      callback(true);
    }

  });
});

  let charCount;
  charsMetaModel.find().count((err, res) => {
    charCount = res;
  });

  let existing;
  charsMetaModel.find({
    product_id: query.product_id

  }, (err, data) => {
    existing = data;
    let insert = [];
    let chars = [];

    // query.characteristics = query.characteristics.replace(/'/g, '"');
    // query.characteristics = JSON.parse(query.characteristics);

    for (let key in query.characteristics) {
      key = parseInt(key);
      let obj = {};
      obj.review_id = count + 1;
      count++;
      obj.value = query.characteristics[key];
      for (let x = 0; x < existing.length; x++) {
        if (key.toString() === existing[x].id) {
          existing[x].char_ratings.push(obj);
          found = true;
          let newId = JSON.stringify(existing[x].id);
          charsMetaModel.replaceOne({ id: existing[x].id}, existing[x]);
        }
      }
    }
  })

}