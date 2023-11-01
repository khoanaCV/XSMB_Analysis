import { validationResult } from 'express-validator';
import { userRepository } from '../repositories/index.js';

const register = async (req, res) => {
    // debugger
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    // Destructuring Request object
    const { name, email, password, phoneNumber, address } = req.body;

    try {
        // Call action cua Repository (DAO)
        const newUser = await userRepository.register({
            name,
            email,
            password,
            phoneNumber,
            address,
        });
        res.status(201).json({
            message: 'Register successfully.',
            data: newUser,
        });
    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};

const login = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    // Destructuring Request object
    const { email, password } = req.body;

    try {
        // Call action cua Repository (DAO)
        const existingUser = await userRepository.login({
            email,
            password,
        });
        res.status(200).json({
            message: 'Login successfully.',
            data: existingUser,
        });
    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};

const getAllUsers = async (req, res) => {
    console.log(res);
};

// Actions: ....

export default {
    register,
    login,
    getAllUsers,
};
