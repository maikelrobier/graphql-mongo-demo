import _ from 'lodash'
import { GraphQLList, GraphQLString } from 'graphql'
import { connectionDefinitions, connectionArgs, connectionFromArray } from '../../utils/relay'
import { getProjection, mongoObjectToGraph } from '../../utils/mongo'
import { Person, Task } from '../../models'
import { PersonType, PersonConnection } from '../types'

export default {
  type: PersonConnection,
  args: connectionArgs,
  // TODO: reuse code, ensure tasks field will be there in other queries
  resolve: async (root, args, source, fieldASTs) => {
    const projections = getProjection(fieldASTs)
    try {
      const allPersons = await Person.find(null, projections)
      const allTasks = await Task.find(null)

      let mapped = _.map(allPersons, mongoObjectToGraph)

      mapped = _.map(mapped, person => ({
        ...person,
        tasks: _.filter(allTasks, task => _.some(task.assignees, assigneeOid =>
          assigneeOid.toString() === person.id
        )),
      }))

      return connectionFromArray(mapped, args)
    } catch(err) {
      console.log(err)

      return null
    }
  }
}
