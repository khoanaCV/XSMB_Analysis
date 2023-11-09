/* eslint-disable no-undef */
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    const { name, email, password } = req.body;

    // Check user
    const existingUser = await User.findOne({
        email,
    }).exec();
    if (existingUser != null) {
        res.status(400).json('User already existing.');
    }
    const hashPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SECRET_KEY)
    );
    // Create new user
    const newUser = await User.create({
        isActive: true,
        name,
        email,
        password: hashPassword,
    });
    res.status(200).json({ ...newUser._doc, password: 'Not show' });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
        if (!existingUser.isActive) {
            return res.status(403).json({
                message: 'User is not active',
            });
        }
        // Check password user
        const isMatch = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (isMatch) {
            // Gen Access Token (JWT)
            const token = jwt.sign(
                {
                    existingUser,
                },
                process.env.SECRET_JWT_KEY,
                {
                    expiresIn: '3h',
                }
            );

            res.status(200).json({
                ...existingUser.toObject(),
                password: 'Not show',
                token: token,
            });
        } else {
            res.status(400).json({
                message: 'Wrong email and password',
            });
        }
    } else {
        res.status(400).json({
            message: 'User not exist',
        });
    }
};
const logout = async (req, res) => {
    res.clearCookie('accessToken');
    res.status(200).json('Logout successful');
};
const refreshAccessToken = async (req, res) => {
    const { id } = req.body;
    const findUser = await User.findById(id);
    if (!findUser) {
        return res.status(404).json('Not found User');
    }

    const getRefreshTokenInDB = findUser.refreshToken;

    try {
        jwt.verify(getRefreshTokenInDB, REFRESH_KEY);

        const newAccessToken = await this.genAccessToken(findUser);
        const newRefreshToken = await this.genRefreshToken(findUser);

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
        });

        await User.findByIdAndUpdate(
            { _id: findUser.id },
            { refreshToken: newRefreshToken }
        );

        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(403).json('Invalid refreshToken');
    }
};

export default {
    register,
    login,
    logout,
    refreshAccessToken,
};
