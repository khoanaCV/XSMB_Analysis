import moment from 'moment';
import axios from 'axios';
import { log } from 'mercedlogger';
import * as cheerio from 'cheerio';
import {
    resultRepository,
    sparseRepository,
} from '../repositories/index.js';
const urlByDate = 'https://xoso.com.vn/xsmb-{date}.html';
const axiosConfig = {
    headers: {
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
        Accept: '*/*',
        'User-Agent': 'PostmanRuntime/7.31.3',
    },
};

const crawlData = async (req, res) => {
    // *Before 10 day
    const date = moment.utc('10/10/2021', 'DD/MM/YYYY');
    const now = moment.utc();
    // const date = now.subtract(10, 'days');
    const dates = [];
    while (date.isSameOrBefore(now)) {
        const _date = date.format('DD-MM-YYYY');
        dates.push(_date);
        const data = await getDataOfTime(_date);
        if (data.length > 0 && data[2][0]?.toString() !== '...') {
            await resultRepository.create(
                date,
                data[1],
                data[2],
                data[3],
                data[4],
                data[5],
                data[6],
                data[7],
                data[8]
            );
            // log.yellow('result', result);
            const sparse = await sparseRepository.create(date, [
                ...data[1],
                ...data[2],
                ...data[3],
                ...data[4],
                ...data[5],
                ...data[6],
                ...data[7],
                ...data[8],
            ]);
            log.yellow('sparse', sparse);
        }
        date.add(1, 'd');
    }

    res.status(200).json({
        message: 'Crawl Data successfully.',
    });
};

const getDataOfTime = async (date) => {
    const _urlByDate = urlByDate.replace('{date}', date);

    const numbers = [];

    try {
        await axios(_urlByDate, axiosConfig).then((response) => {
            const html = response.data;
            const $ = cheerio.load(html); // sử dụng giống jQuery

            $('table:nth-child(1)', html).each(function () {
                $(this)
                    .find('tr')
                    .each((indexRow, row) => {
                        if (indexRow) {
                            $(row)
                                .find('span')
                                .each((indexCol, col) => {
                                    const number = $(col).text();
                                    numbers[indexRow] = numbers[
                                        indexRow
                                    ]
                                        ? numbers[indexRow].concat(
                                            number
                                        )
                                        : [number];
                                });
                        }
                    });
            });
        });
        logData(date, numbers);
        console.log(numbers);
        return numbers;
    } catch (e) {
        console.log('====================================');
        console.log(e);
        console.log('====================================');
        // res?.status(500).json({ msg: e });
    }
};

const logData = (date, numbers) => {
    console.log('====================================');
    log.magenta('Sổ số ngày', date);
    log.green('Giải đặt biệt', numbers[1]);
    log.green('Giải nhất', numbers[2]);
    log.green('Giải nhì', numbers[3]);
    log.green('Giải ba', numbers[4]);
    log.green('Giải bốn', numbers[5]);
    log.green('Giải năm', numbers[6]);
    log.green('Giải sáu', numbers[7]);
    log.green('Giải bảy', numbers[8]);
};

export default {
    crawlData,
};
