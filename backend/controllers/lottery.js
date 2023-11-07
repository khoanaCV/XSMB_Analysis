import { lotteryRepository } from '../repositories/index.js';
import { log } from 'mercedlogger';

const getAll = async (req, res) => {
    try {
        const lotteries = await lotteryRepository.getAll();
        res.status(200).json({
            message: 'Success',
            data: lotteries,
        });
    } catch (error) {
        log.red('Error', error.message);
        res.status(500).json({
            error: error.message,
        });
    }
};

const get = async (req, res) => {
    try {
        const lotteries = await lotteryRepository.get({
            date: req.body.date,
            userId: req.params.id,
        });
        res.status(200).json({
            message: 'Success',
            data: lotteries,
        });
    } catch (error) {
        log.red('Error', error.message);
        res.status(500).json({
            error: error.message,
        });
    }
};

const create = async (req, res) => {
    try {
        log.cyan('date', req.body.date);
        const lotteries = await lotteryRepository.create({
            date: req.body.date,
            userId: req.params.id,
            number: req.body.number,
            point: req.body.point,
        });
        res.status(200).json({
            message: 'Success',
            data: lotteries,
        });
    } catch (error) {
        log.red('Error', error.message);
        res.status(500).json({
            error: error.message,
        });
    }
};

export default {
    getAll,
    get,
    create,
};
