'use strict';

//imports

const express = require('express');
const mongoose = require('mongoose');
const router = require('./router.js');
const cors = require('cors');

//instances

const app = express();

const PORT = 4242;
const DB_URL = 'mongodb://localhost:27017/FoodieDelights';

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('open', function (ref) {
  console.log('Connected to mongo server.');

  mongoose.connection.db.listCollections().toArray(function (err,names) {
    console.log(names);
  })
})

app.use(cors());
app.use(express.json());

app.use('/', router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
})