import _ from 'lodash'
import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'

import ToDo from '../../models/todo'
import { ToDoType } from '../types'
import ToDoModelToGraphType from '../../mappings/todo-mapping.js'
import getProjection from '../../utils/get-projection'

export default {
  type: ToDoType,
  args: {
    itemId: {
      name: 'itemId',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (root, { itemId }, source, fieldASTs) => {
    const projections = getProjection(fieldASTs)
    try {
      // TODO: search by id
      const result = await ToDo.find(null, projections)

      return ToDoModelToGraphType(_.first(result))
    } catch (e) {
      console.log(e)

      return null
    }
  }
}
