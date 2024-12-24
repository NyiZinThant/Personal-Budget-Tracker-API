import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwtHelper from '../helpers/jwtHelper.js';
const validateUser = [
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

// @desc Add new user
// @route GET /api/v1/register
const registerUser = [
  validateUser,
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
      const { fullName, email, dob, gender, password } = req.body;
      const users = await userModel.getUserByEmail(email);
      if (users.length > 0) {
        const error = new Error('Email already exists');
        error.status = 409;
        throw error;
        return;
      }
      await userModel.addUser(fullName, email, dob, gender, password);
      res.sendStatus(201);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  },
];
const validateUserLogin = [
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
// @desc Login the user
// @route GET /api/v1/login
const loginUser = [
  validateUserLogin,
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
      const { email, password } = req.body;
      const [user] = await userModel.getUserByEmail(email);
      // incorrect email
      if (!user) {
        const error = new Error('The email or password is incorrect.');
        error.status = 401;
        throw error;
      }
      const result = await bcrypt.compare(password, user.password);
      // incorrect password
      if (!result) {
        const error = new Error('The email or password is incorrect.');
        error.status = 401;
        throw error;
      }
      const payload = { id: user.id, fullName: user.full_name };
      const token = jwtHelper.generateToken(payload);
      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          fullName: user.full_name,
          email: user.email,
        },
      });
    } catch (error) {
      error.status = 404;
      next(error);
    }
  },
];
export default { registerUser, loginUser };
