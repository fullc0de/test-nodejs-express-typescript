
let fs = require('fs');
let dotenv = require('dotenv');

dotenv.config();
if (process.env.NODE_ENV == "local") {
    dotenv.config({path: `${__dirname}/.env.local`});
} else if (process.env.NODE_ENV == "development") {
    if (fs.existsSync(`${__dirname}/.env.dev`)) {
        dotenv.config({path: `${__dirname}/.env.dev`});
    }
} else if (process.env.NODE_ENV == "test") {
    if (fs.existsSync(`${__dirname}/.env.test`)) {
        dotenv.config({path: `${__dirname}/.env.test`});
    }
}

module.exports = [{
    "name": "default",
    "type": "postgres",
    "url": process.env.POSTGRES_URL,
    "entities": [
        "build/app/model/**/*.js"
    ],
    "migrations": [
        "build/app/migration/**/*.js"
    ],
    "cli": {
        "entitiesDir": "app/model",
        "migrationsDir": "app/migration"
    },
    "synchronize": false,
    "logging": ["query", "error", "schema"]
}];
