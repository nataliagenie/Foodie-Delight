import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, BrowserRouter, Link } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import ThreeRandomDishes from './components/ThreeRandomDishes';
import RandomDish from './components/RandomDish'
import IngredientSearchResults from './components/IngredientSearchResults';
import InsForClickedRecipeFromSearch from './components/InsForClickedRecipeFromSearch';
 

function App() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  

  useEffect (() => {
    async function fetchRecipes () {
      try {
        const response = await axios.get('http://localhost:4242/random-dishes');
        setRecipes(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    }
    fetchRecipes();
  }, []);

  // Function to add a recipe to favorites
  const addToFavorites = (recipe) => {
    setFavorites([...favorites, recipe]);
  };

  // Function to remove a recipe from favorites
  const removeFromFavorites = (recipeId) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== recipeId);
    setFavorites(updatedFavorites);
  };

 
  return (
   <BrowserRouter>
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
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                favorites={favorites} />
              )
            }
          />
          <Route path="/random-dish" element={<RandomDish />}/>
          <Route path="/ingredient/:ingredient/*" element={<IngredientSearchResults isLoading={false} />} 
          />
          <Route path="/ingredient/:ingredient/:recipeId" element={<InsForClickedRecipeFromSearch/>} />
        </Routes>
     </div>
   </BrowserRouter>
  
  );
}

export default App;
