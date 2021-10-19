import express from 'express';
import reportController from '../controller/reportController.js';
import {isAdmin} from '../middleware/isAdmin.js';
import {wrapper} from '../../utils/routeWrapper.js';
import {joiValidator, JoiSchema,  JoiValidationSchema} from '../middleware/joiMiddleware.js';

const router = express.Router();

router.post('/', joiValidator(JoiValidationSchema.report, JoiSchema.report), wrapper(reportController.createReport));

router.get('/', isAdmin, wrapper(reportController.getAllReport));

router.get('/:id', isAdmin, wrapper(reportController.getReport));

router.delete('/:id', isAdmin, wrapper(reportController.deleteReport));

export default router;