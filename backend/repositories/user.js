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
export default {
    getAllUser,
};
