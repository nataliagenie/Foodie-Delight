import React, {useState, useEffect} from 'react';
import {useParams, Link, Route, Routes} from 'react-router-dom';

import { fetchRecipesByIngredient } from '../../ApiServices/apiServices';
import Recipe from '../Recipe/Recipe';

import { RecipeType } from '../../@types/recipe';



interface SearchResultsProps {
  isLoading: boolean;
}




export default function SearchResults({ isLoading }: SearchResultsProps) {

  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const {ingredient} = useParams();

  useEffect(() => {
    async function fetchData() {
      if (!ingredient) { 
        console.error("Ingredient is not defined.");
        return;
      }

      try {
        const data = await fetchRecipesByIngredient(ingredient);
        if (data) {
          setRecipes(data);
        } else {
          setRecipes([]);
        }
      } catch (err) {
        console.error(err);
        setRecipes([]);
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

