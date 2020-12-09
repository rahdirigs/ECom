import express from 'express';
import {
    authUser,
    getUserProfile,
    createUserProfile,
} from '../controllers/userController.js';
import { secure } from '../middleware/authHandler.js';

const router = express.Router();

router.post('/login', authUser);
router.route('/profile').get(secure, getUserProfile);
router.route('/').post(createUserProfile);

export default router;
