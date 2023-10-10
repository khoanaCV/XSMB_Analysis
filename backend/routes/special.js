import express from 'express';
import { specialController } from '../controllers/index.js';
const specialRouter = express.Router();

specialRouter.get('/', specialController.getAllSpecials)
specialRouter.post('/insert', specialController.insertNewSpecialRecord)
specialRouter.get('/countSparse', specialController.countAllSpecials)
export default specialRouter