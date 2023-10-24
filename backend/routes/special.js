import { Router } from 'express';
import { specialController } from '../controllers/index.js';

const specialRouter = Router();

specialRouter.get('/draw-date-special-prize', specialController.getDrawDateAndSpecialPrize);
specialRouter.get('/special-long-to-long', specialController.countAllSpecialPrizes);

export default specialRouter;