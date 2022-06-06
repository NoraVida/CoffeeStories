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
};
