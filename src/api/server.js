import path from 'path'
import mongoose from 'mongoose'

const express = require('express')
const app = express()
const ToDo = require('./models/todo.js')

const SERVER_PORT = 27017

mongoose.connect(`mongodb://localhost:${SERVER_PORT}/local`)

const db = mongoose.connection

db.on('error', ()=> {
  console.log( '--FAILED to connect to mongoose')
})

db.once('open', () => {
 console.log( '++connected to mongoose')
})

app.listen(3030,()=> {
  console.log(`++Express Server is Running on port ${SERVER_PORT}`)
})

app.get('/',(req,res)=>{
 res.send('server runnig')
})

app.post('/rest', (req, res)=>{
  var todoItem = new ToDo({
    itemId: 1,
    item: req.body.item || 'Todo Text',
    completed: false,
  })
  todoItem.save((err,result)=> {
    if (err) {
      console.log("--TodoItem save failed " + err)
      return
    }
    console.log("+++TodoItem saved successfully " + todoItem.item)
    res.redirect('/')
  })
})
