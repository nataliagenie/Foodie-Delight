
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeDetails} from '../../ApiServices/apiServices'
import { RecipeType, Step, Instruction } from '../../@types/recipe';



export default function FavRecipe() {
  const { dishId } = useParams ();
  const [recipeDetails, setRecipeDetails] = useState<RecipeType | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!dishId) { 
        console.error("Dish Id is not defined.");
        return;
      }

      try {
        const data = await fetchRecipeDetails(dishId); 
        console.log(dishId)
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
  }, [dishId]);  


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


