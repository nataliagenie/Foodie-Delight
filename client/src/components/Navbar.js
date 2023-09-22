// import React, {useState} from 'react';
// import {Link} from 'react-router-dom';


// function Navbar () {
//   const [searchText, setSearchText] = useState('');
  
  
//   const getNewRecipeOnClick = () => {
//     window.location.reload();
//   };

//   return (
//     <nav className="Navbar"> 
//       <div className="button-containter">
//         <Link to="/random-dish" className="randomRecipe" onClick={getNewRecipeOnClick}>
//           Random Recipe
//         </Link>
//         <Link to="/my-favorites" className="favoriteRecipe">
//           My Favorites
//         </Link>
//       </div>
//       <div className="search-container">
//         <input 
//         className="input-search" 
//         type='text'
//         placeholder='Enter an ingredient'
//         value = {searchText}
//         onChange ={(e) => setSearchText(e.target.value)}
//         />
//         <Link
//           to={searchText.trim() !== '' ? `/ingredient/${searchText}` : '/'}
//           className="search-button"
//         >
//           Search
//         </Link>
//       </div>
//     </nav>
//   )
// };

// export default Navbar;



import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [searchText, setSearchText] = useState('');
  // const [refreshKey, setRefreshKey] = useState(0);
  // const generateNewKey = () => {
  //   const newKey = Math.random() * 0.001;
  //   return newKey;
  // };
  return (
    <nav className="Navbar">
      <div className="button-container">
        <Link to={'/random-dish/'} className="randomRecipe" reloadDocument >
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

export default Navbar;
