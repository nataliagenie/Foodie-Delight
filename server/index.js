'use strict';

//imports

const express = require('express');
const router = require('./router.js');
const cors = require('cors');

//instances

const app = express();
const PORT = 4242;

const mongoose = require('./db.js')

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