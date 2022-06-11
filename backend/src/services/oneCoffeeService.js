/*eslint-disable */
import Coffee from '../models/Coffee';
import Scoring from '../models/Scoring';
import Rating from '../models/Rating';
import ApiError from '../error/ApiError';

export const oneCoffeeService = {
  async getOneCoffee(productId) {
    try {
      // data.coffee = await Coffee.findOne({ _id: productId });
      // data.rating = await Rating.find({ productId });

      const [coffee, scoring, rating] = await Promise.all([
        Coffee.findOne({ _id: productId }),
        Scoring.findOne({ productId }),
        Rating.find({ productId }).populate('user')
      ]);

      return {
        coffee,
        scoring,
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
  },

  async updateScoringData({ productId, ratingNumber}) {
    // const scoring = await Scoring.findById(productId);

    await Scoring.findOneAndUpdate(
      { productId },
      { ratingNumber },
      { new: true },
    );
  }
};
