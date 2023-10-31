import Ticket from '../models/Ticket.js';
import { log } from 'mercedlogger';

const getAllTicketOfLottery = async (lotteryId) => {
    try {
        const tickets = await Ticket.find({
            lottery_id: lotteryId,
        });
        return tickets;
    } catch (error) {
        log.red('Error', error);
        return null;
    }
};
const get = async (lotteryId, number) => {
    try {
        return await Ticket.findOne({
            lottery_id: lotteryId,
            number: number,
        });
    } catch (error) {
        log.red('Error', error);
        return null;
    }
};

const create = async (lotteryId, number, point) => {
    try {
        const ticket = await Ticket.create({
            lottery_id: lotteryId,
            number: number,
            point: point,
            status: 'empty',
            balance: point * -23,
        });
        return ticket;
    } catch (error) {
        log.red('Error', error);
        return null;
    }
};

const update = async (lotteryId, number, point) => {
    try {
        await Ticket.updateOne(
            {
                lottery_id: lotteryId,
                number: number,
            },
            {
                $set: {
                    lottery_id: lotteryId,
                    number: number,
                    point: point,
                    status: 'empty',
                    balance: point * -23,
                },
            }
        );
    } catch (error) {
        log.red('Error', error);
    }
};

export default { getAllTicketOfLottery, get, create, update };
