import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import config from '../config';
import User from '../models/User';

import ApiError from '../error/ApiError';
import { errorMessages } from '../error/errorMessages';
import { validateLogin } from '../validation/loginValidation';

export const loginService = {
  async authenticate({ email, password }) {
    const { error } = validateLogin({ email, password });
    const errorMessageFromJoi = error?.details[0].message;

    if (error) {
      if (!email && !password) {
        throw new ApiError(400, errorMessages.emptyEmailPassword);
      }
      throw new ApiError(400, errorMessageFromJoi);
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, errorMessages.wrongEmail);
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new ApiError(401, errorMessages.wrongPassword);
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
