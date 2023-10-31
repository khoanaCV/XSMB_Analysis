import userRouter from './user.js';
import spareRouter from './sparse.js';
import crawlDataRouter from './crawl.js';
import resultRouter from './result.js';
import { Router } from 'express';
import lotteryRouter from './lottery.js';
const routes = new Router();

routes.use('/users', userRouter);
routes.use('/sparses', spareRouter);
routes.use('/crawl', crawlDataRouter);
routes.use('/results', resultRouter);
routes.use('/plays', lotteryRouter);

export default routes;
