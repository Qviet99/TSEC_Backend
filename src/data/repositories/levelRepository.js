import Level from '../schemas/level.js';

const levelRepository = {
  createLevel: async(level) => {      
    const result = await Level.create({...level});
  
    return result;
  },

  getLevelByName: async(levelName) => {
    const result = await Level.findOne({levelName});

    return result;
  },

  getLevelById: async(levelId) => {
    const result = await Level.findById(levelId);

    return result;
  },

  getLevelByMark: async(mark) => {
    const result = await Level.findOne({$and: [{levelMinPoint: { $lte: mark } }, { levelMaxPoint: { $gte: mark }}]});

    return result;
  },

  getLevelByMinAndMaxPoint: async(min, max) => {
    const result = await Level.findOne({$and: [{levelMinPoint: { $eq: min } }, { levelMaxPoint: { $eq: max }}]});

    return result;
  },
  
  getAllLevel: async() => {
    const result = await Level.find();
  
    return result;
  },
}

export default levelRepository;