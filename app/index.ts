import express, {Router} from "express"

import { myContainer } from "./inversify.config"
import { TYPES } from "./types"
import { Warrior } from "./interfaces"
import {createConnections, getConnectionOptions} from "typeorm";
import router from "./router"
import * as dotenv from "dotenv";

dotenv.config()
if (process.env.NODE_ENV == "local") {
    dotenv.config({path: `${__dirname}/../.env.local`})
}

const app: express.Application = express()
const ninja = myContainer.get<Warrior>(TYPES.Warrior);

(async () => {
    let postgresOpts = await getConnectionOptions("postgresdb")
    if (process.env.POSTGRES_URL) {
        Object.assign(postgresOpts, { url: process.env.POSTGRES_URL})
    }
    let mysqlOpts = await getConnectionOptions("mysqldb")
    if (process.env.MYSQL_URL) {
        Object.assign(mysqlOpts, { url: process.env.MYSQL_URL})
    }
    const conns = await createConnections([postgresOpts, mysqlOpts])
    conns.forEach(conn => {
        console.log(`conn name = ${conn.name}`)
    })
})().catch(e => {
    // Deal with the fact the chain failed
    console.log(e)
});

app.use(router)
app.use('*', (req, res, next) => {
    res.status(404).send('NOT FOUND')
})

app.listen(3000, function() {
    console.log('Example app listening on port: 3000!')
})

