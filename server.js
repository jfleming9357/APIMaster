let express = require('express');
let app = express();
let { getReviews, getMeta } = require('./App/reviews.js');

let dbUrl = 'http://localhost:27017';
let serverUrl = 'http://localhost:8000';

//product endpoints





//reviews endpoints

app.get('/reviews/', (req, res) => {
  let page, count, sort, product_id;
  page = req.query.page || 1;
  count = req.query.count || 5;
  sort = req.query.sort;
  product_id = req.query.product_id;
  getReviews(product_id, page, count, sort, (err, data) => {
    if (err) {
      res.status(400).send('error getting data from db')
    } else {
      let obj = {
        product: product_id,
        page: page,
        count: count,
        results: data
      }
      res.send(obj);
    }

  })
})

app.get('/reviews/meta', (req, res) => {
  getMeta(req.query.product_id, (err, data) => {
    if (err) {
      res.status(400).send('error getting metadata from db');
    } else {
      res.send(data);
    }
  })
})

app.post('/reviews', (req, res) => {

})

app.put('/reviews/:review_id/helpful', (req, res) => {

})

app.put('/reviews/:review_id/report', (req, res) => {

})




app.listen(3000, () => {
  console.log(`listening on ${3000}`);
})