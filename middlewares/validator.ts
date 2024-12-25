import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ExpressMultiError } from '../CustomErrors/ExpressError';

export default function validator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new ExpressMultiError(
      'Invalid Input',
      400,
      errors.array().map((err) => err.msg)
    );
    throw error;
  }
  next();
}
