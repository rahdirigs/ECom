import express from 'express';
import { addOrderItems } from '../controllers/orderController.js';
import { secure } from '../middleware/authHandler.js';

const router = express.Router();

router.route('/').post(secure, addOrderItems);

export default router;
