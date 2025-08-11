import Joi from 'joi';
import { contactTypesList } from '../constants/contacts.js';

export const createContactSchema = Joi.object({
  name: Joi.string().trim().min(3).max(20).required(),
  phoneNumber: Joi.string().trim().min(3).max(20).required(),
  email: Joi.string().trim().email().optional(),
  contactType: Joi.string().trim().valid(...contactTypesList).required(),
  isFavourite: Joi.boolean().truthy('true').falsy('false').default(false),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().trim().min(3).max(20),
  phoneNumber: Joi.string().trim().min(3).max(20),
  email: Joi.string().trim().email(),
  contactType: Joi.string().trim().valid(...contactTypesList),
  isFavourite: Joi.boolean().truthy('true').falsy('false'),
}).min(1);
