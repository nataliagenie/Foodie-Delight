import React, { useState, useEffect, FC } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Navbar from './Components/NavBar/NavBar';
import Recipe from './Pages/Recipe/Recipe';
import MyFavorites from './Pages/MyFavorites/MyFavorites';
import SearchResults from './Pages/SearchResults/SearchResults';
import DishGenerator from './Pages/DishGenerator/DishGenerator';
import { fetchRandomDishes } from './ApiServices/apiServices'
import HomePage from './Pages/HomePage/HomePage'; 
import { RecipeType, Instruction } from './@types/recipe';





const App: FC = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]); 
  const [recipesThatAreLiked, setRecipesThatAreLiked] = useState<RecipeType[]>([]);  
  
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchRandomDishes();
        if (data) {
          setRecipes(data);
        } else {
          setRecipes([]);
        }
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setRecipes([]);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  
  

  
  
  
  useEffect(() => {
    const item = localStorage.getItem('favorites');
    const savedFavorites = item ? JSON.parse(item) : [];
    setFavorites(savedFavorites);
  }, []);  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              isLoading ? (
                <p>Loading...</p>
              ) : (
                <HomePage
                  recipes={recipes}
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
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;