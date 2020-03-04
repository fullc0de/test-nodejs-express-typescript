
module.exports = [{
    "name": "default",
    "type": "postgres",
    "url": process.env.POSTGRES_URL,
    "entities": [
        "build/model/**/*.js"
    ],
    "migrations": [
        "build/migration/**/*.js"
    ],
    "cli": {
        "entitiesDir": "app/model",
        "migrationsDir": "app/migration"
    },
    "synchronize": false,
    "logging": ["query", "error", "schema"]
}];
