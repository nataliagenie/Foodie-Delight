import React, { useState, useEffect } from 'react';
import { fetchLikedDishes, removeFromFavorites } from '../../ApiServices/apiServices';
import { FavoriteRecipeType } from '../../@types/recipe';


interface MyFavoritesProps {
  recipesThatAreLiked: FavoriteRecipeType[];
}



export default function MyFavorites({recipesThatAreLiked}: MyFavoritesProps) {
  const [likedDishes, setLikedDishes] = useState<FavoriteRecipeType[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const dishes = await fetchLikedDishes();
        if (dishes) {
          setLikedDishes(dishes);
        } else {
          setLikedDishes([]);
        }
      } catch (err) {
        console.error(err);
        setLikedDishes([]);
      }
    }
    fetchData();
  },);  


  
  const handleRemoveFromFavorites = (dishId: number) => {
    removeFromFavorites(dishId)
      .then(() => {
        setLikedDishes((prevDishes) => prevDishes.filter((dish) => dish._id !== dishId));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='favorite-dishes'>
      <h1>My Favorite Dishes</h1>
      <div className='fav-dish-list'>
        {likedDishes && likedDishes.map((dish) => (
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

