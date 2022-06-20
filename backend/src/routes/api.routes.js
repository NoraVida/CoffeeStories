import express from 'express';
import cors from 'cors';

import {
  articleController,
  coffeesController,
  loginController,
  newProductController,
  oneCoffeeController,
  userController,
} from '../controllers';
import authorization from '../middlewares/authorization';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/articles', articleController.get);

router.post('/createnewproduct', authorization, newProductController.post);

router.post('/login', loginController.post);

router.get('/coffees', coffeesController.get);
router.get('/coffees/:productId', oneCoffeeController.get);
router.post('/coffees/:productId', authorization, oneCoffeeController.post);
router.delete('/coffees/:productId', authorization, oneCoffeeController.delete);

router.post('/user', userController.post);
router.patch('/user', authorization, userController.patch);
router.post('/user/deleteprofile', authorization, userController.deleteUserProfile);

export default router;
