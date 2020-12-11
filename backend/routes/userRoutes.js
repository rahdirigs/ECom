import express from 'express';
import {
    authUser,
    getUserProfile,
    createUserProfile,
    updateUserProfile,
} from '../controllers/userController.js';
import { secure } from '../middleware/authHandler.js';

const router = express.Router();

router.route('/').post(createUserProfile);
router.post('/login', authUser);
router
    .route('/profile')
    .get(secure, getUserProfile)
    .put(secure, updateUserProfile);

export default router;
