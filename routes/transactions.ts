import express from 'express';
import transactionController from '../controllers/transactionController';
import { addTransactionValidationRules } from '../validators/transactionValidator';
import validator from '../middlewares/validator';

const router = express.Router();

// routes /api/v1/transactions
router.get('/', transactionController.getTransactions);

router.post(
  '/',
  addTransactionValidationRules,
  validator,
  transactionController.addTransaction
);

export default router;
