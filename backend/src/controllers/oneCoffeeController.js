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
        // header
        ratingNumber: req.body.ratingNumber,
        comment: req.body.comment,
      });
      return res.status(200).json(newData);
    } catch (error) {
      return next(error);
    }
  },
  // async delete(req, res, next) {
  //   const { orderId } = req.params;
  //   try {
  //     const confirmation = await orderService.deleteOrder(orderId);
  //     return res.status(200).json(confirmation);
  //   } catch (error) {
  //     return next(error);
  //   }
  // },
  async delete(req, res, next) {
    try {
      const { productId } = req.params;
      const updatedData = await oneCoffeeService.deleteRating({
        // productId,
        // // productId: req.body.productId,
        // scores: req.body.scores,
        // average: req.body.average,
        // ratingNumber: req.body.ratingNumber,
      });
      return res.status(200).json(updatedData);
    } catch (error) {
      return next(error);
    }
  },
};
