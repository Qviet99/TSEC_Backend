import exerciseService from '../../services/exerciseService.js';

const exerciseController = {
  //Create
  createExercise: async(req, res , next) => {
    const {exercise} = req.body;

    const result = await exerciseService.createExercise(exercise);
  
    return res.send(result);
  },

  getExerciseResult: async(req, res , next) => {
    const {id} = req.params;
    const {data} = req.body;

    const result = await exerciseService.getExerciseResult(id, data);
  
    return res.send(result);
  }, 

  //Read
  getExercise: async(req, res , next) => {
    const {id} = req.params;
    const result = await exerciseService.getExerciseById(id);

    return res.send(result);
  },
  
  //Read All
  getAllExercise: async(req, res , next) => {
    const result = await exerciseService.getAllExercise();
  
    return res.send(result);
  },

  //Update
  updateExercise: async(req, res , next) => {
    const {id} = req.params;
    const {exercise} = req.body;
    const result = await exerciseService.updateExercise(id, exercise);
  
    return res.send(result);
  },

  //Delete
  deleteExercise: async(req, res , next) => {
    const {id} = req.params;
    const result = await exerciseService.deleteExercise(id);
  
    return res.send(result);
  },
}

export default exerciseController;