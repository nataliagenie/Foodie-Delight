import axios from 'axios';
import { RecipeType } from '../@types/recipe';

const apiKey = "8b8a651883de41c29977607460e2be7b";

export async function fetchRandomDish(): Promise<RecipeType | null> {
    try {
        const response = await axios.get('http://localhost:4242/random-dish'); 
        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }
  }
  

export async function fetchLikedDishes(): Promise<RecipeType[] | undefined> {
    try {
        const response = await axios.get('http://localhost:4242/my-favorites');
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export async function handleLikeClick(recipe: RecipeType, setLikedRecipes: React.Dispatch<React.SetStateAction<{[key: string]: boolean}>>): Promise<void> {
    try {
        await axios.post(`http://localhost:4242/my-favorites`, recipe);
        setLikedRecipes(prevLikedRecipes => ({
            ...prevLikedRecipes,
            [recipe.title]: !prevLikedRecipes[recipe.title],
        }));
    } catch (err) {
        console.log('Error', err);
    }
}

export async function fetchRecipesByIngredient(ingredient: string): Promise<RecipeType[] | undefined> {
    try {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredient}`
        );
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export async function fetchRecipeDetails(recipeId: number | string ): Promise<RecipeType | undefined> {
    try {
        const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
        const response = await axios.get(apiUrl);
        return response.data;
    } catch(err) {
        console.error(err);
    }
}

export async function removeFromFavorites(dishId: number): Promise<void> {
    try {
        await axios.delete(`http://localhost:4242/my-favorites/${dishId}`);
    } catch (err) {
        console.error(err);
    }
}
