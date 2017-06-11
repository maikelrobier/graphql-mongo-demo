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

    const object = await models[type].findById(id)

    console.log(`node(${globalId}) [${type}:${id}]`)
    console.log('Object: ', object)

    return object
  },
  (object) => {
    return object.getTypeName()
  }
)

export default nodeField

export { NodeInterface }
