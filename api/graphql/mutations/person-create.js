import { GraphQLNonNull, GraphQLString } from 'graphql'
import { Person } from '../../models'
import { PersonType } from '../types'
import { mutationWithClientMutationId } from '../../utils/relay'
import { mongoObjectToGraph } from '../../utils/mongo'

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

      const parsed = mongoObjectToGraph(result)

      return {
        person: parsed,
      }
    } catch (err) {
      console.log(err)

      return null
    }
  }
})
