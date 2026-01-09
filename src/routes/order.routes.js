import express from 'express';
import { checkout } from '../controllers/order.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/checkout', authenticate, checkout);

export default router;
