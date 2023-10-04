'use strict';

const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  title: String,
  image: String,
  summary: String,
  instructions: String,
  // analyzedInstructions:[],
  liked: {
    type: Boolean,
    default: false // Initial liked status is set to false
  }
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;

