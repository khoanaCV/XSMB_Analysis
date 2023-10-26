import moment from 'moment';
import { lotteryRepository } from '../repositories/index.js';

const getAll = async (req, res) => {
    try {
        const lotteries = await lotteryRepository.getAll();
        res.status(200).json({
            message: 'Success',
            data: lotteries,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
        });
    }
};

const get = async (req, res) => {
    try {
        const date = moment.utc(req.body.date, 'DD/MM/YYYY');

        const lotteries = await lotteryRepository.get({
            date: date.format('DD/MM/YYYY'),
            userId: req.params.id,
        });
        res.status(200).json({
            message: 'Success',
            data: lotteries,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
        });
    }
};

const create = async (req, res) => {
    try {
        console.log(req.body.date);
        const date = moment.utc(req.body.date, 'DD/MM/YYYY');
        // console.log('date1', date);
        const lotteries = await lotteryRepository.create({
            date: date.format('DD/MM/YYYY HH:mm:ss'),
            userId: req.params.id,
            number: req.body.number,
            point: req.body.point,
        });
        res.status(200).json({
            message: 'Success',
            data: lotteries,
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
    get,
    create,
};
