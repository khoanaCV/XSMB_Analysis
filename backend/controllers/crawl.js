/* eslint-disable no-undef */
import moment from 'moment';
import axios from 'axios';
import { log } from 'mercedlogger';
import fs from 'fs';
import * as cheerio from 'cheerio';
import { Parser } from 'json2csv';
import {
    resultRepository,
    sparseRepository,
    ticketRepository,
} from '../repositories/index.js';
import Lottery from '../models/lottery.js';
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
    // *Before 10 day 1/1/2012
    const date = moment.utc(process.env.DATE_CRAWL, 'DD/MM/YYYY');
    const now = moment.utc();
    // const date = now.subtract(10, 'days');
    const dates = [];
    while (date.isSameOrBefore(now)) {
        const _date = date.format('DD-MM-YYYY');
        dates.push(_date);
        const data = await getDataOfTime(_date);
        if (data?.length > 0 && data[2][0]?.toString() !== '...') {
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
            await sparseRepository.create(date, [
                ...data[1],
                ...data[2],
                ...data[3],
                ...data[4],
                ...data[5],
                ...data[6],
                ...data[7],
                ...data[8],
            ]);
        }
        date.add(1, 'd');
    }
    res.status(200).json({
        message: 'Crawl Data successfully.',
    });
};

const getJsonFile = async (req, res) => {
    try {
        const sparses = await sparseRepository.getAll();
        const results = await resultRepository.getAll();

        // Ghi ra file data.json
        await fs.writeFileSync('data.json', JSON.stringify({ sparses, results }));

        // Chuyển đổi results thành CSV và ghi ra file
        const cleanedResults = results.map(item => {
            return {
                draw_date: item.draw_date,
                prize1: item.prize1,
                prize2_1: item.prize2_1,
                prize2_2: item.prize2_2,
                prize3_1: item.prize3_1,
                prize3_2: item.prize3_2,
                prize3_3: item.prize3_3,
                prize3_4: item.prize3_4,
                prize3_5: item.prize3_5,
                prize3_6: item.prize3_6,
                prize4_1: item.prize4_1,
                prize4_2: item.prize4_2,
                prize4_3: item.prize4_3,
                prize4_4: item.prize4_4,
                prize5_1: item.prize5_1,
                prize5_2: item.prize5_2,
                prize5_3: item.prize5_3,
                prize5_4: item.prize5_4,
                prize5_5: item.prize5_5,
                prize5_6: item.prize5_6,
                prize6_1: item.prize6_1,
                prize6_2: item.prize6_2,
                prize6_3: item.prize6_3,
                prize7_1: item.prize7_1,
                prize7_2: item.prize7_2,
                prize7_3: item.prize7_3,
                prize7_4: item.prize7_4,
                special_prize: item.special_prize
            };
        });

        const resultsFields = [
            "draw_date", "prize1", "prize2_1", "prize2_2",
            "prize3_1", "prize3_2", "prize3_3", "prize3_4", "prize3_5", "prize3_6",
            "prize4_1", "prize4_2", "prize4_3", "prize4_4",
            "prize5_1", "prize5_2", "prize5_3", "prize5_4", "prize5_5", "prize5_6",
            "prize6_1", "prize6_2", "prize6_3",
            "prize7_1", "prize7_2", "prize7_3", "prize7_4",
            "special_prize"
        ];
        const resultsParser = new Parser({ fields: resultsFields });
        const resultsCsv = resultsParser.parse(cleanedResults);
        await fs.writeFileSync('xsmb_results.csv', resultsCsv);


        // Chuyển đổi sparses thành CSV và ghi ra file
        const sparsesFields = ["draw_date"].concat(Array.from({ length: 100 }, (_, i) => i.toString()));
        const sparsesParser = new Parser({ fields: sparsesFields });
        const sparsesTransformed = sparses.map(sparse => {
            const newObj = { draw_date: sparse.draw_date};
            for (let i = 0; i < 100; i++) {
                const key = "num" + String(i).padStart(2, '0');
                newObj[i] = sparse[key] || 0;
            }
            return newObj;
        });
        const sparsesCsv = sparsesParser.parse(sparsesTransformed);
        await fs.writeFileSync('xsmb_sparse.csv', sparsesCsv);

        res.status(201).json({ message: 'Crawl Data successful!' });
    } catch (error) {
        log.red('Error', error.message);
        res.status(500).json({ message: 'Crawl Data fail!' });
    }
};


const getResultLottery = async (req, res) => {
    try {
        // get lottery have status empty
        const tickets =
            await ticketRepository.getAllTicketHaveStatusEmpty();
        // check win lost
        await tickets.forEach(async (ticket) => {
            const check = await checkWin(ticket);
            ticketRepository.update(
                ticket.lottery_id,
                ticket.number,
                ticket.point,
                check === 0 ? 'lost' : 'win',
                check === 0
                    ? ticket.balance
                    : ticket.point * 80 * check - ticket.balance
            );
            const ticketUpdateList =
                await ticketRepository.getAllTicketOfLottery(
                    ticket.lottery_id._id
                );
            const balance = ticketUpdateList.reduce(
                (data, data2) =>
                    Number(data.balance) + Number(data2.balance)
            );
            await Lottery.updateOne(
                {
                    user_id: ticket.lottery_id.user_id,
                    date: ticket.lottery_id.date,
                },
                { $set: { balance: balance } }
            );
        });
        res.status(201).json({
            message: 'Get Result Lottery successful!',
        });
    } catch (error) {
        log.red('Error', error.message);
        res.status(500).json({
            message: 'Get Result Lottery fail!',
        });
    }
};
const checkWin = async (ticket) => {
    const sparses = await sparseRepository.get(
        ticket.lottery_id.date
    );
    const number =
        Number(ticket.number) < 10
            ? '0' + ticket.number
            : ticket.number;
    const sparse = sparses[0];
    return Number(sparse ? sparse['num' + number] : 0);
};

export default {
    crawlData,
    getJsonFile,
    getResultLottery,
};

const getDataOfTime = async (date) => {
    const _urlByDate = urlByDate.replace('{date}', date);

    const numbers = [];

    try {
        await axios(_urlByDate, axiosConfig).then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);

            $('table:nth-child(1)', html).each(function () {
                $(this)
                    .find('tr')
                    .each((indexRow, row) => {
                        if (indexRow) {
                            $(row)
                                .find('span')
                                .each((indexCol, col) => {
                                    const number = $(col).text().trim();
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
        return numbers;
    } catch (error) {
        log.red('Error', error.message);
        res?.status(500).json({ message: error.message });
    }
};

const logData = (date, numbers) => {
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
