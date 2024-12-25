import express from 'express';
import categoryController from '../controllers/categoryController';

const router = express.Router();

// routes /api/v1/categories
router.get('/', categoryController.getCategories);

export default router;
