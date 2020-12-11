import express from 'express';
import {
    addOrderItems,
    getMyOrders,
    getOrderbyId,
    getOrders,
    updateOrderToDelivered,
    updateOrderToPaid,
} from '../controllers/orderController.js';
import { secure, admin } from '../middleware/authHandler.js';

const router = express.Router();

router.route('/').post(secure, addOrderItems).get(secure, admin, getOrders);
router.route('/myorders').get(secure, getMyOrders);
router.route('/:id').get(secure, getOrderbyId);
router.route('/:id/pay').put(secure, updateOrderToPaid);
router.route('/:id/deliver').put(secure, admin, updateOrderToDelivered);

export default router;
