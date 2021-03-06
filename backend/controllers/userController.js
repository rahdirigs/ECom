import User from '../models/user.js';
import asyncHandler from 'express-async-handler';
import generateJWT from '../utils/generateJWT.js';

// @desc: Authenticate user and get JWT
// @route: POST /api/users/login
// @access: public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateJWT(user._id),
        });
    } else if (user) {
        res.status(401);
        throw new Error('The password you have entered is Invalid');
    } else {
        res.status(401);
        throw new Error('No such email is registered on the system');
    }
});

// @desc: Create a new profile
// @route: POST /api/users
// @access: private
const createUserProfile = asyncHandler(async (req, res) => {
    const { name, email, password, contact } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.status(400);
        throw new Error('A user is already registered under this email!!!');
    }

    const user = await User.create({
        name: name,
        email: email,
        password: password,
        contact: contact,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateJWT(user._id),
        });
    } else {
        res.status(400);
        throw new Error('The user could not be created');
    }
});

// @desc: Access User Profile
// @route: GET /api/users/profile
// @access: private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            contact: user.contact,
            token: generateJWT(user._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc: Update User Profile
// @route: PUT /api/users/profile
// @access: private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.contact = req.body.contact || user.contact;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const userUpdate = await user.save();

        res.json({
            _id: userUpdate._id,
            name: userUpdate.name,
            email: userUpdate.email,
            isAdmin: userUpdate.isAdmin,
            contact: userUpdate.contact,
            token: generateJWT(userUpdate._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc: Get all users
// @route: GET /api/users
// @access: private/admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});

    res.json(users);
});

// @desc: Get user by ID
// @route: GET /api/users/:id
// @access: private/admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User Not Found');
    }
});

// @desc: Update any user
// @route: PUT /api/users/:id
// @access: private/admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.contact = req.body.contact || user.contact;
        user.isAdmin = req.body.isAdmin;

        const userUpdate = await user.save();

        res.json({
            _id: userUpdate._id,
            name: userUpdate.name,
            email: userUpdate.email,
            isAdmin: userUpdate.isAdmin,
            contact: userUpdate.contact,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export {
    authUser,
    getUserProfile,
    createUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    updateUser,
};
