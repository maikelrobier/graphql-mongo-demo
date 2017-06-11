import assert from 'assert'
import {
  nodeDefinitions,
  fromGlobalId,
} from '../../utils/relay'
import * as models from '../../models'
import * as types from '../types'

const {
  nodeField,
  nodeInterface: NodeInterface,
} = nodeDefinitions(
  async (globalId) => {
    const { type, id } = fromGlobalId(globalId)

    assert(models[type])

    return await models[type].findById(id)
  },
  (object) => {
    return object.getTypeName()
  }
)

export default nodeField

export { NodeInterface }
