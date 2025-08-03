import express from 'express';
import * as controller from '../controllers/auth.js';

const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/refresh', controller.refresh);
router.post('/logout', controller.logout);

export default router;
