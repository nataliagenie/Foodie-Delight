

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeDetails } from '../../ApiServices/apiServices';

import { RecipeType, Step, Instruction } from '../../@types/recipe';



export default function Recipe() {
  const { recipeId } = useParams ();
  const [recipeDetails, setRecipeDetails] = useState<RecipeType | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!recipeId) { 
        console.error("Recipe Id is not defined.");
        return;
      }

      console.log("hola",recipeId)
      try {
        const data = await fetchRecipeDetails(Number(recipeId)); 
        if (data) {
          setRecipeDetails(data);
        } else {
          setRecipeDetails(null);
        }
      } catch (err) {
        console.error(err);
        setRecipeDetails(null);
      }
    }
    fetchData();
  }, [recipeId]);  


  return (
    <div className='Recipe'>
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


