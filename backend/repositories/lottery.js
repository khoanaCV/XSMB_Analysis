import Ticket from '../models/Ticket.js';
import Lottery from '../models/lottery.js';

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
        });
        const tickets = await Ticket.find({
            lottery_id: lottery._id,
        });
        return tickets;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const create = async ({ userId, date, number, point }) => {
    try {
        console.log('date', date);
        let lottery = await Lottery.findOne(
            { user_id: userId, date: date },
            {
                include: {
                    path: 'tickets',
                },
            }
        );
        if (!lottery) {
            lottery = await Lottery.create({
                user_id: userId,
                date: date,
            });
        }
        await Ticket.findOneAndUpdate({
            lottery_id: lottery._id,
            number: number,
            point: point,
            status: 'empty',
            balance: point * -23,
        });
        lottery = await Lottery.findOne(
            { user_id: userId, date: date },
            {
                include: {
                    path: 'tickets',
                },
            }
        );
        return lottery;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export default { getAll, create, get };
