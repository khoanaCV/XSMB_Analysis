import express from 'express';
import { sparseController } from '../controllers/index.js';
const spareRouter = express.Router();

spareRouter.get('/', sparseController.getAll);
spareRouter.get('/countSparse', sparseController.countAllSparses);
export default spareRouter;
