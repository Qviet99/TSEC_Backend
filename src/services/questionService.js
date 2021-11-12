import questionRepository from '../data/repositories/questionRepository.js';
import topicRepository from '../data/repositories/topicRepository.js';
import exerciseRepository from '../data/repositories/exerciseRepository.js';
import examRepository from '../data/repositories/examRepository.js';
import {Status} from '../api/status.js';

const questionService = {
  createQuestion: async(question) => {
    const questionExist = await questionRepository.getQuestionByContent(question.questionContent);

    if (questionExist) {
      return {
        status: Status.Fail,
        message: 'Question already exist',
      };
    };

    const topicExist = await topicRepository.getTopicById(question.topicId);

    if (!topicExist) {
      return {
        status: Status.Fail,
        message: 'Topic not exist',
      };
    };

    if (question.type !== 'exam' && question.type !== 'exercise') {
      return {
        status: Status.Fail,
        message: 'Question type can only be exam or exercise',
      };
    };

    if (question.answerChoices.length < 2) {
      return {
        status: Status.Fail,
        message: 'Number of answer choices for question must be at least 2',
      };
    };

    if (!question.answerChoices.includes(question.answerRight)) {
      return {
        status: Status.Fail,
        message: 'Answer choices must contains right answer',
      };
    };

    const result = await questionRepository.createQuestion(question);
  
    return {
      status: Status.Success,
      result,
    };
  },

  getQuestionById: async(questionId) => {
    const result = await questionRepository.getQuestionById(questionId);

    if (!result) {
      return {
        status: Status.Fail,
        message: 'Question not exist',
      };
    }

    return {
      status: Status.Success,
      result,
    };
  },

  getAllExamTypeQuestion: async() => {
    const result = await questionRepository.getAllExamTypeQuestion();

    return {
      status: Status.Success,
      result,
    };
  },

  getAllExerciseTypeQuestion: async() => {
    const result = await questionRepository.getAllExerciseTypeQuestion();

    return {
      status: Status.Success,
      result,
    };
  },
  
  getAllQuestion: async() => {
    const result = await questionRepository.getAllQuestion();
  
    return {
      status: Status.Success,
      result,
    };
  },

  updateQuestion: async(id, question) => {
    const questionExist = await questionRepository.getQuestionById(id);

    if (!questionExist) {
      return {
        status: Status.Fail,
        message: 'Question not exist',
      };
    };

    const topicExist = await topicRepository.getTopicById(question.topicId);

    if (!topicExist) {
      return {
        status: Status.Fail,
        message: 'Topic not exist',
      };
    };

    const questionContentExist = await questionRepository.getQuestionByContent(question.questionContent);

    if (questionContentExist && questionContentExist._id.toString() !== id) {
      return {
        status: Status.Fail,
        message: 'Question with this content already exist',
      };
    };

    if (question.type !== 'exam' && question.type !== 'exercise') {
      return {
        status: Status.Fail,
        message: 'Question type can only be exam or exercise',
      };
    };

    if (question.answerChoices.length < 2) {
      return {
        status: Status.Fail,
        message: 'Number of answer choices for question must be at least 2',
      };
    };

    if (!question.answerChoices.includes(question.answerRight)) {
      return {
        status: Status.Fail,
        message: 'Answer choices must contains right answer',
      };
    };

    await questionRepository.updateQuestion(id, question);
  
    return {
      status: Status.Success,
    };
  },

  deleteQuestion: async(id) => {
    const questionExist = await questionRepository.getQuestionById(id);

    if (!questionExist) {
      return {
        status: Status.Fail,
        message: 'Question not exist',
      };
    }

    const exercises = await exerciseRepository.getExerciseByQuestionId(id);

    if (exercises.length > 0) {
      for (const exerciseId of exercises) {
        const exercise = await exerciseRepository.getExerciseById(exerciseId);
  
        if (exercise) {
          const {questionIds} = exercise
          const newQuestionIds = questionIds.filter((questionId) => questionId !== id);

          await exerciseRepository.updateExerciseById(exerciseId, {...exercise, questionIds: newQuestionIds});
        }
      };
    }

    const exams = await examRepository.getExamByQuestionId(id);

    if (exams.length > 0) {
      for (const examId of exams) {
        const exam = await examRepository.getExamById(examId);
  
        if (exam) {
          const {questionIds} = exam
          const newQuestionIds = questionIds.filter((questionId) => questionId !== id);

          await examRepository.updateExamById(examId, {...exam, questionIds: newQuestionIds});
        }
      };
    }

    await questionRepository.deleteQuestion(id);
  
    return {
      status: Status.Success,
    };
  },
}

export default questionService;