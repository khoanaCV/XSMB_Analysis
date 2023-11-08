import { getPredictiveScores as calculateScoresPoisson } from './scoringModel.js';
import { getPredictiveScoresByGauss as calculateScoresGauss } from './scoringModelGau.js';

function getPredictiveScoresPoisson(req, res) {
    try {
        const scoresPoisson = calculateScoresPoisson();
        res.json(scoresPoisson);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching predictive scores Poisson',
        });
    }
}

function getPredictiveScoresGauss(req, res) {
    try {
        const scoresGauss = calculateScoresGauss();
        res.json(scoresGauss);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching predictive scores Gauss',
        });
    }
}

export default {
    getPredictiveScoresPoisson,
    getPredictiveScoresGauss,
};
