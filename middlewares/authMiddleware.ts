import jwt, { JwtPayload } from 'jsonwebtoken';
import jwtHelper from '../helpers/jwtHelper';
import { NextFunction, Request, Response } from 'express';
import ExpressError from '../CustomErrors/ExpressError';
interface UserJwtPayload extends JwtPayload {
  id: string;
  fullName: string;
}
export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.header('Authorization');
    if (!token) {
      const error = new Error('Token was not provided');
      throw error;
    }
    const payload = jwt.verify(token.split(' ')[1], jwtHelper.secretKey);
    req.user = payload as UserJwtPayload;
    next();
  } catch (error) {
    if (error instanceof Error) error = new ExpressError(error.message, 401);
    throw error;
  }
}
