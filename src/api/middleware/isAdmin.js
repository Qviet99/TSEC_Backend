import {Status} from '../status.js';
export async function isAdmin(req, res, next) {
  if (req.role !== 'admin') {
    return res.send({
      status: Status.Fail,
      message: 'Forbidden Access',
    });
  }
    
  return next();
};
