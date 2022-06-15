import { articleService } from '../services';

export const articleController = {
  async get(req, res, next) {
    try {
      const articles = await articleService.getArticle();
      return res.status(200).json({ articles });
    } catch (error) {
      return next(error);
    }
  },
};
