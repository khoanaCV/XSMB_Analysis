import express from 'express';
import { body } from 'express-validator';
import { userController } from '../controllers/index.js';

// Khai báo đối tượng Router
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.send('Get all users');
});

userRouter.get('/:id', (req, res) => {
    res.send('Get user by Id');
});

userRouter.put('/edit', (req, res) => {
    res.send('Edit user');
});

userRouter.delete('/delete/:id', (req, res) => {
    res.send('Delete user');
});

userRouter.post(
    '/login',
    body('email').isEmail().withMessage('Email invalid format!'),
    body('password').isLength({ min: 5 }),
    userController.login
);

userRouter.post(
    '/register',
    // debugger
    body('email').isEmail().withMessage('Email invalid format!'),
    body('password')
        .isLength({ min: 8 })
        .withMessage(
            'Password length must be greater than or equal to 8.'
        ),
    userController.register
);

export default userRouter;
