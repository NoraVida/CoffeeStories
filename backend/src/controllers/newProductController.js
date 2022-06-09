import { newProductService } from '../services';

export const newProductController = {
  async post(req, res, next) {
    try {
      const data = await newProductService.createNewProduct({
        name: req.body.name,
        brand: req.body.brand,
        type: req.body.type,
        ingredient: req.body.ingredient,
        description: req.body.description,
      });
      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  },
};
