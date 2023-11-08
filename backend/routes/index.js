import { Router } from 'express';
import userRouter from './user.js';
import spareRouter from './sparse.js';
import crawlDataRouter from './crawl.js';
import resultRouter from './result.js';
import lotteryRouter from './lottery.js';
import forecastRoutes from './forecast.js';
import authRouter from './auth.js';
import specialRouter from './special.js';

const routes = new Router();

routes.use('/auth', authRouter);
routes.use('/users', userRouter);
routes.use('/sparses', spareRouter);
routes.use('/crawls', crawlDataRouter);
routes.use('/results', resultRouter);
routes.use('/plays', lotteryRouter);
routes.use('/forecast', forecastRoutes);
routes.use('/special', specialRouter);

export default routes;
