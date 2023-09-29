import axios from 'axios';
import { useEffect , useState } from 'react';


export const useFetchRandomDishes = () => {
    const [randomRecipe, setRandomRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:4242/random-dishes').then(response => {
            setRandomRecipe(response.data);
            setIsLoading(false);
        }).catch(e => {
            setIsLoading(false);
            console.log(e)
        });
    }, []);

    return [isLoading, randomRecipe]
}
export async function handleLikeClick (recipe, setLikedRecipes) {
  try {
    await axios.post(`http://localhost:4242/likedDishes`, recipe);
    setLikedRecipes((prevLikedRecipes) => ({
      ...prevLikedRecipes,
      [recipe.title]: !prevLikedRecipes[recipe.title],
    }));
  } catch (err) {
    console.log('Error', err);
  }

};


export function useFetchRecipesByIngredient(ingredient) {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(
            `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_API_KEY}&ingredients=${ingredient}`
        ).then(response => {
            setRecipes(response.data);
            setLoading(false);
        }).catch(e => {
            console.log(e);
            setLoading(false);
        });
    }, [ingredient]);

    return [isLoading, recipes];
}

export const useFetchRecipeDetails = (recipeId) => {
    const [recipeDetails, setRecipeDetails] = useState(null);
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.REACT_APP_API_KEY}`;
    axios.get(apiUrl).then(response => setRecipeDetails(response.data));
    return recipeDetails;
}

export const useLikedDishes = () => {
    const [likedDishes, setLikedDishes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4242/likedDishes')
            .then((response) => {
                setLikedDishes(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const removeFavorite = (dishId) => {
        return axios.delete(`http://localhost:4242/likedDishes/${dishId}`).then(() => {
            setLikedDishes((prevDishes) => prevDishes.filter((dish) => dish._id !== dishId));
        });
    }

    return [likedDishes, removeFavorite];
}
