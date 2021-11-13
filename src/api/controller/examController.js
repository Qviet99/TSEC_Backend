import examService from '../../services/examService.js';

const examController = {
  //Create
  createExam: async(req, res , next) => {
    const {exam} = req.body;

    const result = await examService.createEam(exam);
  
    return res.send(result);
  },

  getExamResult: async(req, res , next) => {
    const {id} = req.params;
    const {data} = req.body;
    const result = await examService.getExamResult(id, data);

    return res.send(result);
  },

  //Read
  getExam: async(req, res , next) => {
    const {id} = req.params;
    const result = await examService.getExamById(id);

    return res.send(result);
  },
  
  //Read All
  getAllExam: async(req, res , next) => {
    const result = await examService.getAllExam();
  
    return res.send(result);
  },

  //Update
  updateExam: async(req, res , next) => {
    const {id} = req.params;
    const {exam} = req.body;
    const result = await examService.updateExam(id, exam);
  
    return res.send(result);
  },

  //Delete
  deleteExam: async(req, res , next) => {
    const {id} = req.params;
    const result = await examService.deleteExam(id);
  
    return res.send(result);
  },
}

export default examController;