import questionRepository from '../data/repositories/questionRepository.js';
import exerciseRepository from '../data/repositories/exerciseRepository.js';
import {Status} from '../api/status.js';

const exerciseService = {
  createExercise: async(exercise) => {
    const {questionIds} = exercise;
    const listOfQuestionIdNotAvailable = [];
    const listOfQuestionWrongType = [];

    for (const id of questionIds) {
      const question = await questionRepository.getQuestionById(id);

      if (!question) {
        listOfQuestionIdNotAvailable.push(id);
      }

      if (question.type !== 'exercise') {
        listOfQuestionWrongType.push(id);
      }
    };

    if (listOfQuestionIdNotAvailable.length > 0) {
      return {
        status: Status.Success,
        message: 'Exercise contain some unavailable question',
        list: listOfQuestionIdNotAvailable,
      };
    }

    if (listOfQuestionWrongType.length > 0) {
      return {
        status: Status.Success,
        message: 'Exercise contain some exam type question',
        list: listOfQuestionWrongType,
      };
    }

    const result = await exerciseRepository.createExercise(exercise);
  
    return {
      status: Status.Success,
      result,
    };
  },

  getExerciseById: async(exerciseId) => {
    const result = await exerciseRepository.getExerciseById(exerciseId);

    if (!result) {
      return {
        status: Status.Fail,
        message: 'Exercise not exist',
      };
    }

    return {
      status: Status.Success,
      result,
    };
  },

  getAllExercise: async() => {
    const result = await exerciseRepository.getAllExercise();

    return {
      status: Status.Success,
      result,
    };
  },
  
  updateExercise: async(id, exercise) => {
    const {questionIds} = exercise;
    const listOfQuestionIdNotAvailable = [];
    const listOfQuestionWrongType = [];

    const exerciseExist = await exerciseRepository.getExerciseById(id);

    if (!exerciseExist) {
      return {
        status: Status.Fail,
        message: 'Exercise not exist',
      };
    }

    for (const id of questionIds) {
      const question = await questionRepository.getQuestionById(id);

      if (!question) {
        listOfQuestionIdNotAvailable.push(id);
      }

      if (question.type !== 'exercise') {
        listOfQuestionWrongType.push(id);
      }
    };

    if (listOfQuestionIdNotAvailable.length > 0) {
      return {
        status: Status.Success,
        message: 'Exercise contain some unavailable question',
        list: listOfQuestionIdNotAvailable,
      };
    }

    if (listOfQuestionWrongType.length > 0) {
      return {
        status: Status.Success,
        message: 'Exercise contain some exam type question',
        list: listOfQuestionWrongType,
      };
    }

    await exerciseRepository.updateExerciseById(id, exercise);
  
    return {
      status: Status.Success,
    };
  },

  deleteExercise: async(id) => {
    const exerciseExist = await exerciseRepository.getExerciseById(id);

    if (!exerciseExist) {
      return {
        status: Status.Fail,
        message: 'Exercise not exist',
      };
    }

    await exerciseRepository.deleteExerciseById(id);
  
    return {
      status: Status.Success,
    };
  },
}

export default exerciseService;