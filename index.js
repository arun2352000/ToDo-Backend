import express from 'express'
import dotenv, { config } from 'dotenv'
import cors from 'cors'

import connectDB from './Database/dbConfig.js';
import todoRouter from './Router/todo.Router.js'

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/Todo',todoRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    })