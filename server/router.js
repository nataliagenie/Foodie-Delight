'use strict';

const router = require('express').Router();
const dish = require('./controllers/dishController');

router.get('/random-dishes', dish.getThreeRandomDishes);
router.get('/a-random-dish', dish.getARandomDish);

module.exports = router;