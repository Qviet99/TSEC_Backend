import authService from '../../services/authService.js';

const authController = {
  login: async(req, res , next) => {
    const {account} = req.body;
    const result = await authService.login(account);
    
    return res.send(result);
  },

  //Create
  createAccount: async(req, res , next) => {
    const {account} = req.body;
    const result = await authService.createAccount(account);

    return res.send(result);
  },

  getUserAvatarUrl: async(req, res , next) => {
    const {id} = req.params;
    const result = await authService.getUserAvatarUrl(id);

    return res.send(result);
  },

  //Read
  getAccount: async(req, res , next) => {
    const {id} = req.params;
    const result = await authService.getAccountById(id);

    return res.send(result);
  },

  //Read All
  getAllAccount: async(req, res , next) => {
    const result = await authService.getAllAccount();

    return res.send(result);
  },

  //Update
  updateAccount: async(req, res , next) => {
    const {id} = req.params;
    const {account} = req.body;

    delete account.username;
  
    const result = await authService.updateAccount(id, account);

    return res.send(result);
  },

  //Delete
  deleteAccount: async(req, res , next) => {
    const {id} = req.params;
    const result = await authService.deleteAccount(id);

    return res.send(result);
  },


  deleteImageUrl: async(req, res, next) => {
    const {id} = req.params;
    const result = await authService.deleteImageUrl(id);

    return res.send(result);
  },

  deleteAudioUrl: async(req, res, next) => {
    const {id} = req.params;
    const result = await authService.deleteAudioUrl(id);

    return res.send(result);
  },
}

export default authController