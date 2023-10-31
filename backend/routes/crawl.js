import express from 'express';
import { crawlController } from '../controllers/index.js';

const crawlDataRouter = express.Router();

crawlDataRouter.get('/', crawlController.crawlData);
crawlDataRouter.get('/get-json', crawlController.getJsonFile);

export default crawlDataRouter;
