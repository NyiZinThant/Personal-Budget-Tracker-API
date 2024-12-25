import { NextFunction, Request, Response } from 'express';
import ExpressError, { ExpressMultiError } from '../CustomErrors/ExpressError';

const errorHandler = (
  err: ExpressError | ExpressMultiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.message);
  if (err instanceof ExpressMultiError) {
    res
      .status(err?.status || 500)
      .json({ message: err.message, errors: err.errors });
    return;
  }

  res.status(err?.status || 500).json({ message: err.message });
};

export default errorHandler;
