import express from 'express';
import authController from '../controller/authController.js';

const router = express.Router();

router.post('/login', wrapper(authController.login));

router.post('/sign-up', wrapper(authController.createAccount));

router.get('/avatarUrl/:id', wrapper(authController.getUserAvatarUrl));

router.patch('/:id', wrapper(authController.updateAccount));

router.delete('/cloudinary-delete/:id', wrapper(authController.deleteImageUrl));

export default router;