import mongoose from 'mongoose'

const Schema = mongoose.Schema

const taskSchema = new Schema({
  title: String,
  completed: Boolean,
  assignees: [{
    type: Schema.Types.ObjectId,
    ref: 'Person',
  }],
}, { collection: 'Tasks' })

taskSchema.methods = {
  getTypeName: () => 'Task'
}

const Task = mongoose.model('Task', taskSchema)

export default Task
