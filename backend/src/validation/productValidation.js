import Joi from 'joi';

export const validateProduct = ({
  name,
  brand,
  type,
  ingredient,
  description,
}) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .messages({ 'string.empty': 'A név megadása kötelező' }),
    brand: Joi.string()
      .required()
      .messages({ 'string.empty': 'A márka megadása kötelező' }),
    type: Joi.string()
      .required()
      .messages({ 'string.empty': 'A típus megadása kötelező' }),
    ingredient: Joi.string()
      .required()
      .messages({ 'string.empty': 'Az összetétel megadása kötelező' }),
    description: Joi.string()
      .required()
      .messages({ 'string.empty': 'A leírás megadása kötelező' }),
  });

  return schema.validate({
    name,
    brand,
    type,
    ingredient,
    description,
  });
};
