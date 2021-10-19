import Account from '../schemas/account.js';

const authRepository = {
  createAccount: async(account) => {
    const result = await Account.create({...account});
  
    return result;
  },

  getAccountByUsername: async(username) => {
    const result = await Account.findOne({username});

    return result;
  },

  getAccountById: async(id) => {
    const result = await Account.findById(id);

    return result;
  },
  
  getAllAccount: async() => {
    const result = await Account.find();
  
    return result;
  },

  updateAccountById: async(id, account) => {
    const result = await Account.findByIdAndUpdate(id, {$set: {...account}});

    return result;
  },

  deleteAccountById: async(id) => {
    const result = await Account.deleteOne({_id: id});

    return result;
  },
}

export default authRepository;