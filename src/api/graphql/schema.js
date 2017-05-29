import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql';

import * as mutations from './mutations';
import * as queries from './queries';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: queries,
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutations,
  })
});
