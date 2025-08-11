import { Router } from 'express';
import {
  getContactByIdController,
  getContactsController,
  createContactController,
  patchContactController,
  upsertContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { upload } from '../middlewares/multer.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { normalizeFormData } from '../middlewares/normalizeFormData.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { tap } from '../middlewares/tap.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '/',
  upload.single('photo'),
  tap,
  normalizeFormData,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  tap,
  normalizeFormData,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.put(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  normalizeFormData,
  tap,
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;
