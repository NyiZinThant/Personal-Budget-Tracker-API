import express from 'express';
import authController from '../controllers/authController';
import {
  addUserValidationRules,
  loginUserValidationRules,
} from '../validators/userValidator';
import validator from '../middlewares/validator';

const router = express.Router();

// routes /api/v1/
router.post(
  '/register',
  addUserValidationRules,
  validator,
  authController.registerUser
);
router.post(
  '/login',
  loginUserValidationRules,
  validator,
  authController.loginUser
);
export default router;
