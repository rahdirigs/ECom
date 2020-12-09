import jwt from 'jsonwebtoken';

const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SEC, {
        expiresIn: '69d',
    });
};

export default generateJWT;
