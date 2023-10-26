import { resultRepository } from '../repositories/index.js';

const getAll = async (req, res) => {
    try {
        const sparses = await resultRepository.getAll();
        res.status(200).json({
            message: 'Success',
            data: sparses,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
        });
    }
};

export default {
    getAll,
};
