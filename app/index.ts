import express, {Router} from "express";
import {createConnections, getConnectionOptions} from "typeorm";
import router from "./router";

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

// passport.use(new facebookPassport.Strategy({
//     clientID: '700863590736873',
//     clientSecret: 'ec94fb04903e57eb8ce0d4fdcf7553fd',
//     callbackURL: 'http://localhost:3000/auth/facebook/callback'
// }, (token, refToken, profile, cb) => {
//     console.log(`token = ${token}, userid = ${profile.id}`);
//     cb(null, null, null);
// }));

app.use("*", (req, res, next) => {
    console.log("start preprocess...");
    next();
});

app.use(router);

app.use("*", (req, res, next) => {
    res.status(404).send('NOT FOUND');
});

app.listen(3000, function() {
    console.log('Example app listening on port: 3000!');
});

