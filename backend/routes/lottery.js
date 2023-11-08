import express from 'express';
import { lotteryController } from '../controllers/index.js';
import authorization from '../auth/authorization.js';
const lotteryRouter = express.Router();

lotteryRouter.get('/', lotteryController.getAll);
lotteryRouter.get(
    '/:id',
    authorization.verifyToken,
    lotteryController.get
);
lotteryRouter.post(
    '/:id/',
    authorization.verifyToken,
    lotteryController.create
);
export default lotteryRouter;
