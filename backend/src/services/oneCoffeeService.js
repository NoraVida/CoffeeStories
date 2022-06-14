import mongoose from 'mongoose';

import Coffee from '../models/Coffee';
import Scoring from '../models/Scoring';
import Rating from '../models/Rating';
import ApiError from '../error/ApiError';

export const oneCoffeeService = {
  async getOneCoffee(productId) {
    try {
      const [coffee, scoring, rating] = await Promise.all([
        Coffee.findOne({ _id: productId }),
        Scoring.findOne({ productId }),
        Rating.find({ productId }).populate('user'),
      ]);

      return {
        coffee,
        scoring,
        rating,
      };
    } catch (error) {
      throw new ApiError(
        500,
        'Database Error occurred while loading the Products',
      );
    }
  },

  async createNewRating({
    productId, user, ratingNumber, comment,
  }) {
    let session;
    const data = {};

    try {
      session = await mongoose.startSession();

      await session.withTransaction(async () => {
        await Rating.create(
          {
            productId,
            user,
            ratingNumber,
            comment,
          },
          {
            session,
          },
        );

        let average;
        const searchedScoring = await Scoring.findOne({ productId }, null, { session });
        if (!searchedScoring) {
          await Scoring.create(
            {
              productId,
              scores: [ratingNumber],
              average: ratingNumber,
              ratingNumber: 1,
            },
            {
              session,
            },
          );
        } else {
          searchedScoring.scores.push(ratingNumber); // eslint-disable-next-line
          average = searchedScoring.scores.reduce((prev, current) => prev + current, 0) / searchedScoring.scores.length;
        }

        const increment = 1;
        await Scoring.findOneAndUpdate(
          { productId },
          {
            $inc: {
              ratingNumber: increment,
            },
            $push: { scores: ratingNumber },
            $set: {
              average,
            },
          },
          { new: true, session },
        );

        data.coffee = await Coffee.findOne({ _id: productId }, null, { session });
        data.rating = await Rating.find({ productId }, null, { session });
        data.scoring = await Scoring.findOne({ productId }, null, { session });
      });

      await session.commitTransaction();

      return data;
    } catch (error) {
      await session.abortTransaction();
    } finally {
      session.endSession();
    }
  },

  // async deleteRating(orderId) {
  //   try {
  //     await Rating.deleteOne({ _id: orderId });
  //     return { confirmation: ' deleted' };
  //   } catch (error) {
  //     throw new ApiError(400, 'Error while removing product');
  //   }
  // },

};
