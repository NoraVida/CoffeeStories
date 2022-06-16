import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../config';
import User from '../models/User';

import ApiError from '../error/ApiError';
import { errorMessages } from '../error/errorMessages';
import { validateUser } from '../validation/userValidation';

export const userService = {
  async register({ name, email, password }) {
    const { error } = validateUser({ name, email, password });
    const errorMessageFromJoi = error?.details[0].message;

    if (error) {
      if (!name && !email && !password) {
        throw new ApiError(400, errorMessages.emptyAllFields);
      }
      throw new ApiError(400, errorMessageFromJoi);
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

  async updateUserData({
    userId,
    newName,
    newEmail,
    newPassword,
    currentPassword,
  }) {
    if (!newName && !newEmail && !newPassword) {
      throw new ApiError(400, errorMessages.emptyAllFields);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(400, errorMessages.noUserId);
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    console.log(user.password);
    if (!isPasswordValid) {
      throw new ApiError(400, errorMessages.wrongPassword);
    }

    const userDataToUpdate = {
      name: newName || user.name,
      email: newEmail || user.email,
      password: newPassword || currentPassword,
    };

    const { error } = validateUser(userDataToUpdate);
    const errorMessageFromJoi = error.details[0].message;

    if (error) {
      throw new ApiError(400, errorMessageFromJoi);
    }

    if (newEmail !== user.email) {
      const emailExist = await User.findOne({ email: newEmail });
      if (emailExist) throw new ApiError(400, errorMessages.emailExist);
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userDataToUpdate.password, saltRounds);

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          name: userDataToUpdate.name,
          email: userDataToUpdate.email,
          password: hashedPassword,
        },
      },
      { new: true },
    );

    const token = jwt.sign(
      {
        userId: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
      config.tokenSecret,
    );

    return { token, updatedUser };
  },

  async deleteUser({ userId, currentPassword }) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(400, errorMessages.noUserId);
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    console.log(user.password);
    if (!isPasswordValid) {
      throw new ApiError(400, errorMessages.wrongPassword);
    }

    const deletedUser = await User.deleteOne({ userId });
    return deletedUser;
  },
};
