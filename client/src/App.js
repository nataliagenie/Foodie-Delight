import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import DishDetail from './components/DishDetails';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
   
      <div className="App">
        <h1>Foodie Delight</h1>
        <Navbar />
        {isLoading ? (
          <p>Loading...</p>
          ) : (
          <div className='recipe-list'>
          { recipes.map((recipe) => (
            <div className='recipe-card'>
              <img src={recipe.image} alt={recipe.title} />
              <p>{recipe.title}</p>
            </div>
          ))}
          </div>
          )}
      </div>
   
   
  );
}

export default App;
