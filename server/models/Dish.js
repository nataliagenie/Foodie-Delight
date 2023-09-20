'use strict';

const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  title: String,
  image: String,
  summary: String,
  instructions: String,
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;

