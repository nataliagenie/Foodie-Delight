
import React, { useState } from 'react';
import { handleLikeClick } from '../../apiServices/apiServices';

export default function HomePage({ recipes, recipesThatAreLiked }){
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [likedRecipes, setLikedRecipes] = useState({});

  const handleTitleClick = (recipe) => {
    console.log("HOLA")

    if (selectedRecipe === recipe) {
      setSelectedRecipe(null);
      console.log("HOLA")

    } else {
      console.log("HOLA")

      setSelectedRecipe(recipe);
    }

  };

  
  const handleLikeClickWrapper = (recipe) => {
    handleLikeClick(recipe, setLikedRecipes);
  };

  return (
    <div className='recipe-list'>
      {recipes && recipes.map((recipe) => (
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


