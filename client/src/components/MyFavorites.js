
import React from 'react';

function MyFavorites({ recipesThatAreLiked }) {
  return (
    <div className='my-favorites'>
      <h1>My Favorite Recipes</h1>
      {recipesThatAreLiked.map((recipe) => (
        <div>
        <img src={recipe.image} alt={recipe.title} />
        <h2 key={recipe.title}>{recipe.title}</h2>
        <p>{recipe.instructions}</p>
        </div>
      ))}
    </div>
  );
}

export default MyFavorites;
