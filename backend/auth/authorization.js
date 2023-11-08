import asyncHandler from './asynx-hander.js'
import jwt from 'jsonwebtoken';
const SECRET_JWT_KEY = process.env;
// import User from '../models/User.js';

const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        const accessToken = token.split(" ")[1];
        try {
            const user = jwt.verify(accessToken, SECRET_JWT_KEY);
            req.user = user;
            next();
        } catch (err) {
            return res.status(403).json("Token is not valid");
        }
    } else {
        return res.status(401).json("You are not authenticated");
    }
});

// check user có phải admin không
const verifyTokenAdmin = asyncHandler(async (req, res, next) => {
    await verifyToken(req, res, () => {
        if (req.user.isActive) {
            next();
        } else {
            return res.status(403).json("You are not an Admin");
        }
    });

});

export default {
    verifyToken,
    verifyTokenAdmin
};
