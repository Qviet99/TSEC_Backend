import {Status} from '../status.js';
import userService from '../../services/userService.js';

const userController = {
  //Create
  createUserInformation: async(req, res , next) => {
    const {user} = req.body;
          
    const result = await userService.createUserInformation(user);
      
    return res.send(result);
  },

  //Read
  getUserInformation: async(req, res , next) => {
    const {id} = req.params;

    if (id !== req.user._id && req.role !== 'admin') {
      return res.send({
        status: Status.Fail,
        message: 'User do not have permission',
      });
    }

    const result = await userService.getUserInformation(id);

    return res.send(result);
  },

  //Update
  updateUserInformation: async(req, res , next) => {
    const {id} = req.params;
    const {user} = req.body;

    if (id !== req.user._id && req.role !== 'Admin') {
      return res.send({
        status: Status.Fail,
        message: 'User do not have permission',
      });
    }

    const result = await userService.updateUserInformation(id, user);

    return res.send(result);
  },
}

export default userController;