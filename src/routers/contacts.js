import express from "express";
import {
  getAll,
  create,
  update,
  getById,
  remove,
} from "../controllers/contacts.js";

import validateBody from "../middlewares/validateBody.js";
import isValidId from "../middlewares/isValidId.js";
import { contactSchema, updateContactSchema } from "../schemas/contactSchemas.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:contactId", isValidId, getById);
router.post("/", validateBody(contactSchema), create);
router.patch("/:contactId", isValidId, validateBody(updateContactSchema), update);
router.delete("/:contactId", isValidId, remove);

export default router;
