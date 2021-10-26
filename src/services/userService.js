import userRepository from '../data/repositories/userRepository.js';
import {Status} from '../api/status.js';
import authRepository from '../data/repositories/authRepository.js';

const userService = {
  createUserInformation: async(user) => {
    const userExist = await userRepository.getUserInformationByAccountId(user.accountId);

    if (userExist) {
      return {
        status: Status.Fail,
        message: 'User Already Exist',
      };
    }

    const result = await userRepository.createUserInformation(user);
      
    return {
      status: Status.Success,
      result,
    };
  },
  
  getUserInformation: async(accountId) => {
    const result = await userRepository.getUserInformationByAccountId(accountId);
      
    return {
      status: Status.Success,
      result,
    };
  },

  updateUserInformation: async(id, user, email) => {
    const result = await userRepository.updateUserInformation(id, user);

    if (email) await authRepository.updateAccountById(user.accountId, email);
      
    return {
      status: Status.Success,
      result,
    };
  },
}

export default userService;