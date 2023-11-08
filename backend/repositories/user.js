/* eslint-disable no-undef */
import User from '../models/User.js';

const getAllUser = async () => {
    try {
        const result = await User.find();
        return result;
    } catch (error) {
        throw error;
    }
};
const deleteOne = async (req, res) => {
    const { id } = req.params; // Sử dụng destructuring assignment cho ES6
    try {
        // Tìm và xoá người dùng dựa trên id.
        const result = await User.findByIdAndDelete(id);
        if (result) {
            res.status(200).send({ message: 'User deleted successfully', result });
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};
export default {
    getAllUser,
    deleteOne
};
