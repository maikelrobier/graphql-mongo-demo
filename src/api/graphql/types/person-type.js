import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql'
import { globalIdField } from '../../utils/relay'
import { NodeInterface } from '../queries/node'

const PersonType = new GraphQLObjectType({
  name: 'Person',
  description: 'A Person',
  interfaces: [NodeInterface],
  fields: {
    id: globalIdField(),
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Person\'s first name',
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Person\'s last name',
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Person\'s email',
    },
  },
})

export default PersonType
