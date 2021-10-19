import questionRepository from '../data/repositories/questionRepository.js';
import examRepository from '../data/repositories/examRepository.js';
import {Status} from '../api/status.js';

const examService = {
  createEam: async(exam) => {
    const {questionIds} = exam;
    const listOfQuestionIdNotAvailable = [];
    const listOfQuestionWrongType = [];

    for (const id of questionIds) {
      const question = await questionRepository.getQuestionById(id);

      if (!question) {
        listOfQuestionIdNotAvailable.push(id);
      }

      if (question.type !== 'exam') {
        listOfQuestionWrongType.push(id);
      }
    };

    if (listOfQuestionIdNotAvailable.length > 0) {
      return {
        status: Status.Success,
        message: 'Exam contain some unavailable question',
        list: listOfQuestionIdNotAvailable,
      };
    }

    if (listOfQuestionWrongType.length > 0) {
      return {
        status: Status.Success,
        message: 'Exam contain some exercise type question',
        list: listOfQuestionWrongType,
      };
    }

    const result = await examRepository.createExam(exam);
  
    return {
      status: Status.Success,
      result,
    };
  },

  getExamById: async(examId) => {
    const result = await examRepository.getExamById(examId);

    if (!result) {
      return {
        status: Status.Fail,
        message: 'Exam not exist',
      };
    }

    return {
      status: Status.Success,
      result,
    };
  },

  getAllExam: async() => {
    const result = await examRepository.getAllExam();

    return {
      status: Status.Success,
      result,
    };
  },
  
  updateExam: async(id, exam) => {
    const {questionIds} = exam;
    const listOfQuestionIdNotAvailable = [];
    const listOfQuestionWrongType = [];

    const examExist = await examRepository.getExamById(id);

    if (!examExist) {
      return {
        status: Status.Fail,
        message: 'Exam not exist',
      };
    }

    for (const id of questionIds) {
      const question = await questionRepository.getQuestionById(id);

      if (!question) {
        listOfQuestionIdNotAvailable.push(id);
      }

      if (question.type !== 'exam') {
        listOfQuestionWrongType.push(id);
      }
    };

    if (listOfQuestionIdNotAvailable.length > 0) {
      return {
        status: Status.Success,
        message: 'Exam contain some unavailable question',
        list: listOfQuestionIdNotAvailable,
      };
    }

    if (listOfQuestionWrongType.length > 0) {
      return {
        status: Status.Success,
        message: 'Exam contain some exercise type question',
        list: listOfQuestionWrongType,
      };
    }

    await examRepository.updateExamById(id, exam);
  
    return {
      status: Status.Success,
    };
  },

  deleteExam: async(id) => {
    const examExist = await examRepository.getExamById(id);

    if (!examExist) {
      return {
        status: Status.Fail,
        message: 'Exam not exist',
      };
    }

    await examRepository.deleteExamById(id);
  
    return {
      status: Status.Success,
    };
  },
}

export default examService;