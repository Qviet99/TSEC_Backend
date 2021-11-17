import express from 'express';
import courseController from '../controller/courseController.js';
import {wrapper} from '../../utils/routeWrapper.js';
import {joiValidator, JoiSchema,  JoiValidationSchema} from '../middleware/joiMiddleware.js';

const router = express.Router();

router.post('/', joiValidator(JoiValidationSchema.course, JoiSchema.course), wrapper(courseController.createCourse));

router.get('/', wrapper(courseController.getAllCourse));

router.get('/registeredCourses', wrapper(courseController.getAllRegisteredCourses));

router.get('/userCourses', wrapper(courseController.getAllCourseOfUser));

router.get('/suggestionCourses/:mark', wrapper(courseController.getSuggestionCourses));

router.get('/:id', wrapper(courseController.getCourse));

router.patch('/user-buy-course/:id', wrapper(courseController.registerCourse));

router.patch('/:id', joiValidator(JoiValidationSchema.course, JoiSchema.course), wrapper(courseController.updateCourse));

router.delete('/:id', wrapper(courseController.deleteCourse));

export default router;