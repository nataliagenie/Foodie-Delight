
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function InsForClickedRecipeFromSearch() {
  const { recipeId } = useParams();
  const apiKey = 'b81e42a35a164c749f93dae5d78f08b6';

  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    async function fetchRecipeDetails() {
      try {
        const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
        const response = await axios.get(apiUrl);

        setRecipeDetails(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchRecipeDetails();
  }, [recipeId, apiKey]);

  return (
    <div>
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
