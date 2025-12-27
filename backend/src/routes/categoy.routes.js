import express from 'express';
import { getCategories, createCategory } from '../controllers/category.controller.js';
import { protect, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', protect, isAdmin, createCategory);

export default router;
