import Contact from '../models/contact.js';

export const addContact = async (req, res, next) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
};
