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
        number: {
            type: { type: Number, min: 0, max: 99 },
        },
        point: {
            type: Number,
            require: true,
        },
        status: {
            type: String,
            enum: ['empty', 'win', 'lost'],
            default: 'empty',
        },
        balance: {
            type: Number,
            require: true,
        },
    })
);

export default Ticket;
