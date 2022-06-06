import Coffee from '../models/Coffee';
import ApiError from '../error/ApiError';

export const oneCoffeeService = {
  async getOneCoffee(productId) {
    try {
      const coffee = await Coffee.findOne({ _id: productId });
      return coffee;
    } catch (error) {
      throw new ApiError(500, 'Database Error occurred while loading the Products');
    }
  },
};
