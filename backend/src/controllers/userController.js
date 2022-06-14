import { userService } from '../services';

export const userController = {
  async post(req, res, next) {
    try {
      const data = await userService.register({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  },
};
