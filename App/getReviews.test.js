const expect = require('chai').expect;
const { getReviews, getMeta } = require('./getReviews.js');
const assert = require('assert');

describe('gets reviews from the database', function() {
  let query = {product_id : 2};

    it('should return the correct data', function (done) {
      getReviews(query, (err, data) => {
        expect(data.product).to.equal(2);
        expect(data.results).to.exist;
        done();
       });
    });

});

describe('gets review meta data', function() {

    it('should return the correct data', function (done) {
      getMeta(2, (err, data) => {
        expect(data.product_id).to.equal(2);
        expect(data.recommend).to.exist;
        expect(parseInt(data.characteristics.Quality.value)).to.be.a('number');
        done();
       });
    });

});