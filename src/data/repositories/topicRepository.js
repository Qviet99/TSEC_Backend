import Topic from '../schemas/topic.js';

const topicRepository = {
  createTopic: async(topic) => {      
    const result = await Topic.create({...topic});
  
    return result;
  },

  getTopicById: async(topicId) => {
    const result = await Topic.findById(topicId);

    return result;
  },
  
  getTopicByName: async(topicName) => {
    const result = await Topic.findOne({name: topicName});

    return result;
  },
  
  getAllTopic: async() => {
    const result = await Topic.find();
  
    return result;
  },
}

export default topicRepository;