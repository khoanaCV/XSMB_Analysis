/* eslint-disable no-undef */
import moment from 'moment';
import axios from 'axios';
import { log } from 'mercedlogger';
import fs from 'fs';
import * as cheerio from 'cheerio';
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
        await fs.writeFileSync(
            'data.json',
            JSON.stringify({ sparses, results })
        );
        res.status(201).json({ message: 'Crawl Data successful!' });
    } catch (error) {
        log.error('Error', error.message);
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
        log.error('Error', error.message);
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
        return numbers;
    } catch (error) {
        log.error('Error', error.message);
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
