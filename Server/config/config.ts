import path from "path";
import dotenv from 'dotenv';

// reading the env variables
dotenv.config({ path: path.resolve(__dirname, "./config.env") });

// interface to load env variables
interface Env {
    NODE_ENV: string | undefined;
    PORT: string | undefined;
    USER_NAME: string | undefined;
    PASSWORD: string | undefined;
    CLUSTER: string | undefined;
}

interface Config {
    NODE_ENV: string;
    PORT: string;
    USER_NAME: string;
    PASSWORD: string;
    CLUSTER: string;
}

// loading the process.env as Env interface
const getConfig = (): Env => {
    return {
        NODE_ENV: process.env.NODE_ENV,
        CLUSTER: process.env.CLUSTER,
        PASSWORD: process.env.PASSWORD,
        USER_NAME: process.env.USER_NAME,
        PORT: process.env.PORT
    };
};

// validating the .env file
const getValidatedConfig = (config: Env): Config => {
    for (const [key, value] of Object.entries(config)){
        if (value === undefined) {
            throw new Error(`Missing ${key} in config.env file`);
        }        
    }
    return config as Config;
}

const config = getConfig();

const validConfig = getValidatedConfig(config);

export default validConfig;

