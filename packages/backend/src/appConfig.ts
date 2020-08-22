import bodyParser from "body-parser";
import config from 'config';
import connectMongo from 'connect-mongo';
import cookieParser from 'cookie-parser';
import Debug from 'debug';
import express from 'express';
import session from "express-session";
import mongoose from 'mongoose';

const debug = Debug('api:appConfig');

const MongoStore = connectMongo(session);

export default (app: express.Application) => {
    debug('initiated');

    app.set('trust proxy', true);

    debug(`ENV=${app.get('env')}`);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());

    app.use(session({
        resave: false,
        saveUninitialized: true,
        secret: config.get('session.secret'),
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
        }),
    }));
};
