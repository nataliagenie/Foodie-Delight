import React, { useState, useEffect } from 'react';
import { fetchRandomDish, handleLikeClick } from '../../ApiServices/apiServices';
import { RecipeType } from '../../@types/recipe';


export default function DishGenerator() {
    const [randomRecipe, setRandomRecipe] = useState<RecipeType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [likedRecipes, setLikedRecipes] = useState<Record<string, boolean>>({}); 
    
  
    const handleLikeClickWrapper = (recipe: RecipeType) => {
      handleLikeClick(recipe, setLikedRecipes);
    };   
   

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchRandomDish();
                setRandomRecipe(data); 
                setIsLoading(false);
                console.log(data)
            } catch (error) {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <h2>Random Recipe</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                randomRecipe && (
                    <div>
                        <h3>{randomRecipe.title}</h3>
                        <img src={randomRecipe.image} alt={randomRecipe.title} />
                        <div className='ingredients'>
                            <h3>Ingredients</h3>
                            <ul>
                              {randomRecipe.extendedIngredients.map((ingredient, index) => (
                                <li key={index}>
                                  {ingredient.original}
                                </li>
                              ))}
                            </ul>
                        </div>
                        <div className="recipe-steps">
                        <h3>Instructions</h3>
                            {randomRecipe.analyzedInstructions[0]?.steps.map((step, index) => (
                                <p key={index}>Step {index + 1}: {step.step}</p>
                            ))}
                        </div>
                        <button
                          className={`like-button ${
                            likedRecipes[randomRecipe.title] ? 'liked' : 'not-liked'
                          }`}
                          onClick={() => handleLikeClickWrapper(randomRecipe)}
                        >
                          {likedRecipes[randomRecipe.title] ? 'Liked' : 'Like'}
                        </button>
                    </div>
                )
            )}
        </div>
    );
}
