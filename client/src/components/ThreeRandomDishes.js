import React, {useState} from 'react';

function ThreeRandomDishes({ recipes }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const handleTitleClick = (recipe) => {
    if (selectedRecipe === recipe) {
      setSelectedRecipe(null);
    } else {
      setSelectedRecipe(recipe);
    }
  };

  return (
    // <div className='recipe-list'>
    //   {recipes.map((recipe) => (
    //     <div className='recipe-card' key={recipe.id}>
    //       <img src={recipe.image} alt={recipe.title} />
    //       <p>{recipe.title}</p>
    //     </div>
    //   ))}
    // </div>

    <div className='recipe-list'>
          {recipes.map((recipe) => (
              <div className='recipe-card' key={recipe.title}>
                <img src={recipe.image} alt={recipe.title} />
                <p
                  className='recipe-title'
                  onClick={() => handleTitleClick(recipe)}
                >
                  {recipe.title}
                </p>
                {selectedRecipe === recipe && (
                  <div className='recipe-instructions'>
                    <h2>Instructions:</h2>
                    <p>{recipe.instructions}</p>
                  </div>
                )}
              </div>
          ))}
    </div>
  );
}

export default ThreeRandomDishes;
