import levelService from '../../services/levelService.js';

const levelController = {
  //Create
  createLevel: async(req, res , next) => {
    const {level} = req.body;
    const result = await levelService.createLevel(level);
  
    return res.send(result);
  },

  //Read
  getLevel: async(req, res , next) => {
    const {id} = req.params;
    const result = await levelService.getLevelById(id);

    return res.send(result);
  },
  
  //Read All
  getAllLevel: async(req, res , next) => {
    const result = await levelService.getAllLevel();
  
    return res.send(result);
  },
}

export default levelController;