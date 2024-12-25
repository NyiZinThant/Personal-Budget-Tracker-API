import { body, validationResult } from 'express-validator';
import transactionModel from '../models/transactionModel';
import { NextFunction, Request, Response } from 'express';
import ExpressError from '../CustomErrors/ExpressError';

// @desc Get all transactions
// @route GET api/v1/transactions
const getTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new Error('Unkown user');
    }
    const userId = req.user.id;
    const transactions = await transactionModel.getTransactions(userId);
    res.status(200).json(transactions);
  } catch (error) {
    if (error instanceof Error) error = new ExpressError(error.message, 404);
    next(error);
  }
};

// @desc Add new transaction
// @route POST /api/v1/transactions
const addTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new Error('Unkown user');
    }
    const userId = req.user.id;
    const { description, amount, type, date, category } = req.body;
    await transactionModel.addTransaction(
      description,
      amount,
      type,
      category,
      date,
      userId
    );
    res.sendStatus(201);
  } catch (error) {
    if (error instanceof Error) error = new ExpressError(error.message, 404);
    next(error);
  }
};

export default { getTransactions, addTransaction };
