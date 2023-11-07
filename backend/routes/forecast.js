import express from 'express';
import forecastController from '../controllers/forecastController.js';

const forecastRoutes = express.Router();

forecastRoutes.get(
    '/poissonModel',
    forecastController.getPredictiveScoresPoisson
);
forecastRoutes.get(
    '/gaussModel',
    forecastController.getPredictiveScoresGauss
);

export default forecastRoutes;
