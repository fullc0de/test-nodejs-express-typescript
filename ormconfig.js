
let dotenv = require('dotenv');

dotenv.config();
if (process.env.NODE_ENV == "local") {
    dotenv.config({path: `${__dirname}/.env.local`});
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
}, {
    "name": "mysqldb",
    "type": "mysql",
    "url": process.env.MYSQL_URL
}];
