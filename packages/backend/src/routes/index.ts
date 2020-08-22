import Debug from 'debug';
import express from 'express';

import * as routesService from './routes.service';
import tasksRouter from './tasks';

const debug = Debug('api:routes');

export default (app: express.Application) => {

    debug('initiated');

    app.use('/healthcheck', routesService.healthcheck);

    app.use('/api/tasks', tasksRouter);

    app.use(routesService.globalApiErrorHandler);
};
