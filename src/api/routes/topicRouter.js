import express from 'express';
import topicController from '../controller/topicController.js';
import {isAdmin} from '../middleware/isAdmin.js';
import {wrapper} from '../../utils/routeWrapper.js';
import {joiValidator, JoiSchema,  JoiValidationSchema} from '../middleware/joiMiddleware.js';

const router = express.Router();

router.post('/', joiValidator(JoiValidationSchema.topic, JoiSchema.topic), isAdmin, wrapper(topicController.createTopic));

router.get('/', wrapper(topicController.getAllTopic));

router.get('/:id', wrapper(topicController.getTopic));

export default router;