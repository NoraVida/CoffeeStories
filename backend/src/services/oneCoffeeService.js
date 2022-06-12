import mongoose from 'mongoose';

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
        // return rating;

        const searchedScoring = await Scoring.findOne({ productId }, null, { session });
        searchedScoring.scores.push(ratingNumber);
        // console.log(ratingNumber);
        // console.log(scoring.scores);
        // console.log(scorings);
        const average = searchedScoring.scores.reduce((prev, current) => prev + current, 0) / searchedScoring.scores.length;

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
            // },
            // $set: {
            //   // scores: ,
            //   ratingNumber,
            // },
          },
          { new: true, session },
        );

        // const data = {};
        data.coffee = await Coffee.findOne({ _id: productId }, null, { session });
        data.rating = await Rating.find({ productId }, null, { session });
        data.scoring = await Scoring.findOne({ productId }, null, { session });

        // const [coffee, scoring, rating] = await Promise.all([
        //   Coffee.findOne({ _id: productId }, null, { session }),
        //   Scoring.findOne({ productId }, null, { session }),
        //   Rating.find({ productId }, null, { session }).populate('user'),
        // ]);
        // console.log(data);
        // return data;
      });

      await session.commitTransaction();
      console.log('success');
      return data;
    } catch (error) {
      console.log(error);

      await session.abortTransaction();
    } finally {
      session.endSession();
    }
  },

  // const newRating = new Rating({
  //   productId,
  //   user,
  //   ratingNumber,
  //   comment
  // });

  // await newRating.save();

  // // return getOneCoffee(productId);

  // const [coffee, scoring, rating] = await Promise.all([
  //   Coffee.findOne({ _id: productId }),
  //   Scoring.findOne({ productId }),
  //   Rating.find({ productId }).populate('user')
  // ]);

  // return {
  //   coffee,
  //   scoring,
  //   rating
  // };

  // return newRating;
  // },

  async updateScoringData({ productId, ratingNumber }) {
    // const scoring = await Scoring.findById(productId);

    await Scoring.findOneAndUpdate(
      { productId },
      {
        $set: {
          // scores,
          ratingNumber,
        },
      },
      { new: true },
    );

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
  },
};
