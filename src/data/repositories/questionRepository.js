import Question from '../schemas/question.js';

const questionRepository = {
  createQuestion: async(question) => {      
    const result = await Question.create({...question});
  
    return result;
  },

  getQuestionById: async(questionId) => {
    const result = await Question.findById(questionId);

    return result;
  },

  getQuestionByContent: async(questionContent) => {
    const result = await Question.findOne({questionContent});

    return result;
  },

  getAllExamTypeQuestion: async() => {
    const result = await Question.find({type: 'exam'});
  
    return result;
  },

  getAllExerciseTypeQuestion: async() => {
    const result = await Question.find({type: 'exercise'});
  
    return result;
  },
  
  getAllQuestion: async() => {
    const result = await Question.find();
  
    return result;
  },

  updateQuestion: async(id, question) => {
    const result = await Question.findByIdAndUpdate(id, {$set: {...question}});
  
    return result;
  },

  deleteQuestion: async(id) => {
    const result = await Question.deleteOne({_id: id});
  
    return result;
  },
}

export default questionRepository;