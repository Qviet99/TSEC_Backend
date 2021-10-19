import express from 'express';
import authController from '../controller/authController.js';

const router = express.Router();

router.post('/login', authController.login);

router.post('/sign-up', authController.createAccount);

export default router;