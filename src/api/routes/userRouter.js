import express from 'express';
import userController from '../controller/userController.js';
import {wrapper} from '../../utils/routeWrapper.js';
import {joiValidator, JoiSchema,  JoiValidationSchema} from '../middleware/joiMiddleware.js';

const router = express.Router();

router.post('/', joiValidator(JoiValidationSchema.user, JoiSchema.user), wrapper(userController.createUserInformation));

router.get('/:id', wrapper(userController.getUserInformation));

router.patch('/:id', joiValidator(JoiValidationSchema.user, JoiSchema.user), wrapper(userController.updateUserInformation));

export default router;