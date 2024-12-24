import { body, validationResult } from 'express-validator';
import transactionModel from '../models/transactionModel.js';

// @desc Get all transactions
// @route GET api/v1/transactions
const getTransactions = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const transactions = await transactionModel.getTransactions(userId);
    res.status(200).json(transactions);
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

const validateTransaction = [
  body('description')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Description is required'),
  body('amount')
    .escape()
    .notEmpty()
    .withMessage('Amount is required')
    .isFloat({ gt: 0 })
    .withMessage('Amount must be greater than 0'),
  body('type')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Type is required')
    .custom((value) => {
      if (value === 'Income' || value === 'Expense') {
        return true;
      }
      throw new Error('Type must be either Income or Expense');
    }),
  body('date')
    .escape()
    .notEmpty()
    .withMessage('Date is required')
    .isDate()
    .withMessage('Wrong date format'),
  body('category')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Category is required'),
];

// @desc Add new transaction
// @route POST /api/v1/transactions
const addTransaction = [
  validateTransaction,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error(
          errors
            .array()
            .map((err) => err.msg)
            .join(', ')
        );
        throw error;
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
      error.status = 404;
      next(error);
    }
  },
];

export default { getTransactions, addTransaction };
