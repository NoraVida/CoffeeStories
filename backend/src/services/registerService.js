import bcrypt from 'bcrypt';
import ApiError from '../error/ApiError';
import User from '../models/User';
import { validateRegister } from '../validation/registerValidation';

export const registerService = {
  async register({ name, email, password }) {
    const { error } = validateRegister({ name, email, password });

    if (error) {
      if (!name && !email && !password) {
        throw new ApiError(400, 'Felhasználónév, email és jelszó megadása kötelező');
      }
      throw new ApiError(400, error.details[0].message);
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) throw new ApiError(400, 'Ez az email már foglalt');

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
