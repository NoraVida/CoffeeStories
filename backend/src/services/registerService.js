import bcrypt from 'bcrypt';
import ApiError from '../error/ApiError';
import User from '../models/User';
import { validateRegister } from '../validation/registerValidation';
import { errorMessages } from '../error/errorMessages';

export const registerService = {
  async register({ name, email, password }) {
    const { error } = validateRegister({ name, email, password });

    if (error) {
      if (!name && !email && !password) {
        throw new ApiError(400, errorMessages.missingData);
      }
      throw new ApiError(400, error.details[0].message);
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) throw new ApiError(400, errorMessages.emailExist);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return {
      id: user._id,
      email,
    };
  },
};
