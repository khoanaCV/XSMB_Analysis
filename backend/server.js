/* eslint-disable no-undef */
import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import routes from './routes/index.js';
import ConnectDB from './database/database.js';
import { crawlController } from './controllers/index.js';
import cron from 'node-cron';
// Add Authorization

// Create web server
const app = express();

app.use(morgan('tiny')); // log the request for debugging

app.use(express.json());
// Load .evn file: config file
dotenv.config();

// Basic routes: Root router
app.get('/', (req, res) => {
    res.send('Hello RESTful API.');
});

app.use(routes);

const port = process.env.PORT || 8080;
cron.schedule('30 18 * * *', crawlController.crawlData);

app.listen(port, async () => {
    await ConnectDB();
    console.log(`Node RESTful API running on port ${port}`);
});
