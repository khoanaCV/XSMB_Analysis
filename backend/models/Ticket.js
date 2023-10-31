import mongoose, { Schema } from 'mongoose';
const Ticket = mongoose.model(
    'Ticket',
    new Schema({
        id: { type: Schema.Types.ObjectId },
        lottery_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Lottery',
        },
        number: { type: Number, required: true },
        point: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['empty', 'win', 'lost'],
            default: 'empty',
        },
        balance: {
            type: Number,
            required: true,
        },
    })
);

export default Ticket;
