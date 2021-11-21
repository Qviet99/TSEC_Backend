import Exercise from '../schemas/exercise.js';

const exerciseRepository = {
  createExercise: async(exercise) => {
    const result = await Exercise.create({...exercise});
  
    return result;
  },

  getExerciseById: async(id) => {
    const result = await Exercise.findById(id).populate({path: 'questionList', select: 'questionContent answerChoices mark'});

    return result;
  },

  getExerciseByQuestionId: async(questionId) => {
    const result = await Exercise.find({questionIds: questionId});

    return result;
  },
  
  getAllExercise: async() => {
    const result = await Exercise.find();
  
    return result;
  },

  updateExerciseById: async(id, exercise) => {
    const result = await Exercise.findByIdAndUpdate(id, {$set: {...exercise}});

    return result;
  },

  deleteExerciseById: async(id) => {
    const result = await Exercise.deleteOne({_id: id});

    return result;
  },
}

export default exerciseRepository;