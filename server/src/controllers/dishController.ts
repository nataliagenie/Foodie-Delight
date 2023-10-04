/* eslint-disable @typescript-eslint/ban-ts-comment */
/*global process*/
'use strict';
import Dish from '../models/Dish';
import axios from 'axios';
import cheerio from 'cheerio';
import { Request, Response } from "express";


const apiKey = process.env.API_KEY;

const extractPlainText = (htmlText: string) => {
  const loadedCheerio = cheerio.load(htmlText);
  return loadedCheerio('*').text();
};

export const getRandomDish = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`);
    const randomRecipe = response.data.recipes[0];
    const {
      title,
      image,
      summary,
      instructions,
      analyzedInstructions,
      extendedIngredients,
    } = randomRecipe;

    const plainTextSummary = extractPlainText(summary);
    const plainTextInstructions = extractPlainText(instructions);

    const dish = {
      title,
      image,
      summary: plainTextSummary,
      instructions: plainTextInstructions,
      analyzedInstructions,
      extendedIngredients,
    };
    
    res.status(200).json(dish);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
};


export const saveLikedDish = async (req: Request, res: Response) => {
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



export const getLikedDishes = async (req: Request, res: Response) => {
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

export const getLikedDishById = async (req: Request, res: Response) => {
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

 export const deleteLikedDish = async (req: Request, res: Response) => {
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
