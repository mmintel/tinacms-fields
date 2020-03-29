import React from 'react'
import PropTypes from 'prop-types'
import Relation from './components/relation'

export default class TinaCMSRelationField {
  constructor(tinacms) {
    this.tinacms = tinacms
  }

  install(fields) {
    if (fields) {
      fields.forEach(field => {
        this.add(field)
      })
    }

    this.tinacms.fields.add({
      name: 'relation',
      Component: Relation
    })
  }

  add({ name, hook, itemProps, noDataText, sortable }) {
    const Component = ({ field, input, form }) => {
      const data = hook()

      const newField = {
        ...field,
        data,
        itemProps,
        noDataText,
        sortable
      }

      return (
        <Relation
          form={form}
          input={input}
          field={newField}
        />
      )
    }

    Component.propTypes = {
      field: PropTypes.object,
      input: PropTypes.object,
      form: PropTypes.object
    }

    this.tinacms.fields.add({
      name,
      Component
    })
  }
}

export {
  Relation
}
