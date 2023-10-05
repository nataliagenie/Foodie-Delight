import React, { useEffect, useState, FC } from "react";
import { handleLikeClick } from "../../apiServices/apiServices";
import { RecipeType, HomePageProps } from "../../@types/recipe";
import "../HomePage/HomePage.css";
import HeaderImage from "../../Images/Dish3.png";

const HomePage: FC<HomePageProps> = ({ recipes, recipesThatAreLiked }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);
  const [likedRecipes, setLikedRecipes] = useState<Record<string, boolean>>({});

  const handleTitleClick = (recipe: RecipeType) => {
    if (selectedRecipe === recipe) {
      setSelectedRecipe(null);
    } else {
      setSelectedRecipe(recipe);
    }
  };

  const handleLikeClickWrapper = (recipe: RecipeType) => {
    handleLikeClick(recipe, setLikedRecipes);
  };

  return (
    <div className="home-p">
      <div className="header-container">
        <header>
          <div className="logo-wrapper">
            <div className="logo-header">
              <div className="Nlogo">Foodie Delight</div>

              <p>
                some sort of kossssher adlgvihahvad;hvfga oehig josjvfps
                osdfhvwpej swefpjvws wefijpows.
                <br></br>
                askchakschalshclashcf asfhclashfclashf lsdhvf. some sort of
                kossssher adlgvihahvad
                <br></br>hvfga oehig josjvfps osdfhvwpej swefpjvws wefijpows.
                <br></br>
                askchakschalshclashcf asfhclashfclashf lsdhvf.
              </p>
            </div>
          </div>
          <div className="img-wrapper">
            <div className="header-img">
              <img src={HeaderImage} alt="Your Alt Text" />
            </div>
          </div>
        </header>
      </div>
      <div className="recipe-list">
        {recipes &&
          recipes.map((recipe) => (
            <div
              className="recipe-card"
              key={recipe.title}
              onClick={() => handleTitleClick(recipe)}>
              <img src={recipe.image} alt={recipe.title} />
              <p
                className="recipe-title"
                onClick={() => handleTitleClick(recipe)}>
                {recipe.title}
              </p>
              <button
                className={`like-button ${
                  likedRecipes[recipe.title] ? "liked" : "not-liked"
                }`}
                onClick={() => handleLikeClickWrapper(recipe)}>
                {likedRecipes[recipe.title] ? "Liked" : "Like"}
              </button>
              {selectedRecipe === recipe && (
                <div>
                  <div className="ingredients">
                    <h3>Ingredients</h3>
                    <ul>
                      {recipe.extendedIngredients.map((ingredient, index) => (
                        <li key={index}>{ingredient.original}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="recipe-instructions">
                    <h2>Instructions:</h2>
                    {recipe.analyzedInstructions &&
                      recipe.analyzedInstructions.map((instruction, index) =>
                        instruction.steps.map((step, sIndex) => (
                          <p key={sIndex}>
                            Step {step.number}: {step.step}
                          </p>
                        ))
                      )}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
export default HomePage;
