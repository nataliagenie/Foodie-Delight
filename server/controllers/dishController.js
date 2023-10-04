'use strict';
// require('dotenv').config();
// import 'dotenv/config'

const Dish = require('../models/Dish');
const axios = require('axios');
const cheerio = require('cheerio');
// const apiKey = "21f51898cd7a4d489d4f9c3aac1b93fc";
const apiKey = "8b8a651883de41c29977607460e2be7b";

exports.getRandomDish = async (req, res) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`);
    const randomRecipe = response.data.recipes[0];
    const {title, image, summary, instructions, analyzedInstructions, extendedIngredients} = randomRecipe;
    const $ = cheerio.load(summary);
    const plainTextSummary = $.text();
    const ins = cheerio.load(instructions);
    const plainTextInstructions = ins.text();

    const dish = {
      title,
      image,
      summary: plainTextSummary,
      instructions: plainTextInstructions,
      analyzedInstructions,
      extendedIngredients
    };
    res.status(200).json(dish);
  } catch (err) {
    console.log('Error', err);
    res.status(500).send('Internal Server Error');
  }
}


exports.saveLikedDish = async (req, res) => {
  try {
    const dishData = req.body;

    const existingDish = await Dish.findOne(dishData);

    if (existingDish) {
      return res.status(400).json({ message: 'Dish already liked' });
    }

    const newDish = new Dish({ ...dishData, liked: true });

    await newDish.save();

    res.status(200).json({ message: 'Dish liked and saved successfully' });

  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
}



exports.getLikedDishes = async (req, res) => {
  try {
 
    const likedDishes = await Dish.find({ liked: true });

    if (likedDishes.length === 0) {
      return res.status(404).json({ message: 'No liked dishes found' });
    }

    res.status(200).json(likedDishes);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
}

exports.getLikedDishById = async (req, res) => {
  try {
    const dishId = req.params.dishId;
    const dish = await Dish.findById(dishId);

    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }

    res.status(200).json(dish);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.deleteLikedDish = async (req, res) => {
  try {
    const dishId = req.params.dishId;

    const deletedDish = await Dish.findByIdAndRemove(dishId);

    if (!deletedDish) {
      return res.status(404).json({ message: 'Dish not found' });
    }

    res.status(200).json({ message: 'Dish deleted successfully' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Not able to delete the dish');
  }
}

