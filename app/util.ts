import dotenv from "dotenv";
import fs from "fs";

export function bind(target: any, method: any) {
    return function() {
        return method.apply(target, arguments);
    }
}    

export function loadEnv(baseDir: string) {
    dotenv.config();
    let envPath: string | undefined;
    if (process.env.NODE_ENV == "local") {
        envPath = `${baseDir}/.env.local`;
    } else if (process.env.NODE_ENV == "development") {
        envPath = `${baseDir}/.env.dev`;
    } else if (process.env.NODE_ENV == "test") {
        envPath = `${baseDir}/.env.test`;
    }

    if (envPath && fs.existsSync(envPath)) {
        console.log(`Using environment file: ${envPath}`);
        dotenv.config({path: envPath});
    }
}

