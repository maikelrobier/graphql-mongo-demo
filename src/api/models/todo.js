import mongoose from 'mongoose'

const Schema = mongoose.Schema

const toDoSchema = new Schema({
  itemId: Number,
  text: String,
  completed: Boolean
}, { collection: 'Todos' })

const ToDo = mongoose.model('ToDo', toDoSchema)

export default ToDo
