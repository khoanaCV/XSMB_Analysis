import express from 'express';
import { userController } from '../controllers/index.js';
// import { userController } from '../controller/index.js';

const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:id', (req, res) => {
    res.send('Get user by Id');
});

userRouter.put('/edit', (req, res) => {
    res.send('Edit user');
});

userRouter.delete('/delete/:id', (req, res) => {
    res.send('Delete user');
});

userRouter.put('/:id',userController.updateOne)
export default userRouter;
