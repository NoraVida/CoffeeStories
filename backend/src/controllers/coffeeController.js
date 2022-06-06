import { coffeeService } from '../services';

export const coffeeController = {
  async get(req, res, next) {
    try {
      const coffees = await coffeeService.getCoffee();
      return res.status(200).json({ coffees });
    } catch (error) {
      return next(error);
    }
  },
};
