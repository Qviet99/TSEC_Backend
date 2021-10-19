export default async (req, res, next) => {
  const decodedToken = req.token;
  
  req.user = decodedToken.user;
  req.role = decodedToken.role;
  
  return next();
};