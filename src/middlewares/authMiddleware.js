const asynHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../Model/User');

const authMiddleware = asynHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const JWT_SECRET_KEY="keyhghgdhsds";
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decoded.id);
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorised, invalid token');
    }
  }
  if(!token){
    res.status(401);
    throw new Error("not suthorised, no token found");
  }
});

module.exports = authMiddleware;
