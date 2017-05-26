import _ from 'lodash'
import {
  GraphQLList,
} from 'graphql'

import ToDo from '../../models/todo'
import { ToDoType } from '../types'
import ToDoModelToGraphType from '../../mappings/todo-mapping.js'
import getProjection from '../../utils/get-projection'

const todos = {
  type: new GraphQLList(ToDoType),
  resolve: async (root, { itemId }, source, fieldASTs) => {
    const projections = getProjection(fieldASTs)
    try {
      const result = await ToDo.find(null, projections)

      return _.map(result, ToDoModelToGraphType)
    } catch(e) {
      console.log(e)

      return null
    }
  }
}

export default todos