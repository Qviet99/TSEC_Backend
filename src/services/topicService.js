import topicRepository from '../data/repositories/topicRepository.js';
import {Status} from '../api/status.js';

const topicService = {
  createTopic: async(topic) => {
    const topicExist = await topicRepository.getTopicByName(topic.name);

    if(topicExist) {
      return {
        status: Status.Fail,
        message: 'Topic already exist',
      };
    }

    const result = await topicRepository.createTopic(topic);
  
    return {
      status: Status.Success,
      result,
    };
  },

  getTopicById: async(topicId) => {
    const result = await topicRepository.getTopicById(topicId);

    if (!result) {
      return {
        status: Status.Fail,
        message: 'Topic not exist',
      };
    }

    return {
      status: Status.Success,
      result,
    };
  },
  
  getAllTopic: async() => {
    const result = await topicRepository.getAllTopic();
  
    return {
      status: Status.Success,
      result,
    };
  },
}

export default topicService;