import React from 'react'
import PropTypes from 'prop-types'

import SingleRelation from './single-relation'
import MultipleRelations from './multiple-relations'

const Relation = ({ multiple, ...props }) => {
  if (multiple) {
    return <MultipleRelations {...props} />
  }

  return <SingleRelation {...props} />
}

Relation.defaultProps = {
  multiple: false
}

Relation.propTypes = {
  multiple: PropTypes.bool
}

export default Relation
