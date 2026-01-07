import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { storeOrder, myOrders } from '../controllers/order.controller.js';

const router = express.Router();

router.post('/', authenticate, storeOrder);
router.get('/my', authenticate, myOrders);

export default router;
