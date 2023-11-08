import { userRepository } from '../repositories/index.js';

const getAllUsers = async (req, res) => {
    try {
        const users = await userRepository.getAllUser();
        res.status(200).json({
            message: 'Success',
            data: users,
        });
    } catch (error) {
        console.log('Error', error.message);
        res.status(500).json({
            error: error.message,
        });
    }
};


const updateOne = async (req, res) => {
    const user = await userRepository.updateOne(req, res);
}


export default {
    getAllUsers, updateOne
};
