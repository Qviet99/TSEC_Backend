import express from 'express';
import questionController from '../controller/questionController.js';
import {isAdmin} from '../middleware/isAdmin.js';
import {wrapper} from '../../utils/routeWrapper.js';
import {joiValidator, JoiSchema,  JoiValidationSchema} from '../middleware/joiMiddleware.js';

const router = express.Router();

router.post('/', joiValidator(JoiValidationSchema.question, JoiSchema.question), isAdmin, wrapper(questionController.createQuestion));

router.get('/', isAdmin, wrapper(questionController.getAllQuestion));

router.get('/exam', isAdmin, wrapper(questionController.getAllExamTypeQuestion));

router.get('/exercise', isAdmin, wrapper(questionController.getAllExerciseTypeQuestion));

router.get('/:id', isAdmin, wrapper(questionController.getQuestion));

router.patch('/:id', joiValidator(JoiValidationSchema.question, JoiSchema.question), isAdmin, wrapper(questionController.updateQuestion));

router.delete('/:id', isAdmin, wrapper(questionController.deleteQuestion));

export default router;