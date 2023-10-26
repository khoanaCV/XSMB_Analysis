import { sparseRepository } from '../repositories/index.js';

const getAll = async (req, res) => {
    try {
        const sparses = await sparseRepository.getAll();
        res.status(200).json({
            message: 'Success',
            data: sparses,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
        });
    }
};

// Dem so ngay lo chua ra va ngay cuoi cung no ra
const countAllSparses = async (req, res) => {
    try {
        const sparses = await sparseRepository.getAll();
        const array = Object.values(sparses);
        let countSparseArray = [];
        for (let i = 0; i < 20; i++) {
            const sparse = {
                id: 0,
                count: 0,
                lastDate: new Date('2023-10-04T00:00:00.000Z'),
            };
            countSparseArray.push(sparse);
        }
        const superCount = (index, number, date) => {
            countSparseArray[index].id = index;
            countSparseArray[index].count = countLastSparse(
                number,
                countSparseArray[index].count
            );
            countSparseArray[index].lastDate = countLastDate(
                number,
                date,
                countSparseArray[index].count,
                countSparseArray[index].lastDate
            );
        };
        // Lap tat ca cac ban ghi trong database
        array.forEach((data) => {
            superCount(0, data.num0, data.date);
            superCount(1, data.num1, data.date);
            superCount(2, data.num2, data.date);
            superCount(3, data.num3, data.date);
            superCount(4, data.num4, data.date);
            superCount(5, data.num5, data.date);
            superCount(6, data.num6, data.date);
            superCount(7, data.num7, data.date);
            superCount(8, data.num8, data.date);
            superCount(9, data.num9, data.date);
            superCount(10, data.num10, data.date);
            superCount(11, data.num11, data.date);
            superCount(12, data.num12, data.date);
            superCount(13, data.num13, data.date);
            superCount(14, data.num14, data.date);
            superCount(15, data.num15, data.date);
            superCount(16, data.num16, data.date);
            superCount(17, data.num17, data.date);
            superCount(18, data.num18, data.date);
            superCount(19, data.num19, data.date);
        });

        console.log(countSparseArray);
        res.status(200).json({
            message: 'Success',
            data: countSparseArray,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
        });
    }
};

// Dem so ngay lo chua ra
const countLastSparse = (number, count) => {
    if (number == 0) {
        count += 1;
    } else {
        count = 0;
    }
    return count;
};

// Dem ngay cuoi cung lo ra
const countLastDate = (number, lastDate, count, date) => {
    if (number == 0) {
        count += 1;
    } else {
        count = 0;
    }
    if (count != 0) {
        lastDate = date;
    }
    return lastDate;
};

export default {
    getAll,
    countAllSparses,
};
