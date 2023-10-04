'use strict';

const router = require('express').Router();
const dish = require('./controllers/dishController');

router.get('/random-dish', dish.getRandomDish);
router.post('/my-favorites', dish.saveLikedDish); 
router.get('/my-favorites', dish.getLikedDishes);
router.delete('/my-favorites/:dishId', dish.deleteLikedDish);
router.get('/my-favorites/:dishId', dish.getLikedDishById);

module.exports = router;