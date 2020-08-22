import Debug from 'debug';
import express from 'express';

const debug = Debug('api:routes:service');

export const healthcheck = (req: express.Request, res: express.Response) => {
    debug('healthcheck');
    res.sendStatus(200);
};

export const globalApiErrorHandler = (error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('globalApiErrorHandler', error);
    res.status(500).send('internal server error');
};