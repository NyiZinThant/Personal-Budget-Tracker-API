import jwt from 'jsonwebtoken';
import jwtHelper from '../helpers/jwtHelper.js';
export default function authMiddleware(req, res, next) {
  const token = req.header('Authorization');
  console.log(token);
  if (!token) {
    const error = new Error('Token was not provided');
    error.status = 200;
    throw error;
  }
  const user = jwt.verify(token.split(' ')[1], jwtHelper.secretKey);
  req.user = user;
  next();
}
