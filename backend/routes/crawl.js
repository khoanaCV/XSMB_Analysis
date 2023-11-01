import express from 'express';
import { crawlController } from '../controllers/index.js';

const crawlDataRouter = express.Router();

crawlDataRouter.get('/', crawlController.crawlData);
crawlDataRouter.get('/json', crawlController.getJsonFile);
crawlDataRouter.put('/result', crawlController.getResultLottery);
export default crawlDataRouter;
