/* eslint-disable no-undef */
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async ({
    name,
    email,
    password,
    phoneNumber,
    address,
}) => {
    // Kiem tra su ton tai cua User
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser != null)
        throw new Error('User already existing.');

    const hashPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SECRET_KEY)
    );
    // Goi User model de thao tac du lieu
    const newUser = await User.create({
        name,
        email,
        password: hashPassword,
        phoneNumber,
        address,
    });
    return {
        ...newUser._doc,
        password: 'Not show',
    };
};

const login = async ({ email, password }) => {
    // check su ton tai cua User
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
        // check password user với password của email login
        const isMatch = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (isMatch) {
            // Tạo ra 1 Access Token (JWT) -> Là key = header + payload + secret_key
            const token = jwt.sign(
                {
                    data: existingUser,
                },
                process.env.SECRET_JWT_KEY,
                {
                    expiresIn: '2 days',
                }
            );

            return {
                ...existingUser.toObject(),
                password: 'Not show',
                token: token,
            };
        } else {
            throw new Error('Wrong email and password');
        }
    } else {
        throw new Error('User not exist');
    }
};
const getAllUser = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export default {
    register,
    login,
    getAllUser
};
