import express from 'express';
import transactionController from './../controllers/transactionController.js';

const router = express.Router();

// routes /api/v1/transactions
router.get('/', transactionController.getTransactions);

router.post('/', transactionController.addTransaction);

export default router;
