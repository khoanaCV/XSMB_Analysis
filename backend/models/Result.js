import mongoose, { Schema, ObjectId } from 'mongoose';

const Result = mongoose.model(
    'Result',
    new Schema({
        id: { type: ObjectId },
        draw_date: { type: Date, unique: true },
        special_prize: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 5,
                message:
                    'Length of prize must be greater than 5 characters.',
            },
        },
        prize1: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 5,
                message:
                    'Length of prize1 must be greater than 5 characters.',
            },
        },
        prize2_1: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 5,
                message:
                    'Length of prize2_1 must be greater than 5 characters.',
            },
        },
        prize2_2: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 5,
                message:
                    'Length of prize2_2 must be greater than 5 characters.',
            },
        },
        prize3_1: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 5,
                message:
                    'Length of prize3_1 must be greater than 5 characters.',
            },
        },
        prize3_2: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 5,
                message:
                    'Length of prize3_2 must be greater than 5 characters.',
            },
        },
        prize3_3: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 5,
                message:
                    'Length of prize3_3 must be greater than 5 characters.',
            },
        },
        prize3_4: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 5,
                message:
                    'Length of prize3_4 must be greater than 5 characters.',
            },
        },
        prize3_5: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 5,
                message:
                    'Length of prize3_5 must be greater than 5 characters.',
            },
        },
        prize3_6: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 5,
                message:
                    'Length of prize3_6 must be greater than 5 characters.',
            },
        },
        prize4_1: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 4,
                message:
                    'Length of prize4_1 must be greater than 4 characters.',
            },
        },
        prize4_2: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 4,
                message:
                    'Length of prize4_2 must be greater than 4 characters.',
            },
        },
        prize4_3: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 4,
                message:
                    'Length of prize4_3 must be greater than 4 characters.',
            },
        },
        prize4_4: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 4,
                message:
                    'Length of prize4_4 must be greater than 4 characters.',
            },
        },
        prize5_1: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 4,
                message:
                    'Length of prize5_1 must be greater than 4 characters.',
            },
        },
        prize5_2: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 4,
                message:
                    'Length of prize5_2 must be greater than 4 characters.',
            },
        },
        prize5_3: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 4,
                message:
                    'Length of prize5_3 must be greater than 4 characters.',
            },
        },
        prize5_4: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 4,
                message:
                    'Length of prize5_4 must be greater than 4 characters.',
            },
        },
        prize5_5: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 4,
                message:
                    'Length of prize5_5 must be greater than 4 characters.',
            },
        },
        prize5_6: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 4,
                message:
                    'Length of prize5_6 must be greater than 4 characters.',
            },
        },
        prize6_1: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 3,
                message:
                    'Length of prize6_1 must be greater than 3 characters.',
            },
        },
        prize6_2: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 3,
                message:
                    'Length of prize6_2 must be greater than 3 characters.',
            },
        },
        prize6_3: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 3,
                message:
                    'Length of prize6_3 must be greater than 3 characters.',
            },
        },
        prize7_1: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 2,
                message:
                    'Length of prize7_1 must be greater than 2 characters.',
            },
        },
        prize7_2: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 2,
                message:
                    'Length of prize7_2 must be greater than 2 characters.',
            },
        },
        prize7_3: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 2,
                message:
                    'Length of prize7_3 must be greater than 2 characters.',
            },
        },
        prize7_4: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 2,
                message:
                    'Length of prize7_4 must be greater than 2 characters.',
            },
        },
    })
);

export default Result;
