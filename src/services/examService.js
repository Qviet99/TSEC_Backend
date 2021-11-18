import questionRepository from '../data/repositories/questionRepository.js';
import examRepository from '../data/repositories/examRepository.js';
import courseRepository from '../data/repositories/courseRepository.js';
import levelRepository from '../data/repositories/levelRepository.js';
import authRepository from '../data/repositories/authRepository.js';
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

  getExamResult: async(userId, id, data) => {
    let mark = 0;
    let totalMark = 0;
    let message;
    let courses = [];

    const exam = await examRepository.getExamById(id);

    if (exam.questionIds.length > 0) {
      for (const questionId of exam.questionIds) {
        const question = await questionRepository.getQuestionById(questionId._id);

        if (question) {
          totalMark = totalMark + question.mark;
          data.forEach(value => {
            if (value._id === question._id.toString() && value.answer === question.answerRight) {
              mark = mark + question.mark;
            }
          })
        }
      }
    }

    const courseLevel = await levelRepository.getLevelByMark(mark + 50);

    if (!courseLevel) message = 'Currently there are no Course suitable for you';
    else courses = await courseRepository.getAllCourseByLevelId(courseLevel._id);

    const latestTestResult = `${mark}/${totalMark}`;

    await authRepository.updateAccountById(userId, {lastExamResult: latestTestResult});

    return {
      status: Status.Success,
      result: {
        totalMark,
        mark,
        courses,
        message,
      },
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