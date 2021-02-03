const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');

let dbUrl = 'http://localhost:27017';
let serverUrl = 'http://localhost:8000';

let { getReviews, getMeta } = require('./App/getReviews.js');
let { postReview } = require('./App/postReviews.js');
let { addHelpful, addReport } = require('./App/helpfulReport.js');

// env vars
dotenv.config({ path: './config/config.env' });

// Routes
const productsRoutes = require('./products/routes/products');
// const reviews = require('./reviews/routes/reviews');

const app = express();
app.use(bodyParser.json())
// Morgan dev logging info middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('Hello from api!!!!!');
});

//reviews endpoints
app.get('/reviews/', (req, res) => {
  getReviews(req.query, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/reviews/meta', (req, res) => {
  getMeta(req.query.product_id, (err, data) => {
    if (err) {
      res.status(400).send('error getting metadata from db');
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/reviews', (req, res) => {
  let query;
  !req.query.product_id ? query = req.body : query = req.query;
  console.log(query);
  postReview(query, (response) => {
    if (!response) {
      res.status(400).send('error posting to database');
    } else {
      res.status(201).send('201 CREATED');
    }
  });
});

app.put('/reviews/:review_id/helpful', (req, res) => {
  addHelpful(req.params.review_id, (err, data) => {
    if (err) {
      res.status(400).send('error setting helpful')
    } else {
      res.status(204).send('NO CONTENT');
    }
  })
});

app.put('/reviews/:review_id/report', (req, res) => {
addReport(req.params.review_id, (err, data) => {
  if (err) {
    res.status(400).send('error reporting');
  } else {
    res.status(204).send('NO CONTENT');
  }
  })
});

// Mount routers
app.use('/products', productsRoutes);
// app.use('/reviews', reviews);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`.red);
});
