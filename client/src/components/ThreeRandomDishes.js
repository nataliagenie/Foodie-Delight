import React, {useState} from 'react';

function ThreeRandomDishes({ recipes }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [likedRecipes, setLikedRecipes] = useState({});

  const handleTitleClick = (recipe) => {
    if (selectedRecipe === recipe) {
      setSelectedRecipe(null);
    } else {
      setSelectedRecipe(recipe);
    }
  };

  const handleLikeClick = (recipe) => {
    // Toggle the liked state for the clicked recipe
    console.log('Like button clicked for', recipe.title);
    setLikedRecipes((prevLikedRecipes) => ({
      ...prevLikedRecipes,
      [recipe.title]: !prevLikedRecipes[recipe.title],
    }));
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
                  className={`like-button ${likedRecipes[recipe.title] ? 'liked' : ''}`}
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
