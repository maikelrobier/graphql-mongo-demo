import _ from 'lodash'
import {
  GraphQLList,
} from 'graphql'
import { Task } from '../../models'
import { TaskType } from '../types'
import { getProjection, mongoObjectToGraph } from '../../utils/mongo'

export default {
  type: new GraphQLList(TaskType),
  resolve: async (root, args, source, fieldASTs) => {
    const projections = getProjection(fieldASTs)
    try {
      const result = await Task.find(null, projections)

      return _.map(result, mongoObjectToGraph)
    } catch(err) {
      console.log(err)

      return null
    }
  }
}
