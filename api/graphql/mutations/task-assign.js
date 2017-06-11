import _ from 'lodash'
import mongoose from 'mongoose'
import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId, fromGlobalId } from '../../utils/relay'
import { mongoObjectToGraph } from '../../utils/mongo'
import TaskType from '../types/task-type'
import { Task } from '../../models'

export default mutationWithClientMutationId({
  name: 'TaskAssignMutation',
  inputFields: {
    taskId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    personId: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    task: {
      type: TaskType,
    },
  },
  mutateAndGetPayload: async ({ taskId, personId }) => {
    try {
      const task = await Task.findById(fromGlobalId(taskId).id)

      if (_.includes(task.assignees, personId)) {
        throw new Error('person already assigned to this task')
      }

      task.assignees = [...task.toObject().assignees, mongoose.Types.ObjectId(fromGlobalId(personId).id)]

      const result = await task.save()

      const parsed = mongoObjectToGraph(result)

      return {
        task: parsed,
      }
    } catch (err) {
      console.log(err)

      return null
    }
  }
})
