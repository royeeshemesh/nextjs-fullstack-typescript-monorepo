import dotenv, {DotenvConfigOptions} from 'dotenv'

const configOptions: DotenvConfigOptions = {
    // debug: process.env.NODE_ENV !== 'production',
};

dotenv.config(configOptions);