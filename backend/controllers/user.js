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

const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const updateData = req.body;
        const user = await userRepository.updateUserById(userId, updateData);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export default {
    getAllUsers,
    updateUser
};
