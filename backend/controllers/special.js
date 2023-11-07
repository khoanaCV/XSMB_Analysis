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
        // Lấy dữ liệu ngày quay và số đặc biệt
        const results = await resultRepository.getDrawDateAndSpecialPrize();
        // Đảm bảo rằng kết quả được sắp xếp theo ngày giảm dần
        results.sort((a, b) => new Date(b.draw_date) - new Date(a.draw_date));

        const countSpecialArray = {};
        const lastAppearance = {};

        // Đếm số kỳ từ lần xuất hiện gần nhất cho đến kỳ mới nhất
        results.forEach((result, index) => {
            const specialPrizeLastTwoDigits = result.special_prize.slice(-2);

            if (lastAppearance[specialPrizeLastTwoDigits] === undefined) {
                // Lưu số kỳ kể từ lần xuất hiện gần nhất
                lastAppearance[specialPrizeLastTwoDigits] = index;
                countSpecialArray[specialPrizeLastTwoDigits] = index; // +1 vì chỉ số bắt đầu từ 0
            }
        });

        // Điền vào các số chưa xuất hiện với tổng số kỳ
        for (let i = 0; i < 100; i++) {
            const key = i.toString().padStart(2, '0');
            if (countSpecialArray[key] === undefined) {
                // Nếu một số chưa bao giờ xuất hiện, ta coi như là tổng số kỳ từ kỳ đầu tiên
                countSpecialArray[key] = results.length;
            }
        }

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