
import express, { Express } from 'express'

import bodyParser from 'body-parser';
import cors from 'cors';
import router from './delivery';
import connectDB from '@infrastructure/persistence/connection';

const app: Express = express();
app.use(cors());

// parse application/x-www-form-urlencoded 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

// parse application/json
app.use("/api",router) 
app.use(bodyParser.json({ limit: '50mb' }));

connectDB();


export default app;
