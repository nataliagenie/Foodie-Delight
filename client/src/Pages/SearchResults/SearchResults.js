import React, {useState, useEffect} from 'react';
import {useParams, Link, Route, Routes} from 'react-router-dom';

import Recipe from '../Recipe/Recipe';
import { fetchRecipesByIngredient } from '../../apiServices/apiServices';

export default function SearchResults ({isLoading}) {

  const [recipes, setRecipes] = useState([]);
  const {ingredient} = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchRecipesByIngredient(ingredient); 
        setRecipes(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [ingredient]);

  return (
   
    <div className='search-results'>
    <h2>Recipes containing {ingredient}:</h2>
    {isLoading ? (
      <p>Loading...</p>
    ) : (
      <div className="recipe-list-from-search">
        {recipes.map((recipe) => (
          <div className="recipe-card-from search" key={recipe.id}>
            <img src={recipe.image} alt={recipe.title} />
            <Link
                to={`/ingredient/${ingredient}/${recipe.id}`} 
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
          element={<Recipe />}
        />
      </Routes>
      
    </div>
      
  );
}

