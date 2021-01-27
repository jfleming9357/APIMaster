const express = require('express');
const mongoose = require('mongoose');
const port = 3001;

const app = express();
mongoose.connect(
  'mongodb://localhost:27017',
  { useNewUrlParser: true}
)
.then(() => console.log('connected to db'))
.catch((err) => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello from api');
});


app.listen(port, () => {
  console.log(`listening on ${port}`);
});