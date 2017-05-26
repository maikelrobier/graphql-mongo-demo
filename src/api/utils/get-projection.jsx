/**
* generate projection object for mongoose
* @param  {Object} fieldASTs
* @return {Project}
*/
export default function getProjection(fieldASTs) {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = true;
    return projections;
  }, {})
}
