import express from 'express';
import transactionController from './../controllers/transactionController.js';

const router = express.Router();

// routes /api/v1/categories
router.get('/', transactionController.getTransactions);

export default router;
