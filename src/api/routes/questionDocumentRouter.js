import express from 'express';
import questionDocumentController from '../controller/questionDocumentController.js';
import {isAdmin} from '../middleware/isAdmin.js';
import {wrapper} from '../../utils/routeWrapper.js';

const router = express.Router();

router.post('/', isAdmin, wrapper(questionDocumentController.createQuestionDocument));

router.get('/reading', wrapper(questionDocumentController.getAllReadingDocuments));

router.get('/listening', wrapper(questionDocumentController.getAllListeningDocuments));

router.get('/', wrapper(questionDocumentController.getAllQuestionDocuments));

router.get('/:id', wrapper(questionDocumentController.getQuestionDocument));

router.patch('/:id', wrapper(questionDocumentController.updateQuestionDocument));

router.delete('/:id', isAdmin, wrapper(questionDocumentController.deleteQuestionDocument));

export default router;