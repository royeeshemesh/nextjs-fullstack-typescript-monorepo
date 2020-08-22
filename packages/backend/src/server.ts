import './env'; // must be the first import
import './db';
import config from 'config';
import Debug from "debug";
import app from './app';

const debug = Debug("api:server");

const exitProcessGracefully = async (error: Error) => {
    console.error(error);
    process.exit(1);
};

process.on('unhandledRejection', exitProcessGracefully);
process.on('uncaughtException', exitProcessGracefully);

const ip: string = config.get('server.ip');
const port: number = config.get('server.port');

app.listen(port, ip, () => {
    debug(`Server listening on ${ip}:${port}!`);
});

export default app;