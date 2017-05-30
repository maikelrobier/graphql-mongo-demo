import _ from 'lodash'
import {
  GraphQLList,
} from 'graphql'
import Person from '../../models'
import { PersonType } from '../types'
import { getProjection, mongoObjectToGraph} from '../../utils/mongo'

export default {
  type: new GraphQLList(PersonType),
  resolve: async (root, args, source, fieldASTs) => {
    const projections = getProjection(fieldASTs)
    try {
      const result = await Person.find(null, projections)

      return _.map(result, mongoObjectToGraph)
    } catch(e) {
      console.log(e)

      return null
    }
  }
}
