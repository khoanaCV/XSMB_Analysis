import express from 'express';
import { resultController } from '../controllers/index.js';
const resultRouter = express.Router();

resultRouter.get('/', resultController.getAll);
export default resultRouter;
