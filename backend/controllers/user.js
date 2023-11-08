import { validationResult } from 'express-validator';
import { userRepository } from '../repositories/index.js';

const getAllUsers = async () => {
    try {
        const user = await userRepository.getAllUser();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error)
    }
}
const deleteOne = async () => {
    try {
        const user = await userRepository.deleteOne(req, res);
        if (user) {
            return res.status(200).json("Delete Successfully!");
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

export default {
    getAllUsers,
    deleteOne,
};
