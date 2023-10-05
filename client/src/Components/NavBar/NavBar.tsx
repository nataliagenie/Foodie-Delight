import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../NavBar/NavBar.css";

function Navbar() {
  const [searchText, setSearchText] = useState<string>("");

  return (
    <nav className="wrapper">
      <div className="nav-container grid-2-col">
        <div className="nav-inner-wrapper">
          <div className="nav-logo">
            <span>Foodie Delight</span>
          </div>
        </div>
        <div className="nav-menu-wrapper">
          <div className="nav-menu">
            <div className="search-container">
              <input
                className="input-search"
                type="text"
                placeholder="Search by ingredient"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Link
                to={
                  searchText.trim() !== "" ? `/ingredient/${searchText}` : "/"
                }
                className="search-button">
                Search
              </Link>
            </div>
            <div className="button-container">
              <Link to={"/random-dish"} className="randomRecipe">
                Random Recipe
              </Link>
            </div>
            <div className="button-container">
              <Link to="/my-favorites" className="favoriteRecipe">
                My Favorites
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
