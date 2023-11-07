import _ from 'lodash';
import { readFileSync } from 'fs';
import Papa from 'papaparse';

// 1. Reload the data
const inputData = readFileSync('../backend/xsmb_sparse.csv', 'utf8');
const parsedResult = Papa.parse(inputData, {
    header: true,
    skipEmptyLines: true,
});
const data = parsedResult.data;

// console.log("First 5 rows of loaded data:", data.slice(0, 5));

// 2. Calculate the mean occurrence of each number in the historical data
const totalDays = data.length;
const meanOccurrences = _.mapValues(
    _.omit(data[0], 'draw_date'),
    (value, key) => {
        const totalOccurrences = _.sumBy(data, (row) =>
            parseInt(row[key], 10)
        );
        return totalOccurrences / totalDays;
    }
);

// console.log("First 100 mean occurrences:", Object.entries(meanOccurrences).slice(0, 100));

// 3. Simulate using Poisson distribution
const poissonRandom = (mean) => {
    let L = Math.exp(-mean);
    let k = 0;
    let p = 1;

    do {
        k++;
        let u = Math.random();
        p *= u;
    } while (p > L);

    return k - 1;
};

const numSimulations = data.length;
let simulatedData = Array(numSimulations)
    .fill(0)
    .map(() => {
        return _.mapValues(meanOccurrences, (val) =>
            poissonRandom(val)
        );
    });

const simulatedMeanOccurrences = _.mapValues(
    simulatedData[0],
    (value, key) => {
        return _.meanBy(simulatedData, key);
    }
);

// console.log("First 100 simulated mean occurrences:", Object.entries(simulatedMeanOccurrences).slice(0, 100));

// 4. Combine the simulated mean occurrences with the historical data
const combinedMeanOccurrences = _.mapValues(
    meanOccurrences,
    (value, key) => {
        return (value + simulatedMeanOccurrences[key]) / 2;
    }
);

// console.log("First 100 combined mean occurrences:", Object.entries(combinedMeanOccurrences).slice(0, 100));

// 5. Normalize combined mean occurrences
const minVal = _.min(Object.values(combinedMeanOccurrences));
const maxVal = _.max(Object.values(combinedMeanOccurrences));
const normalizedProbScore = _.mapValues(
    combinedMeanOccurrences,
    (val) => (val - minVal) / (maxVal - minVal)
);

// 6. Calculate the streak of non-appearance for each number up to the most recent draw
const nonAppearanceStreaks = _.mapValues(
    _.omit(data[0], 'draw_date'),
    (value, key) => {
        return _.takeRightWhile(
            data,
            (row) => parseInt(row[key], 10) === 0
        ).length;
    }
);

// console.log(
//     'First 100 nonAppearanceStreaks :',
//     Object.entries(nonAppearanceStreaks).slice(0, 100)
// );

// 7. Calculate the maximum streak of non-appearance for each number in historical data
const maxNonAppearanceStreak = (s) => {
    let maxStreak = 0;
    let currentStreak = 0;
    s.forEach((val) => {
        if (val === 0) {
            currentStreak++;
            maxStreak = Math.max(maxStreak, currentStreak);
        } else {
            currentStreak = 0;
        }
    });
    return maxStreak;
};

const maxStreaksCorrected = _.mapValues(
    _.omit(data[0], 'draw_date'),
    (value, key) => {
        return maxNonAppearanceStreak(
            data.map((row) => parseInt(row[key], 10))
        );
    }
);

// console.log(
//     'First 100 maxStreaksCorrected:',
//     Object.entries(maxStreaksCorrected).slice(0, 100)
// );

// 8. Recalculate the score based on current streak and max streak
const streakScoresCorrected = _.mapValues(
    nonAppearanceStreaks,
    (value, key) => {
        return value / maxStreaksCorrected[key];
    }
);

// console.log(
//     'First 100 streak scores (corrected):',
//     Object.entries(streakScoresCorrected).slice(0, 100)
// );

// 8.1 Calculate min and max values for streakScoresCorrected
const minStreakVal = _.min(Object.values(streakScoresCorrected));
const maxStreakVal = _.max(Object.values(streakScoresCorrected));

// 8.2 Normalize streakScoresCorrected
const normalizedStreakScores = _.mapValues(
    streakScoresCorrected,
    (val) => (val - minStreakVal) / (maxStreakVal - minStreakVal)
);

// console.log(
//     'First 100 normalized streak scores:',
//     Object.entries(normalizedStreakScores).slice(0, 100)
// );

// 9. Score for numbers that have appeared frequently in the last 30 draws
const recentAppearances = _.mapValues(
    _.omit(data[0], 'draw_date'),
    (value, key) => {
        return _.sumBy(_.takeRight(data, 45), (row) =>
            parseInt(row[key], 10)
        );
    }
);

const frequentScores = _.mapValues(recentAppearances, (val) =>
    val >= 15 ? 1 : 0
);

// console.log("First 100 frequent scores:", Object.entries(frequentScores).slice(0, 100));

//10. Calculate the "lô rơi" probabilities
const loRoiProbabilities = _.mapValues(
    _.omit(data[0], 'draw_date'),
    (value, key) => {
        let count = 0;
        for (let i = 0; i < data.length - 1; i++) {
            if (data[i][key] !== '0' && data[i + 1][key] !== '0') {
                count++;
            }
        }
        return count / (totalDays - 1);
    }
);

// console.log(
//     'First 100 loRoiProbabilities:',
//     Object.entries(loRoiProbabilities).slice(0, 100)
// );

const minLoRoi = _.min(Object.values(loRoiProbabilities));
const maxLoRoi = _.max(Object.values(loRoiProbabilities));
const normalizedLoRoiProbabilities = _.mapValues(
    loRoiProbabilities,
    (val) => (val - minLoRoi) / (maxLoRoi - minLoRoi)
);

// console.log(
//     "First 100 normalized 'lô rơi' probabilities:",
//     Object.entries(normalizedLoRoiProbabilities).slice(0, 100)
// );

// 11. Recalculate the final scores using the normalized streak scores and frequent scores

// //Kiểu chia trọng số + chuẩn hoá
// const finalScoresCorrected = _.mapValues(normalizedProbScore, (value, key) => {
//     return (value *0.5 + normalizedStreakScores[key]*0.2 + frequentScores[key]*0.2 + normalizedLoRoiProbabilities[key]*0.1) / 4;
// });

//Kiểu chuẩn hoá
const finalScoresCorrected = _.mapValues(
    normalizedProbScore,
    (value, key) => {
        return (
            (value +
                normalizedStreakScores[key] +
                frequentScores[key] +
                normalizedLoRoiProbabilities[key]) /
            4
        );
    }
);

//Kiểu chia trọng số
// const finalScoresCorrected = _.mapValues(combinedMeanOccurrences, (value, key) => {
//     return 0.1 * value
//            + 0.1 * streakScoresCorrected[key]
//            + 0.4 * frequentScores[key]
//            + 0.4 * loRoiProbabilities[key];
// });

// console.log(
//     'First 100 finalScoresCorrected:',
//     Object.entries(finalScoresCorrected).slice(0, 100)
// );

// console.log("First 100 final scores (corrected):", Object.entries(finalScoresCorrected).slice(0, 100));

export function getPredictiveScores() {
    return Object.values(finalScoresCorrected);
}
