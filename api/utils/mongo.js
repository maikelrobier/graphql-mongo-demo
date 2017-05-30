import _ from 'lodash'
/**
* generate projection object for mongoose
* @param  {Object} fieldASTs
* @return {Project}
*/
export function getProjection(fieldASTs) {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = true;
    return projections;
  }, {})
}

export function mongoObjectToGraph(object) {
  return {
    ..._.omit(object, '_id'),
    id: object._id,
  }
}
