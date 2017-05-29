import ToDo from '../../models/todo'
import {
  ToDoCreateInput,
  ToDoCreatePayload,
} from '../types'
import ToDoModelToGraphType from '../../mappings/todo-mapping.js'

export default {
  type: ToDoCreatePayload,
  args: {
    input: {
      name: 'input',
      type: ToDoCreateInput,
    },
  },
  async resolve (root, params, options) {

    const input = {
      ...params.input,
      completed: params.input.completed || false,
    }

    const created = await ToDo.create(input)

    const result = {
      todo: {
        text: created.text,
        itemId: created._id,
        completed: created.completed,
      }
    }

    return ToDoModelToGraphType(result)
  }
}
