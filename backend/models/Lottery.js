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
            unique: true,
        },
        balance: {
            type: Number,
            require: true,
        },
        date: { type: Date, unique: true },
        tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }],
    })
);

export default Lottery;
