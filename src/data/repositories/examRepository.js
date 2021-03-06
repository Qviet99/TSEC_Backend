import Exam from '../schemas/exam.js';

const examRepository = {
  createExam: async(exam) => {
    const result = await Exam.create({...exam});
  
    return result;
  },

  getExamById: async(id) => {
    const result = await Exam.findById(id).populate({path: 'questionList', select: 'questionContent answerChoices mark questionDocumentId', populate: {path: 'questionDocumentId'}});
    
    return result;
  },

  getExamByQuestionId: async(questionId) => {
    const result = await Exam.find({questionIds: questionId});

    return result;
  },
  
  getAllExam: async() => {
    const result = await Exam.find();
  
    return result;
  },

  updateExamById: async(id, exam) => {
    const result = await Exam.findByIdAndUpdate(id, {$set: {...exam}});

    return result;
  },

  deleteExamById: async(id) => {
    const result = await Exam.deleteOne({_id: id});

    return result;
  },
}

export default examRepository;