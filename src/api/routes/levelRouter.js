import express from 'express';
import levelController from '../controller/levelController.js';
import {isAdmin} from '../middleware/isAdmin.js';
import {wrapper} from '../../utils/routeWrapper.js';
import {joiValidator, JoiSchema,  JoiValidationSchema} from '../middleware/joiMiddleware.js';

const router = express.Router();

router.post('/', joiValidator(JoiValidationSchema.level, JoiSchema.level), isAdmin, wrapper(levelController.createLevel));

router.get('/', wrapper(levelController.getAllLevel));

router.get('/:id', wrapper(levelController.getLevel));

export default router;