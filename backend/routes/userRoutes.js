import express from 'express';
import {
    authUser,
    getUserProfile,
    createUserProfile,
    updateUserProfile,
} from '../controllers/userController.js';
import { secure } from '../middleware/authHandler.js';

const router = express.Router();

router.post('/login', authUser);
router
    .route('/profile')
    .get(secure, getUserProfile)
    .put(secure, updateUserProfile);
router.route('/').post(createUserProfile);

export default router;
