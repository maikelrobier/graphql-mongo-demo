import {
  toGlobalId,
  fromGlobalId,
} from '../utils/relay'

const PersonModelToGraphType = ({ _id, firstName, lastName, email }) => ({
    id: _id,
    firstName,
    lastName,
    email,
})

export default PersonModelToGraphType
