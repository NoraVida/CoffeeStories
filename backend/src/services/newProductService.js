import Coffee from '../models/Coffee';

import ApiError from '../error/ApiError';
import { errorMessages } from '../error/errorMessages';
import { validateProduct } from '../validation/productValidation';

export const newProductService = {
  async createNewProduct({
    name, brand, type, ingredient, description,
  }) {
    const { error } = validateProduct({
      name, brand, type, ingredient, description,
    });

    const errorMessageFromJoi = error?.details[0].message;

    if (error) {
      if (!name && !brand && !type && !ingredient && !description) {
        throw new ApiError(400, errorMessages.emptyAllFields);
      }
      throw new ApiError(400, errorMessageFromJoi);
    }

    const newProduct = new Coffee({
      name,
      brand,
      rating: 0,
      ratingNumber: 0,
      type,
      ingredient,
      description,
    });

    await newProduct.save();

    return newProduct;
  },
};
