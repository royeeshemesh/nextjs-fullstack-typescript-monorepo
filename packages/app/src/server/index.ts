import './env'; // must be first import
import config from 'config';
import express from 'express';

import {app} from './nextApp';
import * as routes from './routes';

const exitProcessGracefully = async error => {
    console.log(error);
    process.exit(1);
};

app.prepare()
    .then(() => {
        const server = express();

        server.get([
            '/_next*',
            '/__next*',
            '/favicon.ico'
        ], routes.handleNextStatics);

        server.use(routes.handleRouteLogger);
        server.get('/healthcheck', routes.handleHealthcheck);
        server.use(routes.configureApiProxy);
        server.get('*', routes.handleNextPage);

        const ip: string = config.get('server.ip');
        const port: number = config.get('server.port');

        server.listen(port, ip, () => {
            console.log(`Server listening on ${ip}:${port}!`);
        });

    });

process.on('unhandledRejection', exitProcessGracefully);
process.on('uncaughtException', exitProcessGracefully);

export {};