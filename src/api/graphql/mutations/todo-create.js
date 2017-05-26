import {
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
} from 'graphql';

import ToDo from '../../models/todo'
import {
  ToDoCreateInput,
  ToDoCreatePayload,
} from '../types'

const todoCreate = {
  type: ToDoCreatePayload,
  args: {
    input: {
      name: 'input',
      type: ToDoCreateInput,
    },
  },
  async resolve (root, params, options) {

    console.log('params', params)

    const input = {
      ...params.input,
      completed: params.input.completed || false,
    }

    const created = await ToDo.create(input)

    console.log(created)

    const result = {
      todo: {
        text: created.text,
        itemId: created._id,
        completed: created.completed,
      }
    }

    console.log(result)

    return result
  }
}

export default todoCreate
