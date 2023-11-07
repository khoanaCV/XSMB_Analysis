import express from 'express';
import { sparseController } from '../controllers/index.js';
const spareRouter = express.Router();

spareRouter.get('/', sparseController.getAllSparses)
spareRouter.get('/last_appearing_loto', sparseController.countAllSparses)
spareRouter.get('/multi_appearing_loto', sparseController.countMonthlySparse)
spareRouter.get('/gan_time', sparseController.countAllSparsesGan)
spareRouter.post('/gan_time/findOne', sparseController.findSparsesGan)
spareRouter.post('/date/', sparseController.getSparseByDate);
export default spareRouter