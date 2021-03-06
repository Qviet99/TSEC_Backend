import jwt from 'jsonwebtoken';

import authRepository from '../data/repositories/authRepository.js';
import userRepository from '../data/repositories/userRepository.js';
import {Status} from '../api/status.js';
import cloudinary from 'cloudinary';

cloudinary.v2.config({ 
  cloud_name: 'dadfrogge', 
  api_key: '298641532422734', 
  api_secret: 'I3SrVfkDmYLkMT-v6-oACsih9is' 
});

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

  getUserAvatarUrl: async(id) => {
    const result = await authRepository.getAccountById(id);

    return {
      status: Status.Success,
      result: {
        avatarUrl: result.avatarUrl,
      }
    }
  },

  createAccountByAdmin: async(account) => {
    const isAccountExist = await authRepository.getAccountByUsername(account.username);

    if (isAccountExist) {
      return {
        status: Status.Fail,
        message: 'username already exist',
      };
    }

    const result = await authRepository.createAccount({...account});

    const user = {
      accountId: result._id,
      fullName: "new Account",
      phoneNumber: "0800000000",
      dayOfBirth: new Date(),
      gender: "male",
      address: "",
    }

    await userRepository.createUserInformation({...user});
      
    return {
      status: Status.Success,
      result,
    };
  },
  
  createAccount: async(account) => {
    const {registerData, userData} = account;

    const {username} = registerData
    
    const isAccountExist = await authRepository.getAccountByUsername(username);

    if (isAccountExist) {
      return {
        status: Status.Fail,
        message: 'username already exist',
      };
    }

    const result = await authRepository.createAccount({...registerData, role: 'learner'});

    const user = {
      accountId: result._id,
      fullName: "",
      phoneNumber: "",
      dayOfBirth: new Date(),
      gender: "",
      address: "",
    }

    await userRepository.createUserInformation({...user, ...userData});
      
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

  deleteImageUrl: async(id) => {
    if (id === 'cbsjxuqbsjwni4dysbam') return;

    const result = await cloudinary.v2.uploader.destroy(id);

    return result;
  },

  deleteAudioUrl: async(id) => {
    const result = await cloudinary.v2.uploader.destroy(id, {resource_type: "audio"});

    return result;
  },

  deleteVideoUrl: async(id) => {
    const result = await cloudinary.v2.uploader.destroy(id, {resource_type: "video"});

    return result;
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
    },
    'C2SE05_TSEC',
    {
      issuer: 'TSEC',
      audience: 'client',
      expiresIn: '72h',
    },
  );
}
