import express from 'express';
import { body } from 'express-validator';
import { userController } from '../controllers/index.js';

// Khai báo đối tượng Router
const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);

userRouter.delete('/:id', userController.deleteOne);

export default userRouter;
