import mongoose, { Schema, ObjectId } from 'mongoose';
const Ticket = mongoose.model(
    'Ticket',
    new Schema({
        id: { type: ObjectId },
        lottery_id: {
            type: ObjectId,
            required: true,
            ref: 'Lottery',
        },
        number: {
            type: { type: Number, min: 0, max: 99 },
        },
        point: {
            type: Number,
            require: true,
        },
        status: {
            type: ['empty', 'win', 'lost'],
            default: 'empty',
        },
        balance: {
            type: Number,
            require: true,
        },
    })
);

export default Ticket;
