import Article from '../models/Article';

import ApiError from '../error/ApiError';
import { errorMessages } from '../error/errorMessages';

export const articleService = {
  async getArticle() {
    try {
      const articles = await Article.find({});
      return articles;
    } catch (error) {
      throw new ApiError(400, errorMessages.loadingError);
    }
  },
};
