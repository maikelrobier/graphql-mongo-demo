import { connectionDefinitions } from '../../utils/relay'
import PersonType from './person-type'

const { connectionType: PersonConnection } = connectionDefinitions({ nodeType: PersonType })

export default PersonConnection
