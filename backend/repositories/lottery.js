import Lottery from '../models/lottery.js';
import { ticketRepository } from './index.js';

const getAll = async () => {
    try {
        const lottery = await Lottery.find({
            include: {
                path: 'Ticket',
            },
        });
        return lottery;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const get = async ({ userId, date }) => {
    try {
        const lottery = await Lottery.findOne({
            user_id: userId,
            date: date,
        }).populate({
            path: 'tickets',
        });
        return lottery;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const create = async ({ userId, date, number, point }) => {
    try {
        console.log('date', date);
        let lottery = await Lottery.findOne({
            user_id: userId,
            date: date,
        }).populate({
            path: 'tickets',
        });
        // check lottery
        if (!lottery) {
            // add lottery
            lottery = await Lottery.create({
                user_id: userId,
                date: date,
                balance: point * -23,
            });
            // add tickets
            const ticket = await ticketRepository.create(
                lottery._id,
                number,
                point
            );
            lottery.tickets.push(ticket);
            lottery.save();
        } else {
            const ticket = await ticketRepository.get(
                lottery._id,
                number
            );
            if (ticket) {
                // update tickets
                await ticketRepository.update(
                    lottery._id,
                    number,
                    point
                );
                // update lottery
                const tickets =
                    await ticketRepository.getAllTicketOfLottery(
                        lottery._id
                    );

                const balance = tickets.reduce(
                    (data, data2) => data.balance + data2.balance
                );
                lottery = await Lottery.update(
                    { user_id: userId, date: date, number: number },
                    { $set: { balance: balance } }
                );
            } else {
                // add tickets
                await ticketRepository.create(
                    lottery._id,
                    number,
                    point
                );
            }
        }
        // get lottery
        lottery = await Lottery.find({
            user_id: userId,
            date: date,
        }).populate({
            path: 'tickets',
        });
        return lottery;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export default { getAll, create, get };
