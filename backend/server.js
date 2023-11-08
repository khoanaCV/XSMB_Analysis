/* eslint-disable no-undef */
import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import routes from './routes/index.js';
import ConnectDB from './database/database.js';
import { log } from 'mercedlogger';
import cors from 'cors';

// Add Authorization

// Create web server
const app = express();

app.use(morgan('tiny')); // log the request for debugging
app.use(cors({ credentials: true }));

app.use(express.json());
// Load .evn file: config file
dotenv.config();

app.use(routes);

const port = process.env.PORT || 8080;

app.listen(port, async () => {
    await ConnectDB();
    log.green('Node RESTful API running on port', port);
});

// Basic routes: Root router
app.get('/', (req, res) => {
    res.send('Hello RESTful API.');
});
