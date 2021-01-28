const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');

// env vars
dotenv.config({ path: './config/config.env' });

// Routes
const products = require('./products/routes/products');
// const reviews = require('./reviews/routes/reviews');

// Morgan dev logging info middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const app = express();

mongoose
  .connect('mongodb://localhost:27017', { useNewUrlParser: true })
  .then(() => console.log('connected to db'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello from api');
});

// Mount routers
app.use('/products', products);
// app.use('/reviews', reviews);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`.red);
});
