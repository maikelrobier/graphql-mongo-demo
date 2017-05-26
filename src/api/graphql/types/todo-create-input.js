import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql/type'

const ToDoCreateInput = new GraphQLInputObjectType({
  name: 'ToDoCreateInput',
  fields: {
    text: {
      name: 'text',
      type: new GraphQLNonNull(GraphQLString),
    },
    completed: {
      name: 'completed',
      type: GraphQLBoolean,
    },
  },
})

export default ToDoCreateInput
