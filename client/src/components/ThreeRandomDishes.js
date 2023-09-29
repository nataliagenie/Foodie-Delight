
import React, { useState } from 'react';
import { handleLikeClick , useFetchRandomDishes  } from '../apiServices/apiServices';

function ThreeRandomDishes({ recipesThatAreLiked }){
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [likedRecipes, setLikedRecipes] = useState({});
  const [isLoading, recipes] = useFetchRandomDishes();

  const handleTitleClick = (recipe) => {
    if (selectedRecipe === recipe) {
      setSelectedRecipe(null);
    } else {
      setSelectedRecipe(recipe);
    }
  };

  const handleLikeClickWrapper = (recipe) => {
    handleLikeClick(recipe, setLikedRecipes);
  };

  if(isLoading) {
    return (<p>loading ...</p>)
  }

  return (
    <div className='recipe-list'>
       { recipes && recipes.map((recipe) => (
        <div className='recipe-card' key={recipe.title}>
          <img src={recipe.image} alt={recipe.title} />
          <p className='recipe-title' onClick={() => handleTitleClick(recipe)}>
            {recipe.title}
          </p>
          <button
            className={`like-button ${
              likedRecipes[recipe.title] ? 'liked' : 'not-liked'
            }`}
            onClick={() => handleLikeClickWrapper(recipe)}
          >
            {likedRecipes[recipe.title] ? 'Liked' : 'Like'}
          </button>
          {selectedRecipe === recipe && (
            <div className='recipe-instructions'>
              <h2>Instructions:</h2>
              <p>{recipe.instructions}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ThreeRandomDishes;

