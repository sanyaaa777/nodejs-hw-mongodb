import express from 'express';
import { addContact } from '../controllers/contacts.js';
import { addContactSchema } from '../validation/contacts.js';
import validateBody from '../middlewares/validateBody.js';

const router = express.Router();

router.post('/', validateBody(addContactSchema), addContact);

export default router;
