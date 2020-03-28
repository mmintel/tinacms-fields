import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { FieldsBuilder } from '@tinacms/form-builder'

const Condition = ({ input, field, form }) => {
  const nestedFields = field.fields(input.value)
  let conditionalFields = [];

  if (nestedFields) {
    conditionalFields = nestedFields.map(f => {
      let fieldName = f.name


      if (fieldName.includes('frontmatter')) {
        fieldName = fieldName.replace('frontmatter', 'rawFrontmatter');
      }

      // const fieldPath = field.name.split('.').slice(0, -1)
      // const name = fieldPath.concat(fieldName).join('.')
      // console.log(name);

      return {
        ...f,
        name: fieldName
      }
    })
  }

  const fields = [
    {
      ...field.trigger,
      name: field.name,
      label: field.label
    },
    ...conditionalFields
  ]

  return (
    <ConditionalField>
      <FieldsBuilder fields={fields} form={form} />
    </ConditionalField>
  )
}

const ConditionalField = styled.div`
  margin-top: -20px;
  margin-left: -20px;
  margin-right: -20px;
`

Condition.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any
  }).isRequired,
  field: PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
    trigger: PropTypes.shape({
      component: PropTypes.string
    }),
    fields: PropTypes.func
  }).isRequired,
  form: PropTypes.object
}

export default Condition
