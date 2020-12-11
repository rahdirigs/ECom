import express from 'express';
import {
    authUser,
    getUserProfile,
    createUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    updateUser,
} from '../controllers/userController.js';
import { admin, secure } from '../middleware/authHandler.js';

const router = express.Router();

router.route('/').post(createUserProfile).get(secure, admin, getUsers);
router.post('/login', authUser);
router
    .route('/profile')
    .get(secure, getUserProfile)
    .put(secure, updateUserProfile);
router
    .route('/:id')
    .get(secure, admin, getUserById)
    .put(secure, admin, updateUser);

export default router;
