import config from 'config';
import Debug from 'debug';
import fs from 'fs';
import mongoose, {ConnectionOptions} from 'mongoose';

const debug = Debug('api:db');

const mongoUri = config.get('dbConfig.mongoURI');
const mongoUriParams = config.has('dbConfig.mongoURIParams') && config.get('dbConfig.mongoURIParams');
const mongoDBName = config.get('dbConfig.dbName');

let mongoDB = `${mongoUri}/${mongoDBName}`;
if (mongoUriParams) {
    mongoDB = `${mongoDB}?${mongoUriParams}`
}

debug(`MongoURI=${mongoDB}`);

const connectionOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};

if (config.has('dbConfig.ssl')) {
    debug(`using SSL ${config.get('dbConfig.ssl')}`);
    try {
        const ca = [fs.readFileSync(config.get('dbConfig.ssl'))];

        connectionOptions.sslValidate = true;
        connectionOptions.sslCA = ca;
    } catch (e) {
        console.error(e);
    }
}

mongoose.connect(mongoDB, connectionOptions).then(() => {
    debug('connected to mongodb');
}).catch(error => {
    console.error('connected to mongodb failed', error);
    debug('MongoDB not connected');
});

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;