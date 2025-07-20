import Contact from '../models/contact.js';

const getAll = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = 'name',
    sortOrder = 'asc',
    type,
    isFavourite,
  } = req.query;

  const skip = (page - 1) * perPage;
  const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };
  const filter = {};

  if (type) filter.contactType = type;
  if (isFavourite !== undefined) filter.isFavourite = isFavourite === 'true';

  const totalItems = await Contact.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / perPage);

  const contacts = await Contact.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(perPage));

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data: contacts,
      page: Number(page),
      perPage: Number(perPage),
      totalItems,
      totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    },
  });
};

const create = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
};

const update = async (req, res) => {
  const { contactId } = req.params;
  const updated = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updated) {
    return res.status(404).json({ status: 404, message: 'Contact not found' });
  }
  res.json(updated);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return res.status(404).json({ status: 404, message: 'Contact not found' });
  }
  res.json(contact);
};

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    return res.status(404).json({ status: 404, message: 'Contact not found' });
  }
  res.json({ message: 'Contact deleted' });
};

export { getAll, create, update, getById, remove };
