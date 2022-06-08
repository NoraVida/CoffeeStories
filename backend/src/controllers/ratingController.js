import { ratingService } from '../services';

export const ratingController = {
  async get(req, res, next) {
    try {
      const { productId } = req.params;
      const ratings = await ratingService.getRatings(productId);
      return res.status(200).json({ ratings });
    } catch (error) {
      return next(error);
    }
  },
};
