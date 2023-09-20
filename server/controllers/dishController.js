'use strict';

const Dish = require('../models/Dish');
const axios = require('axios');
const cheerio = require('cheerio');
const apiKey = 'b81e42a35a164c749f93dae5d78f08b6';

//for the Random Dish button
exports.getARandomDish = async (req,res) => {
  try {
    const recipeResponse = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`);
    const randomRecipe = recipeResponse.data.recipes[0];
    const {title, image, summary, instructions} = randomRecipe;
    const $ = cheerio.load(summary);
    const plainTextSummary = $.text();
    const ins = cheerio.load(instructions);
    const plainTextInstructions = ins.text();

    const randomDish = {
      title,
      image,
      summary: plainTextSummary,
      instructions: plainTextInstructions,
    }
    res.status(200).json(randomDish);
  } catch (err) {
    console.log('Error', err);
    res.status(500).send('Internal Server Error');
  }
};

//this is for my main page, it should be showing 3 random dishes
exports.getThreeRandomDishes = async (req, res) => {
  try {
    const numberOfRecipes = 3;
    const recipePromises = [];

    for ( let i =0; i < numberOfRecipes; i++) {
      recipePromises.push(
        axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`)
      )
    }

    const responses = await Promise.all(recipePromises);
    const randomDishes = [];

    responses.forEach((response) => {
      const randomRecipe = response.data.recipes[0];
      const {title, image, summary, instructions} = randomRecipe;
      const $ = cheerio.load(summary);
      const plainTextSummary = $.text();
      const ins = cheerio.load(instructions);
      const plainTextInstructions = ins.text();

      randomDishes.push({
        title,
        image,
        summary: plainTextSummary,
        instructions: plainTextInstructions,
      })
    });
    res.status(200).json(randomDishes);
  } catch (err) {
    console.log('Error', err);
    res.status(500).send('Internal Server Error');
  }
}