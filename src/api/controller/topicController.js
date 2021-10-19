import topicService from '../../services/topicService.js';

const topicController = {
  //Create
  createTopic: async(req, res , next) => {
    const {topic} = req.body;
    const result = await topicService.createTopic(topic);
  
    return res.send(result);
  },

  //Read
  getTopic: async(req, res , next) => {
    const {id} = req.params;
    const result = await topicService.getTopicById(id);

    return res.send(result);
  },
  
  //Read All
  getAllTopic: async(req, res , next) => {
    const result = await topicService.getAllTopic();
  
    return res.send(result);
  },
}

export default topicController;