/* eslint-disable no-undef */
import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import routes from './routes/index.js';
import ConnectDB from './database/database.js';
import cors from "cors"

// Add Authorization

// Create web server
const app = express();
app.use(cors({origin: 'http://localhost:3000'}))
app.use(morgan('tiny')); // log the request for debugging

app.use(express.json());
// Load .evn file: config file
dotenv.config();

// Basic routes: Root router
app.get('/', (req, res) => {
    res.send('Hello RESTful API.');
});

app.use(routes); // localhost:9999/users

const port = process.env.PORT || 8080;

app.listen(port, async () => {
    await ConnectDB();
    console.log(`Node RESTful API running on port ${port}`);
});
