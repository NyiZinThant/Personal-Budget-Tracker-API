import { body } from 'express-validator';

export const addUserValidationRules = [
  body('fullName')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Full Name is required'),
  body('email')
    .escape()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  body('dob')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Date of birth is required')
    .isDate({ format: 'yyyy-mm-dd' })
    .withMessage('Wrong date format'),
  body('gender')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Gender is required')
    .custom((value) => {
      if (value === 'Male' || value === 'Female' || value === 'Other') {
        return true;
      }
      throw new Error('Gender must be either Male, Female or Other');
    }),
  body('password')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
];

export const loginUserValidationRules = [
  body('email')
    .escape()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  body('password')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
];
