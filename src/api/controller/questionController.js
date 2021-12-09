import questionService from '../../services/questionService.js';

const questionController = {
  //Create
  createQuestion: async(req, res , next) => {
    const {question} = req.body;

    const questionData = {
      ...question,
      questionContent: question.questionContent.trim(),
    }

    const result = await questionService.createQuestion(questionData);
  
    return res.send(result);
  },

  //Read
  getQuestion: async(req, res , next) => {
    const {id} = req.params;
    const result = await questionService.getQuestionById(id);

    return res.send(result);
  },

  getDocumentQuestion: async(req, res , next) => {
    const {id} = req.params;
    const result = await questionService.getDocumentQuestionByDocId(id);

    return res.send(result);
  },

  //Read All Exam Type Question
  getAllExamTypeQuestion: async(req, res , next) => {
    const result = await questionService.getAllExamTypeQuestion();
  
    return res.send(result);
  },

  //Read All Exercise Type Question
  getAllExerciseTypeQuestion: async(req, res , next) => {
    const result = await questionService.getAllExerciseTypeQuestion();
  
    return res.send(result);
  },
  
  //Read All
  getAllQuestion: async(req, res , next) => {
    const result = await questionService.getAllQuestion();
  
    return res.send(result);
  },

  //Update
  updateQuestion: async(req, res , next) => {
    const {id} = req.params;
    const {question} = req.body;
    const result = await questionService.updateQuestion(id, question);
  
    return res.send(result);
  },

  //Delete
  deleteQuestion: async(req, res , next) => {
    const {id} = req.params;
    const result = await questionService.deleteQuestion(id);
  
    return res.send(result);
  },
}

export default questionController;