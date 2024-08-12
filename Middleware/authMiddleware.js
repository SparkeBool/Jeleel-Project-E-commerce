const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

exports.protect = async (req, res, next) => {
  let token = req.cookies.accessToken;

   if (!token) {
    throw new Error();
  }

    try {

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findOne(decoded._id);

    if(!req.user){
        throw new Error();
       
      }

      next();
    } catch (error) {
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  
 
};
