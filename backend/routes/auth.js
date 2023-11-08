import express from 'express';
import { authController } from '../controllers/index.js';
import { check } from 'express-validator';
import authorization from '../auth/authorization.js';

const authRouter = express.Router();

authRouter.post(
    '/register',
    [
        check(
            'name',
            'Length of name must be greater than 3 characters.'
        ).isLength({
            min: 4,
        }),
        check('email', 'Email is incorrect format.').isEmail(),
        check(
            'password',
            'Length must be greater than or equal to 8 characters'
        ).isLength({
            min: 8,
        }),
    ],
    authController.register
);
authRouter.post(
    '/login',
    [
        check('email', 'Email is incorrect format.').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    authController.login
);
authRouter.post(
    '/refresh',
    authorization.verifyToken,
    authController.refreshToken
);
authRouter.post(
    '/logout',
    authorization.verifyToken,
    authController.logout
);

export default authRouter;
