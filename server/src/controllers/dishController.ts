/* eslint-disable @typescript-eslint/ban-ts-comment */
/*global process*/
'use strict';
import Dish from '../models/Dish';
import axios from 'axios';
import cheerio from 'cheerio';
import { Request, Response } from "express";
const apiKey = process.env.API_KEY;


//this is for my main page, it should be showing 3 random dishes

const getRandomDish = async (): Promise <any> => {
  const response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`);
  const randomRecipe = response.data.recipes[0];
  return randomRecipe;
};


const extractPlainText = (htmlText: string) => {
  const plainText = cheerio.load(htmlText);
  //@ts-ignore
  return plainText.text();
};

export const getThreeRandomDishes = async (req: Request, res: Response ) => {
  try {
    const numberOfRecipes = 3;
    const recipePromises:any = [];

    for (let i = 0; i < numberOfRecipes; i++) {
      recipePromises.push(getRandomDish() as Promise <any>);
    }

    const responses = await Promise.all(recipePromises);
    const randomDishes = responses.map((randomRecipe) => {
      const { title, image, summary, instructions } = randomRecipe;
      return {
        title,
        image,
        summary: extractPlainText(summary),
        instructions: extractPlainText(instructions),
      };
    });

    res.status(200).json(randomDishes);
  } catch (err) {
    console.log('Error', err);
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

