import { NextFunction, Request, Response } from 'express';
import categoryModel from '../models/categoryModel';
import ExpressError from '../CustomErrors/ExpressError';

// @desc Get all categories
// @route GET /api/v1/categories
const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await categoryModel.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    if (error instanceof Error) error = new ExpressError(error.message, 404);
    next(error);
  }
};
export default { getCategories };
