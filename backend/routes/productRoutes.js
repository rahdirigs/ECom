import express from 'express';
import {
    createProduct,
    getProductById,
    getProducts,
    updateProduct,
    createProductReview,
} from '../controllers/productController.js';
import { admin, secure } from '../middleware/authHandler.js';

const router = express.Router();

router.route('/').get(getProducts).post(secure, admin, createProduct);
router.route('/:id/reviews').post(secure, createProductReview);
router.route('/:id').get(getProductById).put(secure, admin, updateProduct);

export default router;
