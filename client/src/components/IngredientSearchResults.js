import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

function IngredientSearchResults ({isLoading}) {

  const [recipes, setRecipes] = useState([]);
  const {ingredient} = useParams();

  useEffect(() => {
    async function fetchRecipesByIngredient () {
      try {
        const apiKey = 'b81e42a35a164c749f93dae5d78f08b6';
        const response = await axios.get (`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredient}`
        );
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchRecipesByIngredient();
  }, [ingredient]);

  return (
    <div className='search-results'>
    <h2>Recipes containing {ingredient}:</h2>
    {isLoading ? (
      <p>Loading...</p>
    ) : (
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <img src={recipe.image} alt={recipe.title} />
            <p>{recipe.title}</p>
            <p>{recipe.instructions}</p>
          </div>
        ))}
      </div>
    )}
  </div>

  );
}

export default IngredientSearchResults;