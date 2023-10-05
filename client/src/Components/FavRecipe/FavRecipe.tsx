
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchLikedDishRecipe } from '../../ApiServices/apiServices';
import { FavoriteRecipeType } from '../../@types/recipe';




export default function FavRecipe() {
  const { dishId } = useParams ();
  const [recipeDetails, setRecipeDetails] = useState<FavoriteRecipeType | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!dishId) { 
        console.error("Dish Id is not defined.");
        return;
      }

      try {
        const data = await fetchLikedDishRecipe(dishId); 
        console.log(data)
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
          <div className='ingredients'>
              <h3>Ingredients</h3>
              <ul>
                {recipeDetails.extendedIngredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.original}
                  </li>
                ))}
              </ul>
            </div>
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


