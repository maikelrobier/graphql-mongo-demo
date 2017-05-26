import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql'

const ToDoType = new GraphQLObjectType({
  name: 'ToDo',
  description: 'ToDo item',
  fields: {
    itemId: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the todo',
    },
    text: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the todo',
    },
    completed: {
      type: GraphQLBoolean,
      description: 'Completed todo?',
    },
  },
})

export default ToDoType
