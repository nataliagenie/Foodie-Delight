

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../Images/Logo.jpeg"
import '../NavBar/NavBar.css'


export default function Navbar() {
  const [searchText, setSearchText] = useState('');

  
  return (
    <nav className="Navbar">
       <div className="Header">
      <Link to="/">
        <img className="Logo" src={Logo} alt="logo" width={400} height={350} />
      </Link>
    </div>
      <div className="button-container">
        <Link to={'/random-dish'} className="randomRecipe" reloadDocument >
          Random Recipe
        </Link>
        <Link to="/my-favorites" className="favoriteRecipe">
          My Favorites
        </Link>
      </div>
      <div className="search-container">
        <input
          className="input-search"
          type="text"
          placeholder="Enter an ingredient"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Link
          to={searchText.trim() !== '' ? `/ingredient/${searchText}` : '/'}
          className="search-button"
        >
          Search
        </Link>
      </div>
    </nav>
  );
}


