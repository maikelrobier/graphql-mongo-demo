const babelRelayPlugin   = require('babel-relay-plugin')
const introspectionQuery = require('graphql/utilities').introspectionQuery
const request            = require('sync-request')

const graphqlHubUrl = 'http://localhost:3030/graphql'
const response = request('GET', graphqlHubUrl, {
  qs: {
    query: introspectionQuery,
  },
})

console.log(response)

const schema = JSON.parse(response.body.toString('utf-8'))

module.exports = babelRelayPlugin(schema.data, {
  abortOnError: true,
})
