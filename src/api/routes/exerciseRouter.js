import express from 'express';
import exerciseController from '../controller/exerciseController.js';
import {isAdmin} from '../middleware/isAdmin.js';
import {wrapper} from '../../utils/routeWrapper.js';
import {joiValidator, JoiSchema,  JoiValidationSchema} from '../middleware/joiMiddleware.js';

const router = express.Router();

router.post('/', joiValidator(JoiValidationSchema.exercise, JoiSchema.exercise), isAdmin, wrapper(exerciseController.createExercise));

router.get('/', isAdmin, wrapper(exerciseController.getAllExercise));

router.get('/:id', wrapper(exerciseController.getExercise));

router.patch('/:id', joiValidator(JoiValidationSchema.exercise, JoiSchema.exercise), isAdmin, wrapper(exerciseController.updateExercise));

router.delete('/:id', isAdmin, wrapper(exerciseController.deleteExercise));

export default router;