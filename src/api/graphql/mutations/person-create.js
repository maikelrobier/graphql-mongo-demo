import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'
import Person from '../../models/person'
import { PersonType } from '../types'
import { mutationWithClientMutationId } from '../../utils/relay'
import PersonModelToGraphType from '../../mappings/person-mapping.js'

export default mutationWithClientMutationId({
  name: 'PersonCreateMutation',
  inputFields: {
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    person: {
      type: PersonType,
    },
  },
  mutateAndGetPayload: async ({ firstName, lastName, email }) => {
    try {
      const result = await Person.create({
        firstName,
        lastName,
        email,
      })

      const parsed = PersonModelToGraphType(result)

      return {
        person: parsed,
      }
    } catch (e) {
      console.log(err)

      return null
    }
  }
})
