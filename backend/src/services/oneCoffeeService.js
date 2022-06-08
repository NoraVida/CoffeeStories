/*eslint-disable */
import Coffee from '../models/Coffee';
import Rating from '../models/Rating';
import ApiError from '../error/ApiError';

export const oneCoffeeService = {
  async getOneCoffee(productId) {
    try {
      // data.coffee = await Coffee.findOne({ _id: productId });
      // data.rating = await Rating.find({ productId });

      const [coffee, rating] = await Promise.all([
        Coffee.findOne({ _id: productId }),
        Rating.find({ productId }).populate('user')
      ]);

      return {
        coffee,
        rating
      };
    } catch (error) {
      throw new ApiError(500, 'Database Error occurred while loading the Products');
    }
  },

  async createNewRating({ productId, user, ratingNumber, comment }) {
    const newRating = new Rating({
      productId, 
      user, 
      ratingNumber, 
      comment
    });

    await newRating.save();

    return newRating;
  }
};
