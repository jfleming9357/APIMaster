const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
let { getReviews, getMeta } = require('./App/getReviews.js');

let dbUrl = 'http://localhost:27017';
let serverUrl = 'http://localhost:8000';

// env vars
dotenv.config({ path: './config/config.env' });

// Routes
const productsRoutes = require('./products/routes/products');
// const reviews = require('./reviews/routes/reviews');

const app = express();

// Morgan dev logging info middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('Hello from api');
});

//reviews endpoints
app.get('/reviews/', (req, res) => {
  getReviews(req.query, (err, data) => {
    if (err) {
      res.status(400).send('error getting data from db');
    } else {
      let obj = {
        product: req.query.product_id,
        page: req.query.page,
        count: req.query.count,
        results: data
      };
      res.send(obj);
    }
  });
});

app.get('/reviews/meta', (req, res) => {
  getMeta(req.query.product_id, (err, data) => {
    if (err) {
      res.status(400).send('error getting metadata from db');
    } else {
      res.send(data);
    }
  });
});

app.post('/reviews', (req, res) => {});

app.put('/reviews/:review_id/helpful', (req, res) => {});

app.put('/reviews/:review_id/report', (req, res) => {});

// Mount routers
app.use('/products', productsRoutes);
// app.use('/reviews', reviews);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`.red);
});
