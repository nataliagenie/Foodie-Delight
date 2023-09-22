

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RandomDish() {
  const [randomRecipe, setRandomRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  

  const generateNewKey = () => {
    const newKey = Math.random() * 0.001;
    return newKey;
  };

  useEffect(() => {
    async function fetchRandomRecipe(newKey) {
      try {
        const apiUrl = 'http://localhost:4242/random-dishes';
        const response = await axios.get(apiUrl);
        setRandomRecipe(response.data);
        setIsLoading(false); // Mark loading as complete
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false); // Mark loading as complete (even on error)
      }
    }
    const newKey = generateNewKey();
    console.log(newKey);
    fetchRandomRecipe(newKey);
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
