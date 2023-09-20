'use strict';

const router = require('express').Router();
const dish = require('./controllers/dishController');

router.get('/random-dishes', dish.getThreeRandomDishes);


module.exports = router;