import cors from 'cors';
import express from 'express';
import registerRouter from './routes/index.js'
import mongoose from 'mongoose';
import models from './models/index.js';


const initialize = (app) => {

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());

    //Setting up MongoDB connection
    mongoose.connect('mongodb+srv://Admin:test0123@eventcluster.n6oidxx.mongodb.net/eventdb?retryWrites=true&w=majority');

    registerRouter(app); //Initializing route

}

export default initialize;
