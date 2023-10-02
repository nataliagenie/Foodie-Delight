import React, { useState, FC } from 'react';
import { handleLikeClick } from '../../ApiServices/apiServices';
import { RecipeType, Instruction, Step} from '../../@types/recipe';

interface HomePageProps {
  recipes: RecipeType[];
  recipesThatAreLiked: RecipeType[]; 
}

const HomePage: FC<HomePageProps> = ({ recipes, recipesThatAreLiked }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);
  const [likedRecipes, setLikedRecipes] = useState<Record<string, boolean>>({}); 
   const handleTitleClick = (recipe: RecipeType) => {
    if (selectedRecipe === recipe) {
      setSelectedRecipe(null);
    } else {
      setSelectedRecipe(recipe);
    }
  };  const handleLikeClickWrapper = (recipe: RecipeType) => {
    handleLikeClick(recipe, setLikedRecipes);
  };   return (
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
              <ul>
                {recipe.analyzedInstructions.map((instruction, index) => (
                  instruction.steps.map((step, sIndex) => (
                    <li key={sIndex}>
                      Step {step.number}: {step.step}
                    </li>
                  ))
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
export default HomePage;

 {/* <p>{recipe.analyzedInstructions}</p> */}