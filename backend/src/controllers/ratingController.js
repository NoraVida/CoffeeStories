import { ratingService } from '../services';

export const ratingController = {
  async get(req, res, next) {
    try {
      const { productId } = req.params;
      const oneCoffee = await ratingService.getOneCoffee(productId);
      return res.status(200).json({ oneCoffee });
    } catch (error) {
      return next(error);
    }
  },
};
