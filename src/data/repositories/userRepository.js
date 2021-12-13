import User from '../schemas/user.js';

const userRepository = {
  createUserInformation: async(user) => {
    const result = await User.create({...user});
      
    return result;
  },

  getAllUser: async () => {
    const result = await User.find();

    return result;
  },

  getUserInformationByAccountId: async (accountId) => {
    const result = await User.findOne({accountId}).populate({path: 'accountId', select: 'lastExamResult'});

    return result;
  },

  updateUserInformation: async(id, user) => {
    const result = await User.findOneAndUpdate({accountId: id}, {...user}, {new: true});

    return result;
  },

  deleteUserInformationByAccountId: async(id) => {
    const result = await User.deleteOne({accountId: id});

    return result;
  },
}

export default userRepository;