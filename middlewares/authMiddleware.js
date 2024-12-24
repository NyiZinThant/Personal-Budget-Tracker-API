import jwt from 'jsonwebtoken';
import jwtHelper from '../helpers/jwtHelper.js';
export default function authMiddleware(req, res, next) {
  try {
    const token = req.header('Authorization');
    if (!token) {
      const error = new Error('Token was not provided');
      throw error;
    }
    const user = jwt.verify(token.split(' ')[1], jwtHelper.secretKey);
    req.user = user;
    next();
  } catch (error) {
    error.status = 401;
    throw error;
  }
}
