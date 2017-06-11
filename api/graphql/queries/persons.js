import _ from 'lodash'
import {
  GraphQLList,
  GraphQLString,
} from 'graphql'
import { Person } from '../../models'
import { PersonType } from '../types'
import { getProjection, mongoObjectToGraph } from '../../utils/mongo'
import {
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
} from '../../utils/relay'
import PersonConnection from '../types/person-connection'

export default {
  type: PersonConnection,
  // TODO: this is not used, is here as a hack to allow querying from relay
  args: connectionArgs,
  resolve: async (root, args, source, fieldASTs) => {
    const projections = getProjection(fieldASTs)
    try {
      const result = await Person.find(null, projections)
      const mapped = _.map(result, mongoObjectToGraph)

      return connectionFromArray(mapped, args)
    } catch(err) {
      console.log(err)

      return null
    }
  }
}
