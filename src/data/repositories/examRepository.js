import Exam from '../schemas/exam.js';

const examRepository = {
  createExam: async(exam) => {
    const result = await Exam.create({...exam});
  
    return result;
  },

  getExamById: async(id) => {
    const result = await Exam.findById(id);

    return result;
  },

  getExamByQuestionId: async(questionId) => {
    const result = await Exam.find({questionIds: questionId}).populate({path: 'questionIds', select: 'questionContent answerChoices'});

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