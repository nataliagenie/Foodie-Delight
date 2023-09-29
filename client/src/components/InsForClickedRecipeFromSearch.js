import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchRecipeDetails } from '../apiServices/apiServices';

function InsForClickedRecipeFromSearch() {
  const { recipeId } = useParams();
  const recipeDetails = useFetchRecipeDetails(recipeId);

  return (
    <div className='InsClickedRecipe'>
      {recipeDetails && (
        <>
          <img src={recipeDetails.image} alt={recipeDetails.title} />
          <h1>{recipeDetails.title}</h1>
          <h2>Instructions:</h2>
          <div className="recipe-steps">
            {recipeDetails.analyzedInstructions[0]?.steps.map((step, index) => (
              <p key={index}>Step {index + 1}: {step.step}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default InsForClickedRecipeFromSearch;
