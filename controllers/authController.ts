import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel';
import jwtHelper from '../helpers/jwtHelper';
import { NextFunction, Request, Response } from 'express';
import ExpressError from '../CustomErrors/ExpressError';
// @desc Add new user
// @route GET /api/v1/register
const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, email, dob, gender, password } = req.body;
    const users = await userModel.getUserByEmail(email);
    if (users.length > 0) {
      const error = new ExpressError('Email already exists', 409);
      throw error;
    }
    await userModel.addUser(fullName, email, dob, gender, password);
    res.sendStatus(201);
  } catch (error) {
    if (error instanceof Error) error = new ExpressError(error.message, 404);
    next(error);
  }
};
// @desc Login the user
// @route GET /api/v1/login
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const [user] = await userModel.getUserByEmail(email);
    // incorrect email
    if (!user) {
      let error = new ExpressError('The email or password is incorrect.', 401);
      throw error;
    }
    const result = await bcrypt.compare(password, user.password);
    // incorrect password
    if (!result) {
      let error = new ExpressError('The email or password is incorrect.', 401);
      throw error;
    }
    const payload = { id: user.id, fullName: user.fullName };
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
    if (error instanceof Error) error = new ExpressError(error.message, 404);
    next(error);
  }
};
export default { registerUser, loginUser };
