import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import ThreeRandomDishes from './components/ThreeRandomDishes';
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
   <BrowserRouter>
    <div className="App">
        <h1>Foodie Delight</h1>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              isLoading ? (
                <p>Loading...</p>
              ) : (
                <ThreeRandomDishes recipes={recipes} />
              )
            }
          />
          <Route
            path="/dish/:id" // Define a route parameter for the dish ID
            element={<DishDetail />}
          />
        </Routes>
     </div>
   </BrowserRouter>
  
  );
}

export default App;
