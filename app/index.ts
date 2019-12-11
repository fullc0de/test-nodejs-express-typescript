import express, {Router} from "express"

import { myContainer } from "./inversify.config"
import { TYPES } from "./types"
import { Warrior } from "./interfaces"
import {createConnection} from "typeorm";
import {Employee} from "./model/Employee";
import {Employer} from "./model/Employer";
import {PostController} from "./controller/post-controller";
import router from "./router"

const app: express.Application = express()
const ninja = myContainer.get<Warrior>(TYPES.Warrior)

createConnection("postgresdb").then( connection => {
        console.log(`conn name = ${connection.name}`)
        Employee.useConnection(connection)
        Employer.useConnection(connection)
    }).catch( error => console.log(error) )

// app.get('/', async (req, res) => {
//     const employees = await Employee.find()
//     const employer = await Employer.findOne(1)
//     res.send(`Hello WORLD!! ${ninja.fight()}, employer = ${employer?.name}, employee = ${employees[0].name}`)
// })

// let userRoute = Router({ mergeParams: true })
// let adminRoute = Router()
//
// userRoute.get('/:id', (req, res) => {
//     if (req.params.adminId) {
//         res.send(`admin(${req.params.adminId}) user(${req.params.id}) world!`)
//     } else {
//         res.send(`user(${req.params.id}) world!`)
//     }
// })
//
// adminRoute.get('/:id', (req, res) => {
//     res.send(`admin world!!! ${req.params.id}`)
// })
//
// adminRoute.use('/:adminId/user', userRoute)
//
// app.use('/user', userRoute)
// app.use('/admin', adminRoute)

app.use(router)
// app.get('/', (req, res) => {
//     res.send({error: "wefwef"})
// })

app.listen(3000, function() {
    console.log('Example app listening on port: 3000!')
})

