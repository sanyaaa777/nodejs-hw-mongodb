import Contact from '../../models/contacts.js';

export const getAllContacts = () => {
  return Contact.find();
};

export const getContactById = (contactId) => {
  return Contact.findById(contactId);
};

export const createContact = (contactData) => {
  return Contact.create(contactData);
};

export const updateContact = (contactId, updates) => {
  return Contact.findByIdAndUpdate(contactId, updates, { new: true });
};

export const deleteContact = (contactId) => {
  return Contact.findByIdAndDelete(contactId);
};
