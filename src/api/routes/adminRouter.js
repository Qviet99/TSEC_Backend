import express from 'express';
import authController from '../controller/authController.js';
import {wrapper} from '../../utils/routeWrapper.js';
import {isAdmin} from '../middleware/isAdmin.js';

const router = express.Router();

router.post('/', isAdmin, wrapper(authController.createAccountByAdmin));

router.get('/', isAdmin, wrapper(authController.getAllAccount));

router.get('/:id', isAdmin, wrapper(authController.getAccount));

router.patch('/:id', isAdmin, wrapper(authController.updateAccount));

router.delete('/:id', isAdmin, wrapper(authController.deleteAccount));

export default router;