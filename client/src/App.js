
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import ThreeRandomDishes from './components/ThreeRandomDishes';
import RandomDish from './components/RandomDish';
import IngredientSearchResults from './components/IngredientSearchResults';
import InsForClickedRecipeFromSearch from './components/InsForClickedRecipeFromSearch';
import MyFavorites from './components/MyFavorites';

import { fetchRandomDishes } from './apiServices/apiServices';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [recipesThatAreLiked, setRecipesThatAreLiked] = useState([]); // Add this state

  
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchRandomDishes(); // Use the fetchRandomDishes function
        setRecipes(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    // Load saved favorites from localStorage when the component mounts
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const addToFavorites = (recipe) => {
    // Check if the recipe is already in favorites
    if (!favorites.some((favRecipe) => favRecipe.title === recipe.title)) {
      // Add the recipe to favorites state
      const updatedFavorites = [...favorites, recipe];
      setFavorites(updatedFavorites);

      // Add the recipe to recipesThatAreLiked state
      const updatedRecipesThatAreLiked = [...recipesThatAreLiked, recipe];
      setRecipesThatAreLiked(updatedRecipesThatAreLiked);

      // Save the updated favorites to localStorage
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  return (
    <Router>
      <div className="App">
        <h1>
          <Link to="/">Foodie Delight</Link>
        </h1>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              isLoading ? (
                <p>Loading...</p>
              ) : (
                <ThreeRandomDishes
                  recipes={recipes}
                  favorites={favorites}
                  addToFavorites={addToFavorites}
                  recipesThatAreLiked={recipesThatAreLiked} // Pass recipesThatAreLiked
                />
              )
            }
          />
          <Route path="/random-dish" element={<RandomDish />} />
          <Route
            path="/my-favorites"
            element={<MyFavorites recipesThatAreLiked={recipesThatAreLiked} />} // Pass recipesThatAreLiked
          />
          <Route
            path="/ingredient/:ingredient/*"
            element={<IngredientSearchResults isLoading={false} />}
          />
          <Route
            path="/ingredient/:ingredient/:recipeId"
            element={<InsForClickedRecipeFromSearch />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
