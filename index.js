import express from 'express'
import dotenv, { config } from 'dotenv'
import cors from 'cors'

import connectDB from './Database/dbConfig.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    })