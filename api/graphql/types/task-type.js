import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql'
import {
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
} from '../../utils/relay'
import PersonType from './person-type'
import { Person } from '../../models'
import { NodeInterface } from '../queries/node'
import PersonConnection from './person-connection'

const TaskType = new GraphQLObjectType({
  name: 'Task',
  description: 'Task item',
  interfaces: [NodeInterface],
  fields: {
    id: globalIdField(),
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the task',
    },
    completed: {
      type: GraphQLBoolean,
      description: 'Completed task?',
    },
    assignees: {
      name: 'assignees',
      type: PersonConnection,
      args: connectionArgs,
      // TODO: dont just send all persons, select persons for this task
      // TODO: optimize: use projections
      // TODO: maybe pull this resolve() out and reuse it here and in the persons query
      resolve: async (task, args) => connectionFromArray(await Person.find(null), args),
    },
  },
})

export default TaskType
