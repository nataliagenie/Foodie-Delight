
import React from 'react';
import { useLikedDishes } from '../apiServices/apiServices';

function MyFavorites() {
  const [likedDishes, removeFavorite] = useLikedDishes();

  const handleRemoveFromFavorites = (dishId) => {
      removeFavorite(dishId).catch(e => {
          console.log(e)
      });
  };

  return (
    <div className='favorite-dishes'>
      <h1>My Favorite Dishes</h1>
      <div className='fav-dish-list'>
        {likedDishes.map((dish) => (
          <div className='fav-dish-card' key={dish._id}>
            <div className='left-fav-dish-card'>
              <h2>{dish.title}</h2>
              <img src={dish.image} alt={dish.title} />
              <button onClick={() => handleRemoveFromFavorites(dish._id)}>Remove from My Favorites</button>
            </div>
            <div className='right-fav-dish-card'>
              <p><strong>Instructions:</strong> {dish.instructions}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default MyFavorites;
