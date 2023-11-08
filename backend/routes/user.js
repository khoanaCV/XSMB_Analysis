import express from 'express';
import { userController } from '../controllers/index.js';
// import { userController } from '../controller/index.js';

const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:id', (req, res) => {
    res.send('Get user by Id');
});

userRouter.put('/:userId', userController.updateUser);

export default userRouter;
