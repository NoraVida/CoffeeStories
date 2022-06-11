import { oneCoffeeService } from '../services';

export const oneCoffeeController = {
  async get(req, res, next) {
    try {
      const { productId } = req.params;
      const {
        coffee,
        scoring,
        rating,
      } = await oneCoffeeService.getOneCoffee(productId);
      return res.status(200).json({
        coffee,
        scoring,
        rating,
      });
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
  async patch(req, res, next) {
    try {
      const { productId } = req.params;
      const updatedScoring = await oneCoffeeService.updateScoringData({
        productId,
        // productId: req.body.productId,
        // score: req.body.score,
        // average: req.body.average,
        ratingNumber: req.body.ratingNumber,
      });
      return res.status(200).json(updatedScoring);
    } catch (error) {
      return next(error);
    }
  },
};
