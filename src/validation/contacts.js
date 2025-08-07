import Joi from 'joi';

export const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'personal'),
});
