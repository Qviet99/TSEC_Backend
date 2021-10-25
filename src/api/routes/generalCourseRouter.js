import express from 'express';
import courseController from '../controller/courseController.js';
import {wrapper} from '../../utils/routeWrapper.js';

const router = express.Router();

router.get('/', wrapper(courseController.getAllCourse));

router.get('/:id', wrapper(courseController.getCourse));

export default router;