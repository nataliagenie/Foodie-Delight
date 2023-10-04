'use strict';

import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema({
  title: String,
  image: String,
  summary: String,
  instructions: String,
  liked: {
    type: Boolean,
    default: false // Initial liked status is set to false
  }
});

const Dish = mongoose.model('Dish', dishSchema);

export default Dish;

