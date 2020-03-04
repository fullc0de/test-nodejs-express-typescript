import 'reflect-metadata';
import * as path from 'path';
import express, { Router } from "express";
import {createConnections, getConnectionOptions} from "typeorm";
import { buildRouter, registerBeforeInjectors, registerAfterInjectors } from "deco-versioning-router";
import { LogDecoInjector } from './deco-injector/log-deco-injector';
import swaggerUi from 'swagger-ui-express';
import { loadEnv } from "./util";

loadEnv(`${__dirname}/..`);

const app: express.Application = express();
app.use(express.json());

(async () => {
    let postgresOpts = await getConnectionOptions("default");
//    let mysqlOpts = await getConnectionOptions("mysqldb");
    const conns = await createConnections([postgresOpts]);
    conns.forEach(conn => {
        console.log(`conn name = ${conn.name}`);
    });
})().catch(e => {
    // Deal with the fact the chain failed
    console.log(e);
});

registerBeforeInjectors([]);
registerAfterInjectors([
    new LogDecoInjector()
]);

app.use("*", (req, res, next) => {
    console.log("start preprocess...");
    next();
});

const swaggerDoc = require('../swagger-v1');
swaggerDoc.host = "localhost:3000";
app.use('/api-docs/v1', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const baseRouter = Router();
const controllerPath = path.join(__dirname, 'controller');
buildRouter(baseRouter, 'api', controllerPath);
app.use(baseRouter);

app.use("*", (req, res, next) => {
    res.status(404).send('NOT FOUND');
});

app.listen(3000, function() {
    console.log('Example app listening on port: 3000!');
});
