import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.js';

const secure = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded_string = jwt.verify(token, process.env.JWT_SEC);
            req.user = await User.findById(decoded_string.id).select(
                '-password'
            );

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Authorization token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not Authorised!!! Token not found...');
    }
});

export { secure };
