import Coffee from '../models/Coffee';
import ApiError from '../error/ApiError';

export const coffeeService = {
  async getCoffee() {
    // if (productId === null) {
    try {
      const coffees = await Coffee.find({});
      return coffees;
    } catch (error) {
      throw new ApiError(500, 'Database Error occurred while loading the Products');
    }
    // } else {
    //   try {
    //     const coffees = await Coffee.findOne({ _id: productId });
    //     return coffees;
    //   } catch (error) {
    //     throw new ApiError(500, 'Database Error occurred while loading the Products');
    //   }
    // }
  },
};
