import mongoose from 'mongoose';

import Coffee from '../models/Coffee';
import Scoring from '../models/Scoring';
import Rating from '../models/Rating';

import ApiError from '../error/ApiError';
import { errorMessages } from '../error/errorMessages';

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
      throw new ApiError(500, errorMessages.loadingError);
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
        data.scoring = await Scoring.findOne({ productId }, null, { session });
        data.rating = await Rating.find({ productId }, null, { session }).populate('user');
      });

      await session.commitTransaction();

      return data;
    } catch (error) {
      await session.abortTransaction();
      throw new ApiError(500, errorMessages.loadingError);
    } finally {
      session.endSession();
    }
  },

  async deleteRating({ productId, ratingId }) {
    let session;
    const data = {};

    try {
      session = await mongoose.startSession();

      await session.withTransaction(async () => {
        const userRating = await Rating.findOne({ _id: ratingId }, null, { session }).populate('user');
        const productScoring = await Scoring.findOne({ productId }, null, { session });

        productScoring.scores.splice(productScoring.scores.indexOf(userRating.ratingNumber), 1);
        // eslint-disable-next-line
        const average = productScoring.scores.reduce((prev, current) => prev + current, 0) / productScoring.scores.length;

        const decrement = -1;
        await Scoring.findOneAndUpdate(
          { productId },
          {
            $inc: {
              ratingNumber: decrement,
            },
            $set: {
              scores: productScoring.scores,
              average,
            },
          },
          { new: true, session },
        );

        await Rating.deleteOne({ _id: ratingId }, { session });

        data.coffee = await Coffee.findOne({ _id: productId }, null, { session });
        data.scoring = await Scoring.findOne({ productId }, null, { session });
        data.rating = await Rating.find({ productId }, null, { session }).populate('user');
      });

      await session.commitTransaction();

      return data;
    } catch (error) {
      await session.abortTransaction();
      throw new ApiError(500, errorMessages.loadingError);
    } finally {
      session.endSession();
    }
  },

};
