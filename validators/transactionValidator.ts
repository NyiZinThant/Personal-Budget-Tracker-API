import { body } from 'express-validator';

export const addTransactionValidationRules = [
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
