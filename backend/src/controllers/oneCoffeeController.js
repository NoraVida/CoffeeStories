import { oneCoffeeService } from '../services';

export const oneCoffeeController = {
  async get(req, res, next) {
    try {
      const { productId } = req.params;
      const oneCoffee = await oneCoffeeService.getOneCoffee(productId);
      return res.status(200).json({ oneCoffee });
    } catch (error) {
      return next(error);
    }
  },
  async post(req, res, next) {
    try {
      const { productId } = req.params;
      const newRating = await oneCoffeeService.createNewRating({
        productId,
        // productId: req.body.productId,
        user: req.body.user,
        ratingNumber: req.body.ratingNumber,
        comment: req.body.comment,
      });
      return res.status(200).json(newRating);
    } catch (error) {
      return next(error);
    }
  },
};
