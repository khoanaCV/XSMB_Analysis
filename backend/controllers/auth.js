import asyncHandler from '../utils/async-handler';
import { validationResult } from 'express-validator';
import { authRepository } from '../repositories/index.js';

export default {
    register: asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            await authRepository.registerUser(req, res);
        }
    }),
    login: asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            await authRepository.loginUser(req, res);
        }
    }),
    refreshToken: asyncHandler(async (req, res) => {
        const user = await authRepository.refreshAccessToken(
            req,
            res
        );
        return res.status(200).json(user);
    }),

    logout: asyncHandler(async (req, res) => {
        await authRepository.logout(req, res);
    }),
};
