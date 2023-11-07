import Sparse from '../models/Sparse.js';
import { log } from 'mercedlogger';
import fs from 'fs';
import csv from 'csv-parser';

const get = async (date) => {
    try {
        const sparse = await Sparse.find({ draw_date: date });
        return sparse;
    } catch (error) {
        log.red('Error', error.message);
        throw error;
    }
};
const getAll = async () => {
    try {
        const sparses = await Sparse.find().sort({ draw_date: 1 });
        return sparses;
    } catch (error) {
        log.red('Error', error.message);
        throw error;
    }
};

const getAllSparses = async () => {
    try {
        const sparses = await Sparse.find();
        return sparses;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getAllSparsesCSV = async () => {
    try {
        return new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream('../backend/xsmb_sparse.csv')
                .pipe(csv())
                .on('data', (data) => results.push(data))
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

const getSparseByDate = async (date, days, number) => {
    try {
        return new Promise((resolve, reject) => {
            const sparses = [];
            fs.createReadStream('../backend/xsmb_sparse.csv')
                .pipe(csv())
                .on('data', (row) => {
                    const sparsetDate = new Date(row.draw_date);
                    const queryDate = new Date(date);
                    if (sparsetDate <= queryDate) {
                        // Đảm bảo rằng cột draw_date luôn được bao gồm
                        const filteredRow = { draw_date: row.draw_date };

                        // Lọc các cột dựa trên tham số 'number' nếu được cung cấp
                        if (number !== undefined) {
                            const keys = Object.keys(row).slice(0, number + 1); // Cộng 1 vì slice không bao gồm phần tử cuối cùng
                            keys.forEach(key => {
                                if (key !== 'draw_date') { // Kiểm tra để tránh thêm 'draw_date' hai lần
                                    filteredRow[key] = row[key];
                                }
                            });
                        } else {
                            Object.assign(filteredRow, row); // Nếu không có giới hạn số cột, sử dụng toàn bộ hàng
                        }

                        sparses.push(filteredRow);
                    }
                })
                .on('end', () => {
                    // Sort by date in descending order
                    const sortedResults = sparses.sort((a, b) => new Date(b.draw_date) - new Date(a.draw_date));
                    // Take the first 'days' results if 'days' parameter is defined
                    const limitedResults = days ? sortedResults.slice(0, days) : sortedResults;
                    resolve(limitedResults);
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



const create = async (date, data) => {
    const dataSparse = data.map((item) => item % 100);
    const result = {};
    for (let i = 0; i <= 99; i++) {
        const propName = `num${i.toString().padStart(2, '0')}`;
        result[propName] = getData(dataSparse, i);
    }
    try {
        const sparse = await Sparse.findOneAndUpdate(
            { draw_date: date },
            {
                num00: getData(dataSparse, 0),
                num01: getData(dataSparse, 1),
                num02: getData(dataSparse, 2),
                num03: getData(dataSparse, 3),
                num04: getData(dataSparse, 4),
                num05: getData(dataSparse, 5),
                num06: getData(dataSparse, 6),
                num07: getData(dataSparse, 7),
                num08: getData(dataSparse, 8),
                num09: getData(dataSparse, 9),
                num10: getData(dataSparse, 10),
                num11: getData(dataSparse, 11),
                num12: getData(dataSparse, 12),
                num13: getData(dataSparse, 13),
                num14: getData(dataSparse, 14),
                num15: getData(dataSparse, 15),
                num16: getData(dataSparse, 16),
                num17: getData(dataSparse, 17),
                num18: getData(dataSparse, 18),
                num19: getData(dataSparse, 19),
                num20: getData(dataSparse, 20),
                num21: getData(dataSparse, 21),
                num22: getData(dataSparse, 22),
                num23: getData(dataSparse, 23),
                num24: getData(dataSparse, 24),
                num25: getData(dataSparse, 25),
                num26: getData(dataSparse, 26),
                num27: getData(dataSparse, 27),
                num28: getData(dataSparse, 28),
                num29: getData(dataSparse, 29),
                num30: getData(dataSparse, 30),
                num31: getData(dataSparse, 31),
                num32: getData(dataSparse, 32),
                num33: getData(dataSparse, 33),
                num34: getData(dataSparse, 34),
                num35: getData(dataSparse, 35),
                num36: getData(dataSparse, 36),
                num37: getData(dataSparse, 37),
                num38: getData(dataSparse, 38),
                num39: getData(dataSparse, 39),
                num40: getData(dataSparse, 40),
                num41: getData(dataSparse, 41),
                num42: getData(dataSparse, 42),
                num43: getData(dataSparse, 43),
                num44: getData(dataSparse, 44),
                num45: getData(dataSparse, 45),
                num46: getData(dataSparse, 46),
                num47: getData(dataSparse, 47),
                num48: getData(dataSparse, 48),
                num49: getData(dataSparse, 49),
                num50: getData(dataSparse, 50),
                num51: getData(dataSparse, 51),
                num52: getData(dataSparse, 52),
                num53: getData(dataSparse, 53),
                num54: getData(dataSparse, 54),
                num55: getData(dataSparse, 55),
                num56: getData(dataSparse, 56),
                num57: getData(dataSparse, 57),
                num58: getData(dataSparse, 58),
                num59: getData(dataSparse, 59),
                num60: getData(dataSparse, 60),
                num61: getData(dataSparse, 61),
                num62: getData(dataSparse, 62),
                num63: getData(dataSparse, 63),
                num64: getData(dataSparse, 64),
                num65: getData(dataSparse, 65),
                num66: getData(dataSparse, 66),
                num67: getData(dataSparse, 67),
                num68: getData(dataSparse, 68),
                num69: getData(dataSparse, 69),
                num70: getData(dataSparse, 70),
                num71: getData(dataSparse, 71),
                num72: getData(dataSparse, 72),
                num73: getData(dataSparse, 73),
                num74: getData(dataSparse, 74),
                num75: getData(dataSparse, 75),
                num76: getData(dataSparse, 76),
                num77: getData(dataSparse, 77),
                num78: getData(dataSparse, 78),
                num79: getData(dataSparse, 79),
                num80: getData(dataSparse, 80),
                num81: getData(dataSparse, 81),
                num82: getData(dataSparse, 82),
                num83: getData(dataSparse, 83),
                num84: getData(dataSparse, 84),
                num85: getData(dataSparse, 85),
                num86: getData(dataSparse, 86),
                num87: getData(dataSparse, 87),
                num88: getData(dataSparse, 88),
                num89: getData(dataSparse, 89),
                num90: getData(dataSparse, 90),
                num91: getData(dataSparse, 91),
                num92: getData(dataSparse, 92),
                num93: getData(dataSparse, 93),
                num94: getData(dataSparse, 94),
                num95: getData(dataSparse, 95),
                num96: getData(dataSparse, 96),
                num97: getData(dataSparse, 97),
                num98: getData(dataSparse, 98),
                num99: getData(dataSparse, 99),
            },
            { upsert: true, returnOriginal: false }
        );
        return sparse;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
const getData = (data, number) => {
    return Number(data.filter((item) => item === number).length);
};
export default { getAll, create, get, getAllSparses, getSparseByDate, getAllSparsesCSV };
