


function Navbar () {
  
  return (
    <nav className="Navbar"> 
      <div className="button-containter">
        <button className="randomRecipe"> Random Recipe</button>
        <button className="favoriteRecipe">My Favorites</button>
      </div>
      <div className="search-container">
        <input className="input-search" type='text'/>
        <button className="search-button">Search</button>
      </div>
    </nav>
  )
};

export default Navbar;