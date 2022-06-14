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

  async patch(req, res, next) {
    try {
      const response = await userService.updateUserData({
        userId: req.header('userId'),
        newName: req.body.name,
        newEmail: req.body.email,
        newPassword: req.body.newPassword,
        currentPassword: req.body.currentPassword,
      });
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const response = await userService.deleteUser({
        userId: req.header('userId'),
        currentPassword: req.body.currentPassword,
      });
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  },
};
