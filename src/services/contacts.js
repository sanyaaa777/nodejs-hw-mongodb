import { Contact } from '../models/contact.model.js';

export const getAllContactsService = async () => {
  return await Contact.find();
};

export const getContactByIdService = async (contactId) => {
  return await Contact.findById(contactId);
};
