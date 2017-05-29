import _ from 'lodash'
import {
  GraphQLList,
} from 'graphql'
import Person from '../../models/person'
import { PersonType } from '../types'
import PersonModelToGraphType from '../../mappings/person-mapping.js'
import getProjection from '../../utils/get-projection'

export default {
  type: new GraphQLList(PersonType),
  resolve: async (root, args, source, fieldASTs) => {
    const projections = getProjection(fieldASTs)
    try {
      const result = await Person.find(null, projections)
      const mapped = _.map(result, PersonModelToGraphType)

      return mapped
    } catch(e) {
      console.log(e)

      return null
    }
  }
}
