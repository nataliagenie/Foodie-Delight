
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import './App.css';
import NavBar from './Components/NavBar/NavBar';
import HomePage from './Pages/HomePage/HomePage';
import DishGenerator from './Pages/DishGenerator/DishGenerator';
import SearchResults from './Pages/SearchResults/SearchResults';
import Recipe from './Pages/Recipe/Recipe';
import MyFavorites from './Pages/MyFavorites/MyFavorites';

import { fetchRandomDishes } from './apiServices/apiServices';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [recipesThatAreLiked, setRecipesThatAreLiked] = useState([]); 

  
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchRandomDishes(); 
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
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);


  return (
    <Router>
      <div className="App">
        <h1>
          <Link to="/">Foodie Delight</Link>
        </h1>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              isLoading ? (
                <p>Loading...</p>
              ) : (
                <HomePage
                  recipes={recipes}
                  favorites={favorites}
                  recipesThatAreLiked={recipesThatAreLiked} 
                />
              )
            }
          />
          <Route path="/random-dish" element={<DishGenerator />} />
          <Route
            path="/my-favorites"
            element={<MyFavorites recipesThatAreLiked={recipesThatAreLiked} />} 
          />
          <Route
            path="/ingredient/:ingredient/*"
            element={<SearchResults isLoading={false} />}
          />
          <Route
            path="/ingredient/:ingredient/:recipeId"
            element={<Recipe />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
