import React, {useState} from 'react';
import {Link} from 'react-router-dom';


function Navbar ({ refreshKey, setRefreshKey }) {
  const [searchText, setSearchText] = useState('');

  const generateNewKey = () => {
    setRefreshKey(Date.now()); // Use the current timestamp as a key
  };

  return (
    <nav className="Navbar"> 
      <div className="button-containter">
      <Link to="/random-dish" className="randomRecipe" onClick={generateNewKey}>
          Random Recipe
        </Link>
        <button className="favoriteRecipe">My Favorites</button>
      </div>
      <div className="search-container">
        <input 
        className="input-search" 
        type='text'
        placeholder='Enter an ingredient'
        value = {searchText}
        onChange ={(e) => setSearchText(e.target.value)}
        />
        <Link
          to={searchText.trim() !== '' ? `/ingredient/${searchText}` : '/'}
          className="search-button"
        >
          Search
        </Link>
      </div>
    </nav>
  )
};

export default Navbar;