import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, Link, Route, Routes} from 'react-router-dom';

import InsForClickedRecipeFromSearch from './InsForClickedRecipeFromSearch';

function IngredientSearchResults ({isLoading}) {

  const [recipes, setRecipes] = useState([]);
  const {ingredient} = useParams();
  const { recipeId } = useParams();

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
            <Link
                to={`/ingredient/${ingredient}/${recipe.id}`} // Link to the detailed view
                className="recipe-title-link"
              >
                {recipe.title}
              </Link>
          </div>
        ))}
      </div>
    )}
    <Routes>
        <Route
          path="/ingredient/:ingredient/:recipeId"
          element={<InsForClickedRecipeFromSearch />}
        />
      </Routes>
      
    </div>
      
  );
}

export default IngredientSearchResults;