import React from 'react'
import PropTypes from 'prop-types'

import { RelationHeader, RelationBody, FieldLabel } from './relation'
import Select from './select'

const SingleRelation = ({ input, field }) => {
  const options = field.data.map(item => field.itemProps(item))

  const selectOptions = [
    {
      key: null,
      label: '---'
    },
    ...options
  ]

  return (
    <React.Fragment>
      <RelationHeader>
        <FieldLabel>{field.label}</FieldLabel>
      </RelationHeader>
      <RelationBody>
        <Select
          input={input}
          field={field}
          options={selectOptions}
          noDataText={field.noDataText}
        />
      </RelationBody>
    </React.Fragment>
  )
}

SingleRelation.propTypes = {
  input: PropTypes.object,
  field: PropTypes.shape({
    label: PropTypes.string,
    noDataText: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
    itemProps: PropTypes.func
  })
}

export default SingleRelation
