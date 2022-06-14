import express from 'express';
import cors from 'cors';
import {
  userController,
  loginController,
  coffeeController,
  oneCoffeeController,
  newProductController,
} from '../controllers';
import authorization from '../middlewares/authorization';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/user', userController.post);
router.patch('/user', authorization, userController.patch);
router.delete('/user', authorization, userController.delete);

router.post('/login', loginController.post);

router.get('/coffees', coffeeController.get);

router.post('/createnewproduct', authorization, newProductController.post);

router.get('/coffees/:productId', oneCoffeeController.get);
router.post('/coffees/:productId', authorization, oneCoffeeController.post);
router.delete('/coffees/:productId', authorization, oneCoffeeController.delete);

export default router;
