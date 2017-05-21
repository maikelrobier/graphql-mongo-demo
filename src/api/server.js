import path from 'path'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import ToDo from './models/todo'
import schema from './graphql/schema'
import graphqlHTTP from 'express-graphql'

const DB_PORT = 27017
const SERVER_PORT = 3030

const app = express()

mongoose.connect(`mongodb://localhost:${DB_PORT}/local`)

const db = mongoose.connection

db.on('error', () => {
  console.log( '--FAILED to connect to mongoose')
})

db.once('open', () => {
  console.log( '++connected to mongoose')
})

// middlewares

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const promise = () => new Promise((resolve) => {
  setTimeout(() => resolve('resolved!'), 3000)
})

// routes

app.get('/', (req,res) => {
  res.send('server runnig')
})

const createTodo = async (data) => {
  let result
  try {
    result = await promise()
    console.log('ok: ', result)
  } catch (e) {
    console.log('--error: ', e)
  }

  return result
}

app.get('/rest', async (req, res) => {
  const list = await ToDo.find({})

  res.json(list)
})

app.post('/rest', async (req, res) => {
  console.log('BODY: ', req.body)
  const todoItem = new ToDo({
    itemId: 1,
    item: req.body.item || 'Todo Text',
    completed: false,
  })
  const todo = {
    itemId: 1,
    item: 'Hello',
    completed: false,
  }
  const created = await createTodo(todo)
  res.json(created)
  // todoItem.save((err,result)=> {
  //   if (err) {
  //     console.log("--TodoItem save failed " + err)
  //     return
  //   }
  //   console.log("+++TodoItem saved successfully " + todoItem.item)
  //   res.redirect('/')
  // })
})

app.get('/graphql', graphqlHTTP(req => ({
 schema,
 graphiql: true,
})))
app.post('/graphql', graphqlHTTP(req => ({
 schema,
})))

app.listen(SERVER_PORT, () => {
  console.log(`++Express Server is Running on port ${SERVER_PORT}`)
})
