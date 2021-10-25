import levelRepository from '../data/repositories/levelRepository.js';
import {Status} from '../api/status.js';

const levelService = {
  createLevel: async(level) => {
    const {levelName, levelMinPoint, levelMaxPoint} = level;

    if (levelMaxPoint <= levelMinPoint) {
      return {
        status: Status.Fail,
        message: 'Max point must higher than min point',
      };
    }

    const levelNameExist = await levelRepository.getLevelByName(levelName);

    if (levelNameExist) {
      return {
        status: Status.Fail,
        message: `Level with name ${levelName} already exist`,
      };
    }

    const levelWithMinAndMaxExist = await levelRepository.getLevelByMinAndMaxPoint(levelMinPoint, levelMaxPoint);

    if (levelWithMinAndMaxExist) {
      return {
        status: Status.Fail,
        message: `Level with min point equal to ${levelMinPoint} and max point equal to ${levelMaxPoint} exist`,
      }; 
    }

    const result = await levelRepository.createLevel(level);
  
    return {
      status: Status.Success,
      result,
    };
  },

  getLevelById: async(levelId) => {
    const result = await levelRepository.getLevelById(levelId);

    if (!result) {
      return {
        status: Status.Fail,
        message: 'Level not exist',
      };
    }

    return {
      status: Status.Success,
      result,
    };
  },
  
  getAllLevel: async() => {
    const result = await levelRepository.getAllLevel();
  
    return {
      status: Status.Success,
      result,
    };
  },
}

export default levelService;