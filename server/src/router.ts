'use strict';

import express from 'express';
import {getThreeRandomDishes, saveLikedDish, getLikedDishes,deleteLikedDish} from './controllers/dishController.ts';

const router = express.Router();

router.get('/random-dishes', getThreeRandomDishes);
router.post('/likedDishes', saveLikedDish); 
router.get('/likedDishes', getLikedDishes);
router.delete('/likedDishes/:dishId',deleteLikedDish);

export default router;