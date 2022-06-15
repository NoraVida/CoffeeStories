import { coffeesService } from '../services';

export const coffeesController = {
  async get(req, res, next) {
    try {
      const coffees = await coffeesService.getCoffees();
      return res.status(200).json({ coffees });
    } catch (error) {
      return next(error);
    }
  },
};
