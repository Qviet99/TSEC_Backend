import express from 'express';
import examController from '../controller/examController.js';
import {isAdmin} from '../middleware/isAdmin.js';
import {wrapper} from '../../utils/routeWrapper.js';
import {joiValidator, JoiSchema,  JoiValidationSchema} from '../middleware/joiMiddleware.js';

const router = express.Router();

router.post('/', joiValidator(JoiValidationSchema.exam, JoiSchema.exam), isAdmin, wrapper(examController.createExam));

router.get('/', wrapper(examController.getAllExam));

router.get('/:id', wrapper(examController.getExam));

router.patch('/:id', joiValidator(JoiValidationSchema.exam, JoiSchema.exam), isAdmin, wrapper(examController.updateExam));

router.delete('/:id', isAdmin, wrapper(examController.deleteExam));

export default router;