import express from 'express';
import { authController } from '../controllers/index.js';
const authRouter = express.Router();

authRouter.post('/register', authController.registerUser);
authRouter.post('/login', authController.loginUser);
authRouter.post('/refresh', authController.refreshToken);
authRouter.post('/logout', authController.logoutUser);

export default authRouter