/* eslint-disable no-undef */
import mongoose from 'mongoose';
import { log } from 'mercedlogger';

const ConnectDB = async () => {
    try {
        const connection = mongoose.connect(process.env.MONGO_URI);
        log.green('Connect DB', 'successfully');
        return connection;
    } catch (error) {
        throw new Error('Connect DB false.');
    }
};

export default ConnectDB;
