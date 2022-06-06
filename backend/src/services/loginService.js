import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validateLogin } from '../validation/loginValidation';
import ApiError from '../error/ApiError';
import User from '../models/User';
import config from '../config';

export const loginService = {
  async authenticate({ email, password }) {
    const { error } = validateLogin({ email, password });
    if (error) {
      if (!email && !password) {
        throw new ApiError(400, 'Email és jelszó megadása kötelező');
      }
      throw new ApiError(400, error.details[0].message);
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, 'Nem helyes email');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new ApiError(400, 'Nem helyes jelszó');
    }

    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
      },

      config.tokenSecret,
    );
    return { token, status: 200 };
  },
};
