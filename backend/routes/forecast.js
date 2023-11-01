import express from 'express';
import * as forecastController from '../controllers/forecastController.js';

const router = express.Router();

router.get('/poissonModel', forecastController.getPredictiveScoresPoisson);
router.get('/gaussModel', forecastController.getPredictiveScoresGauss);

export default router;
