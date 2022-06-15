import jwt from 'jsonwebtoken';

import config from '../config';
import ApiError from '../error/ApiError';
import { errorMessages } from '../error/errorMessages';

export default (req, res, next) => {
  try {
    const [prefix, userToken] = req.header('Authorization').split(' ');
    if (prefix === 'Bearer') {
      const verifiedUser = jwt.verify(userToken, config.tokenSecret);
      req.headers.userid = verifiedUser.userId;
      return next();
    }
    return next(new ApiError(401, errorMessages.invalidToken));
  } catch (error) {
    error.status = 401;
    error.message = errorMessages.invalidToken;
    return next(error);
  }
};
