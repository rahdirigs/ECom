import express from 'express';
import {
    addOrderItems,
    getMyOrders,
    getOrderbyId,
    updateOrderToPaid,
} from '../controllers/orderController.js';
import { secure } from '../middleware/authHandler.js';

const router = express.Router();

router.route('/').post(secure, addOrderItems);
router.route('/myorders').get(secure, getMyOrders);
router.route('/:id').get(secure, getOrderbyId);
router.route('/:id/pay').put(secure, updateOrderToPaid);

export default router;
