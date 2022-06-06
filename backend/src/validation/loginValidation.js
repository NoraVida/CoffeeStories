import Joi from 'joi';

export const validateLogin = ({ email, password }) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email()
      .messages({ 'string.empty': 'Email megadása kötelező' }),
    password: Joi.string()
      .min(8)
      .required()
      .messages({ 'string.empty': 'Jelszó megadása kötelező' }),
  });

  return schema.validate({ email, password });
};
