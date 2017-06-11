import _ from 'lodash'
import graphqlFields from 'graphql-fields'

/**
* generate field selection string for mongoose
* @param  {Object} fieldASTs
* @return {String} selection
*/
export function getProjection(fieldASTs) {
  let fields = graphqlFields(fieldASTs)

  if (fields.edges) { // for connections
    fields = fields.edges.node
  }

  const root = {
    path: [],
    node: fields,
  }
  const selections = []
  const queue = [root]
  while(queue.length) {
    const current = queue.shift()
    const keys = Object.keys(current.node)
    if (!keys.length) { // leaf
      selections.push(current.path.join('.'))
    }
    _.each(keys, key => {
      queue.push({
        path: [...current.path, key],
        node: current.node[key],
      })
    })
  }

  return selections.join(' ')
}

export function mongoObjectToGraph(document) {
  return {
    ..._.omit(document.toObject(), '_id'),
    id: document._id.toString(),
  }
}
