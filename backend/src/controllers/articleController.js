import { articleService } from '../services';

export const articleController = {
  async get(req, res) {
    try {
      const articles = await articleService.getArticle();
      return res.status(200).json({ articles });
    } catch (error) {
      return res.status(error.status).json(error);
    }
  },
};
