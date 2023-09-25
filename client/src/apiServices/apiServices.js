import axios from 'axios';

export async function fetchRandomDishes() {
  try {
    const response = await axios.get('http://localhost:4242/random-dishes');
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchRecipeDetails(recipeId, apiKey) {
  try {
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (err) {
    console.error('Error:', err);
  }
}

export async function handleLikeClick (recipe, setLikedRecipes) {
  try {
    // Make a POST request to like the recipe
    await axios.post(`http://localhost:4242/likedDishes`, recipe);
    setLikedRecipes((prevLikedRecipes) => ({
      ...prevLikedRecipes,
      [recipe.title]: !prevLikedRecipes[recipe.title],
    }));
  } catch (err) {
    console.log('Error', err);
  }

};