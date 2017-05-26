import {
  GraphQLObjectType
} from 'graphql'

import ToDoType from './todo-type'

const ToDoCreatePayload = new GraphQLObjectType({
  name: 'ToDoCreatePayload',
  fields: {
    todo: {
      name: 'todo',
      type: ToDoType,
    },
  },
})

export default ToDoCreatePayload
