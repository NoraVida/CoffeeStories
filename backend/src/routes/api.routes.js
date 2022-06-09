import express from 'express';
import cors from 'cors';
import {
  registerController,
  loginController,
  coffeeController,
  oneCoffeeController,
  newProductController,
} from '../controllers';
// import authorization from '../middlewares/authorization';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/register', registerController.post);
router.post('/login', loginController.post);
router.get('/coffees', coffeeController.get);
router.get('/coffees/:productId', oneCoffeeController.get);
router.post('/coffees/:productId', oneCoffeeController.post);
router.post('/createnewproduct', newProductController.post);

export default router;
