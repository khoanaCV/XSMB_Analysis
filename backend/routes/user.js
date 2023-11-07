import express from 'express';

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

export default userRouter;
