import { Router } from 'express';
import * as dish from './controllers/dishController';

const router = Router();

router.get('/random-dish', dish.getRandomDish);
router.post('/my-favorites', dish.saveLikedDish);
router.get('/my-favorites', dish.getLikedDishes);
router.delete('/my-favorites/:dishId', dish.deleteLikedDish);
router.get('/my-favorites/:dishId', dish.getLikedDishById);

export default router;
