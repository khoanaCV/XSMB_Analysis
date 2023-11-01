import mongoose, { Schema, ObjectId } from 'mongoose';
// import Ticket from './Ticket.js';

const Lottery = mongoose.model(
    'Lottery',
    new Schema({
        id: { type: ObjectId },
        user_id: {
            type: ObjectId,
            required: true,
            ref: 'User',
        },
        balance: {
            type: Number,
            required: true,
        },
        date: { type: Date, required: true },
        tickets: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Ticket',
                required: true,
            },
        ],
    })
);

export default Lottery;
