import React, { useState, useEffect, FC } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Navbar from './Components/NavBar/NavBar';
import FavRecipe from './Components/FavRecipe/FavRecipe'
import Recipe from './Pages/Recipe/Recipe';
import MyFavorites from './Pages/MyFavorites/MyFavorites';
import SearchResults from './Pages/SearchResults/SearchResults';
import DishGenerator from './Pages/DishGenerator/DishGenerator';
import { fetchRandomDish } from './apiServices/apiServices'
import HomePage from './Pages/HomePage/HomePage'; 
import { RecipeType, Instruction, HomePageProps } from './@types/recipe';

const App: FC = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]); 
  const [recipesThatAreLiked, setRecipesThatAreLiked] = useState<RecipeType[]>([]);  


useEffect(() => {
  const fetchRandomRecipes = async (num: number) => {
    try {
      setIsLoading(true);
      const promises = Array(num).fill(null).map(() => fetchRandomDish());
      const recipes = await Promise.all(promises);
      setRecipes(recipes.filter(r => r !== null) as RecipeType[]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); 
    }
  };

  fetchRandomRecipes(3);
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
          <Route
            path="/my-favorites/:dishId"
            element={<FavRecipe />}
          />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
