import Result from '../models/Result.js';
import fs from 'fs';
import csv from 'csv-parser';

const create = async (
    date,
    special,
    prize1,
    prize2,
    prize3,
    prize4,
    prize5,
    prize6,
    prize7
) => {
    try {
        const result = await Result.findOneAndUpdate(
            { draw_date: date },
            {
                special_prize: special[0],
                prize1: prize1[0],
                prize2_1: prize2[0],
                prize2_2: prize2[1],
                prize3_1: prize3[0],
                prize3_2: prize3[1],
                prize3_3: prize3[2],
                prize3_4: prize3[3],
                prize3_5: prize3[4],
                prize3_6: prize3[5],
                prize4_1: prize4[0],
                prize4_2: prize4[1],
                prize4_3: prize4[2],
                prize4_4: prize4[3],
                prize5_1: prize5[0],
                prize5_2: prize5[1],
                prize5_3: prize5[2],
                prize5_4: prize5[3],
                prize5_5: prize5[4],
                prize5_6: prize5[5],
                prize6_1: prize6[0],
                prize6_2: prize6[1],
                prize6_3: prize6[2],
                prize7_1: prize7[0],
                prize7_2: prize7[1],
                prize7_3: prize7[2],
                prize7_4: prize7[3],
            },
            { upsert: true, returnOriginal: false }
        );
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
const getAll = async () => {
    try {
        const result = await Result.find().sort({ draw_date: 1 });
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const getDrawDateAndSpecialPrize = async () => {
    try {
        return new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream('../backend/xsmb_results.csv')
                .pipe(csv())
                .on('data', (data) => {
                    const { draw_date, special_prize } = data;
                    results.push({ draw_date, special_prize });
                })
                .on('end', () => {
                    resolve(results);
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default {
    create,
    getAll,
    getDrawDateAndSpecialPrize
};
