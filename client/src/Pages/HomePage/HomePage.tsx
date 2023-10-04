

 import React, { useEffect, useState, FC } from 'react';
 import { handleLikeClick } from '../../apiServices/apiServices';
 import { RecipeType, HomePageProps } from '../../@types/recipe';
 import '../HomePage/HomePage.css'
 
 const HomePage: FC<HomePageProps> = ({ recipes, recipesThatAreLiked }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);
  const [likedRecipes, setLikedRecipes] = useState<Record<string, boolean>>({}); 
  
  const handleTitleClick = (recipe: RecipeType) => {
    if (selectedRecipe === recipe) {
      setSelectedRecipe(null);
    } else {
      setSelectedRecipe(recipe);
    }
  };  
  
  const handleLikeClickWrapper = (recipe: RecipeType) => {
    handleLikeClick(recipe, setLikedRecipes);
  };   
 
return (
  <div className='recipe-list'>
    {recipes && recipes.map((recipe) => (
      <div className='recipe-card' key={recipe.title} onClick={() => handleTitleClick(recipe)}>
        <img src={recipe.image} alt={recipe.title} />
        <p className='recipe-title' onClick={() => handleTitleClick(recipe)}>
          {recipe.title}
        </p>
        <button
          className={`like-button ${likedRecipes[recipe.title] ? 'liked' : 'not-liked'}`}
          onClick={() => handleLikeClickWrapper(recipe)}
        >
          {likedRecipes[recipe.title] ? 'Liked' : 'Like'}
        </button>
        {selectedRecipe === recipe && (
          <div>
            <div className='ingredients'>
              <h3>Ingredients</h3>
              <ul>
                {recipe.extendedIngredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.original}
                  </li>
                ))}
              </ul>
            </div>
            <div className='recipe-instructions'>
              <h2>Instructions:</h2>
              {recipe.analyzedInstructions && recipe.analyzedInstructions.map((instruction, index) => (
                instruction.steps.map((step, sIndex) => (
                  <p key={sIndex}>
                    Step {step.number}: {step.step}
                  </p>
                ))
              ))}
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
);
}
export default HomePage;
