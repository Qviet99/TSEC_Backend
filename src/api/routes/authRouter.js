import express from 'express';
import authController from '../controller/authController.js';

const router = express.Router();

router.post('/login', authController.login);

router.post('/sign-up', authController.createAccount);

router.get('/avatarUrl/:id', authController.getUserAvatarUrl);

router.delete('/cloudinary-delete/:id', authController.deleteImageUrl);

export default router;