import mongoose, { ObjectId, Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';

const User = mongoose.model(
    'User',
    new Schema({
        id: ObjectId,
        name: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 3,
                message:
                    'Length of name must be greater than 3 characters.',
            },
        },
        email: {
            type: String,
            required: true,
            validate: {
                validator: () => isEmail,
                message: 'Email is incorrect format.',
            },
        },
        password: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length >= 8,
                message:
                    'Length must be greater than or equal to 8 characters',
            },
        },
        virtual_account_balance: {
            type: Number,
            default: 0,
        },
        wallet_balance: {
            type: Number,
            default: 0,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
        lotteries: [{ type: Schema.Types.ObjectId, ref: 'Lottery' }],
    })
);

export default User;
