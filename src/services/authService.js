import jwt from 'jsonwebtoken';

import authRepository from '../data/repositories/authRepository.js';
import userRepository from '../data/repositories/userRepository.js';
import {Status} from '../api/status.js';

const authService = {
  login: async(account) => {
    const {username, password} = account;

    const result = await authRepository.getAccountByUsername(username);

    if (!result) {
      return {
        status: Status.Fail,
        message: 'User Not Found',
      };
    }

    const tokenInform = {
      _id: result._id, 
      email: result.email,
      username: result.username,
      role: result.role,
      avatarUrl: result.avatarUrl,
    }
      
    if(!password === result.password) {
      return {
        status: Status.Fail,
        message: 'Invalid username or password',
      };
    }
    
    const token = generateToken(tokenInform);

    return {
      status: Status.Success,
      result: {
        token,
      }
    }
  },
  
  createAccount: async(account) => {
    const {username} = account;
    
    const isAccountExist = await authRepository.getAccountByUsername(username);

    if (isAccountExist) {
      return {
        status: Status.Fail,
        message: 'username already exist',
      };
    }

    const result = await authRepository.createAccount(account);
      
    return {
      status: Status.Success,
      result,
    };
  },

  getAccountById: async(id) => {
    const result = await authRepository.getAccountById(id);

    if (!result) {
      return {
        status: Status.Fail,
        message: 'account not exist',
      }; 
    }

    return {
      status: Status.Success,
      result,
    };
  },
  
  getAllAccount: async() => {
    const result = await authRepository.getAllAccount();
      
    return {
      status: Status.Success,
      result,
    };
  },

  updateAccount: async(id, account) => {
    const isAccountExist = await authRepository.getAccountById(id);

    if (!isAccountExist) {
      return {
        status: Status.Fail,
        message: 'account not exist',
      };
    }

    await authRepository.updateAccountById(id, account);
      
    return {
      status: Status.Success,
    };
  },

  deleteAccount: async(id) => {
    const isAccountExist = await authRepository.getAccountById(id);

    if (!isAccountExist) {
      return {
        status: Status.Fail,
        message: 'account not exist',
      };
    }

    await authRepository.deleteAccountById(id);

    await userRepository.deleteUserInformationByAccountId(id);
      
    return {
      status: Status.Success,
    };
  },
}

export default authService;

function generateToken(
  user
) {
  return jwt.sign(
    {
      user: {_id: user._id, email: user.email, username: user.username},
      role: user.role,
      avatarUrl: user.avatarUrl,
    },
    'C2SE05_TSEC',
    {
      issuer: 'TSEC',
      audience: 'client',
      expiresIn: '24h',
    },
  );
}
