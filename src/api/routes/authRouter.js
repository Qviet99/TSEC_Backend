import express from 'express';
import authController from '../controller/authController.js';
import {wrapper} from '../../utils/routeWrapper.js';

const router = express.Router();

router.post('/login', wrapper(authController.login));

router.post('/sign-up', wrapper(authController.createAccount));

router.get('/avatarUrl/:id', wrapper(authController.getUserAvatarUrl));

router.patch('/:id', wrapper(authController.updateAccount));

router.delete('/cloudinary-delete-image/:id', wrapper(authController.deleteImageUrl));

router.delete('/cloudinary-delete-audio/:id', wrapper(authController.deleteAudioUrl));

router.delete('/cloudinary-delete-video/:id', wrapper(authController.deleteVideoUrl));

export default router;