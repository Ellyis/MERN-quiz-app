import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { MONGODBURL, PORT } from './config.js';
import participantRoute from './routes/participantRoute.js';
import questionRoute from './routes/questionRoute.js';

const app = express();

// MIddleware for parsing request body
app.use(express.json());

// MIddleware for handling CORS policy
app.use(cors());

app.use('/api/participants', participantRoute);
app.use('/api/questions', questionRoute);

mongoose.connect(MONGODBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        })
    })
    .catch(error => {
        console.log(error);
    })