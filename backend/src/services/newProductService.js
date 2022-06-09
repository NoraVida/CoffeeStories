import Coffee from '../models/Coffee';

export const newProductService = {
  async createNewProduct({
    name, brand, type, ingredient, description,
  }) {
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
