import config from "config";
import express from "express";
import proxy from 'http-proxy-middleware';
import {parse} from 'url';
import {handle} from './nextApp';
import Debug from 'debug';

const debug = Debug('app:server:routes');

export const proxyServer = `${config.get('api.protocol')}://${config.get('api.ip')}:${config.get('api.port')}`;

export const handleNextStatics = (req: express.Request, res: express.Response) => handle(req, res);

export const handleRouteLogger = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    debug(req.method, req.originalUrl);
    next();
};

export const handleHealthcheck = (req: express.Request, res: express.Response) => res.sendStatus(200);

export const handleNextPage = async (req: express.Request, res: express.Response) => {
    const parsedUrl = parse(req.url, true);

    req.proxyServer = proxyServer;

    return handle(req, res, parsedUrl);
};

export const configureApiProxy = proxy([
    '/api',
    '/auth',
], {
    target: proxyServer,
    changeOrigin: config.get('api.changeOrigin'),
    xfwd: config.get('api.xfwd')
});