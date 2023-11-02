import { resultRepository } from '../repositories/index.js';

const getDrawDateAndSpecialPrize = async (req, res) => {
    try {
        const results = await resultRepository.getDrawDateAndSpecialPrize();

        // Chuyển đổi trường special_prize để chỉ lấy 2 số cuối
        const modifiedResults = results.map(result => {
            const specialPrize = result.special_prize;
            result.special_prize = specialPrize.slice(-2); // Lấy 2 số cuối
            return result;
        });

        res.json(modifiedResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const countAllSpecialPrizes = async (req, res) => {
    try {
        // Xác định số ngày mà special_prize chưa xuất hiện
        const results = await resultRepository.getDrawDateAndSpecialPrize();
        const countSpecialArray = {};

        results.forEach((result, index) => {
            // Nếu special_prize không xuất hiện
            if (result.special_prize !== "00") {
                const specialPrizeLastTwoDigits = result.special_prize.slice(-2);

                // Tính số bản ghi chênh lệch giữa ngày hiện tại và ngày xuất hiện special_prize
                const recordsDiff = index + 1;  // +1 vì chỉ số bắt đầu từ 0

                if (countSpecialArray[specialPrizeLastTwoDigits] === undefined) {
                    countSpecialArray[specialPrizeLastTwoDigits] = recordsDiff;
                }
            }
        });

        res.status(200).json({
            message: "Success",
            data: countSpecialArray,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message,
        });
    }
};


export default {
    getDrawDateAndSpecialPrize,
    countAllSpecialPrizes,
};