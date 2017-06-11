import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'
import { Task } from '../../models'
import { TaskType } from '../types'
import { mongoObjectToGraph } from '../../utils/mongo'
import { mutationWithClientMutationId } from '../../utils/relay'

export default mutationWithClientMutationId({
  name: 'TaskCreateMutation',
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    task: {
      type: TaskType,
    },
  },
  mutateAndGetPayload: async (input) => {
    try {
      const result = await Task.create(input)

      return {
        task: mongoObjectToGraph(result),
      }
    } catch (err) {
      console.log(err)

      return null
    }
  }
})
