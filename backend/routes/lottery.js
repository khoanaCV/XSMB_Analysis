import express from 'express';
import { lotteryController } from '../controllers/index.js';
const lotteryRouter = express.Router();

lotteryRouter.get('/', lotteryController.getAll);
lotteryRouter.get('/:id', lotteryController.get);
lotteryRouter.post('/:id', lotteryController.create);
export default lotteryRouter;
