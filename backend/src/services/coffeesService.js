import Coffee from '../models/Coffee';
import Scoring from '../models/Scoring';

import ApiError from '../error/ApiError';
import { errorMessages } from '../error/errorMessages';

export const coffeesService = {
  async getCoffees() {
    try {
      const [coffee, scoring] = await Promise.all([
        Coffee.find(),
        Scoring.find(),
      ]);

      return {
        coffee,
        scoring,
      };
    } catch (error) {
      throw new ApiError(500, errorMessages.loadingError);
    }
  },
};
