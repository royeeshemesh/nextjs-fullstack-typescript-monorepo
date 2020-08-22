import Debug from 'debug';
import express from 'express';
import appConfig from './appConfig';
import routes from './routes';

const debug = Debug('api:app');

const app: express.Application = express();

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    debug(req.method, req.originalUrl);
    next();
});

appConfig(app);
routes(app);

export default app;