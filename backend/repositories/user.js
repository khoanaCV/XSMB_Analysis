/* eslint-disable no-undef */
import User from '../models/User.js';

const getAllUser = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const updateUserById = async (userId, updateData) => {
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        );
        return user;
    } catch (error) {
        // Handle the error properly
        throw error;
    }
};

export default {
    getAllUser,
    updateUserById,
};
