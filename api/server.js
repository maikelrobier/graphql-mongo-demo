import path from 'path'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import schema from './graphql/schema'
import { printSchema } from 'graphql'
import graphqlHTTP from 'express-graphql'
import {
  toGlobalId,
  fromGlobalId,
} from './utils/relay'

import * as RelayUtils from './utils/relay'

const DB_PORT = 27017
const SERVER_PORT = 3030

const app = express()

mongoose.connect(`mongodb://localhost:${DB_PORT}/local`)

const db = mongoose.connection

db.on('error', () => {
  console.log( '-FAILED to connect to mongoose')
})

db.once('open', () => {
  console.log( '+Connected to mongoose')
})

// middlewares

app.use(cors())
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// routes

app.get('/', (req,res) => {
  res.send('Server runnig')
})

app.post('/rest', async (req, res) => {
  console.log('BODY: ', req.body)
  const todo = req.body
  const created = await createTodo(todo)
  res.json(created)
})

app.get('/graphql', graphqlHTTP(req => ({
 schema,
 graphiql: true,
})))

app.post('/graphql', graphqlHTTP(req => ({
 schema,
})))

app.listen(SERVER_PORT, () => {
  console.log(`+Express Server is Running on port ${SERVER_PORT}`)
})
