import React, { useState, useEffect } from 'react';
import { fetchRandomDishes } from '../apiServices/apiServices'; 

function RandomDish() {
  const [randomRecipe, setRandomRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchRandomDishes(); 
        setRandomRecipe(data);
        setIsLoading(false); 
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
            <h3>{randomRecipe[0].title}</h3>
            <img src={randomRecipe[0].image} alt={randomRecipe[0].title} />
            <p>{randomRecipe[0].instructions}</p>
          </div>
        )
      )}
    </div>
  );
}

export default RandomDish;
