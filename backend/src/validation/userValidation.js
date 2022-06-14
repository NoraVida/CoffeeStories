import Joi from 'joi';

export const validateUser = ({ name, email, password }) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .messages({ 'string.empty': 'Felhasználónév megadása kötelező' }),
    email: Joi.string()
      .required()
      .email()
      .messages({ 'string.empty': 'Email megadása kötelező' }),
    password: Joi.string()
      .min(8)
      .required()
      .messages({
        'string.empty': 'Jelszó megadása kötelező',
        'string.min': 'A jelszónak legalább 8 karakter hósszúnak kell lennie',
      }),
  });

  return schema.validate({ name, email, password });
};
