import asyncHandler from '../auth/asynx-hander.js';
import AuthService from "../repositories/auth.js";

const registerUser = asyncHandler(async (req, res) => {
    const user = await AuthService.registerUser(req.body);
    res.status(200).json(user);
});

const loginUser = asyncHandler(async (req, res) => {
    const user = await AuthService.loginUser(req.body);
    res.status(200).json(user);
});

const refreshToken = asyncHandler(async (req, res) => {
    try {
        const tokenData = await AuthService.refreshAccessToken(req.body);
        res.status(200).json(tokenData);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'An unexpected error occurred' });
    }
});


const logoutUser = asyncHandler(async (req, res) => {
    await AuthService.logoutUser(req, res);
    res.status(200).json({ message: 'Logout successful' });
});

export default {
    registerUser,
    refreshToken,
    loginUser,
    logoutUser
}