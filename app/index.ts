import express, {Router} from "express"

import { myContainer } from "./inversify.config"
import { TYPES } from "./types"
import { Warrior } from "./interfaces"
import {createConnections, getConnectionOptions} from "typeorm";
import router from "./router"

const app: express.Application = express()
const ninja = myContainer.get<Warrior>(TYPES.Warrior);

(async () => {
    let postgresOpts = await getConnectionOptions("default")
    let mysqlOpts = await getConnectionOptions("mysqldb")
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

