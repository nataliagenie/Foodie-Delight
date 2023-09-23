import React, {useState} from 'react';
import axios from 'axios';

function ThreeRandomDishes({ recipes , recipesThatAreLiked}) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [likedRecipes, setLikedRecipes] = useState({});
  
  const handleTitleClick = (recipe) => {
    if (selectedRecipe === recipe) {
      setSelectedRecipe(null);
    } else {
      setSelectedRecipe(recipe);
    }
  };


  const handleLikeClick = async (recipe) => {
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
  
  return (

    <div className='recipe-list'>
          {recipes.map((recipe) => (
              <div className='recipe-card' key={recipe.title}>
                <img src={recipe.image} alt={recipe.title} />
                <p
                  className='recipe-title'
                  onClick={() => handleTitleClick(recipe)}
                >
                  {recipe.title}
                </p>
                <button
                  className={`like-button ${likedRecipes[recipe.title] ? 'liked' : 'not-liked'}`}
                  onClick={() => handleLikeClick(recipe)}
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
