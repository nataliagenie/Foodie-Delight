import React from 'react';

function DishDetail({match,dishes}) {
  const dishId = match.params._id;
  const dish = dishes.find((item) => item._id === dishId);

  if (!dish) {
    return <div> Dish not found</div>;
  }

  return (
    <div>
      <h2>{dish.title}</h2>
      <img src={dish.image} alt={dish.title} />
      <p>{dish.summary}</p>
      <p>{dish.instructions}</p>
    </div>
  )
};

export default DishDetail;