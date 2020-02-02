import 'reflect-metadata';
import express from "express";
import {createConnections, getConnectionOptions} from "typeorm";
import { buildRouter } from "./decorator";
import * as path from 'path';
import { registerBeforeInjectors, registerAfterInjectors } from './decorator/index';
import { JwtAuthDecoInjector } from './deco-injector/jwt-auth-deco-injector';
import { LogDecoInjector } from './deco-injector/log-deco-injector';

const app: express.Application = express();

(async () => {
    let postgresOpts = await getConnectionOptions("default");
    let mysqlOpts = await getConnectionOptions("mysqldb");
    const conns = await createConnections([postgresOpts, mysqlOpts]);
    conns.forEach(conn => {
        console.log(`conn name = ${conn.name}`);
    });
})().catch(e => {
    // Deal with the fact the chain failed
    console.log(e);
});

registerBeforeInjectors([
    new JwtAuthDecoInjector("hello key")
]);

registerAfterInjectors([
    new LogDecoInjector()
]);

app.use("*", (req, res, next) => {
    console.log("start preprocess...");
    next();
});

const controllerPath = path.join(__dirname, 'controller');
app.use(buildRouter('api', controllerPath));

app.use("*", (req, res, next) => {
    res.status(404).send('NOT FOUND');
});

app.listen(3000, function() {
    console.log('Example app listening on port: 3000!');
});

