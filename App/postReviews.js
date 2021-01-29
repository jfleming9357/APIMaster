const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { reviewsModel, charsMetaModel } = require('./models.js');

module.exports.postReview = function (query, callback) {
  let count;
  reviewsModel.find().count((err, res) => {
    count = parseInt(res);
    console.log(count);


  if (!query.photos) {
    query.photos = [];
  }
  let photos = [];
  let photoArray = query.photos;
  photoArray = photoArray.replace(/'/g, '"');
  photoArray = JSON.parse(photoArray);
  for (let x = 0; x < photoArray.length; x++) {
    photos.push({
      id: x,
      url: photoArray[x]
    })
  }
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
    reported: 0
  }, (err, res) => {
    // console.log(err);
    // console.log('added to reviews with review_id of ', count + 1);
    // console.log(res);
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
    console.log(existing);
    console.log(count);
    query.characteristics = query.characteristics.replace(/'/g, '"');
    query.characteristics = JSON.parse(query.characteristics);
    let chars = [];
    let x = count + 1;
    for (let key in query.characteristics) {
      key = parseInt(key);
      let obj = {};
      obj.review_id = count + 1;
      count++;
      obj.value = query.characteristics[key];
      for (let x = 0; x < existing.length; x++) {
        console.log(existing[x].id);
        if (key === existing[x].id) {
          console.log('added');
          existing[x].char_ratings.push(obj);
          found = true;
          charsMetaModel.replaceOne({"id": existing[x].id.toString()}, existing[x], null, (err, res) => {
            console.log(err);
            console.log(res);
          });
        }
      }
    }
  })

}