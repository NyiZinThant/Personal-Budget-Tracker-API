import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

// routes /api/v1/
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
export default router;
