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
      const newData = await oneCoffeeService.createNewRating({
        productId,
        // productId: req.body.productId,
        user: req.body.user,
        // headerből
        ratingNumber: req.body.ratingNumber,
        comment: req.body.comment,
      });
      console.log(newData);
      return res.status(200).json(newData);
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
        scores: req.body.scores,
        average: req.body.average,
        ratingNumber: req.body.ratingNumber,
      });
      return res.status(200).json(updatedScoring);
    } catch (error) {
      return next(error);
    }
  },
};
